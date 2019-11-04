from .base import *
import environ

DEBUG = True

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, 'env/.env.development'))