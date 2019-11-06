from redis import ConnectionPool

from .base import *
import environ

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, 'env/.env.development'))

DEBUG = True

GRPC_SERVER_PORT = env('GRPC_SERVER_PORT')

REDIS_CONNECTION_POOL = ConnectionPool(
    host=env('REDIS_HOST'), port=env('REDIS_PORT'), db=0)
