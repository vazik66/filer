import hashlib
from aiohttp import streamer
import os


@streamer
async def file_sender(writer, filename: str):
    with open(f'storage/{filename}', 'rb') as f:
        chunk = f.read(2 ** 16)
        while chunk:
            await writer.write(chunk)
            chunk = f.read(2 ** 16)


def delete_file(filename):
    os.remove(f'storage/{filename}.zip')


def hash_password(password: str):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()
