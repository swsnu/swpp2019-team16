import logging


from backend.user_service.user.domain.rider import Rider
from backend.carpool_request_service.carpool_request.domain.carpool_request import CarpoolRequest
from backend.common.rpc.infra.adapter.redis.redis_rpc_client import RedisRpcClient
from backend.common.command.group_create_command import GroupCreateCommand, GROUP_CREATE_COMMAND


class CarpoolRequestApplicationService():
    
    def create(self, from_location, to_location, minimum_passenger, rider_id):
        rider = Rider.objects.get(id=rider_id)
        result = CarpoolRequest.objects.create(from_location=from_location, to_location=to_location, \
                                                minimum_passenger=minimum_passenger, rider=rider)
    
        hold_request = CarpoolRequest.objects.filter(status="IDLE")
        same_location_request = hold_request.filter(from_location=result.from_location).filter(to_location=result.to_location)
        if len(same_location_request) == 4:
            target_request = same_location_request
            rider_id_list = list(map(lambda x: x.rider.id , target_request))
            from_location = target_request[0].from_location
            to_location = target_request[0].to_location
            command = GroupCreateCommand(rider_id_list=rider_id_list, from_location=from_location, to_location=to_location)
            
            '''
            result = RedisRpcClient().call(GROUP_CREATE_COMMAND, command)
            if result.result is None:
                target_request.delete()
            '''
            

        return result

    def delete(self, request_id):
        return CarpoolRequest.objects.filter(id=request_id).delete()

    def get(self, rider_id):
        rider = Rider.objects.get(id=rider_id)
        return CarpoolRequest.objects.filter(rider=rider)

