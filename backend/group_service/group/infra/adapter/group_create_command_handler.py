from interface import implements
from backend.common.messaging.message_handler import MessageHandler


class GroupCreateCommandHandler(implements(MessageHandler)):

    def __init__(self, group_application_service):
        self.__group_application_service = group_application_service

    def handle(self, message):
        if message.from_location is None or message.to_location is None \
                or message.rider_id_list is None:
            raise ValueError("Invalid GroupCreate command parameters")
        self.__group_application_service.create_group(
            rider_id_list=message.rider_id_list,
            from_location=message.from_location,
            to_location=message.to_location)