from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class UserLoginCommandHandler(implements(MessageHandler)):

    def __init__(self, user_application_service):
        self.__user_application_service = user_application_service

    def handle(self, message):
        if message.user_id is None or message.user_type is None:
            raise ValueError("Invalid UserLogin command parameters")

        self.__user_application_service.login(
            user_id=message.user_id, user_type=message.user_type)
