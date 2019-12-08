from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class UserPointUpdateCommandHandler(implements(MessageHandler)):

    def __init__(self, user_application_service):
        self.__user_application_service = user_application_service

    def handle(self, message):
        if message.user_id is None or message.point is None:
            raise ValueError("Invalid UserCreate command parameters")

        return self.__user_application_service.point(
            user_id=message.user_id, point=message.point)
