from urllib import request
from django.shortcuts import render
from rest_framework import generics
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from . import permissions
from .models import Game, Pick, Challenge
from .serializers import (
    GameSerializer,
    PickSerializer,
    PlayerSerializer,
    ChallengeSerializer,
)
from datetime import datetime, timedelta
import pytz
from rest_framework.response import Response
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


class AllCurrentDayPicksAPIView(generics.ListCreateAPIView):
    serializer_class = PickSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Pick.objects.filter(date=todays_date)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserCurrentDayPicksAPIView(generics.ListCreateAPIView):
    serializer_class = PickSerializer
    permission_classes = (permissions.IsUserOrReadOnly,)

    def get_queryset(self):
        return Pick.objects.filter(Q(date=todays_date) & Q(user=self.request.user))


class LifeTimePickAPIView(generics.ListAPIView):
    serializer_class = PickSerializer
    permission_classes = (permissions.IsUserOrReadOnly,)

    def get_queryset(self):
        return Pick.objects.exclude(date=todays_date).filter(user=self.request.user)


class AllUsersPicksAPIView(generics.ListAPIView):
    serializer_class = PlayerSerializer
    queryset = User.objects.all()[:25]

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        serializer_data = sorted(
            serializer.data, key=lambda k: k["percentage"], reverse=True
        )
        return Response(serializer_data)


class SpecificUserLifeTimePickAPIView(generics.ListAPIView):
    serializer_class = PickSerializer
    permission_classes = (permissions.IsUserOrReadOnly,)

    def get_queryset(self):
        username = self.kwargs["username"]
        return Pick.objects.exclude(date=todays_date).filter(user__username=username)


class ChallengesAPIView(generics.ListCreateAPIView):
    serializer_class = ChallengeSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Challenge.objects.all()

    def get_queryset(self):
        return Challenge.objects.filter(
            Q(challenger_id=self.request.user) | Q(opponent_id=self.request.user)
        )
