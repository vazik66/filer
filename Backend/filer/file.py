import uuid
import secrets


class File:
    def __init__(self, download_once: bool = True, save_for_n_weeks: int = None):
        self.uuid = uuid.uuid4().hex
        self.url_id = secrets.token_urlsafe(6)
        self.file_path = None
        self.download_once = download_once
        self.save_for_n_weeks = save_for_n_weeks

    def json(self) -> dict:
        return vars(self)
