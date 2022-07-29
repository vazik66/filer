from aiohttp import web
from routes import routes
from utils.settings import Settings
from database import init
from aiohttp_middlewares import cors_middleware
import redis

if __name__ == '__main__':
    app = web.Application(middlewares=[
        cors_middleware(origins=["http://localhost:3000"])
    ])

    app['cfg'] = Settings()
    # Setup on startup functions
    app.cleanup_ctx.append(init)  # Database
    app['redis'] = redis.StrictRedis(
            host=app['cfg'].redis_host,
            port=app['cfg'].redis_port,
            decode_responses=True,
            charset='utf-8'
    )

    # Register routes
    app.router.add_routes(routes)

    # Run app
    web.run_app(app, host=app['cfg'].app_host, port=app['cfg'].app_port)
