import asyncio

from django.core.management import BaseCommand

from backend.grpc_gateway.connection.domain.message_queue import MessageQueue
from backend.grpc_gateway.connection.domain.stream_service import StreamService
from backend.grpc_gateway.connection.infra.grpc_server import GrpcServer
from backend.common.utils.signal_handler \
    import register_signal_handler, shutdown_process
from backend.common.messaging.infra.redis.redis_message_subscriber \
    import RedisMessageSubscriber
from backend.common.event.group_created_event import GROUP_CREATED_EVENT
from backend.grpc_gateway.connection.infra.adapter.group_created_event_handler \
    import GroupCreatedEventHandler


class Command(BaseCommand):
    subscriber = RedisMessageSubscriber()
    message_queue = MessageQueue()
    stream_service = StreamService(message_queue=message_queue)
    group_created_event_handler = GroupCreatedEventHandler(message_queue)
    grpc_server = GrpcServer(stream_service)

    def handle(self, *args, **options):
        self.grpc_server.listen()

        loop = asyncio.get_event_loop()

        register_signal_handler(loop, shutdown_process)

        async def main():
            group_created_subscription_task = asyncio.create_task(
                self.subscriber.subscribe_message(
                    topic=GROUP_CREATED_EVENT,
                    message_handler=self.group_created_event_handler))

            await asyncio.gather(
                group_created_subscription_task,
            )

        loop.create_task(main())
        loop.run_forever()
