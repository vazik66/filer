import os
import zipfile

from aiohttp import web

from filer.file import File
from logger import get_logger
from aiohttp import streamer

routes = web.RouteTableDef()
logger = get_logger("routes")


@routes.get('/{uid}')
async def get_file_by_id(request: web.Request) -> web.Response:
    logger.info(request.items())
    uid = request.match_info['uid']
    db = request.app["DB"]

    async with db.execute("SELECT uid, download_once, save_for_n_weeks FROM URL WHERE uid=$1;",
                          [uid]) as cur:
        row = await cur.fetchone()
        if row is None:
            raise web.HTTPNoContent
        logger.info(row)

    # Check if row[1] is true, then delete it from db, and from os (bg task)

    filename = f'{row[0]}.zip'
    headers = {
        "Content-disposition": "attachment; filename={file_name}".format(file_name=filename)
    }
    return web.Response(
            headers=headers,
            body=file_sender(filename)
    )


@routes.post("/")
async def create_file(request: web.Request) -> web.Response:
    data = await request.post()
    db = request.app['DB']

    created_file = File()
    zip_archive = zipfile.ZipFile(f'storage/{created_file.uid}.zip', 'w')

    for k, v in data.items():
        if k == 'file':
            file_content = v.file.read()
            file_path = f'storage/tmp/{v.filename}'

            with open(file_path, 'wb') as f:
                f.write(file_content)

            zip_archive.write(file_path, arcname=v.filename)
            os.remove(file_path)

    zip_archive.close()

    await db.execute("INSERT INTO url (uid, download_once, save_for_n_weeks) VALUES ($1, $2, $3);"
                     ,
                     [created_file.uid, created_file.download_once, created_file.save_for_n_weeks])
    await db.commit()

    return web.json_response({"uid": created_file.uid})


# Admin method
@routes.get('/')
async def get_all(request: web.Request) -> web.Response:
    db = request.app['DB']

    result = []
    async with db.execute('SELECT * FROM url') as cur:
        rows = await cur.fetchall()
        for row in rows:
            result.append({"uid": row[0], "download_once": row[1], "save_for_n_weeks": row[2]})

    return web.json_response(result)


@streamer
async def file_sender(writer, filename: str):
    with open(f'storage/{filename}', 'rb') as f:
        chunk = f.read(2 ** 16)
        while chunk:
            await writer.write(chunk)
            chunk = f.read(2 ** 16)
