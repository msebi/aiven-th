from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_providers/', views.get_providers, name='get_providers'),
]