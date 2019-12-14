import logging

from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

from backend.user_service.user.domain.vehicle import Vehicle
from backend.user_service.user.domain.driver import Driver, DriverSerializer
from backend.user_service.user.domain.rider import Rider, RiderSerializer
from backend.common.command.carpool_request_delete_command \
    import CarpoolRequestDeleteCommand
from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.carpool_request_service.carpool_request.domain.carpool_request \
    import CarpoolRequest
from backend.user_service.user.domain.user import UserSerializer
from backend.common.event.rider_on_taxi_event import RiderOnTaxiEvent
from backend.common.event.driver_go_taxi_event import DriverGoTaxiEvent

logger = logging.getLogger(__name__)


class UserApplicationService():

    def register(self, email, password, user_type, car_type, plate_no):
        vehicle = None

        if car_type is not None and plate_no is not None:
            vehicle = Vehicle.objects.create(car_type=car_type, plate_no=plate_no)
        
        user = get_user_model().objects.create_user(
            email=email, password=password,
            user_type=user_type, vehicle=vehicle)
        
        return UserSerializer(user).data

    def login(self, user_id):
        user_type = get_user_model().objects.get(id=user_id).user_type

        return self._create_rider_or_driver_if_not_exist(
            user_type=user_type,
            user_id=user_id
        )

    def _create_rider_or_driver_if_not_exist(self, user_type, user_id):
        factory = {
            'rider': self._create_rider_if_not_exist,
            'driver': self._create_driver_if_not_exist,
        }.get(user_type, ValueError)

        return factory(user_id)

    def _create_rider_if_not_exist(self, user_id):
        if len(Rider.objects.filter(user_id=user_id)) == 0:
            rider = Rider.objects.create(user_id=user_id, status="IDLE")
            return RiderSerializer(rider).data

        return RiderSerializer(Rider.objects.get(user_id=user_id)).data

    def _create_driver_if_not_exist(self, user_id):
        if len(Driver.objects.filter(user_id=user_id)) == 0:
            driver = Driver.objects.create(user_id=user_id, status="IDLE")
            return DriverSerializer(driver).data

        return DriverSerializer(Driver.objects.get(user_id=user_id)).data

    def logout(self, user_id):
        rider = Rider.objects.filter(user_id=user_id)
        if len(rider) != 0:
            rider_id = rider.values()[0]['id']
            request = CarpoolRequest.objects.filter(rider_id=rider_id)
            if len(request) != 0:
                request_id = request.values()[0]['id']
                command = CarpoolRequestDeleteCommand(request_id=request_id)
                RedisMessagePublisher().publish_message(command)
            rider.delete()

    def update_point(self, user_id, point):
        user = get_user_model().objects.get(pk=user_id)
        user.point = point
        user.save()
        return UserSerializer(user).data

    def rider_on_taxi(self, rider_id):
        try:
            rider = Rider.objects.get(pk=rider_id)
        except ObjectDoesNotExist:
            return ValueError('rider does not exist: {}'.format(rider_id))

        rider.status = 'ON_TAXI'
        rider.save()
        result = RiderSerializer(rider).data
        RedisMessagePublisher().publish_message(RiderOnTaxiEvent(
            group_id=rider.group.id,
            rider=result
        ))
        print('[UserService] rider on taxi: {}'.format(rider))
        return result

    def driver_go_taxi(self, driver_id):
        try:
            driver = Driver.objects.get(pk=driver_id)
        except ObjectDoesNotExist:
            return ValueError('drider does not exist: {}'.format(driver_id))

        driver.status = 'DRIVING'
        driver.save()
        result = DriverSerializer(driver).data
        RedisMessagePublisher().publish_message(DriverGoTaxiEvent(
            group_id=driver.group.id,
            driver=result
        ))
        print('[UserService] driver on taxi: {}'.format(driver))
        return result
