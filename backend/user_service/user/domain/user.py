from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin

from backend.user_service.user.domain.vehicle import Vehicle


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, vehicle=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            vehicle=vehicle,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        # TODO: emit user created event

        return user


class User(AbstractBaseUser, PermissionsMixin):

    class Meta:
        app_label = 'user'

    email = models.EmailField(max_length=255, unique=True)
    point = models.IntegerField(default=0)
    vehicle = models.ForeignKey(
        Vehicle,
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        if self.vehicle is None:
            return 'email={},point={}'.format(self.email, self.point)
        else:
            return 'email={},point={},vehicle={}'.format(self.email, self.point, self.vehicle)

