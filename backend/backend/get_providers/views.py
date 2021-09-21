from django.http import HttpResponse
from django.http import JsonResponse
from django.utils import timezone
import requests
import json

# TODO: imports format <app_name>.<module_name> (not <module_name>)
# NOTES: in pycharm the default python console does not load DJANGO_SETTINGS_MODULE automatically
# run python manage.py shell to get env vars (and import models)
# https://stackoverflow.com/a/28297987/1079483
from get_providers.models import ProvidersCacheDate, Providers


def index(request):
    return HttpResponse("Backend API to fetch cloud providers")


def is_json(response_content):
    try:
        response_json = json.loads(response_content)
    except ValueError as e:
        return False
    return True


# TODO: add try/catch
def make_rest_request(url='https://api.aiven.io/v1/clouds'):
    error_response_json = {}
    response = {}
    # https://docs.python-requests.org/en/latest/user/quickstart/#errors-and-exceptions
    try:
        response = requests.get(
            url, headers={'Content-Type': 'application/json'}
        )
    except requests.exceptions.Timeout:
        error_response_json['error'] = 'timeout'
        return JsonResponse(error_response_json)
    except requests.exceptions.TooManyRedirects:
        error_response_json['error'] = 'too many redirects'
        return JsonResponse(error_response_json)
    except requests.exceptions.RequestException as ex:
        error_response_json['error'] = 'exception occurred: ' + str(ex)
        return JsonResponse(error_response_json)

    # check for json response with 'clouds' attribute
    if not is_json(response.content):
        error_response_json['error'] = 'response not in JSON format'
        return JsonResponse(error_response_json)

    # TODO: avoid hardcoded keys (create interface for aiven rest endpoints)
    if 'clouds' not in json.loads(response.content):
        error_response_json['error'] = 'missing key \"clouds\"'
        return JsonResponse(error_response_json)

    return response


# TODO: add parameter validation
def add_provider_entry(response):
    response_json = response.json()
    cache_date = ProvidersCacheDate.objects.create(cache_date=timezone.now())
    fetched_providers = response_json.get('clouds')
    for provider in fetched_providers:
        provider_entry = Providers(cloud_description=provider.get('cloud_description'),
                                   cloud_name=provider.get('cloud_name'),
                                   geo_latitude=provider.get('geo_latitude'),
                                   geo_longitude=provider.get('geo_longitude'),
                                   geo_region=provider.get('geo_region'),
                                   fetched_date=cache_date)
        provider_entry.save()


def return_json_response(response):
    return HttpResponse(
        content=response.content,
        status=response.status_code,
        content_type=response.headers['Content-Type']
    )


def get_providers_rest(url='https://api.aiven.io/v1/clouds'):
    response = make_rest_request(url)
    add_provider_entry(response)
    return return_json_response(response)


def get_providers(request):
    # cache response for a day
    # https://django.readthedocs.io/en/stable/topics/db/models.html#extra-fields-on-many-to-many-relationships
    # TODO: add use cases for empty providers list, service unavailable (server side errors), no Internet connection
    # TODO: in case the db has been deleted and recreated session must be cleared
    # request.session.flush()
    if ProvidersCacheDate.objects.count() == 0:
        return get_providers_rest()

    if ProvidersCacheDate.objects.get(id=1).is_more_recent_than():
        # return cached providers
        # TODO: abstract hardcoded fields; create helper function
        response_json = {'clouds': []}
        for provider in Providers.objects.all():
            provider_json = {
                'cloud_description': provider.cloud_description,
                'cloud_name': provider.cloud_name,
                'geo_latitude': provider.geo_latitude,
                'geo_longitude': provider.geo_longitude,
                'geo_region': provider.geo_region,
            }
            response_json['clouds'].append(provider_json)

        return JsonResponse(response_json)
    else:
        # clear current cache entry
        ProvidersCacheDate.objects.all().delete()
        Providers.objects.all().delete()
        return get_providers_rest()
