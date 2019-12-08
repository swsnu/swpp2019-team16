from .command import Command

GROUP_COST_UPDATE_COMMAND = 'command.group_cost_update'


class GroupCostUpdateCommand(Command):

    def __init__(self, group_id, cost):
        super().__init__(GROUP_COST_UPDATE_COMMAND)
        self._group_id = group_id
        self._cost = cost

    @property
    def group_id(self):
        return self._group_id

    @property
    def cost(self):
        return self._cost

    def __str__(self):
        return 'group_id={},cost={}'.format(
            self._group_id, self._cost)
