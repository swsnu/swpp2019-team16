from django.db import models


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
