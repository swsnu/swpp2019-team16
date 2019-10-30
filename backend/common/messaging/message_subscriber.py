from interface import Interface


class MessageSubscriber(Interface):

    def subscribe_message(self, topic, message_handler):
        pass

    def close(self):
        pass
