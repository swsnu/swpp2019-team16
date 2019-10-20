from interface import Interface


class EventStore(Interface):

    def all_stored_events_between(self, low_stored_event_id, high_stored_event_id):
        pass

    def all_stored_events_since(self, event_id):
        pass

    def append(self, domain_event):
        pass

    def close(self):
        pass

    def count_stored_events(self):
        pass
