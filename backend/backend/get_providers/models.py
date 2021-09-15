from django.db import models


class Providers(models.Model):
    cloud_description = models.CharField(max_length=1000)
    cloud_name = models.CharField(max_length=1000)
    cloud_distance = models.IntegerField(default=0)
    geo_latitude = models.FloatField(default=0.0)
    geo_longitude = models.FloatField(default=0.0)
    geo_longitude = models.CharField(max_length=100)

    def __str__(self):
        return self.cloud_name


class ProvidersCacheDate(models.Model):
    # 1 to 1 rel with providers
    providers = models.ForeignKey(Providers, unique=True, on_delete=models.CASCADE)
    cache_date = models.DateTimeField('Last date for getting providers')

    def __str__(self):
        return self.cache_date
