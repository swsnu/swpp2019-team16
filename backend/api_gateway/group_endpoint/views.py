import json
from django.http \
    import HttpResponseNotAllowed, JsonResponse

from backend.common.command.group_create_command \
    import GroupCreateCommand, GROUP_CREATE_COMMAND
from backend.common.command.group_driver_update_command \
    import GroupDriverUpdateCommand, GROUP_DRIVER_UPDATE_COMMAND
from backend.common.command.group_cost_update_command \
    import GroupCostUpdateCommand, GROUP_COST_UPDATE_COMMAND
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
    else:
        return HttpResponseNotAllowed(['POST'])


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


def update_driver(request, group_id):
    if request.method == 'PUT':
        return __update_driver(request, group_id)
    else:
        return HttpResponseNotAllowed(['PUT'])


def __update_driver(request, group_id):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = GroupDriverUpdateCommand(driver_id=body['driverId'], group_id=group_id)

    result = RedisRpcClient().call(GROUP_DRIVER_UPDATE_COMMAND, command)
    data = {'jsonrpc': result.jsonrpc,
            'id': result.id, 'result': result.result}

    # TODO: handling exception
    return with_json_response(status=204, data=data)


def update_cost(request, group_id):
    if request.method == 'PUT':
        return __update_cost(request, group_id)
    else:
        return HttpResponseNotAllowed(['PUT'])


def __update_cost(request, group_id):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = GroupCostUpdateCommand(cost=body['totalCost'], group_id=group_id)

    rpc_response = RedisRpcClient().call(GROUP_COST_UPDATE_COMMAND, command)
    # TODO: handling exception
    return JsonResponse(data=rpc_response.result, status=200, safe=False)
