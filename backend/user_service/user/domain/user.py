from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from rest_framework import serializers

from backend.user_service.user.domain.vehicle import Vehicle, VehicleSerializer


class UserManager(BaseUserManager):

    def create_user(self, email, password, user_type, vehicle=None, **extra_fields):
        if not email:
            raise ValueError('User must have an email address')
        if user_type != 'rider' and user_type != 'driver':
            raise ValueError('UserType must be either driver or rider')

        user = self.model(
            email=self.normalize_email(email),
            user_type=user_type,
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
    point = models.IntegerField(default=5000)
    user_type = models.CharField(max_length=127)
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
            return 'email={},user_type={},point={}'\
                .format(self.email, self.user_type, self.point)
        else:
            return 'email={},user_type={},point={},vehicle={}'\
                .format(self.email, self.user_type, self.point, self.vehicle)


class UserSerializer(serializers.ModelSerializer):

    vehicle = VehicleSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'user_type', 'vehicle', 'point')
        read_only_fields = ('id', 'email', 'user_type')
