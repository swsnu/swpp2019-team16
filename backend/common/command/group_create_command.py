from .command import Command

GROUP_CREATE_COMMAND = 'command.group_create'


class GroupCreateCommand(Command):

    def __init__(self, rider_id_list, from_location, to_location):
        super().__init__(GROUP_CREATE_COMMAND)
        self._rider_id_list = rider_id_list
        self._from_location = from_location
        self._to_location = to_location

    @property
    def rider_id_list(self):
        return self._rider_id_list

    @property
    def from_location(self):
        return self._from_location

    @property
    def to_location(self):
        return self._to_location

    def __str__(self):
        return 'rider_id_list={},from_location={},to_location={}'.format(
            self._rider_id_list, self._from_location, self._to_location)
