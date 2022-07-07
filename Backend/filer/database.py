import sqlite3

import aiosqlite
import os
from logger import get_logger


db_path = 'database.db'
logger = get_logger('database')


async def init(app):
    logger.info("Initializing database")
    if not os.path.exists(db_path):
        logger.info("Database not exists. Creating")
        with open(db_path, 'w'):
            pass

    db = await aiosqlite.connect(db_path)

    create_tables_query = """
       CREATE TABLE IF NOT EXISTS url(
       uid VARCHAR(6) PRIMARY KEY UNIQUE NOT NULL,
       download_once BOOLEAN NOT NULL,
       save_for_n_weeks INTEGER
       );
       """

    with sqlite3.connect(db_path) as conn:
        cur = conn.cursor()
        cur.execute(create_tables_query)
        conn.commit()

    logger.info("Database created")
    app['DB'] = db
    yield
    await db.close()
