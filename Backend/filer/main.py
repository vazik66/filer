from aiohttp import web
from routes import routes
from utils.settings import Settings
from database import init
from aiohttp_middlewares import cors_middleware

if __name__ == '__main__':
    app = web.Application(middlewares=[
        cors_middleware(origins=["http://localhost:3000"])
    ])

    app['cfg'] = Settings()
    # Setup on startup functions
    app.cleanup_ctx.append(init)

    # Register routes
    app.router.add_routes(routes)

    # Run app
    web.run_app(app, host='localhost', port=8080)
