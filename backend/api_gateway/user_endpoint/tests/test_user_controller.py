from django.test import TestCase, Client


class UserControllerTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def test_register_user_when_method_is_not_post_response_with_405(self):
        response = self.client.get('/api/v1/user/register',
                                   content_type='application/json')

        self.assertEqual(response.status_code, 405)
