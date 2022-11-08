from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
ATL = "ATL"
BKN = "BKN"
BOS = "BOS"
CHA = "CHA"
CHI = "CHI"
CLE = "CLE"
DAL = "DAL"
DEN = "DEN"
DET = "DET"
GSW = "GSW"
HOU = "HOU"
IND = "IND"
LAC = "LAC"
LAL = "LAL"
MEM = "MEM"
MIA = "MIA"
MIL = "MIL"
MIN = "MIN"
NBA = "NBA"
NOP = "NOP"
NYK = "NYK"
OKC = "OKC"
ORL = "ORL"
PHI = "PHI"
PHX = "PHX"
POR = "POR"
SAC = "SAC"
SAS = "SAS"
TOR = "TOR"
UTA = "UTA"
WAS = "WAS"

CHOICES = [
    (ATL, "ATL"),
    (BKN, "BKN"),
    (BOS, "BOS"),
    (CHA, "CHA"),
    (CHI, "CHI"),
    (CLE, "CLE"),
    (DAL, "DAL"),
    (DEN, "DEN"),
    (DET, "DET"),
    (GSW, "GSW"),
    (HOU, "HOU"),
    (IND, "IND"),
    (LAC, "LAC"),
    (LAL, "LAL"),
    (MEM, "MEM"),
    (MIA, "MIA"),
    (MIL, "MIL"),
    (MIN, "MIN"),
    (NBA, "NBA"),
    (NOP, "NOP"),
    (NYK, "NYK"),
    (OKC, "OKC"),
    (ORL, "ORL"),
    (PHI, "PHI"),
    (PHX, "PHX"),
    (POR, "POR"),
    (SAC, "SAC"),
    (SAS, "SAS"),
    (TOR, "TOR"),
    (UTA, "UTA"),
    (WAS, "WAS"),
]


class User(AbstractUser):
    pass


class Profile(models.Model):
    avatar = models.ImageField(default="default.jpg", upload_to="profiles/")
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, unique=True
    )
    favorite_team = models.CharField(
        max_length=31,
        choices=CHOICES,
        default=NBA,
    )
    right_handed = models.BooleanField(default=True)
    correct_guesses = models.IntegerField(null=True)
    incorrect_guesses = models.IntegerField(null=True)

    def __str__(self):
        return self.user.username


User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])
