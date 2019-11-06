from django.test import TestCase

from backend.common.command.group_create_command import GroupCreateCommand

class GroupCreateCommandTestCase(TestCase):

    def test_properties(self):
        command = GroupCreateCommand(
            riders=['rider1', 'rider2', 'rider3', 'rider4'], 
            from_location='SNU Station', to_location='301 Building')

        self.assertEqual(command.riders, ['rider1', 'rider2', 'rider3', 'rider4'])
        self.assertEqual(command.from_location, 'SNU Station')
        self.assertEqual(command.to_location, '301 Building')

    def test_str(self):
        command = GroupCreateCommand(
            riders=''.join(['rider1', 'rider2', 'rider3', 'rider4']),
            from_location='SNU Station', to_location='301 Building')
        self.assertEqual(
            str(command),
            'riders=rider1rider2rider3rider4,from_location=SNU Station,to_location=301 Building'
        )