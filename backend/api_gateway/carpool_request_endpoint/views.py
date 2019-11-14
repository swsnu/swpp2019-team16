import json
from django.http \
    import HttpResponseNotAllowed, JsonResponse
from backend.common.command.carpool_request_create_command \
    import CarpoolRequestCreateCommand, CARPOOL_REQUEST_CREATE_COMMAND
from backend.common.command.carpool_request_delete_command \
    import CarpoolRequestDeleteCommand, CARPOOL_REQUEST_DELETE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient


"""
TODO: add exception controller
"""


def with_json_response(status, data):
    return JsonResponse(data=json.dumps(data), status=status, safe=False)


def create_carpool_request(request):
    if request.method == 'POST':
        return __create_carpool_request(request)
    else:
        return HttpResponseNotAllowed(['POST'])


def __create_carpool_request(request):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = CarpoolRequestCreateCommand(
        from_location=body['from_location'],
        to_location=body['to_location'],
        minimum_passenger=body['minimum_passenger'],
        rider_id=body['rider_id'],
    )

    result = RedisRpcClient().call(CARPOOL_REQUEST_CREATE_COMMAND, command)
    data = {'jsonrpc': result.jsonrpc,
            'id': result.id, 'result': result.result}

    # TODO: handling exception
    return with_json_response(status=204, data=data)


def delete_carpool_request(request):
    if request.method == 'DELETE':
        return __delete_carpool_request(request)
    else:
        return HttpResponseNotAllowed(['DELETE'])


def __delete_carpool_request(request):
    body = json.loads(request.body.decode())
    # TODO: check KeyError
    command = CarpoolRequestDeleteCommand(request_id=body['request_id'])
    result = RedisRpcClient().call(CARPOOL_REQUEST_DELETE_COMMAND, command)
    data = {'jsonrpc': result.jsonrpc,
            'id': result.id, 'result': result.result}

    # TODO: handling exception
    return with_json_response(status=204, data=data)
