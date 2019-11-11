from django.urls import path

from backend.api_gateway.user_endpoint.views import register_user
from backend.api_gateway.user_endpoint.views import logout_user
from backend.api_gateway.user_endpoint.views import login_user


urlpatterns = [
    path('register', register_user, name='register'),
    path('login', login_user, name='login'),
    path('logout', logout_user, name='logout'),
]
