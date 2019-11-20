import logging

from backend.group_service.group.domain.group import Group
from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.common.event.group_created_event \
    import GroupCreatedEvent

logger = logging.getLogger(__name__)


class GroupApplicationService:
    def create_group(self, rider_id_list, from_location, to_location):
        print("created group")
        myGroup = Group.objects.create(
            from_location=from_location,
            to_location=to_location)
        event = GroupCreatedEvent(
            rider_id_list=rider_id_list,
            from_location=from_location,
            to_location=to_location)
        RedisMessagePublisher().publish_message(event)
        return myGroup

    def update_group(self, group_id, driver_id):
        myGroup = Group.objects.get(id=group_id)
        myGroup.driver_id = driver_id
        return myGroup
