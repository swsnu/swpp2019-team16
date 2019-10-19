from .time import monotonic_utc_now
from .assertion_concern import AssertionConcern


class Notification(AssertionConcern):

    def __init__(self, notification_id, event, type_name, version):
        self._notification_id = notification_id
        self._event = event
        self._type_name = type_name
        self._occurred_on = monotonic_utc_now()
        self._version = version

    @property
    def notification_id(self):
        return self._notification_id

    @property
    def event(self):
        return self._event

    @property
    def type_name(self):
        return self._type_name

    @property
    def occurred_on(self):
        return self._occurred_on

    @property
    def version(self):
        return self._version
