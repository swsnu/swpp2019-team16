from backend.common.event.domain_event import DomainEvent

GROUP_DRIVER_UPDATED_EVENT = 'event.group_driver_updated'


# TODO: add test cases
class GroupDriverUpdatedEvent(DomainEvent):

    def __init__(self, group_id, driver, rider_list, from_location, to_location):
        super().__init__(GROUP_DRIVER_UPDATED_EVENT, "v1")
        self._group_id = group_id
        self._driver = driver
        self._rider_list = rider_list
        self._from_location = from_location
        self._to_location = to_location

    @property
    def group_id(self):
        return self._group_id

    @property
    def driver(self):
        return self._driver

    @property
    def rider_list(self):
        return self._rider_list

    @property
    def from_location(self):
        return self._from_location

    @property
    def to_location(self):
        return self._to_location

    def __str__(self):
        return 'group_id={},driver={},rider_list={},from_location={},to_location={}'.format(
            self._group_id,
            self._driver,
            self._rider_list,
            self._from_location,
            self._to_location
        )
