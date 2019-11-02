from django.urls import path

from backend.api_gateway.user.views import register_user

urlpatterns = [
    path('register', register_user, name='register'),
]