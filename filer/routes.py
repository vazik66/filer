from aiohttp import web
from filer import database
from filer.file import File
from logger import get_logger

routes = web.RouteTableDef()
logger = get_logger()


@routes.get('/{id}')
async def get_file_by_id(request: web.Request) -> web.Response:
    logger.info(request.items())
    id = request.match_info['id']
    file = database.get_by_url_id(id)
    return web.json_response(file.json())


@routes.post("/")
async def create_file(request: web.Request) -> web.Response:
    logger.info(request.items())
    payload = await request.json()
    print(payload)
    # file = payload.get['file']
    # params = payload.get['params']

    # Add params
    created_file = File()

    _ = database.create(created_file)
    logger.info(vars(created_file))
    return web.json_response({"url_id": created_file.url_id})


# Admin method
@routes.get('/')
async def get_all(request: web.Request) -> web.Response:
    logger.info(request.items())
    return web.json_response(database.get_all())
