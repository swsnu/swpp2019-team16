import time

from django.core.management import BaseCommand
from django.conf import settings
from redis import Redis


class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write('Waiting for Redis...')
        redis_client = None
        while not redis_client:
            try:
                redis_client = Redis(
                    connection_pool=settings.REDIS_CONNECTION_POOL)
            except Exception:
                self.stdout.write('Redis unavailable, waiting 1 second...')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Redis available!'))
