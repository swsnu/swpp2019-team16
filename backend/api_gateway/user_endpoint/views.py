from django.contrib.auth import logout, login, authenticate, get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponseNotAllowed, \
    JsonResponse, HttpResponse, HttpResponseBadRequest
import json
from json import JSONDecodeError
from backend.common.command.user_create_command \
    import UserCreateCommand, USER_CREATE_COMMAND
from backend.common.command.user_point_update_command \
    import UserPointUpdateCommand, USER_POINT_UPDATE_COMMAND
from backend.common.event.user_login_event \
    import UserLoginEvent, USER_LOGIN_EVENT
from backend.common.event.user_logout_event \
    import UserLogoutEvent
from backend.common.messaging.infra.redis.redis_message_publisher \
    import RedisMessagePublisher
from backend.common.rpc.infra.adapter.redis.redis_rpc_client \
    import RedisRpcClient
from backend.common.command.driver_go_taxi_command import \
    DRIVER_GO_TAXI_COMMAND, DriverGoTaxiCommand
from backend.common.command.rider_on_taxi_command import \
    RIDER_ON_TAXI_COMMAND, RiderOnTaxiCommand

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
    try:
        body = json.loads(request.body.decode())
        # TODO: check KeyError
        command = UserCreateCommand(
            email=body['email'],
            password=body['password'],
            user_type=body['userType'],
            car_type=body['carType'],
            plate_no=body['plateNo']
        )
    except(KeyError, JSONDecodeError) as e:
        return HttpResponseBadRequest(e)

    rpc_response = RedisRpcClient().call(USER_CREATE_COMMAND, command)
    return JsonResponse(data=rpc_response.result, status=200, safe=False)


def check_user(request, id):
    if request.method == 'GET':
        return __check_user(request, id)
    elif request.method == 'PUT':
        return __point_user(request, id)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


def __point_user(request, id):
    try:
        user = get_user_model().objects.get(pk=id)
    except Exception:
        return HttpResponseBadRequest
    try:
        body = json.loads(request.body.decode())
        print('body>>', body)
        point = int(body['point'])
        print('point>>', point)
    except(KeyError, JSONDecodeError) as e:
        return HttpResponseBadRequest(e)
    command = UserPointUpdateCommand(user_id=user.id, point=point)
    rpc_response = RedisRpcClient().call(USER_POINT_UPDATE_COMMAND, command)
    return JsonResponse(data=rpc_response.result, status=200, safe=False)


def __check_user(request, id):
    try:
        user = get_user_model().objects.get(id=id)
    except Exception:
        return HttpResponseBadRequest
    login(request, user)
    event = UserLoginEvent(user_id=user.id)
    rpc_response = RedisRpcClient().call(USER_LOGIN_EVENT, event)
    return JsonResponse(data=rpc_response.result, status=200, safe=False)


def login_user(request):
    if request.method == 'POST':
        return __login_user(request)
    else:
        return HttpResponseNotAllowed(['POST'])


def __login_user(request):
    try:
        body = json.loads(request.body.decode())
        email = body['email']
        password = body['password']
    except(KeyError, JSONDecodeError) as e:
        return HttpResponseBadRequest(e)
    user = authenticate(email=email, password=password)
    if user is not None:
        login(request, user)
        event = UserLoginEvent(user_id=user.id)
        rpc_response = RedisRpcClient().call(USER_LOGIN_EVENT, event)
        result = {
            'id': user.id,
            'user_type_id': rpc_response.result['id']
        }
        return JsonResponse(data=result, status=200, safe=False)
    else:
        return HttpResponse(status=401)


def logout_user(request):
    if request.method == 'GET':
        return __logout_user(request)
    else:
        return HttpResponseNotAllowed(['GET'])


def __logout_user(request):
    if request.user.is_authenticated:
        user_id = request.user.id
        event = UserLogoutEvent(user_id)
        RedisMessagePublisher().publish_message(event)
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)


def rider_on_taxi(request, rider_id):
    if request.method == 'PUT':
        return __rider_on_taxi(rider_id)
    else:
        return HttpResponseNotAllowed(['PUT'])


def __rider_on_taxi(rider_id):
    rpc_response = RedisRpcClient().call(
        RIDER_ON_TAXI_COMMAND,
        RiderOnTaxiCommand(rider_id=rider_id)
    )
    print('[UserEndpoint] rider_on_taxi rpc_response: {}'.format(rpc_response))
    if type(rpc_response.result) == ValueError:
        return HttpResponse(status=500)
    return HttpResponse(status=200)


def driver_go_taxi(request, driver_id):
    if request.method == 'PUT':
        return __driver_go_taxi(driver_id=driver_id)
    else:
        return HttpResponseNotAllowed(['PUT'])


def __driver_go_taxi(driver_id):
    print('driver_go_taxi', driver_id)
    rpc_response = RedisRpcClient().call(
        DRIVER_GO_TAXI_COMMAND,
        DriverGoTaxiCommand(driver_id=driver_id)
    )
    print('[UserEndpoint] driver_go_taxi rpc_response: {}'.format(rpc_response))
    if type(rpc_response.result) == ValueError:
        return HttpResponse(status=500)
    return HttpResponse(status=200)


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
