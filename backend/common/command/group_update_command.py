from .command import Command

GROUP_UPDATE_COMMAND = 'command.group_update'

class GroupUpdateCommand(Command):

    def __init__(self, driver):
        super().__init__(GROUP_UPDATE_COMMAND)
        self._driver = driver

    @property
    def driver(self):
        return self._driver

    def __str__(self):
        return 'driver={}'.format(self._driver)

    