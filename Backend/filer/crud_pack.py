from aiosqlite import Connection
from utils.logger import get_logger

logger = get_logger('DB_CRUD')


async def create(db: Connection, pack) -> bool:
    query = """INSERT INTO pack (key, password, max_views, time_to_live) VALUES ($1, $2, $3, $4);"""  # noqa
    try:
        await db.execute(query, [pack.key, pack.password, pack.max_views, pack.time_to_live])
        await db.commit()
    except Exception as e:
        logger.error(e)
        return False
    return True


async def get(db: Connection, key) -> dict | None:
    query = """SELECT key, password, views, max_views, time_to_live FROM pack WHERE key=$1;"""  # noqa
    try:
        async with db.execute(query, [key]) as cur:
            row = await cur.fetchone()
        return row
    except Exception as e:
        logger.error(e)
        return None


async def update(db: Connection, views: int, key: str):
    query = """UPDATE pack SET views=$1 WHERE key=$2;"""  # noqa
    try:
        await db.execute(query, [views, key])
        await db.commit()
    except Exception as e:
        logger.error(e)
        return None
    return True


async def delete(db: Connection, key) -> bool:
    query = """DELETE FROM pack WHERE key=$1;"""  # noqa
    try:
        await db.execute(query, [key])
        await db.commit()
    except Exception as e:
        logger.error(e)
        return False
    return True


async def get_all(db: Connection) -> list | None:
    query = """SELECT key, password, views, max_views, time_to_live FROM pack;"""  # noqa
    try:
        async with db.execute(query) as cur:
            rows = await cur.fetchall()
        return rows
    except Exception as e:
        logger.error(e)
        return None
