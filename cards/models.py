from django.db import models
from django.conf import settings
from datetime import datetime

# Create your models here.
class Game(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True
    )
    gameid = models.IntegerField()
    date = models.DateField()
    home_team = models.CharField(null=True, max_length=255)
    away_team = models.CharField(null=True, max_length=255)
    home_team_score = models.IntegerField(null=True, default=0)
    away_team_score = models.IntegerField(null=True, default=0)
    winning_team = models.CharField(max_length=255, null=True)
    user_pick_correct = models.BooleanField()

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.timestamp = datetime.utcnow()
        return super(Game, self).save(*args, **kwargs)


class Pick(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True
    )
    gameid = models.IntegerField()
    user_pick = models.CharField(max_length=255)
    date = models.DateField(null=True)
