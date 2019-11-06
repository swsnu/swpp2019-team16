from .base import *
import environ
from redis import ConnectionPool

DEBUG = True

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, 'env/.env.development'))

REDIS_CONNECTION_POOL = ConnectionPool(
    host=env('REDIS_HOST'), port=env('REDIS_PORT'), db=0)