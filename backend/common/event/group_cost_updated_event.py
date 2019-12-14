from backend.common.event.domain_event import DomainEvent

GROUP_COST_UPDATED_EVENT = 'event.group_cost_updated'


# TODO: add test cases
class GroupCostUpdatedEvent(DomainEvent):

    def __init__(self, group_id, rider_id_list, total_cost, rider_cost):
        super().__init__(GROUP_COST_UPDATED_EVENT, "v1")
        self._group_id = group_id
        self._rider_id_list = rider_id_list
        self._total_cost = total_cost
        self._rider_cost = rider_cost

    @property
    def group_id(self):
        return self._group_id

    @property
    def rider_id_list(self):
        return self._rider_id_list

    @property
    def total_cost(self):
        return self._total_cost

    @property
    def rider_cost(self):
        return self._rider_cost

    def __str__(self):
        return 'group_id={},rider_id_list={},total_cost={},rider_cost={}'.format(
            self._group_id,
            self._rider_id_list,
            self._total_cost,
            self._rider_cost,
        )
