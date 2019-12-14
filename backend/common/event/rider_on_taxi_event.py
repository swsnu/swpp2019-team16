from backend.common.event.domain_event import DomainEvent


RIDER_ON_TAXI_EVENT = 'event.rider_on_taxi'


class RiderOnTaxiEvent(DomainEvent):
    def __init__(self, group_id, rider):
        super().__init__(RIDER_ON_TAXI_EVENT, "v1")
        self._group_id = group_id
        self._rider = rider

    @property
    def group_id(self):
        return self._group_id

    @property
    def rider(self):
        return self._rider

    def __str__(self):
        return 'group_id={},rider={}'.format(
            self._group_id,
            self._rider)
