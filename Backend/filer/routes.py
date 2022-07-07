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

    async with db.execute("SELECT uid, download_once, save_for_n_weeks FROM url WHERE uid=$1;",
                          [uid]) as cur:
        row = await cur.fetchone()
        if row is None:
            raise web.HTTPNoContent

    # TODO: Check if row[1] is true, then delete it from db, and from os (bg task)

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
    db = request.app['DB']
    file_options = File()
    zip_archive = zipfile.ZipFile(f'storage/{file_options.uid}.zip', 'w')

    # For each file in multipart data saves it to tmp directory, then creates zip from all files;
    # Check params in multipart and applies them to file_options
    async for field in (await request.multipart()):
        if field.name == 'file':
            file_path = f'storage/tmp/{file_options.uid}_{field.filename}'
            size = 0

            with open(file_path, 'wb') as f:
                while True:
                    chunk = await field.read_chunk()
                    if not chunk:
                        break
                    size += len(chunk)
                    f.write(chunk)

            zip_archive.write(file_path, arcname=field.filename)
            os.remove(file_path)

        if field.name == 'params':
            p = await field.read(decode=True)
            p = p.decode('utf-8')

            if p == 'save_for_1_weeks':
                file_options.save_for_n_weeks = 1
                file_options.download_once = False

            if p == 'save_for_2_weeks':
                file_options.save_for_n_weeks = 2
                file_options.download_once = False

    zip_archive.close()

    await db.execute(
            "INSERT INTO url (uid, download_once, save_for_n_weeks) VALUES ($1, $2, $3);",
            [file_options.uid, file_options.download_once, file_options.save_for_n_weeks]
    )
    await db.commit()

    return web.json_response({"uid": file_options.uid})


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


# Admin method
@routes.delete('/{uid}')
async def delete_url(request: web.Request) -> web.Response:
    uid = request.match_info['uid']
    db = request.app['DB']

    async with db.execute("SELECT uid, download_once, save_for_n_weeks FROM url WHERE uid=$1;",
                          [uid]) as cur:
        row = await cur.fetchone()
        if row is None:
            raise web.HTTPNoContent

    async with db.execute("DELETE FROM URL WHERE uid=$1;", [uid]) as cur:
        _ = await cur.fetchone()
    await db.commit()

    os.remove(f'storage/{row[0]}.zip')

    return web.json_response({"status": "deleted"})


@streamer
async def file_sender(writer, filename: str):
    with open(f'storage/{filename}', 'rb') as f:
        chunk = f.read(2 ** 16)
        while chunk:
            await writer.write(chunk)
            chunk = f.read(2 ** 16)
