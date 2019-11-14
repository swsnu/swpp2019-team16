from .command import Command


USER_LOGIN_COMMAND = 'command.user_login'


class UserLoginCommand(Command):

    def __init__(self, user_id):
        super().__init__(USER_LOGIN_COMMAND)
        self._user_id = user_id

    @property
    def user_id(self):
        return self._user_id

    def __str__(self):
        return 'user_id={}'.format(self._user_id)
