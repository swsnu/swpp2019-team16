import logging

from django.contrib.auth import get_user_model, logout, login, authenticate

from backend.user_service.user.domain.vehicle import Vehicle
from backend.user_service.user.domain.driver import Driver
from backend.user_service.user.domain.rider import Rider


logger = logging.getLogger(__name__)


class UserApplicationService():

    def register(self, email, password, car_type, plate):
        vehicle = None
        if car_type is not None and plate is not None:
            vehicle = Vehicle.objects.create(car_type=car_type, plate=plate)

        return get_user_model().objects.create_user(
            email=email, password=password, vehicle=vehicle)

    def login(self, email, password, user_type, request):
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            user = get_user_model().objects.get(username=email)
            if user_type == "RIDER":
                return Rider.objects.create(user=user, status="IDLE")
            elif user_type == "DRIVER":
                return Driver.objects.create(user=user, status="IDLE")
            else:
                #user_type error handle
                return "USER_TYPE ERROR"
        else:
            return "AUTHENTICATION ERROR"

    def logout(self, request):
        if request.user.is_authenticated:
            logout(request)
        else:
            return "LOGOUT ERROR"
