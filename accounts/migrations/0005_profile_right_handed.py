# Generated by Django 4.1.3 on 2022-11-04 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_profile_favorite_team'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='right_handed',
            field=models.BooleanField(default=True),
        ),
    ]
