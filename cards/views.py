from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Game, Pick
from .serializers import GameSerializer, PickSerializer

# Create your views here.


class GameAPIView(generics.ListCreateAPIView):
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Game.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PickAPIView(generics.ListCreateAPIView):
    serializer_class = PickSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Pick.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
