from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Game, Pick
from .serializers import GameSerializer, PickSerializer
from datetime import date

# Create your views here.


class GameAPIView(generics.ListCreateAPIView):
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Game.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PickAPIView(generics.ListCreateAPIView):
    serializer_class = PickSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Pick.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Game request for today
import requests


today = date.today()
todays_date = today.strftime("%d-%m-%Y")
url = "https://nba-schedule.p.rapidapi.com/schedule"
querystring = {"date": f"{todays_date}"}
headers = {
    "X-RapidAPI-Key": "60cb513f31msh304564080a974d5p1686d5jsnfbf4f636814d",
    "X-RapidAPI-Host": "nba-schedule.p.rapidapi.com",
}
response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)
