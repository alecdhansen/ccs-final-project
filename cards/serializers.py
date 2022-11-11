from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

from .models import Game, Pick, Challenge
from accounts.models import Profile


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


class PlayerSerializer(serializers.ModelSerializer):
    total_correct_picks = serializers.SerializerMethodField()
    total_picks = serializers.SerializerMethodField()
    percentage = serializers.SerializerMethodField()
    badge = serializers.SerializerMethodField()
    # wins_vs_opponents = serializers.SerializerMethodField()
    # total_challenges = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "username",
            "total_correct_picks",
            "total_picks",
            "percentage",
            "badge",
        )

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

    def get_percentage(self, obj):

        correct_picks = PlayerSerializer.get_total_correct_picks(self, obj)
        total_picks = PlayerSerializer.get_total_picks(self, obj)

        if total_picks == 0:
            return 0
        else:
            pre_percentage = correct_picks / total_picks
            percentage = pre_percentage * 100

        return round(percentage, 1)

    def get_badge(self, obj):
        correct_picks = PlayerSerializer.get_total_correct_picks(self, obj)
        if 49 > correct_picks >= 15:
            return "Rookie"
        elif 99 > correct_picks > 50:
            return "Pro"
        elif 200 > correct_picks > 100:
            return "Legend"
        elif correct_picks > 200:
            return "HOFer"

    # def get_wins_vs_opponents(self, obj):
    #     pass

    # def get_competitions(self, obj):
    #     pass


class ChallengeSerializer(serializers.ModelSerializer):
    winner = serializers.SerializerMethodField()
    challenger_username = serializers.ReadOnlyField(source="challenger.username")
    opponent_username = serializers.ReadOnlyField(source="opponent.username")

    class Meta:
        model = Challenge
        fields = "__all__"

    def get_winner(self, obj):

        challenger = obj.challenger
        opponent = obj.opponent

        challenger_picks = Pick.objects.filter(date=obj.date, user=challenger)
        opponent_picks = Pick.objects.filter(date=obj.date, user=opponent)

        challenger_picks_correct = 0
        for pick in challenger_picks:
            data = PickSerializer(pick)

            if data["is_correct"].value == True:
                challenger_picks_correct += 1

        opponent_picks_correct = 0
        for pick in opponent_picks:
            data = PickSerializer(pick)
            if data["is_correct"] == True:
                opponent_picks_correct += 1

        print(challenger_picks_correct)
        print(opponent_picks_correct)

        if challenger_picks_correct > opponent_picks_correct:
            return challenger.username
        elif challenger_picks_correct < opponent_picks_correct:
            return opponent.username
        else:
            return "Tie"


# add win or loss to the player
# if a challenge exists between two users on that particular day prevent another challenge from being created
