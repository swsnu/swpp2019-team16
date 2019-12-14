import asyncio

from django.core.management import BaseCommand

from backend.user_service.user.infra.adapter.user_create_command_handler \
    import UserCreateCommandHandler
from backend.user_service.user.infra.adapter.user_point_update_command_handler \
    import UserPointUpdateCommandHandler
from backend.user_service.user.infra.adapter.user_login_event_handler \
    import UserLoginEventHandler
from backend.user_service.user.infra.adapter.user_logout_event_handler \
    import UserLogoutEventHandler

from backend.user_service.user.app.user_application_service \
    import UserApplicationService
from backend.common.messaging.infra.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.command.user_create_command \
    import USER_CREATE_COMMAND
from backend.common.command.user_point_update_command \
    import USER_POINT_UPDATE_COMMAND
from backend.common.event.user_login_event \
    import USER_LOGIN_EVENT
from backend.common.event.user_logout_event \
    import USER_LOGOUT_EVENT
from backend.common.rpc.infra.adapter.redis.redis_rpc_server \
    import RedisRpcServer
from backend.common.utils.signal_handler \
    import register_signal_handler, shutdown_process


class Command(BaseCommand):
    user_application_service = UserApplicationService()
    user_point_update_command_handler = UserPointUpdateCommandHandler(
        user_application_service=user_application_service)
    user_create_command_handler = UserCreateCommandHandler(
        user_application_service=user_application_service)
    user_login_event_handler = UserLoginEventHandler(
        user_application_service=user_application_service)
    user_logout_event_handler = UserLogoutEventHandler(
        user_application_service=user_application_service
    )
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

            user_point_update_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=USER_POINT_UPDATE_COMMAND,
                    message_handler=self.user_point_update_command_handler))

            user_point_update_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=USER_POINT_UPDATE_COMMAND,
                    request_handler=self.user_point_update_command_handler))

            user_login_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=USER_LOGIN_EVENT,
                    message_handler=self.user_login_event_handler))

            user_login_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=USER_LOGIN_EVENT,
                    request_handler=self.user_login_event_handler))

            user_logout_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=USER_LOGOUT_EVENT,
                    message_handler=self.user_logout_event_handler))

            user_logout_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=USER_LOGOUT_EVENT,
                    request_handler=self.user_logout_event_handler))
            """
            wait until application stop
            """
            await asyncio.gather(
                user_create_subscription_task,
                user_create_rpc_task,
                user_point_update_subscription_task,
                user_point_update_rpc_task,
                user_login_subscription_task,
                user_login_rpc_task,
                user_logout_subscription_task,
                user_logout_rpc_task,
            )

        loop.create_task(main())
        loop.run_forever()
