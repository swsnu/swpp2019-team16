from abc import ABCMeta


class Message(metaclass=ABCMeta):

    def __init__(self, type_name):
        self._type_name = type_name

    @property
    def type_name(self):
        return self._type_name

    def __eq__(self, other):
        if type(self) is not type(other):
            return NotImplemented
        return self.type_name == other.type_name

    def __ne__(self, other):
        return not (self == other)
