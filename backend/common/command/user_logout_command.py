from .command import Command


USER_LOGOUT_COMMAND = 'command.user_logout'


class UserLogoutCommand(Command):

    def __init__(self, user_id):
        super().__init__(USER_LOGOUT_COMMAND)
        self._user_id = user_id

    @property
    def user_id(self):
        return self._user_id
        
    def __str__(self):
        return 'user_id={}'.format(self._user_id)
