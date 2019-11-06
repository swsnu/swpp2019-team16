from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class UserLoginCommandHandler(implements(MessageHandler)):

    def __init__(self, user_application_service):
        self.__user_application_service = user_application_service

    def handle(self, message):
        if message.email is None or message.password is None or message.user_type is None or \
                    message.request is None:
            raise ValueError("Invalid UserLogin command parameters")

        self.__user_application_service.login(
            email=message.email, password=message.password,
            user_type=message.user_type, request=message.request)
