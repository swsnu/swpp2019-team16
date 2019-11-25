from django.test import TestCase, Client

# Needs editing


class GroupControllerTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def test_group(self):
        response = self.client.get(
            '/api/v1/group/', content_type='application/json')

        self.assertEqual(response.status_code, 405)
