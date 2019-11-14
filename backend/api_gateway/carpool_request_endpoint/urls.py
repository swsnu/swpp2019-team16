from django.urls import path

from backend.api_gateway.carpool_request_endpoint.views \
    import create_carpool_request
from backend.api_gateway.carpool_request_endpoint.views \
    import delete_carpool_request

urlpatterns = [
    path('create', create_carpool_request, name='create_carpool_request'),
    path('cancel', delete_carpool_request, name='delete_carpool_request'),
]
