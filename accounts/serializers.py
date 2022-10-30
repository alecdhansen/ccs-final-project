from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from . import models

# User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = models.Profile
        fields = "__all__"


# class UserSerializer(serializers.ModelSerializer):
#     profile = serializers.PrimaryKeyRelatedField(
#         many=False,
#         read_only=True,
#     )

#     class Meta:
#         model = models.User
#         fields = (
#             "id",
#             "username",
#             "email",
#             "profile",
#         )
