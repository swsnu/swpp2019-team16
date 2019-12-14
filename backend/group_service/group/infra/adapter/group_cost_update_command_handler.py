from interface import implements
from backend.common.messaging.message_handler import MessageHandler


class GroupCostUpdateCommandHandler(implements(MessageHandler)):

    def __init__(self, group_application_service):
        self.__group_application_service = group_application_service

    def handle(self, message):
        if message.group_id is None or message.cost is None:
            raise ValueError("Invalid GroupCostUpdate command parameters")

        self.__group_application_service.cost_update_group(
            group_id=message.group_id, cost=message.cost)
