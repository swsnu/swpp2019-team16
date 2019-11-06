from .command import Command

GROUP_CREATE_COMMAND = 'command.group_create'

class GroupCreateCommand(Command):

    def __init__(self, riders, from_location, to_location):
        super().__init__(GROUP_CREATE_COMMAND)
        self._riders = riders
        self._from_location = from_location
        self._to_location = to_location

    @property
    def riders(self):
        return self._riders

    @property
    def from_location(self):
        return self._from_location
    @property
    def to_location(self):
        return self._to_location

    def __str__(self):
        return 'riders={},from_location={},to_location={}'.format(
            self._riders, self._from_location, self._to_location)

    
