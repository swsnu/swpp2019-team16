from backend.common.command.command import Command

DRIVER_GO_TAXI_COMMAND = 'command.driver_go_taxi'


class DriverGoTaxiCommand(Command):
    def __init__(self, driver_id):
        super().__init__(DRIVER_GO_TAXI_COMMAND)
        self._driver_id = driver_id

    @property
    def driver_id(self):
        return self._driver_id

    def __str__(self):
        return 'driver_id={}'.format(self.driver_id)
