from urllib import request
from django.shortcuts import render
from rest_framework import generics
from django.db.models import Q
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from . import permissions
from .models import Game, Pick
from .serializers import GameSerializer, PickSerializer, UserSerializer
from datetime import date, datetime, timedelta
import pytz
import operator
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your views here.
est_time = datetime.now(pytz.timezone("US/Eastern"))
yesterday = est_time - timedelta(days=1)
todays_date = est_time.strftime("%Y-%m-%d")
yesterdays_date = yesterday.strftime("%Y-%m-%d")
print(yesterdays_date, todays_date)


class GameAPIView(generics.ListCreateAPIView):
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Game.objects.filter(date=yesterdays_date)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PreviousDayPickAPIView(generics.ListAPIView):
    serializer_class = PickSerializer
    permission_classes = (permissions.IsUserOrReadOnly,)

    def get_queryset(self):
        return Pick.objects.filter(Q(date=yesterdays_date) & Q(user=self.request.user))


class CurrentDayPickAPIView(generics.ListCreateAPIView):
    serializer_class = PickSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Pick.objects.filter(date=todays_date)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LifeTimePickAPIView(generics.ListAPIView):
    serializer_class = PickSerializer
    permission_classes = (permissions.IsUserOrReadOnly,)

    def get_queryset(self):
        return Pick.objects.exclude(date=todays_date).filter(user=self.request.user)


class AllUsersPicksAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
