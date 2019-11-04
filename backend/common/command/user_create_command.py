from .command import Command


USER_CREATE_COMMAND = 'command.user_create'


class UserCreateCommand(Command):

    def __init__(self, email, password, car_type=None, plate=None):
        super().__init__(USER_CREATE_COMMAND)
        self._email = email
        self._password = password
        self._car_type = car_type
        self._plate = plate

    @property
    def email(self):
        return self._email

    @property
    def password(self):
        return self._password

    @property
    def car_type(self):
        return self._car_type

    @property
    def plate(self):
        return self._plate

    def __str__(self):
        return 'email={},password={},car_type={},plate={}'.format(
            self._email, self._password, self._car_type, self._plate)
