import logging


def get_logger(name: str = __name__) -> logging.Logger:
    logging.basicConfig(level=logging.DEBUG)
    return logging.getLogger(name)
