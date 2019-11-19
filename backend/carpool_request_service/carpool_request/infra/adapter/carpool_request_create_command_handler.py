from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class CarpoolRequestCreateCommandHandler(implements(MessageHandler)):

    def __init__(self, carpool_request_application_service):
        self.__carpool_request_application_service = \
            carpool_request_application_service

    def handle(self, message):
        if message.from_location is None \
                or message.to_location is None \
                or message.minimum_passenger is None \
                or message.rider_id is None:
            raise ValueError("Invalid CarpoolRequestCreate command parameters")

        self.__carpool_request_application_service.create(
            from_location=message.from_location,
            to_location=message.to_location,
            minimum_passenger=message.minimum_passenger,
            rider_id=message.rider_id
        )
