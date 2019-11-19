from backend.common.command.command import Command


PING_COMMAND = 'command.PING_COMMAND'


class PingCommand(Command):
    def __init__(self):
        super().__init__(PING_COMMAND)
        self.message = 'ping'
