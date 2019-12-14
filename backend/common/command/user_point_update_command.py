from .command import Command


USER_POINT_UPDATE_COMMAND = 'command.user_point_update'


class UserPointUpdateCommand(Command):

    def __init__(self, user_id, point):
        super().__init__(USER_POINT_UPDATE_COMMAND)
        self._user_id = user_id
        self._point = point

    @property
    def user_id(self):
        return self._user_id

    @property
    def point(self):
        return self._point

    def __str__(self):
        return 'user_id={},point={}'.format(self._user_id, self._point)
