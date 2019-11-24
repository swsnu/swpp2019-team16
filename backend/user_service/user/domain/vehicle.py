from django.db import models
from rest_framework import serializers


class Vehicle(models.Model):

    class Meta:
        app_label = 'user'

    car_type = models.CharField(max_length=255)
    plate_no = models.CharField(max_length=255)

    def __str__(self):
        return 'car_type={},plate_no={}'.format(self.car_type, self.plate_no)

    def __eq__(self, other):
        if type(self) is not type(other):
            return NotImplemented
        return \
            self.car_type == other.car_type and \
            self.plate_no == other.plate_no


class VehicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = ('car_type', 'plate_no')
        read_only_fields = ('car_type', 'plate_no')
