from backend.common.event.domain_event import DomainEvent


DRIVER_GO_TAXI_EVENT = 'event.driver_go_taxi'


class DriverGoTaxiEvent(DomainEvent):
    def __init__(self, group_id, driver):
        super().__init__(DRIVER_GO_TAXI_EVENT, "v1")
        self._group_id = group_id
        self._driver = driver

    @property
    def group_id(self):
        return self._group_id

    @property
    def driver(self):
        return self._driver

    def __str__(self):
        return 'group_id={},driver={}'.format(
            self._group_id,
            self._driver)
