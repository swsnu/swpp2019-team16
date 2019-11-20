from django.urls import path

from backend.api_gateway.group_endpoint.views import group

urlpatterns = [
    path('', group, name='group'),
]
