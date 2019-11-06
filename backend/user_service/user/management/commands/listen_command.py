import asyncio

from django.core.management import BaseCommand

from backend.user_service.user.infra.adapter.user_create_command_handler \
    import UserCreateCommandHandler
from backend.user_service.user.app.user_application_service \
    import UserApplicationService
from backend.common.messaging.infra.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.command.user_create_command \
    import USER_CREATE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_server \
    import RedisRpcServer
from backend.common.utils.signal_handler import register_signal_handler, shutdown_process


class Command(BaseCommand):

    user_application_service = UserApplicationService()
    user_create_command_handler = UserCreateCommandHandler(
        user_application_service=user_application_service)
    subscriber = RedisMessageSubscriber()
    rpc_server = RedisRpcServer()

    def handle(self, *args, **options):
        loop = asyncio.get_event_loop()

        register_signal_handler(loop, shutdown_process)

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
            """
            wait until application stop
            """
            await asyncio.gather(
                user_create_subscription_task,
                user_create_rpc_task,
            )

        loop.create_task(main())
        loop.run_forever()

