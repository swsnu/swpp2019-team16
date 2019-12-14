import logging
import math

from backend.group_service.group.domain.group import Group, GroupSerializer
from backend.user_service.user.domain.rider import Rider
from backend.user_service.user.domain.driver import Driver


from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.common.event.group_created_event \
    import GroupCreatedEvent
from backend.common.event.group_driver_updated_event \
    import GroupDriverUpdatedEvent
from backend.common.event.group_cost_updated_event \
    import GroupCostUpdatedEvent

logger = logging.getLogger(__name__)


class GroupApplicationService:
    def create_group(self, rider_id_list, from_location, to_location):
        group = Group.objects.create(
            from_location=from_location,
            to_location=to_location)

        for i in range(len(rider_id_list)):
            rider = Rider.objects.get(pk=rider_id_list[i])
            rider.group = group
            rider.save()

        event = GroupCreatedEvent(
            group_id=group.id,
            rider_id_list=rider_id_list,
            from_location=from_location,
            to_location=to_location)

        print('group created: {}'.format(event))
        RedisMessagePublisher().publish_message(event)
        return GroupSerializer(group).data

    def driver_update_group(self, group_id, driver_id):
        group = Group.objects.get(pk=group_id)
        group.driver_id = driver_id
        group.save()
        driver = Driver.objects.get(pk=driver_id)
        driver.group = group
        driver.save()

        event = GroupDriverUpdatedEvent(
            group_id=group.id,
            driver_id=driver_id,
            rider_id_list=list(map(
                lambda rider: rider.id,
                Rider.objects.filter(group_id=group_id))),
            from_location=group.from_location,
            to_location=group.to_location,
        )

        print('group driver updated: {}'.format(event))
        RedisMessagePublisher().publish_message(event)
        return GroupSerializer(group).data

    def cost_update_group(self, group_id, cost):
        group = Group.objects.get(pk=group_id)
        group.cost = cost
        group.save()
        
        rider_id_list = list(map(lambda rider: rider.id, \
                Rider.objects.filter(group_id=group_id)))

        rider_cost = math.ceil(cost / len(rider_id_list) / 100)*100;

        event = GroupCostUpdatedEvent(
            group_id=group.id,
            rider_id_list=rider_id_list,
            total_cost=cost,
            rider_cost=rider_cost,
        )

        print('group cost updated: {}'.format(event))
        RedisMessagePublisher().publish_message(event)
        return GroupSerializer(group).data