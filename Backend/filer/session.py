import secrets


def generate_session_id(num_bytes:int = 16):
    return secrets.token_urlsafe()

