from .base import *
import environ
from redis import ConnectionPool

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, 'env/.env.development'))

DEBUG = True

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

REDIS_CONNECTION_POOL = ConnectionPool(
    host=env('REDIS_HOST'), port=env('REDIS_PORT'), db=0)
