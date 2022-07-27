import datetime
import json
import zipfile

import aiohttp.hdrs
from aiohttp import web
from utils import logger, utils
import crud_pack
from pack import PackCreateSchema, PackCreate, Pack
from marshmallow import ValidationError

routes = web.RouteTableDef()
logger = logger.get_logger("routes")

MAX_PACK_SIZE_IN_GB = 1
__MAX_PACK_SIZE_IN_BYTES = 1024 * 1024 * 1024 * MAX_PACK_SIZE_IN_GB


@routes.get('/{key}')
async def get_pack_by_id(request: web.Request) -> web.Response:
    key = request.match_info['key']
    db = request.app['db']

    try:
        data = await request.json()
    except json.JSONDecodeError:
        data = None

    pack = await crud_pack.get(db, key)
    if not pack:
        raise web.HTTPNoContent
    pack = Pack(**pack)

    if pack.password:
        if not data:
            raise web.HTTPUnauthorized
        if utils.hash_password(data.get('password')) != pack.password:
            raise web.HTTPUnauthorized

    if pack.views >= pack.max_views:
        await crud_pack.delete(db, key)
        utils.delete_file(pack.key)
        raise web.HTTPNoContent
    else:
        await crud_pack.update(db, pack.views + 1, pack.key)

    if pack.time_to_live < datetime.datetime.utcnow():
        await crud_pack.delete(db, key)
        utils.delete_file(pack.key)
        raise web.HTTPNoContent

    filename = pack.key + '.zip'
    headers = {
        "Content-disposition": "attachment; filename={file_name}".format(file_name=filename)
    }
    return web.Response(
            headers=headers,
            body=utils.file_sender(filename)
    )


@routes.post("/")
async def create_pack(request: web.Request) -> web.Response:
    db = request.app['db']
    pack = None
    filename = None
    file_bytes = None

    async for field in (await request.multipart()):
        if field.name == 'file':
            filename, file_bytes = await handle_file_upload(field)

        elif field.headers.get(aiohttp.hdrs.CONTENT_TYPE) == 'application/json':
            pack = await handle_json(field, db)

        else:
            logger.info(field.name)
            logger.info(field.headers.items())

    if not pack:
        raise web.HTTPBadRequest(reason="No json provided")

    if not (filename or file_bytes):
        raise web.HTTPBadRequest(reason="No file provided")

    with zipfile.ZipFile(f'storage/{pack.key}.zip', 'w') as f:
        f.writestr(filename, b''.join(file_bytes))
    await crud_pack.create(db, pack)

    return web.json_response({"key": pack.key})


@routes.put('/{key}')
async def update_pack(request: web.Request) -> web.Response:
    raise web.HTTPNotImplemented


# Admin method
@routes.get('/')
async def get_all(request: web.Request) -> web.Response:
    db = request.app['db']
    result = []

    rows = await crud_pack.get_all(db)
    for row in rows:
        result.append(dict(**row))
    return web.json_response(result)


# Admin method
@routes.delete('/{key}')
async def delete_pack(request: web.Request) -> web.Response:
    key = request.match_info['key']
    db = request.app['db']

    pack = await crud_pack.get(db, key)
    if not pack:
        raise web.HTTPNoContent

    await crud_pack.delete(db, key)
    utils.delete_file(pack['key'])

    return web.json_response({"status": "deleted"})


async def handle_file_upload(field) -> (str, list[bytes]):
    """ Reads chunks of bytes and returns filename and full file bytes"""
    filename = field.filename
    file_bytes = []
    size = 0
    while True:
        chunk = await field.read_chunk()
        if not chunk:
            break
        size += len(chunk)
        if size > __MAX_PACK_SIZE_IN_BYTES:
            raise web.HTTPClientError(body="File too big")
        file_bytes.append(chunk)
    return filename, file_bytes


async def handle_json(field, db) -> PackCreate:
    """ Parses json from field and creates PackCreate object from it """
    try:
        data = await field.json()
        pack = PackCreate(**PackCreateSchema().load(data), db=db)
        pack.key = await pack.key
    except json.JSONDecodeError:
        raise web.HTTPBadRequest(reason="Bad json")
    except ValidationError as e:
        raise web.HTTPBadRequest(reason=e.messages)
    return pack
