from .command import Command

GROUP_CREATE_COMMAND = 'command.group_create'


class GroupCreateCommand(Command):

    def __init__(self, from_location, to_location, rider_id_list):
        super().__init__(GROUP_CREATE_COMMAND)
        self._from_location = from_location
        self._to_location = to_location
        self._rider_id_list = rider_id_list

    @property
    def from_location(self):
        return self._from_location

    @property
    def to_location(self):
        return self._to_location

    @property
    def rider_id_list(self):
        return self._rider_id_list

    def __str__(self):
        return 'rider_number={},from={},to={}'.format(
            len(self._rider_id_list), self._from_location, self._to_location)
