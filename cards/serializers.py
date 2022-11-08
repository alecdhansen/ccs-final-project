from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

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

        try:
            game = Game.objects.get(gameid=obj.gameid)
            return obj.user_pick == game.winning_team
        except:
            return "No Game Result!"


class UserSerializer(serializers.ModelSerializer):
    total_correct_picks = serializers.SerializerMethodField()
    total_picks = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "username",
            "total_correct_picks",
            "total_picks",
        )

    def get_total_picks(self, obj):
        picks = Pick.objects.filter(user=obj)
        pick_count = 0
        for pick in picks:
            try:
                Game.objects.get(gameid=pick.gameid)
                pick_count += 1
            except:
                None
        return pick_count

    def get_total_correct_picks(self, obj):
        picks = Pick.objects.filter(user=obj)
        correct_count = 0
        for pick in picks:
            try:
                game = Game.objects.get(gameid=pick.gameid)
                if pick.user_pick == game.winning_team:
                    correct_count += 1
            except:
                None
        return correct_count
