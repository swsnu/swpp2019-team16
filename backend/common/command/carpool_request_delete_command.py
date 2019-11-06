from .command import Command


CARPOOL_REQUEST_DELETE_COMMAND = 'command.carpool_request_delete'


class CarpoolRequestDeleteCommand(Command):

    def __init__(self, request):
        super().__init__(CARPOOL_REQUEST_DELETE_COMMAND)
        self._request = request

    @property
    def request(self):
        return self._request

    def __str__(self):
        return 'user_id={}'.format(self._request.user.id)