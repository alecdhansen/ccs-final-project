from rest_framework import generics
from . import models
from . import serializers


class ProfileListAPIView(generics.ListAPIView):
    queryset = models.Profile.objects.order_by("id")
    serializer_class = serializers.ProfileSerializer


class ProfileUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = models.Profile.objects.order_by("id")
    serializer_class = serializers.ProfileSerializer

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
