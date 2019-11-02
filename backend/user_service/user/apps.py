import sys

from django.apps import AppConfig


class UserConfig(AppConfig):
    name = 'user'

    def ready(self):
        from backend.user_service.user.infra.adapter.user_create_command_handler import UserCreateCommandHandler
        from backend.user_service.user.app.user_application_service import UserApplicationService
        from backend.common.messaging.infra.adapter.redis.redis_message_subscriber import RedisMessageSubscriber
        from backend.common.command.user_create_command import USER_CREATE_COMMAND

        if 'runserver' not in sys.argv:
            return True

        user_application_service = UserApplicationService()
        subscriber = RedisMessageSubscriber()
        subscriber.subscribe_message(
            topic=USER_CREATE_COMMAND,
            message_handler=UserCreateCommandHandler(
                user_application_service=user_application_service))
