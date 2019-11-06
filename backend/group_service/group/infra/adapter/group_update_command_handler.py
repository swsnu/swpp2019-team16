from interface import implements 
from backend.common.messaging.message_handler import MessageHandler

class GroupUpdateCommandHandler(implements(MessageHandler)):

    def __init__(self, group_application_service):
        self.__group_application_service = group_application_service

    def handle(self, message):
        if message.driver is None:
            raise ValueError("Invalid GroupCreate command parameters")

        self.group_application_service.updateGroup(driver=message.driver)
            

        