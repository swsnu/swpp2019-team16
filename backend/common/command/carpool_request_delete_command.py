from .command import Command


CARPOOL_REQUEST_DELETE_COMMAND = 'command.carpool_request_delete'


class CarpoolRequestDeleteCommand(Command):

    def __init__(self, request_id):
        super().__init__(CARPOOL_REQUEST_DELETE_COMMAND)
        self._request_id = request_id

    @property
    def request_id(self):
        return self._request_id

    def __str__(self):
        return 'request_id={}'.format(self._request_id)
