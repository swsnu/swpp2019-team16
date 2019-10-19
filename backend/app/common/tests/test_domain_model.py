from django.test import TestCase

from ..domain_model import DomainEvent
from ..time import monotonic_utc_now


class DomainEventImpl(DomainEvent):

    def __init__(self, version):
        super().__init__(version)


class NotDomainModel:

    def __init__(self):
        super().__init__()


class DomainModelTestCase(TestCase):

    def test_version(self):
        event = DomainEventImpl("v1")
        self.assertEqual(event.version, "v1")

    def test_version_when_set_property_then_raise_exception(self):
        event = DomainEventImpl("v1")

        with self.assertRaises(AttributeError):
            event.version = "v2"

    def test_occurred_on(self):
        event = DomainEventImpl("v1")
        self.assertIsNotNone(event.occurred_on)

    def test_occurred_on_when_set_property_then_raise_exception(self):
        event = DomainEventImpl("v1")

        with self.assertRaises(AttributeError):
            event.occurred_on = monotonic_utc_now()

    def test_eq_when_type_is_not_DomainModel_then_raise_exception(self):
        event = DomainEventImpl("v1")
        not_event = NotDomainModel()
        self.assertNotEqual(event, not_event)

    def test_eq_when_one_of_field_different_then_return_false(self):
        event = DomainEventImpl("v1")
        event2 = DomainEventImpl("v2")
        self.assertNotEqual(event, event2)

    def test_eq_when_all_fields_same_then_return_true(self):
        event = DomainEventImpl("v1")
        event2 = DomainEventImpl("v1")
        event2._occurred_on = event.occurred_on
        self.assertEqual(event, event2)

    def test_hash(self):
        event = DomainEventImpl("v1")
        self.assertEqual(hash(event), hash((event.version, event.occurred_on)))
