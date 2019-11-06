from .base import *
import environ

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, 'env/.env.development'))

DEBUG = True

GRPC_SERVER_PORT = env('GRPC_SERVER_PORT')
