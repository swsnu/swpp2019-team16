from django.db import models

from backend.user_service.user.domain.user import User
from backend.group_service.group.domain.group import Group

class Rider(models.Model):
    class Meta:
        app_label = 'user'

    status = models.CharField(max_length=255)
    group = models.ForeignKey(
        'group.Group',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        if self.group is None:
            return 'user_id={}'.format(self.user.id)
        else:
            return 'user_id={},group_id={}'.format(self.user.id, self.group.id)