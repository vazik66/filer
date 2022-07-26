import aiosqlite
import os
from utils.logger import get_logger

logger = get_logger('database')


async def create_database(db_path: str):
    logger.info("Database does not exists. Creating...")

    with open(db_path, 'w'):
        pass

    create_tables_query = """
        CREATE TABLE pack(
        key VARCHAR(6) PRIMARY KEY,
        password TEXT,
        views INTEGER DEFAULT 0,
        max_views INTEGER,
        time_to_live DATETIME
        );
    """

    async with aiosqlite.connect(db_path) as db:
        await db.execute(create_tables_query)
        await db.commit()

    logger.info("Database created")


async def init(app):
    db_path = app['cfg'].db_path

    if not os.path.exists(db_path):
        await create_database(db_path)

    logger.info("Connecting to database...")
    db = await aiosqlite.connect(db_path)
    db.row_factory = aiosqlite.Row
    logger.info("Database connected.")

    app['db'] = db
    yield
    await db.close()
