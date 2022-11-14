import requests
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cards.models import Game
from datetime import timedelta, datetime, date
import pytz
from conf.celery import my_first_task, periodic_tasks
from django.http import HttpResponse


def index(request):
    my_first_task.delay(5)
    return HttpResponse("response done!")


# def index(request, user):
#     periodic_tasks(user)
#     return HttpResponse("response done!")


def _get_games_json():
    url = "https://nba-schedule.p.rapidapi.com/schedule"
    est_time = datetime.now(pytz.timezone("US/Eastern"))
    yesterday = est_time - timedelta(days=1)
    yesterdays_date = yesterday.strftime("%d-%m-%Y")
    querystring = {"date": f"{yesterdays_date}"}
    headers = {
        "X-RapidAPI-Key": "60cb513f31msh304564080a974d5p1686d5jsnfbf4f636814d",
        "X-RapidAPI-Host": "nba-schedule.p.rapidapi.com",
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    try:
        response.raise_for_status()
        return response.json()
    except:
        return None


# Hit this endpoint ---> http://127.0.0.1:8000/game/testing/
@api_view(["POST"])
def test_update_games(self):
    est_time = datetime.now(pytz.timezone("US/Eastern"))
    yesterday = est_time - timedelta(days=1)
    yesterdays_date = yesterday.strftime("%Y-%m-%d")

    json = _get_games_json()

    if json is not None:
        try:
            for nba_game in json[0]["games"]:
                new_game = Game()
                new_game.gameid = nba_game["gameId"]
                new_game.date = yesterdays_date
                new_game.home_team = nba_game["homeTeam"]["teamName"]
                new_game.away_team = nba_game["awayTeam"]["teamName"]
                new_game.home_team_score = nba_game["homeTeam"]["score"]
                new_game.away_team_score = nba_game["awayTeam"]["score"]
                if new_game.home_team_score > new_game.away_team_score:
                    print("home team won")
                    new_game.winning_team = new_game.home_team
                else:
                    print("away team won")
                    new_game.winning_team = new_game.away_team
                new_game.save()
        except:
            pass

    return Response({"message": f"Games created successfully for {yesterdays_date}!"})
