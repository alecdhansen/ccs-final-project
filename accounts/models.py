from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
ATL = "Atlanta Hawks"
BKN = "Brooklyn Nets"
BOS = "Boston Celtics"
CHA = "Charlotte Hornets"
CHI = "Chicago Bulls"
CLE = "Cleveland Cavaliers"
DAL = "Dallas Mavericks"
DEN = "Denver Nuggets"
DET = "Detroit Pistons"
GSW = "Golden State Warriors"
HOU = "Houston Rockets"
IND = "Indiana Pacers"
LAC = "Los Angeles Clippers"
LAL = "Los Angeles Lakers"
MEM = "Memphis Grizzlies"
MIA = "Miami Heat"
MIL = "Milwaukee Bucks"
MIN = "Minnesota Timberwolves"
NBA = "National Basketball Association"
NOP = "New Orleans Pelicans"
NYK = "New York Knicks"
OKC = "Oklahoma City Thunders"
ORL = "Orlando Magic"
PHI = "Philadelphia 76ers"
PHX = "Phoenix Suns"
POR = "Portland Trailblazers"
SAC = "Sacramento Kings"
SAS = "San Antonio Spurs"
TOR = "Toronto Raptors"
UTA = "Utah Jazz"
WAS = "Washington Wizards"

CHOICES = [
    (ATL, "Atlanta Hawks"),
    (BKN, "Brooklyn Nets"),
    (BOS, "Boston Celtics"),
    (CHA, "Charlotte Hornets"),
    (CHI, "Chicago Bulls"),
    (CLE, "Cleveland Cavaliers"),
    (DAL, "Dallas Mavericks"),
    (DEN, "Denver Nuggets"),
    (DET, "Detroit Pistons"),
    (GSW, "Golden State Warriors"),
    (HOU, "Houston Rockets"),
    (IND, "Indiana Pacers"),
    (LAC, "Los Angeles Clippers"),
    (LAL, "Los Angeles Lakers"),
    (MEM, "Memphis Grizzlies"),
    (MIA, "Miami Heat"),
    (MIL, "Milwaukee Bucks"),
    (MIN, "Minnesota Timberwolves"),
    (NBA, "National Basketball Association"),
    (NOP, "New Orleans Pelicans"),
    (NYK, "New York Knicks"),
    (OKC, "Oklahoma City Thunders"),
    (ORL, "Orlando Magic"),
    (PHI, "Philadelphia 76ers"),
    (PHX, "Phoenix Suns"),
    (POR, "Portland Trailblazers"),
    (SAC, "Sacramento Kings"),
    (SAS, "San Antonio Spurs"),
    (TOR, "Toronto Raptors"),
    (UTA, "Utah Jazz"),
    (WAS, "Washington Wizards"),
]


class User(AbstractUser):
    pass


class Profile(models.Model):
    avatar = models.ImageField(default="default.jpg", upload_to="profiles/")
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True
    )
    favorite_team = models.CharField(
        max_length=31,
        choices=CHOICES,
        default=NBA,
    )
    right_handed = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username
