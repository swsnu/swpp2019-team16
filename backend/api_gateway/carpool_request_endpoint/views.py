import json
from django.http \
    import HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from backend.common.command.carpool_request_create_command \
    import CarpoolRequestCreateCommand, CARPOOL_REQUEST_CREATE_COMMAND
from backend.common.command.carpool_request_delete_command \
    import CarpoolRequestDeleteCommand, CARPOOL_REQUEST_DELETE_COMMAND
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient


def carpool_request(request):
    if request.method == 'POST':
        return __create_carpool_request(request)
    elif request.method == 'DELETE':
        return __delete_carpool_request(request)
    else:
        return HttpResponseNotAllowed(['POST', 'DELETE'])


def __create_carpool_request(request):
    try:
        body = json.loads(request.body.decode())
        command = CarpoolRequestCreateCommand(
            from_location=body['from_location'],
            to_location=body['to_location'],
            minimum_passenger=body['minimum_passenger'],
            rider_id=body['rider_id'],
        )
    except(KeyError, JSONDecodeError) as e:
        return HttpResponseBadRequest(e)

    rpc_response = RedisRpcClient().call(CARPOOL_REQUEST_CREATE_COMMAND, command)
    return JsonResponse(data=rpc_response.result, status=204, safe=False)


def __delete_carpool_request(request):
    try:
        body = json.loads(request.body.decode())
        command = CarpoolRequestDeleteCommand(request_id=body['request_id'])
    except(KeyError, JSONDecodeError) as e:
        return HttpResponseBadRequest(e)
        
    rpc_response = RedisRpcClient().call(CARPOOL_REQUEST_DELETE_COMMAND, command)
    return JsonResponse(data=rpc_response.result, status=204, safe=False)
