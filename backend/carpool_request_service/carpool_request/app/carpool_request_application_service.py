import logging


from backend.user_service.user.domain.rider import Rider
from backend.carpool_request_service.carpool_request.domain.carpool_request import CarpoolRequest
from backend.common.messaging.infra.adapter.redis.redis_message_publisher import RedisMessagePublisher
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
            target_request.delete()
            command = GroupCreateCommand(from_location=from_location, to_location=to_location)
            RedisMessagePublisher().publish_message(command)
            

        return result

    def delete(self, request_id):
        return CarpoolRequest.objects.filter(id=request_id).delete()

    def get(self, request_id):
        return CarpoolRequest.objects.get(id=request_id)
    ''' 
    def login(self, user_id, user_type):
        if user_type=="RIDER": 
            rider = Rider.objects.filter(user_id=user_id)
            if(len(rider)!=0):
                rider_id = rider.values()[0]['id']
                if(len(CarpoolRequest.objects.filter(rider_id=rider_id))==0)):
                    CarpoolRequest.objects.filter(rider_id=rider_id)

        elif user_type == "DRIVER":    
            
        else:
            return "USER_TYPE IS INVALID"
    '''
    