# Generated by Django 2.1.14 on 2019-11-06 06:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_driver_rider'),
        ('carpool_request', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='carpoolrequest',
            name='from_location',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='carpoolrequest',
            name='minimum_passenger',
            field=models.CharField(default='', max_length=15),
        ),
        migrations.AddField(
            model_name='carpoolrequest',
            name='rider',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user.Rider'),
        ),
        migrations.AddField(
            model_name='carpoolrequest',
            name='status',
            field=models.CharField(default='IDLE', max_length=255),
        ),
        migrations.AddField(
            model_name='carpoolrequest',
            name='to_location',
            field=models.CharField(default='', max_length=255),
        ),
    ]