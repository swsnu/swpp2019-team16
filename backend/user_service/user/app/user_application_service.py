import logging

from django.contrib.auth import get_user_model

from backend.user_service.user.domain.vehicle import Vehicle
from backend.user_service.user.domain.driver import Driver
from backend.user_service.user.domain.rider import Rider
from backend.common.command.carpool_request_delete_command \
    import CarpoolRequestDeleteCommand
from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.carpool_request_service.carpool_request.domain.carpool_request \
    import CarpoolRequest


logger = logging.getLogger(__name__)


class UserApplicationService():

    def register(self, email, password, user_type, car_type, plate):
        vehicle = None
        if car_type is not None and plate is not None:
            vehicle = Vehicle.objects.create(car_type=car_type, plate=plate)

        return get_user_model().objects.create_user(
            email=email, password=password,
            user_type=user_type, vehicle=vehicle)

    def login(self, user_id):
        user = get_user_model().objects.get(id=user_id)
        user_type = user.user_type
        if user_type == "RIDER":
            if(len(Rider.objects.filter(user_id=user_id)) == 0):
                return Rider.objects.create(user=user, status="IDLE")
        elif user_type == "DRIVER":
            if(len(Driver.objects.filter(user_id=user_id)) == 0):
                return Driver.objects.create(user=user, status="IDLE")
        else:
            # user_type error handle
            return ValueError

    def logout(self, user_id):
        rider = Rider.objects.filter(user_id=user_id)
        if(len(rider) != 0):
            rider_id = rider.values()[0]['id']
            request = CarpoolRequest.objects.filter(rider_id=rider_id)
            if(len(request) != 0):
                request_id = request.values()[0]['id']
                command = CarpoolRequestDeleteCommand(request_id=request_id)
                RedisMessagePublisher().publish_message(command)
            rider.delete()
