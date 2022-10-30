from rest_framework import generics
from . import models
from . import serializers


class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = models.Profile.objects.order_by("id")
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
