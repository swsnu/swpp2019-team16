import logging


from backend.user_service.user.domain.rider import Rider
from backend.carpool_request_service.carpool_request.domain.carpool_request import CarpoolRequest


class CarpoolRequestApplicationService():
    
    def create(self, from_location, to_location, minimum_passenger, request):
        
        rider = Rider.objects.get(user=request.user);
        return CarpoolRequest.objects.create(from_location=from_location, to_location=to_location, \
                                                minimum_passenger=minimum_passenger, rider=rider)
        