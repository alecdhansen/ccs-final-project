# Generated by Django 4.1.3 on 2022-11-03 16:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0009_pick_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='game',
            name='user_pick',
        ),
    ]
