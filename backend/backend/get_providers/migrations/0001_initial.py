# Generated by Django 3.2.7 on 2021-09-15 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Providers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cloud_description', models.CharField(max_length=1000)),
                ('cloud_name', models.CharField(max_length=1000)),
                ('cloud_distance', models.IntegerField(default=0)),
                ('geo_latitude', models.FloatField(default=0.0)),
                ('geo_longitude', models.CharField(max_length=100)),
            ],
        ),
    ]