from aiohttp import web
from filer.routes import routes


if __name__ == '__main__':
    app = web.Application()

    # Register routes
    app.router.add_routes(routes)

    # Run app
    web.run_app(app, host='localhost', port=8080)
