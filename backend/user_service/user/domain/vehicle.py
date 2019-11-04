from django.db import models


class Vehicle(models.Model):

    class Meta:
        app_label = 'user'

    car_type = models.CharField(max_length=255)
    plate = models.CharField(max_length=255)

    def __str__(self):
        return 'car_type={},plate={}'.format(self.car_type, self.plate)

    def __eq__(self, other):
        if type(self) is not type(other):
            return NotImplemented
        return \
            self.car_type == other.car_type and \
            self.plate == other.plate
