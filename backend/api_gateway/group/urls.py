from django.urls import path

from backend.api_gateway.group.views import create_user, update_user

urlpatterns = [
    path('create', create_user, name='create'),
    path('update', update_user, name='update'),
]
