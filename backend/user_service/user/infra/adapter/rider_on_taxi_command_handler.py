from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class RiderOnTaxiCommandHandler(implements(MessageHandler)):
    def __init__(self, user_application_service):
        self.__user_application_service = user_application_service

    def handle(self, message):
        if message.rider_id is None:
            return ValueError('Handling RiderOnTaxiCommand error, rider_id is None')

        return self.__user_application_service.rider_on_taxi(
            rider_id=message.rider_id,
        )
