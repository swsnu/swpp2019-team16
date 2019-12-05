from backend.common.event.domain_event import DomainEvent

GROUP_UPDATED_EVENT = 'event.group_updated'


# TODO: add test cases
class GroupUpdatedEvent(DomainEvent):

    def __init__(self, group_id, driver_id, rider_id_list, from_location, to_location):
        super().__init__(GROUP_UPDATED_EVENT, "v1")
        self._group_id = group_id
        self._driver_id = driver_id
        self._rider_id_list = rider_id_list
        self._from_location = from_location
        self._to_location = to_location

    @property
    def group_id(self):
        return self._group_id

    @property
    def driver_id(self):
        return self._driver_id

    @property
    def rider_id_list(self):
        return self._rider_id_list

    @property
    def from_location(self):
        return self._from_location

    @property
    def to_location(self):
        return self._to_location

    def __str__(self):
        return 'group_id={},driver_id={},rider_id_list={},from_location={},to_location={}'.format(
            self._group_id,
            self._driver_id,
            self._rider_id_list,
            self._from_location,
            self._to_location
        )
