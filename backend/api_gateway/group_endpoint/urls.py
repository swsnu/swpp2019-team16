from django.urls import path

from backend.api_gateway.group_endpoint.views import create_group, update_group

urlpatterns = [
    path('create', create_group, name='create'),
    path('update', update_group, name='update'),
]
