from abc import ABCMeta
from .time import monotonic_utc_now


class DomainEvent(metaclass=ABCMeta):

    def __init__(self, version):
        self._occurred_on = monotonic_utc_now()
        self._version = version

    @property
    def version(self):
        return self._version

    @version.setter
    def version(self, val):
        raise AttributeError("Event version cannot be modified")

    @property
    def occurred_on(self):
        return self._occurred_on

    @occurred_on.setter
    def occurred_on(self, val):
        raise AttributeError("Event timestamp cannot be modified")

    def __eq__(self, other):
        if type(self) is not type(other):
            return NotImplemented
        return \
            self.version == other.version and \
            self.occurred_on == other.occurred_on

    def __ne__(self, other):
        return not (self == other)

    def __hash__(self):
        return hash((self.version, self.occurred_on))
