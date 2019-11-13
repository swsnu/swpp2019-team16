from .command import Command


CARPOOL_REQUEST_CREATE_COMMAND = 'command.carpool_request_create'


class CarpoolRequestCreateCommand(Command):

    def __init__(self, from_location, \
                to_location, minimum_passenger, rider_id):
        super().__init__(CARPOOL_REQUEST_CREATE_COMMAND)
        self._from_location = from_location
        self._to_location = to_location
        self._minimum_passenger = minimum_passenger
        self._rider_id = rider_id

    @property
    def from_location(self):
        return self._from_location

    @property
    def to_location(self):
        return self._to_location

    @property
    def minimum_passenger(self):
        return self._minimum_passenger

    @property
    def rider_id(self):
        return self._rider_id

    def __str__(self):
        return 'rider_id={},from={},to={},minimum_passenger={}'.format(
            self._rider_id, self._from_location, \
            self._to_location, self._minimum_passenger)
