import logging

from django.contrib.auth import get_user_model, logout, login, authenticate

from backend.user_service.user.domain.vehicle import Vehicle
from backend.user_service.user.domain.driver import Driver
from backend.user_service.user.domain.rider import Rider
from backend.common.command.carpool_request_delete_command import CarpoolRequestDeleteCommand, CARPOOL_REQUEST_DELETE_COMMAND
from backend.common.messaging.infra.adapter.redis.redis_message_publisher import RedisMessagePublisher
from backend.carpool_request_service.carpool_request.domain.carpool_request import CarpoolRequest


logger = logging.getLogger(__name__)


class UserApplicationService():

    def register(self, email, password, car_type, plate):
        vehicle = None
        if car_type is not None and plate is not None:
            vehicle = Vehicle.objects.create(car_type=car_type, plate=plate)

        return get_user_model().objects.create_user(
            email=email, password=password, vehicle=vehicle)

    def login(self, user_id, user_type):
        user = get_user_model().objects.get(id=user_id)
        if user_type == "RIDER":
            if(len(Rider.objects.filter(id=user_id))==0):
                Rider.objects.create(user=user, status="IDLE")
            return
        elif user_type == "DRIVER":
            if(len(Driver.objects.filter(id=user_id))==0):
                return Driver.objects.create(user=user, status="IDLE")
        else:
            #user_type error handle
            return "USER_TYPE ERROR"
        
    def logout(self, user_id):
        rider = Rider.objects.filter(user_id=user_id)
        if(len(rider)!=0):
            rider_id = rider.values()[0]['id']
            request = CarpoolRequest.objects.filter(rider_id=rider_id)
            if(len(request)!=0):
                request_id = request.values()[0]['id']
                command = CarpoolRequestDeleteCommand(request_id=request_id)
                RedisMessagePublisher().publish_message(command)
            rider.delete()

        #Driver.objects.filter(id=user_id).delete()
        
        '''
        rider = Rider.objects.get(id=rider_id)
        result = CarpoolRequest.objects.create(from_location=from_location, to_location=to_location, \
                                                minimum_passenger=minimum_passenger, rider=rider)
    
        hold_request = CarpoolRequest.objects.filter(status="IDLE")
        same_location_request = hold_request.filter(from_location=result.from_location).filter(to_location=result.to_location)
        if len(same_location_request) == 4:
            target_request = same_location_request
            target_request.delete()
            command = GroupCreateCommand(from_location=from_location, to_location=to_location)
            RedisMessagePublisher().publish_message(command)'''

        