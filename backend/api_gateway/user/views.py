import json

from django.http import HttpResponseNotAllowed, HttpResponse

from backend.common.command.user_create_command import UserCreateCommand
from backend.common.messaging.infra.adapter.redis.redis_message_publisher \
    import RedisMessagePublisher


def register_user(request):
    if request.method == 'POST':
        return __register_user(request)
    else:
        return HttpResponseNotAllowed(['POST'])


def __register_user(request):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = UserCreateCommand(email=body['email'], password=body['password'])

    RedisMessagePublisher().publish_message(command)

    return HttpResponse(status=204)
