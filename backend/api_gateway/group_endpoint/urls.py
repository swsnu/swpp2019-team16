from django.urls import path

from backend.api_gateway.group_endpoint.views import group, update_driver, update_cost

urlpatterns = [
    path('', group, name='group'),
    path('<int:group_id>', update_driver, name='update_driver'),
    path('<int:group_id>/cost', update_cost, name='update_cost'),
]
