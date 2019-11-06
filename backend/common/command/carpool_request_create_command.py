from .command import Command


CARPOOL_REQUEST_CREATE_COMMAND = 'command.carpool_request_create'


class CarpoolRequestCreateCommand(Command):

    def __init__(self, from_location, to_location, minimumPassenger, request):
        super().__init__(CARPOOL_REQUEST_CREATE_COMMAND)
        self._from_location = from_location
        self._to = to_location
        self._minimumPassenger = minimumPassenger
        self._user_id = request.user.id

    @property
    def from_location(self):
        return self._from_location

    @property
    def to_location(self):
        return self._to_location

    @property
    def minimumPassenger(self):
        return self._minimumPassenger

    @property
    def _user_id(self):
        return self._user_id

    def __str__(self):
        return 'user_id={},from={},to={},minimumPassenger={}'.format(
            self._user_id, self._from_location, self._to_location, self._minimumPassenger)
