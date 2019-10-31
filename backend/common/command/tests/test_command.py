from django.test import TestCase

from backend.common.command.command import Command


class TestCommand(Command):

    def __init__(self, type_name):
        super().__init__(type_name)


class NotCommand:

    def __init__(self):
        super().__init__()


class CommandTestCase(TestCase):

    def test_occurred_on(self):
        command = TestCommand("TYPE_NAME")
        self.assertIsNotNone(command.occurred_on)

    def test_eq_when_type_is_not_command_then_raise_exception(self):
        command = TestCommand("TYPE_NAME")
        not_command = NotCommand()
        self.assertNotEqual(command, not_command)

    def test_eq_when_one_of_field_different_then_return_false(self):
        command = TestCommand("TYPE_NAME")
        command2 = TestCommand("TYPE_NAME2")
        self.assertNotEqual(command, command2)

    def test_eq_when_all_fields_same_then_return_true(self):
        command = TestCommand("TYPE_NAME")
        command2 = TestCommand("TYPE_NAME")
        command2._occurred_on = command.occurred_on
        self.assertEqual(command, command2)

    def test_hash(self):
        command = TestCommand("TYPE_NAME")
        self.assertEqual(hash(command), hash(
            (command.type_name,  command.occurred_on)))
