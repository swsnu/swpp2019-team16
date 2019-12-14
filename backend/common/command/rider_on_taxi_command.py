from backend.common.command.command import Command

RIDER_ON_TAXI_COMMAND = 'command.rider_on_taxi'


class RiderOnTaxiCommand(Command):
    def __init__(self, rider_id):
        super().__init__(RIDER_ON_TAXI_COMMAND)
        self._rider_id = rider_id

    @property
    def rider_id(self):
        return self._rider_id

    def __str__(self):
        return 'rider_id={}'.format(self._rider_id)
