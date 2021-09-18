from django.test import TestCase
import json
from .views import make_rest_request


class ConnectivityTests(TestCase):
    def test_with_empty_url(self):
        response = make_rest_request('')
        response_content_json = json.loads(response.content)
        is_error = 'error' in response_content_json
        self.assertIs(is_error, True)

    def test_with_empty_url(self):
        response = make_rest_request('https://dsafdfaga.comdsafda')
        response_content_json = json.loads(response.content)
        is_error = 'error' in response_content_json
        self.assertIs(is_error, True)

    def test_with_empty_url(self):
        response = make_rest_request('ftp://192.168.2.1')
        response_content_json = json.loads(response.content)
        is_error = 'error' in response_content_json
        self.assertIs(is_error, True)

    def test_with_empty_url(self):
        response = make_rest_request('https://www.google.com')
        response_content_json = json.loads(response.content)
        is_error = 'error' in response_content_json
        self.assertIs(is_error, True)

    def test_with_empty_url(self):
        response = make_rest_request('https://httpbin.org/get')
        response_content_json = json.loads(response.content)
        is_error = 'error' in response_content_json
        self.assertIs(is_error, True)

    def test_with_empty_url(self):
        response = make_rest_request('https://api.aiven.io/v1/clouds')
        response_content_json = json.loads(response.content)
        is_error = 'error' in response_content_json
        self.assertIs(is_error, False)
