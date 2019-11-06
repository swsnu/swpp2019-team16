from interface import implements

from backend.common.messaging.message_handler import MessageHandler


class PingCommandHandler(implements(MessageHandler)):

    def __init__(self, message_queue):
        self.__message_queue = message_queue

    def handle(self, message):
        self.__message_queue.put(message)
