from rest_framework import generics
from . import models
from . import serializers
from . import permissions


class UserListAPIView(generics.ListAPIView):
    queryset = models.User.objects.order_by("id")
    serializer_class = serializers.UserSerializer
    permission_classes = permissions.IsAdminUser


class ProfileListAPIView(generics.ListAPIView):
    queryset = models.Profile.objects.order_by("id")
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
