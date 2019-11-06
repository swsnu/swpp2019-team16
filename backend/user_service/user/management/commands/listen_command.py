import asyncio
import signal
import functools

from django.core.management import BaseCommand

from backend.user_service.user.infra.adapter.user_create_command_handler \
    import UserCreateCommandHandler
from backend.user_service.user.infra.adapter.user_login_command_handler \
    import UserLoginCommandHandler
from backend.user_service.user.app.user_application_service \
    import UserApplicationService
from backend.common.messaging.infra.adapter.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.command.user_create_command \
    import USER_CREATE_COMMAND
from backend.common.command.user_login_command \
    import USER_LOGIN_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_server \
    import RedisRpcServer


class Command(BaseCommand):

    user_application_service = UserApplicationService()
    user_create_command_handler = UserCreateCommandHandler(
        user_application_service=user_application_service)
    user_login_command_handler = UserLoginCommandHandler(
        user_application_service=user_application_service)
    subscriber = RedisMessageSubscriber()
    rpc_server = RedisRpcServer()

    def register_signal_handler(self, loop):
        for signame in ('SIGINT', 'SIGTERM'):
            loop.add_signal_handler(
                getattr(signal, signame),
                functools.partial(asyncio.ensure_future,
                                  self.shutdown(signame, loop)))

    def login_signal_handler(self, loop):
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
            user_create_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=USER_CREATE_COMMAND,
                    message_handler=self.user_create_command_handler))

            user_create_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=USER_CREATE_COMMAND,
                    request_handler=self.user_create_command_handler))

            user_login_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=USER_LOGIN_COMMAND,
                    message_handler=self.user_login_command_handler))

            user_login_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=USER_LOGIN_COMMAND,
                    request_handler=self.user_login_command_handler))
        
            """
            wait until application stop
            """
            await asyncio.gather(
                user_create_subscription_task,
                user_create_rpc_task,
                user_login_subscription_task,
                user_login_rpc_task,
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
