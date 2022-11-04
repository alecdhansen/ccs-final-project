from cards.models import Game
import requests
from datetime import timedelta, datetime, date
import pytz


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


def update_games():
    json = _get_games_json()
    if json is not None:
        try:
            print(json)
            print("hello world")
            new_game = Game()
            for nba_game in json[0]["games"]:
                # import pdb
                # pdb.set_trace()
                print(new_game)
                new_game.gameid = nba_game["gameId"]
                new_game.date = json[0]["gameDate"]
                new_game.home_team = nba_game["homeTeam"]["teamName"]
                new_game.away_team = nba_game["awayTeam"]["teamName"]
                new_game.home_team_score = nba_game["homeTeam"]["score"]
                new_game.away_team_score = nba_game["awayTeam"]["score"]
                if new_game.home_team_score > new_game.away_team_score:
                    new_game.winning_team = new_game.home_team
                else:
                    new_game.winning_team = new_game.away_team
                print("gamesapi")
                print(new_game)
                new_game.save()

        except:
            pass


# gameid = models.IntegerField()
# date = models.DateField()
# home_team = models.CharField(null=True, max_length=255)
# away_team = models.CharField(null=True, max_length=255)
# home_team_score = models.IntegerField(null=True, default=0)
# away_team_score = models.IntegerField(null=True, default=0)
# winning_team = models.CharField(max_length=255, null=True)
# user_pick_correct = models.BooleanField()


# update_games()
# [
#     {
# "gameDate": "11/3/2022 12:00:00 AM",
#         "games": [
#             {
#                 "gameId": "0022200118",
#                 "gameCode": "20221103/GSWORL",
#                 "gameStatus": 1,
#                 "gameStatusText": "7:00 pm ET",
#                 "gameSequence": 1,
#                 "gameDateEst": "2022-11-03T00:00:00Z",
#                 "gameTimeEst": "1900-01-01T19:00:00Z",
#                 "gameDateTimeEst": "2022-11-03T19:00:00Z",
#                 "gameDateUTC": "2022-11-03T04:00:00Z",
#                 "gameTimeUTC": "1900-01-02T00:00:00Z",
#                 "gameDateTimeUTC": "2022-11-03T23:00:00Z",
#                 "awayTeamTime": "2022-11-03T16:00:00Z",
#                 "homeTeamTime": "2022-11-03T19:00:00Z",
#                 "day": "Thu",
#                 "monthNum": 11,
#                 "weekNumber": 3,
#                 "weekName": "Week 3",
#                 "ifNecessary": false,
#                 "seriesGameNumber": "",
#                 "seriesText": "",
#                 "arenaName": "Amway Center",
#                 "arenaState": "FL",
#                 "arenaCity": "Orlando",
#                 "postponedStatus": "A",
#                 "branchLink": "https://app.link.nba.com/UfBzesizCsb",
#                 "broadcasters": {
#                     "nationalTvBroadcasters": [],
#                     "nationalRadioBroadcasters": [],
#                     "homeTvBroadcasters": [],
#                     "homeRadioBroadcasters": [],
#                     "awayTvBroadcasters": [],
#                     "awayRadioBroadcasters": [],
#                     "intlRadioBroadcasters": [],
#                     "intlTvBroadcasters": [],
#                 },
#                 "homeTeam": {
#                     "teamId": 1610612753,
#                     "teamName": "Magic",
#                     "teamCity": "Orlando",
#                     "teamTricode": "ORL",
#                     "teamSlug": "magic",
#                     "wins": 1,
#                     "losses": 7,
#                     "score": 0,
#                     "seed": 0,
#                     "teamLogo": "https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg",
#                 },
#                 "awayTeam": {
#                     "teamId": 1610612744,
#                     "teamName": "Warriors",
#                     "teamCity": "Golden State",
#                     "teamTricode": "GSW",
#                     "teamSlug": "warriors",
#                     "wins": 3,
#                     "losses": 5,
#                     "score": 0,
#                     "seed": 0,
#                     "teamLogo": "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg",
#                 },
#                 "pointsLeaders": [],
#             },
#             {
#                 "gameId": "0022200119",
#                 "gameCode": "20221103/DENOKC",
#                 "gameStatus": 1,
#                 "gameStatusText": "8:00 pm ET",
#                 "gameSequence": 2,
#                 "gameDateEst": "2022-11-03T00:00:00Z",
#                 "gameTimeEst": "1900-01-01T20:00:00Z",
#                 "gameDateTimeEst": "2022-11-03T20:00:00Z",
#                 "gameDateUTC": "2022-11-03T04:00:00Z",
#                 "gameTimeUTC": "1900-01-02T01:00:00Z",
#                 "gameDateTimeUTC": "2022-11-04T00:00:00Z",
#                 "awayTeamTime": "2022-11-03T18:00:00Z",
#                 "homeTeamTime": "2022-11-03T19:00:00Z",
#                 "day": "Thu",
#                 "monthNum": 11,
#                 "weekNumber": 3,
#                 "weekName": "Week 3",
#                 "ifNecessary": false,
#                 "seriesGameNumber": "",
#                 "seriesText": "",
#                 "arenaName": "Paycom Center",
#                 "arenaState": "OK",
#                 "arenaCity": "Oklahoma City",
#                 "postponedStatus": "A",
#                 "branchLink": "https://app.link.nba.com/4BXkMsizCsb",
#                 "broadcasters": {
#                     "nationalTvBroadcasters": [],
#                     "nationalRadioBroadcasters": [],
#                     "homeTvBroadcasters": [],
#                     "homeRadioBroadcasters": [],
#                     "awayTvBroadcasters": [],
#                     "awayRadioBroadcasters": [],
#                     "intlRadioBroadcasters": [],
#                     "intlTvBroadcasters": [],
#                 },
#                 "homeTeam": {
#                     "teamId": 1610612760,
#                     "teamName": "Thunder",
#                     "teamCity": "Oklahoma City",
#                     "teamTricode": "OKC",
#                     "teamSlug": "thunder",
#                     "wins": 4,
#                     "losses": 3,
#                     "score": 0,
#                     "seed": 0,
#                     "teamLogo": "https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg",
#                 },
#                 "awayTeam": {
#                     "teamId": 1610612743,
#                     "teamName": "Nuggets",
#                     "teamCity": "Denver",
#                     "teamTricode": "DEN",
#                     "teamSlug": "nuggets",
#                     "wins": 4,
#                     "losses": 3,
#                     "score": 0,
#                     "seed": 0,
#                     "teamLogo": "https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg",
#                 },
#                 "pointsLeaders": [],
#             },
#         ],
#     }
# ]
