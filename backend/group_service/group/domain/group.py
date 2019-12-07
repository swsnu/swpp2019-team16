from django.db import models
from rest_framework import serializers
from backend.user_service.user.domain.driver import DriverSerializer


class Group(models.Model):

    class Meta:
        app_label = 'group'

    driver = models.ForeignKey(
        'user.Driver',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='group_of_driver'
    )
    from_location = models.CharField(max_length=255, default="")
    to_location = models.CharField(max_length=255, default="")
    cost = models.IntegerField(default=0)
    departure = models.BooleanField(default=False)

    def __str__(self):
        return 'driver={},from_location={},\
                to_location={},cost={},departure={}'\
            .format(
                self.driver, self.from_location,
                self.to_location, self.cost, self.departure)


class GroupSerializer(serializers.ModelSerializer):

    driver = DriverSerializer(many=False, read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'driver', 'from_location', 'to_location', 'cost', 'departure')
        read_ony_fields = ('from_location', 'to_location', 'cost', 'departure')
