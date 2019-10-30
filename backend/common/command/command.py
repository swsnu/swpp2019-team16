from backend.common.messaging.message import Message
from backend.common.utils.time import monotonic_utc_now


class Command(Message):

    def __init__(self, type_name):
        super().__init__(type_name)
        self._occurred_on = monotonic_utc_now()

    @property
    def occurred_on(self):
        return self._occurred_on

    def __eq__(self, other):
        if type(self) is not type(other):
            return NotImplemented
        return \
            self.type_name == other.type_name and \
            self.occurred_on == other.occurred_on

    def __ne__(self, other):
        return not (self == other)

    def __hash__(self):
        return hash((self.type_name, self.occurred_on))
