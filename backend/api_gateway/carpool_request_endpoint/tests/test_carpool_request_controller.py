from django.test import TestCase, Client


class CarpoolRequestControllerTestCase(TestCase):

    def setUp(self):
        self.client = Client()

    def test_create_when_method_is_not_post_response_with_405(self):
        response = self.client.get('/api/v1/carpool_request/create',
                                   content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_delete_when_method_is_not_post_response_with_405(self):
        response = self.client.get('/api/v1/carpool_request/delete',
                                   content_type='application/json')

        self.assertEqual(response.status_code, 404)
