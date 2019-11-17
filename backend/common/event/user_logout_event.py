from backend.common.event.domain_event import DomainEvent


USER_LOGOUT_EVENT = 'event.user_logout'


class UserLogoutEvent(DomainEvent):

    def __init__(self, user_id):
        super().__init__(USER_LOGOUT_EVENT, "v1")
        self._user_id = user_id

    @property
    def user_id(self):
        return self._user_id

    def __str__(self):
        return 'user_id={}'.format(self._user_id)
