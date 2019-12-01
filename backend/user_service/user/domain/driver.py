from django.db import models

from rest_framework import serializers
from backend.user_service.user.domain.user import User, UserSerializer


class Driver(models.Model):
    class Meta:
        app_label = 'user'

    status = models.CharField(max_length=255, default="IDLE")
    group = models.ForeignKey(
        'group.Group',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='driver_of_group'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    '''
    TODO
    location = models.ForeignKey(
        Location,
    )
    '''
    def __str__(self):
        if self.group is None:
            return 'id={},user_id={}'.format(self.id, self.user.id)
        else:
            return 'id={},user_id={},group={}'.format(self.id, self.user.id, self.group.id)


class DriverSerializer(serializers.ModelSerializer):

    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Driver
        fields = ('id', 'status', 'group', 'user')
        read_only_fields = ('id', 'status')
