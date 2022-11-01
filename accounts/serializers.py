from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from . import models

# User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = models.Profile
        fields = "__all__"


class TokenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    first_name = serializers.ReadOnlyField(source="user.first_name")
    last_name = serializers.ReadOnlyField(source="user.last_name")
    is_superuser = serializers.ReadOnlyField(source="user.is_superuser")
    id = serializers.ReadOnlyField(source="user.id")
    date_joined = serializers.ReadOnlyField(source="user.date_joined")
    avatar = serializers.ImageField(source="user.profile.avatar")

    class Meta:
        model = TokenModel
        fields = (
            "key",
            "is_superuser",
            "id",
            "username",
            "first_name",
            "last_name",
            "date_joined",
            "avatar",
        )


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
