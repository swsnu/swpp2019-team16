from backend.user_service.user.domain.rider import Rider
from backend.carpool_request_service.carpool_request.domain.carpool_request \
    import CarpoolRequest, CarpoolRequestSerializer
from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.common.command.group_create_command import GroupCreateCommand


class CarpoolRequestApplicationService():
    def create(self, from_location, to_location, minimum_passenger, rider_id):
        try:
            rider = Rider.objects.get(pk=rider_id)
        except KeyError as e:
            print('No such rider exists')
            return e

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

        if len(same_location_requests) == 4:
            target_request = same_location_requests
            rider_id_list = []
            for i in range(4):
                rider_id_list.append(target_request.values()[i]['rider_id'])
            target_request.delete()
            command = GroupCreateCommand(
                rider_id_list=rider_id_list,
                from_location=from_location,
                to_location=to_location
            )
            RedisMessagePublisher().publish_message(command)
        return CarpoolRequestSerializer(result).data

    def delete(self, request_id):
        return CarpoolRequest.objects.filter(pk=request_id).delete()

    def get(self, request_id):
        result = CarpoolRequest.objects.get(pk=request_id)
        return CarpoolRequestSerializer(result).data
