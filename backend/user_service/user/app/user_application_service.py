import logging

from django.contrib.auth import get_user_model

from backend.user_service.user.domain.vehicle import Vehicle


logger = logging.getLogger(__name__)


class UserApplicationService():

    def register(self, email, password, car_type, plate):
        vehicle = None
        if car_type is not None and plate is not None:
            vehicle = Vehicle.objects.create(car_type=car_type, plate=plate)

        get_user_model().objects.create_user(
            email=email, password=password, vehicle=vehicle)

