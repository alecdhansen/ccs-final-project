# Generated by Django 4.1.2 on 2022-11-02 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0008_game_pick_delete_card'),
    ]

    operations = [
        migrations.AddField(
            model_name='pick',
            name='date',
            field=models.DateField(null=True),
        ),
    ]
