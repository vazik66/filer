from aiohttp import web
from filer.routes import routes
from database import init

if __name__ == '__main__':
    app = web.Application()

    # Setup on startup functions
    app.cleanup_ctx.append(init)

    # Register routes
    app.router.add_routes(routes)

    # Run app
    web.run_app(app, host='localhost', port=8080)
