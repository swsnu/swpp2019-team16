import json

from django.contrib.auth import get_user_model, logout, login, authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http \
    import HttpResponseNotAllowed, JsonResponse, HttpResponse

from backend.common.command.user_create_command \
    import UserCreateCommand, USER_CREATE_COMMAND
from backend.common.command.user_login_command \
    import UserLoginCommand, USER_LOGIN_COMMAND
from backend.common.command.user_logout_command \
    import UserLogoutCommand, USER_LOGOUT_COMMAND


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
        email=body['email'], password=body['password'], user_type=body['user_type'])

    result = RedisRpcClient().call(USER_CREATE_COMMAND, command)
    data = {'jsonrps': result.jsonrpc, 'id':result.id, 'result':result.result}
    
    # TODO: handling exception
    return with_json_response(status=204, data=data)


def login_user(request):
    if request.method == 'POST':
        return __login_user(request)
    else:
        return HttpResponseNotAllowed(['POST'])

def __login_user(request):
    try:
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
    except:
        return HttpResponseBadRequest()
    
    user = authenticate(email=email, password=password)
    if user is not None:
        login(request, user)
        user_type = req_data['user_type']
        command = UserLoginCommand(
        user_id=request.user.id, user_type=user_type
        )

        result = RedisRpcClient().call(USER_LOGIN_COMMAND, command)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)


def logout_user(request):
    if request.method == 'GET':
        return __logout_user(request)
    else:
        return HttpResponseNotAllowed(['GET'])

def __logout_user(request):
    if request.user.is_authenticated:
        user_id=request.user.id 
        #print(user_id)
        command = UserLogoutCommand(user_id)
        result = RedisRpcClient().call(USER_LOGOUT_COMMAND, command)
        #print(result)
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])