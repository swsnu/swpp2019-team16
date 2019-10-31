from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from backend.user_service.user.domain.user_manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
