from backend.user_service.user.domain.rider import Rider
from backend.carpool_request_service.carpool_request.domain.carpool_request \
    import CarpoolRequest
from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.common.command.group_create_command import GroupCreateCommand


SAME_LOCATION_REQUESTS_TO_MATCH = 2


class CarpoolRequestApplicationService():
    def create(self, from_location, to_location, minimum_passenger, rider_id):
        # TODO: handle NotFound exception
        rider = Rider.objects.get(pk=rider_id)

        result = CarpoolRequest.objects.create(
            from_location=from_location,
            to_location=to_location,
            minimum_passenger=minimum_passenger,
            rider=rider
        )

        hold_request = CarpoolRequest.objects.filter(status="IDLE")
        same_location_requests = hold_request\
            .filter(from_location=result.from_location)\
            .filter(to_location=result.to_location)
        print('[CarpoolRequestApplicationService] Carpool request created by rider: {}, {}, {}'
              .format(rider_id, from_location, to_location))
        if len(same_location_requests) >= SAME_LOCATION_REQUESTS_TO_MATCH:
            target_request = same_location_requests
            rider_id_list = []
            for i in range(SAME_LOCATION_REQUESTS_TO_MATCH):
                rider_id_list.append(target_request.values()[i]['rider_id'])
            target_request.delete()
            command = GroupCreateCommand(
                rider_id_list=rider_id_list,
                from_location=from_location,
                to_location=to_location
            )
            RedisMessagePublisher().publish_message(command)
            print('[CarpoolRequestApplicationService] Same location requests grouped: {}, {}, {}'
                  .format(rider_id_list, from_location, to_location))
        return result

    def delete(self, request_id):
        return CarpoolRequest.objects.filter(pk=request_id).delete()

    def get(self, request_id):
        return CarpoolRequest.objects.get(pk=request_id)
