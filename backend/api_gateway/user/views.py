import json

from django.http \
    import HttpResponseNotAllowed, JsonResponse

from backend.common.command.user_create_command \
    import UserCreateCommand, USER_CREATE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient


"""
TODO: add exception controller
"""


def with_json_response(status, data):
    return JsonResponse(data=json.dumps(data), status=status, safe=False)


def register_user(request):
    if request.method == 'POST':
        return __register_user(request)
    else:
        return HttpResponseNotAllowed(['POST'])


def __register_user(request):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = UserCreateCommand(
        email=body['email'], password=body['password'])

    result = RedisRpcClient().call(USER_CREATE_COMMAND, command)
    data = {'jsonrpc': result.jsonrpc, 'id':result.id, 'result':result.result}
    
    # TODO: handling exception
    return with_json_response(status=204, data=data)
