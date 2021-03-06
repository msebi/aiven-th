# Generated by Django 3.2.7 on 2021-09-21 20:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProvidersCacheDate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cache_date', models.DateTimeField(verbose_name='Date providers were last fetched on')),
            ],
        ),
        migrations.CreateModel(
            name='Providers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cloud_description', models.CharField(max_length=1000)),
                ('cloud_name', models.CharField(max_length=1000)),
                ('geo_latitude', models.FloatField(default=0.0)),
                ('geo_longitude', models.FloatField(default=0.0)),
                ('geo_region', models.CharField(max_length=100)),
                ('fetched_date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='get_providers.providerscachedate')),
            ],
        ),
    ]
