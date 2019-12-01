from django.urls import path

from backend.api_gateway.group_endpoint.views import group, group_detail

urlpatterns = [
    path('', group, name='group'),
    path('<int:group_id>', group_detail, name='group_detail'),
]
