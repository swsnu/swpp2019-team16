from .command import Command

GROUP_DRIVER_UPDATE_COMMAND = 'command.group_driver_update'


class GroupDriverUpdateCommand(Command):

    def __init__(self, group_id, driver_id):
        super().__init__(GROUP_DRIVER_UPDATE_COMMAND)
        self._group_id = group_id
        self._driver_id = driver_id

    @property
    def group_id(self):
        return self._group_id

    @property
    def driver_id(self):
        return self._driver_id

    def __str__(self):
        return 'group_id={},driver_id={}'.format(
            self._group_id, self._driver_id)
