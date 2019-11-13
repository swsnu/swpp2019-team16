from interface import implements 
from backend.common.messaging.message_handler import MessageHandler

class GroupCreateCommandHandler(implements(MessageHandler)):

    def __init__(self, group_application_service):
        self.__group_application_service = group_application_service

    def handle(self, message):        
        print(message.from_location)
        print(message.to_location)
        if message.from_location is None or message.to_location is None:
            raise ValueError("Invalid GroupCreate command parameters")
        self.__group_application_service.create_group(
            from_location=message.from_location, 
            to_location=message.to_location)

        