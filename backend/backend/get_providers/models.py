from django.db import models
import datetime
from django.utils import timezone


class ProvidersCacheDate(models.Model):
    cache_date = models.DateTimeField('Date providers were last fetched on')

    def is_more_recent_than(self, n_days=1):
        current_time = timezone.now()
        return current_time - datetime.timedelta(days=n_days) <= self.cache_date <= current_time

    def __str__(self):
        return self.cache_date.strftime("%m/%d/%Y, %H:%M:%S")


class Providers(models.Model):
    cloud_description = models.CharField(max_length=1000)
    cloud_name = models.CharField(max_length=1000)
    geo_latitude = models.FloatField(default=0.0)
    geo_longitude = models.FloatField(default=0.0)
    geo_region = models.CharField(max_length=100)
    fetched_date = models.ForeignKey(ProvidersCacheDate, on_delete=models.CASCADE)

    def __str__(self):
        return self.cloud_name



