from django.urls import path

from backend.api_gateway.ping.views import ping

urlpatterns = [
    path('', ping, name='ping'),
]
