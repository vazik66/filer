import logging


def get_logger() -> logging.Logger:
    logging.basicConfig(level=logging.DEBUG)
    return logging.getLogger(__name__)
