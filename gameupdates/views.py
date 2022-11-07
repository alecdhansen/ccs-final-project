import requests
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cards.models import Game
from datetime import timedelta, datetime, date
import pytz

# Create your views here.


def _get_games_json():
    url = "https://nba-schedule.p.rapidapi.com/schedule"
    est_time = datetime.now(pytz.timezone("US/Eastern"))
    yesterday = est_time - timedelta(days=1)
    yesterdays_date = yesterday.strftime("%d-%m-%Y")
    querystring = {"date": f"{yesterdays_date}"}
    # querystring = {"date": "02-11-2022"}
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


@api_view(["POST"])
def test_update_games(self):
    json = _get_games_json()

    if json is not None:
        try:
            for nba_game in json[0]["games"]:
                new_game = Game()
                new_game.gameid = nba_game["gameId"]

                # "2022-11-03T00:00:00Z"
                # game_date = nba_game["gameDateEst"]
                # datetime_obj = datetime.strptime(game_date, "%Y-%m-%d")
                # hello = game_date.strftime("%Y-%m-%d")
                # print(datetime_obj)
                # split_game_date = game_date.split()
                # split_game_date = split_game_date[:-1]
                # game_date_time = " ".join(split_game_date)
                # hello = game_date_time.strftime("%Y-%m-%d")
                # print(hello)

                new_game.date = "2022-11-05"
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

    return Response({"message": "Games created successfully!"})
