from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class CarpoolRequestDeleteCommandHandler(implements(MessageHandler)):

    def __init__(self, carpool_request_application_service):
        self.__carpool_request_application_service = \
            carpool_request_application_service

    def handle(self, message):
        if message.request_id is None:
            raise ValueError("Invalid CarpoolRequestCreate command parameters")

        self.__carpool_request_application_service.delete(
            request_id=message.request_id
        )
