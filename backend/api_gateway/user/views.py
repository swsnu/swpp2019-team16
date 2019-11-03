import json

from django.http import HttpResponseNotAllowed, HttpResponse

from backend.common.command.user_create_command import UserCreateCommand, USER_CREATE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_client import RedisRpcClient


"""
TODO: add exception controller
"""


def register_user(request):
    if request.method == 'POST':
        return __register_user(request)
    else:
        return HttpResponseNotAllowed(['POST'])


def __register_user(request):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = UserCreateCommand(email=body['email'], password=body['password'])

    result = RedisRpcClient().call(USER_CREATE_COMMAND, command)

    return HttpResponse(status=204)
