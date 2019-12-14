import asyncio
import grpc
import threading
from django.core.management import BaseCommand

import backend.proto.message_pb2_grpc as pb_grpc

from backend.grpc_gateway.connection.domain.stream_service import StreamService
from backend.grpc_gateway.connection.infra.grpc_server import GrpcServer
from backend.common.utils.signal_handler \
    import register_signal_handler, shutdown_process
from backend.common.messaging.infra.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.event.group_created_event import GROUP_CREATED_EVENT
from backend.grpc_gateway.connection.infra.adapter.\
    group_created_event_handler import GroupCreatedEventHandler
from backend.common.event.group_cost_updated_event import GROUP_COST_UPDATED_EVENT
from backend.grpc_gateway.connection.infra.adapter.\
    group_cost_updated_event_handler import GroupCostUpdatedEventHandler
from backend.grpc_gateway.connection.infra.adapter.ping_command_handler \
    import PingCommandHandler
from backend.common.command.ping_command import PING_COMMAND
from backend.grpc_gateway.connection.infra.adapter.rider_on_taxi_event_handler \
    import RiderOnTaxiEventHandler
from backend.common.event.rider_on_taxi_event import RIDER_ON_TAXI_EVENT
from backend.common.event.driver_go_taxi_event import DRIVER_GO_TAXI_EVENT
from backend.grpc_gateway.connection.infra.adapter.driver_go_taxi_event_handler \
    import DriverGoTaxiEventHandler
from backend.grpc_gateway.connection.infra.adapter.group_driver_updated_event_handler \
    import GroupDriverUpdatedEventHandler
from backend.common.event.group_driver_updated_event import GROUP_DRIVER_UPDATED_EVENT


class Command(BaseCommand):
    subscriber = RedisMessageSubscriber()

    stream_service = StreamService()

    conn = pb_grpc.StreamServiceStub(
        grpc.insecure_channel('localhost' + ':' + str(9090)))

    group_created_event_handler = GroupCreatedEventHandler(conn=conn)
    group_cost_updated_event_handler = GroupCostUpdatedEventHandler(conn=conn)
    group_driver_updated_event_handler = GroupDriverUpdatedEventHandler(conn=conn)
    ping_command_handler = PingCommandHandler()
    rider_on_taxi_event_handler = RiderOnTaxiEventHandler(conn=conn)
    driver_go_taxi_event_handler = DriverGoTaxiEventHandler(conn=conn)

    grpc_server = GrpcServer(stream_service)

    def handle(self, *args, **options):
        loop = asyncio.get_event_loop()

        register_signal_handler(loop, shutdown_process)

        async def main():
            group_created_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=GROUP_CREATED_EVENT,
                    message_handler=self.group_created_event_handler))

            group_cost_updated_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=GROUP_COST_UPDATED_EVENT,
                    message_handler=self.group_cost_updated_event_handler))
            group_driver_updated_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=GROUP_DRIVER_UPDATED_EVENT,
                    message_handler=self.group_driver_updated_event_handler))

            ping_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=PING_COMMAND,
                    message_handler=self.ping_command_handler))

            rider_on_taxi_event_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=RIDER_ON_TAXI_EVENT,
                    message_handler=self.rider_on_taxi_event_handler))

            driver_go_taxi_event_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=DRIVER_GO_TAXI_EVENT,
                    message_handler=self.driver_go_taxi_event_handler))

            await asyncio.gather(
                group_created_subscription_task,
                group_driver_updated_subscription_task,
                ping_subscription_task,
                rider_on_taxi_event_task,
                driver_go_taxi_event_task,
                group_cost_updated_subscription_task,
            )

        thread = threading.Thread(target=self.grpc_server.listen)
        thread.daemon = True
        thread.start()
        loop.create_task(main())
        loop.run_forever()
        self.grpc_server.listen()
