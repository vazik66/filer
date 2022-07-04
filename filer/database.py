from file import File

db = {}


def get_by_url_id(id: str) -> File | None:
    row = db.get(id)
    return row


def create(file: File) -> File:
    row = db.get(file.url_id)
    if row:
        raise BaseException("File with such id already exists")

    db[file.url_id] = file
    return file


def get_all() -> list[File]:
    return [v.json() for _, v in db.items()]
