import datetime
import json
import zipfile

import aiohttp.hdrs
from aiohttp import web
from filer.utils import logger, utils
import crud_pack
import secrets

routes = web.RouteTableDef()
logger = logger.get_logger("routes")

MAX_PACK_SIZE_IN_GB = 1
__MAX_PACK_SIZE_IN_BYTES = 1024 * 1024 * 1024 * MAX_PACK_SIZE_IN_GB


@routes.get('/{key}')
async def get_file_by_id(request: web.Request) -> web.Response:
    key = request.match_info['key']
    db = request.app['db']

    try:
        data = await request.json()
    except json.JSONDecodeError:
        data = None

    pack = await crud_pack.get(db, key)
    if not pack:
        raise web.HTTPNoContent

    if pack['password']:
        if not data:
            raise web.HTTPUnauthorized
        if not utils.hash_password(data.get('password')) == pack['password']:
            raise web.HTTPUnauthorized

    if pack['max_views']:
        if pack['views'] >= pack['max_views']:
            await crud_pack.delete(db, key)
            utils.delete_file(pack['key'])
            raise web.HTTPNoContent
        else:
            await crud_pack.update(db, pack['views'] + 1, pack['key'])

    if datetime.datetime.strptime(pack['time_to_live'],
                                  '%Y-%m-%d %H:%M:%S.%f') < datetime.datetime.utcnow():
        await crud_pack.delete(db, key)
        utils.delete_file(pack['key'])
        raise web.HTTPNoContent

    filename = f'{pack["key"]}.zip'
    headers = {
        "Content-disposition": "attachment; filename={file_name}".format(file_name=filename)
    }
    return web.Response(
            headers=headers,
            body=utils.file_sender(filename)
    )


@routes.post("/")
async def create_file(request: web.Request) -> web.Response:
    db = request.app['db']

    # Generate key until it is unique
    key = secrets.token_urlsafe(5)
    while pack := await crud_pack.get(db, key):
        key = secrets.token_urlsafe(5)

    zip_archive = zipfile.ZipFile(f'storage/{key}.zip', 'w')

    # For each file in multipart writes it to zip archive
    # Checks json data and applies params
    async for field in (await request.multipart()):
        if field.name == 'file':
            size = 0

            file_bytes = []
            while True:
                chunk = await field.read_chunk()
                if not chunk:
                    break
                size += len(chunk)
                file_bytes.append(chunk)

            if size > __MAX_PACK_SIZE_IN_BYTES:
                zip_archive.close()
                raise web.HTTPClientError(body="File too big")

            zip_archive.writestr(field.filename, b''.join(file_bytes))

        if field.headers[aiohttp.hdrs.CONTENT_TYPE] == 'application/json':
            data = await field.json()
            if not (data.get('time_to_live') or data.get('max_views')):
                raise web.HTTPBadRequest
            if data.get('password'):
                data['password'] = utils.hash_password(data.get('password'))

    zip_archive.close()
    await crud_pack.create(
            db,
            key=key,
            password=data.get('password'),
            max_views=data.get('max_views'),
            time_to_live=datetime.datetime.utcnow() + datetime.timedelta(seconds=data.get('time_to_live'))
    )

    return web.json_response({"key": key})


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
        result.append(dict(
                key=row['key'],
                views=row['views'],
                max_views=row['max_views'],
                password=row['password'],
                time_to_live=row['time_to_live']
            )
        )

    return web.json_response(result)


# Admin method
@routes.delete('/{key}')
async def delete_url(request: web.Request) -> web.Response:
    key = request.match_info['key']
    db = request.app['db']

    pack = await crud_pack.get(db, key)
    if not pack:
        raise web.HTTPNoContent

    await crud_pack.delete(db, key)
    utils.delete_file(pack['key'])

    return web.json_response({"status": "deleted"})



