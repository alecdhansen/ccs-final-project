from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import Game, Pick


class GameSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Game
        fields = "__all__"


class PickSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    is_correct = serializers.SerializerMethodField()

    class Meta:
        model = Pick
        fields = "__all__"

    def get_is_correct(self, obj):

        game = get_object_or_404(Game, gameid=obj.gameid)
        return obj.user_pick == game.winning_team
