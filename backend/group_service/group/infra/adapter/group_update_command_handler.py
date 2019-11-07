from interface import implements 
from backend.common.messaging.message_handler import MessageHandler

class GroupUpdateCommandHandler(implements(MessageHandler)):

    def __init__(self, group_application_service):
        self.__group_application_service = group_application_service

    def handle(self, message):
        if message.group_id is None or message.driver_id is None:
            raise ValueError("Invalid GroupCreate command parameters")

        self.__group_application_service.update_group(
            group_id=message.group_id, driver_id=message.driver_id)
            

        