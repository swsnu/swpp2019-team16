from queue import Queue


class MessageQueue:
    def __init__(self):
        self.__messages = Queue()

    def put(self, message):
        self.__messages.put(message)

    def get(self):
        return self.__messages.get(block=True)
