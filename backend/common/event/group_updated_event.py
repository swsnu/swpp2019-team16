from backend.common.event.domain_event import DomainEvent

GROUP_UPDATED_EVENT = 'event.group_updated'


class GroupCreatedEvent(DomainEvent):
    
    def __init__(self, driver):
        super().__init__(GROUP_UPDATED_EVENT, "v1")
        self._driver = driver
    
    @property
    def driver(self):
        return self._driver
    
   