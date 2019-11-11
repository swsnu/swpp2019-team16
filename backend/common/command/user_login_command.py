from .command import Command


USER_LOGIN_COMMAND = 'command.user_login'


class UserLoginCommand(Command):

    def __init__(self, user_id, user_type):
        super().__init__(USER_LOGIN_COMMAND)
        self._user_id = user_id
        self._user_type = user_type


    @property
    def user_id(self):
        return self._user_id 

    @property
    def user_type(self):
        return self._user_type
    
    def __str__(self):
        return 'user_id={},user_type={}' \
            .format(self._user_id, self._user_type)
