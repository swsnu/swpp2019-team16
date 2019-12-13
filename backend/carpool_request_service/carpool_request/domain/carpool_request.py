from django.db import models
from rest_framework import serializers
from backend.user_service.user.domain.rider import RiderSerializer

class CarpoolRequest(models.Model):

    class Meta:
        app_label = 'carpool_request'

    status = models.CharField(max_length=255, default='IDLE')
    from_location = models.CharField(max_length=255, default='')
    to_location = models.CharField(max_length=255, default='')
    minimum_passenger = models.CharField(max_length=15, default='')

    rider = models.ForeignKey(
        'user.Rider',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return 'rider_id={},from={},to={}'\
            .format(self.rider_id, self.from_location, self.to_location)


class CarpoolRequestSerializer(serializers.ModelSerializer):

    rider = RiderSerializer(many=False, read_only=True)

    class Meta:
        model = CarpoolRequest
        fields = (
            'id', 'status', 'from_location',
            'to_location', 'minimum_passenger', 'rider'
        )
        read_only_fields = (
            'id', 'status', 'from_location',
            'to_location', 'minimum_passenger'
        )
