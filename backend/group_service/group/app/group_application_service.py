import logging

from backend.group_service.group.domain.group import Group
from backend.user_service.user.domain.rider import Rider
from backend.user_service.user.domain.driver import Driver


from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.common.event.group_created_event \
    import GroupCreatedEvent
from backend.common.event.group_updated_event \
    import GroupUpdatedEvent

logger = logging.getLogger(__name__)


class GroupApplicationService:
    def create_group(self, rider_id_list, from_location, to_location):
        myGroup = Group.objects.create(
            from_location=from_location,
            to_location=to_location)
        for i in range(len(rider_id_list)):
            rider = Rider.objects.get(id=rider_id_list[i])
            rider.group = myGroup
            rider.save()
        event = GroupCreatedEvent(
            group_id=myGroup.id,
            rider_id_list=rider_id_list,
            from_location=from_location,
            to_location=to_location)
        RedisMessagePublisher().publish_message(event)
        return myGroup

    def update_group(self, group_id, driver_id):
        myGroup = Group.objects.get(id=group_id)
        myGroup.driver_id = driver_id
        myGroup.save()
        driver = Driver.objects.get(id=driver_id)
        driver.group = myGroup
        driver.save()

        event = GroupUpdatedEvent(driver_id=driver_id)
        RedisMessagePublisher().publish_message(event)
        return myGroup
