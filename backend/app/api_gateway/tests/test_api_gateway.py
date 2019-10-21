from django.test import TestCase, Client


class ApiGatewayTestCase(TestCase):

    def test_index(self):
        client = Client()
        response = client.get('/api/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Hello, world!', response.content.decode())
