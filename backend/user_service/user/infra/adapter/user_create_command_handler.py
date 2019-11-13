from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class UserCreateCommandHandler(implements(MessageHandler)):

    def __init__(self, user_application_service):
        self.__user_application_service = user_application_service

    def handle(self, message):
        if message.email is None or message.user_type is None or \
                message.password is None:
            raise ValueError("Invalid UserCreate command parameters")

        self.__user_application_service.register(
            email=message.email, password=message.password,
            user_type=message.user_type, car_type=message.car_type,
            plate=message.plate)
