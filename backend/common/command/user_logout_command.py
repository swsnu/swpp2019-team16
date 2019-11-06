from .command import Command


USER_LOGOUT_COMMAND = 'command.user_logout'


class UserLogoutCommand(Command):

    def __init__(self, request):
        super().__init__(USER_LOGOUT_COMMAND)
        self._request = request

    @property
    def request(self):
        return self._request
        
    def __str__(self):
        return 'user={}'.format(self._request.user.username)
