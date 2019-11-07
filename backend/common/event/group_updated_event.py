from backend.common.event.domain_event import DomainEvent

GROUP_UPDATED_EVENT = 'event.group_updated'


class GroupCreatedEvent(DomainEvent):
    
    def __init__(self, driver_id):
        super().__init__(GROUP_UPDATED_EVENT, "v1")
        self._driver_id = driver_id
    
    @property
    def driver_id(self):
        return self._driver_id
    
   