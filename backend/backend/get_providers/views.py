from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import requests
from django.utils import timezone
import json

from get_providers.models import ProvidersCacheDate, Providers


def index(request):
    return HttpResponse("Backend API to fetch cloud providers")


# TODO: add try/catch
def make_rest_request(url='https://api.aiven.io/v1/clouds'):
    return requests.get(
        url, headers={'Content-Type': 'application/json'}
    )


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


def get_providers_rest():
    response = make_rest_request()
    add_provider_entry(response)
    return return_json_response(response)


def get_providers(request):
    # cache response for a day
    # https://django.readthedocs.io/en/stable/topics/db/models.html#extra-fields-on-many-to-many-relationships
    # TODO: add use cases for empty providers list, service unavailable (server side errors), no Internet connection
    if ProvidersCacheDate.objects.count() == 0:
        return get_providers_rest()

    if ProvidersCacheDate.objects.filter(id=1).is_older_than():
        # clear current cache entry
        Providers.objects.all().delete()
        get_providers_rest()
    else:
        # return cached providers
        # TODO: abstract hardcoded strings; create helper function
        response_json = {'clouds': []}
        for provider in Providers.objects.all():
            provider_json = {
                'cloud_description': provider['cloud_description'],
                'cloud_name': provider['cloud_name'],
                'geo_latitude': provider['geo_latitude'],
                'geo_longitude': provider['geo_longitude'],
                'geo_region': provider['geo_region'],
            }
            response_json['clouds'].append(provider_json)

        return JsonResponse(response_json)

