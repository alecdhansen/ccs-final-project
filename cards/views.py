from urllib import request
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Game, Pick
from .serializers import GameSerializer, PickSerializer
from datetime import date
from datetime import timedelta


# Create your views here.
today = date.today()
todays_date = today.strftime("%Y-%m-%d")
yesterday = today - timedelta(days=1)
yesterdays_date = yesterday.strftime("%Y-%m-%d")
print(yesterdays_date, todays_date)


class GameAPIView(generics.ListCreateAPIView):
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Game.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PickAPIView(generics.ListCreateAPIView):
    serializer_class = PickSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Pick.objects.filter(date=todays_date)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PreviousDayPickAPIView(generics.ListAPIView):
    serializer_class = PickSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Pick.objects.filter(date=yesterdays_date)


# class UserPreviousDayPickAPIView(generics.ListAPIView):
#     serializer_class = PickSerializer
#     permission_classes = (IsAuthenticatedOrReadOnly,)
#     queryset = Pick.objects.filter(date=yesterdays_date | user=self.request.user)
