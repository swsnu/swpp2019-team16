# Generated by Django 2.1.14 on 2019-11-24 10:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_user_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vehicle',
            old_name='plate',
            new_name='plate_no',
        ),
    ]
