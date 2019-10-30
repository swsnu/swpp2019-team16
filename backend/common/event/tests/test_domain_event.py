from django.test import TestCase

from backend.common.event.domain_event import DomainEvent


class DomainEventImpl(DomainEvent):

    def __init__(self, type_name, version):
        super().__init__(type_name, version)


class NotDomainModel:

    def __init__(self):
        super().__init__()


class DomainModelTestCase(TestCase):

    def test_version(self):
        event = DomainEventImpl("TYPE_NAME", "v1")
        self.assertEqual(event.version, "v1")

    def test_occurred_on(self):
        event = DomainEventImpl("TYPE_NAME", "v1")
        self.assertIsNotNone(event.occurred_on)

    def test_eq_when_type_is_not_DomainModel_then_raise_exception(self):
        event = DomainEventImpl("TYPE_NAME", "v1")
        not_event = NotDomainModel()
        self.assertNotEqual(event, not_event)

    def test_eq_when_one_of_field_different_then_return_false(self):
        event = DomainEventImpl("TYPE_NAME", "v1")
        event2 = DomainEventImpl("TYPE_NAME", "v2")
        self.assertNotEqual(event, event2)

    def test_eq_when_all_fields_same_then_return_true(self):
        event = DomainEventImpl("TYPE_NAME", "v1")
        event2 = DomainEventImpl("TYPE_NAME", "v1")
        event2._occurred_on = event.occurred_on
        self.assertEqual(event, event2)

    def test_hash(self):
        event = DomainEventImpl("TYPE_NAME", "v1")
        self.assertEqual(hash(event), hash(
            (event.type_name, event.version, event.occurred_on)))
