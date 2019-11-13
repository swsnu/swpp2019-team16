import json

from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponse

from backend.common.command.ping_command import PingCommand
from backend.common.messaging.infra.redis.redis_message_publisher import RedisMessagePublisher


def with_json_response(status, data):
    return JsonResponse(data=json.dumps(data), status=status, safe=False)


def ping(request):
    if request.method == 'POST':
        return __ping()
    else:
        return HttpResponseNotAllowed(['POST'])


def __ping():
    command = PingCommand()

    RedisMessagePublisher().publish_message(command)

    return HttpResponse(status=200)
