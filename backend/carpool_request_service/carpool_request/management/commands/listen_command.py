import asyncio

from django.core.management import BaseCommand

from backend.carpool_request_service.carpool_request.infra.adapter.carpool_request_create_command_handler \
    import CarpoolRequestCreateCommandHandler
from backend.carpool_request_service.carpool_request.infra.adapter.carpool_request_delete_command_handler \
    import CarpoolRequestDeleteCommandHandler
from backend.carpool_request_service.carpool_request.app.carpool_request_application_service \
    import CarpoolRequestApplicationService
from backend.common.messaging.infra.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.command.carpool_request_create_command \
    import CARPOOL_REQUEST_CREATE_COMMAND
from backend.common.command.carpool_request_delete_command \
    import CARPOOL_REQUEST_DELETE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_server \
    import RedisRpcServer
from backend.common.utils.signal_handler import register_signal_handler, shutdown_process


class Command(BaseCommand):

    carpool_request_application_service = CarpoolRequestApplicationService()
    carpool_request_create_command_handler = CarpoolRequestCreateCommandHandler(
        carpool_request_application_service=carpool_request_application_service)
    carpool_request_delete_command_handler = CarpoolRequestDeleteCommandHandler(
        carpool_request_application_service=carpool_request_application_service)
    subscriber = RedisMessageSubscriber()
    rpc_server = RedisRpcServer()

    def handle(self, *args, **options):
        loop = asyncio.get_event_loop()

        register_signal_handler(loop, shutdown=shutdown_process)

        async def main():
            """
            create subscription tasks
            """
            carpool_request_create_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=CARPOOL_REQUEST_CREATE_COMMAND,
                    message_handler=self.carpool_request_create_command_handler))

            carpool_request_create_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=CARPOOL_REQUEST_CREATE_COMMAND,
                    request_handler=self.carpool_request_create_command_handler))

            carpool_request_delete_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=CARPOOL_REQUEST_DELETE_COMMAND,
                    message_handler=self.carpool_request_delete_command_handler))

            carpool_request_delete_rpc_task = asyncio.create_task(
                self.rpc_server.register_handler(
                    topic=CARPOOL_REQUEST_DELETE_COMMAND,
                    request_handler=self.carpool_request_delete_command_handler))

            """
            wait until application stop
            """
            await asyncio.gather(
                carpool_request_create_subscription_task,
                carpool_request_create_rpc_task,
                carpool_request_delete_subscription_task,
                carpool_request_delete_rpc_task,
            )

        loop.create_task(main())
        loop.run_forever()

    async def shutdown(self, sig, loop):
        print('caught {0}'.format(sig))
        tasks = [task for task in asyncio.Task.all_tasks() if task is not
                 asyncio.tasks.Task.current_task()]

        list(map(lambda task: task.cancel(), tasks))
        results = await asyncio.gather(*tasks, return_exceptions=True)

        print('finished awaiting cancelled tasks, results: {0}'
              .format(results))
        loop.stop()
