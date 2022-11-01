from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Card
from .serializers import CardSerializer

# Create your views here.


class CardAPIView(generics.ListCreateAPIView):
    serializer_class = CardSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Card.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
