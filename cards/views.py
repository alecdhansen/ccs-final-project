from urllib import request
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Game, Pick
from .serializers import GameSerializer, PickSerializer
from datetime import date, datetime, timedelta
import pytz


# Create your views here.
est_time = datetime.now(pytz.timezone("US/Eastern"))
yesterday = est_time - timedelta(days=1)
todays_date = est_time.strftime("%Y-%m-%d")
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
