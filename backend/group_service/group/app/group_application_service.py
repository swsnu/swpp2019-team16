import logging

from backend.group_service.group.domain.group import Group
from backend.common.messaging.infra.redis.redis_message_publisher import RedisMessagePublisher
from backend.common.event.group_created_event import GroupCreatedEvent, GROUP_CREATED_EVENT

logger = logging.getLogger(__name__)

class GroupApplicationService:
    def create_group(self, from_location, to_location):

        print("created group")
        Group.objects.create(from_location=from_location, to_location=to_location)
        event = GroupCreatedEvent(from_location=from_location, to_location=to_location)
        RedisMessagePublisher().publish_message(event)
            
        return;

    def update_group(self, group_id, driver_id):
        myGroup = Group.objects.get(id=group_id)
        myGroup.driver_id = driver_id
        return myGroup

    
