from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import requests


def index(request):
    return HttpResponse("Backend API to fetch cloud providers")


def get_providers(request):
    url = 'https://api.aiven.io/v1/clouds'
    response = requests.get(
        url, headers={'Content-Type': 'application/json'}
    )

    return HttpResponse(
        content=response.content,
        status=response.status_code,
        content_type=response.headers['Content-Type']
    )

