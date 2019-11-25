import json
from django.http \
    import HttpResponseNotAllowed, JsonResponse

from backend.common.command.group_create_command \
    import GroupCreateCommand, GROUP_CREATE_COMMAND
from backend.common.command.group_update_command \
    import GroupUpdateCommand, GROUP_UPDATE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient

"""
TODO: add exception controller
"""


def with_json_response(status, data):
    return JsonResponse(data=json.dumps(data), status=status, safe=False)


def group(request):
    if request.method == 'POST':
        return __create_group(request)
    elif request.method == 'PUT':
        return __update_group(request)
    else:
        return HttpResponseNotAllowed(['POST', 'PUT'])


def __create_group(request):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = GroupCreateCommand(
        from_location=body['from_location'],
        to_location=body['to_location'])

    result = RedisRpcClient().call(GROUP_CREATE_COMMAND, command)
    data = {'jsonrpc': result.jsonrpc,
            'id': result.id, 'result': result.result}

    # TODO: handling exception
    return with_json_response(status=204, data=data)


def __update_group(request):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = GroupUpdateCommand(driver_id=body['driver_id'], group_id=body['group_id'])

    result = RedisRpcClient().call(GROUP_UPDATE_COMMAND, command)
    data = {'jsonrpc': result.jsonrpc,
            'id': result.id, 'result': result.result}

    # TODO: handling exception
    return with_json_response(status=204, data=data)
