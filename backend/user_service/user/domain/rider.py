from django.db import models

from backend.user_service.user.domain.user import User, UserSerializer
from rest_framework import serializers


class Rider(models.Model):
    class Meta:
        app_label = 'user'

    status = models.CharField(max_length=255, default="IDLE")
    group = models.ForeignKey(
        'group.Group',
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        if self.group is None:
            return 'user_id={},status={}'.format(self.user.id, self.status)
        else:
            return 'user_id={},group_id={},status={}'.format(
                self.user.id, self.group.id, self.status)


class RiderSerializer(serializers.ModelSerializer):

    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Rider
        fields = ('id', 'status', 'group', 'user')
        read_only_fields = ('id', 'status')
