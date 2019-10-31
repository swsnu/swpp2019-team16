from django.test import TestCase

from backend.common.messaging.message import Message


class TestMessage(Message):

    def __init__(self, type_name):
        super().__init__(type_name)


class NotMessage:

    def __init__(self):
        super().__init__()


class MessageTestCase(TestCase):

    def test_eq_when_type_is_not_command_then_raise_exception(self):
        message = TestMessage("TYPE_NAME")
        not_message = NotMessage()
        self.assertNotEqual(message, not_message)

    def test_eq_when_one_of_field_different_then_return_false(self):
        message = TestMessage("TYPE_NAME")
        message2 = TestMessage("TYPE_NAME2")
        self.assertNotEqual(message, message2)

    def test_eq_when_all_fields_same_then_return_true(self):
        message = TestMessage("TYPE_NAME")
        message2 = TestMessage("TYPE_NAME")
        self.assertEqual(message, message2)
