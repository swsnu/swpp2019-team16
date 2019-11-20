from django.urls import path

from backend.api_gateway.ping_endpoint.views import ping

urlpatterns = [
    path('', ping, name='ping'),
]
