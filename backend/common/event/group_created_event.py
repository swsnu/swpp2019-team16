from backend.common.event.domain_event import DomainEvent

GROUP_CREATED_EVENT = 'event.group_created'


class GroupCreatedEvent(DomainEvent):
    
    def __init__(self, riders, from_location, to_location):
        super().__init__(GROUP_CREATED_EVENT, "v1")
        self._riders = riders
        self._from_location = from_location
        self._to_location = to_location
    
    @property
    def riders(self):
        return self._riders
    
    @property
    def from_location(self):
        return self._from_location
    
    @property
    def to_location(self):
        return self._to_location