from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class DriverGoTaxiCommandHandler(implements(MessageHandler)):
    def __init__(self, user_application_service):
        self.__user_application_service = user_application_service

    def handle(self, message):
        print('[DriverGoTaxiCommandHandler]')
        if message.driver_id is None:
            return ValueError('Handling DriverGoTaxiCommandHandler error, driver_id is None')

        return self.__user_application_service.driver_go_taxi(
            driver_id=message.driver_id,
        )
