# Generated by Django 2.1.14 on 2019-11-12 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_type',
            field=models.CharField(default='USER', max_length=127),
        ),
    ]
