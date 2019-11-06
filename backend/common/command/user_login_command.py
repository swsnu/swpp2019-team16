from .command import Command


USER_LOGIN_COMMAND = 'command.user_login'


class UserLoginCommand(Command):

    def __init__(self, email, password, user_type, request):
        super().__init__(USER_LOGIN_COMMAND)
        self._email = email
        self._password = password
        self._user_type = user_type
        self._request = request

    @property
    def email(self):
        return self._email

    @property
    def password(self):
        return self._password

    @property
    def user_type(self):
        return self._user_type
    

    @property
    def request(self):
        return self._request
        
    def __str__(self):
        return 'email={},password={},user_type={}' \
            .format(self._email, self._password, self._user_type)
