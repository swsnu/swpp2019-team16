from django.db import models

from backend.user_service.user.domain.user import User
from backend.group_service.group.domain.group import Group

class Driver(models.Model):
    class Meta:
        app_label = 'user'

    status = models.CharField(max_length=255)
    group = models.ForeignKey(
        'group.Group',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
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
            return 'user_id={}'.format(self.user.id)
        else:
            return 'user_id={},group={}'.format(self.group.id)
  