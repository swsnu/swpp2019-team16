from django.urls import path

from backend.api_gateway.carpool_request_endpoint.views \
    import carpool_request

urlpatterns = [
    path('', carpool_request, name='carpool_request'),
]
