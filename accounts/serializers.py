from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from . import models
from cards.models import Game

# User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=True,
    )

    class Meta:
        model = models.User
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    profile_id = serializers.ReadOnlyField(source="user.profile.id")

    class Meta:
        model = models.Profile
        fields = "__all__"


class TokenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    id = serializers.ReadOnlyField(source="user.id")
    date_joined = serializers.ReadOnlyField(source="user.date_joined")
    avatar = serializers.ImageField(source="user.profile.avatar")
    favorite_team = serializers.ReadOnlyField(source="user.profile.favorite_team")
    right_handed = serializers.BooleanField(source="user.profile.right_handed")
    profile_id = serializers.ReadOnlyField(source="user.profile.id")
    date_joined = serializers.ReadOnlyField(source="user.date_joined")
    correct_guesses = serializers.ReadOnlyField(source="user.profile.correct_guesses")
    incorrect_guesses = serializers.ReadOnlyField(source="user.profile.correct_guesses")

    class Meta:
        model = TokenModel
        fields = "__all__"
