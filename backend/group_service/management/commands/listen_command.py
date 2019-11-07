import asyncio
import signal
import functools

from django.core.management import BaseCommand

from backend.group_service.group.infra.adapter.group_create_command_handler \
    import GroupCreateCommandHandler
from backend.group_service.group.app.group_application_service \
    import groupApplicationService
from backend.common.messaging.infra.adapter.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.command.group_create_command \
    import GROUP_CREATE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_server \
    import RedisRpcServer


class Command(BaseCommand):

    group_application_service = groupApplicationService()
    group_create_command_handler = groupCreateCommandHandler(
        group_application_service=group_application_service)
    subscriber = RedisMessageSubscriber()
    rpc_server = RedisRpcServer()

    def register_signal_handler(self, loop):
        for signame in ('SIGINT', 'SIGTERM'):
            loop.add_signal_handler(
                getattr(signal, signame),
                functools.partial(asyncio.ensure_future,
                                  self.shutdown(signame, loop)))

    def handle(self, *args, **options):
        loop = asyncio.get_event_loop()

        self.register_signal_handler(loop)

        async def main():
            """
            create subscription tasks
            """
            group_create_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=GROUP_CREATE_COMMAND,
                    message_handler=self.group_create_command_handler))

            group_create_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=GROUP_CREATE_COMMAND,
                    request_handler=self.group_create_command_handler))
            """
            wait until application stop
            """
            await asyncio.gather(
                group_create_subscription_task,
                group_create_rpc_task,
            )

        loop.create_task(main())
        loop.run_forever()

    async def shutdown(self, sig, loop):
        print('caught {0}'.format(sig))
        tasks = [task for task in asyncio.Task.all_tasks() if task is not
                 asyncio.tasks.Task.current_task()]

        list(map(lambda task: task.cancel(), tasks))
        results = await asyncio.gather(*tasks, return_exceptions=True)

        print('finished awaiting cancelled tasks, results: {0}'
              .format(results))
        loop.stop()