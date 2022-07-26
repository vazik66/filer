import secrets
from datetime import datetime, timedelta

import aiosqlite
from marshmallow import Schema, fields

from filer import crud_pack
from utils.utils import hash_password


class PackCreateSchema(Schema):
    password = fields.Str(required=False, validate=lambda val: len(val) > 4, missing=None)
    max_views = fields.Int(required=False, validate=lambda val: val > 0, missing=10000)
    time_to_live = fields.Int(required=False, validate=lambda val: val in (7, 14, 30), missing=7)


class PackCreate:
    def __init__(self, password: str | None, max_views: int, time_to_live: int, db: aiosqlite.Connection) -> None:
        self.key = self.__generate_key(db)
        self.password = hash_password(password) if password else None
        self.max_views = max_views
        self.time_to_live = datetime.utcnow() + timedelta(days=time_to_live)

    @staticmethod
    async def __generate_key(db) -> str:
        key = secrets.token_urlsafe(5)
        while _ := await crud_pack.get(db, key):
            key = secrets.token_urlsafe(5)
        return key


class Pack:
    def __init__(self, key: str, password: str | None, max_views: int, time_to_live: int) -> None:
        self.key = key
        self.password = password
        self.max_views = max_views
        self.time_to_live = time_to_live
