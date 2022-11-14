from django.urls import path
from datetime import datetime, timedelta
import pytz

from . import views

app_name = "cards"
est_time = datetime.now(pytz.timezone("US/Eastern"))
todays_date = est_time.strftime("%Y-%m-%d")
yesterday = est_time - timedelta(days=1)
yesterdays_date = yesterday.strftime("%Y-%m-%d")

urlpatterns = [
    path("games/", views.GameAPIView.as_view(), name="game_list"),
    path(
        "picks/",
        views.PreviousDayPickAPIView.as_view(),
        name="yesterdays_pick_list",
    ),
    path("picks/current/", views.AllCurrentDayPicksAPIView.as_view(), name="pick_list"),
    path(
        "picks/current/<int:pk>/",
        views.UserCurrentDayPicksAPIView.as_view(),
        name="pick_list",
    ),
    path(
        "picks/current/<int:user>/<int:pk>/",
        views.UserCurrentDaySpecificPickAPIView.as_view(),
        name="specific_pick",
    ),
    path(
        "picks/lifetime/",
        views.LifeTimePickAPIView.as_view(),
        name="lifetime_pick_list",
    ),
    path(
        "picks/stats/",
        views.AllUsersStatsAPIView.as_view(),
        name="all_users_stats_list",
    ),
    path(
        "picks/lifetime/<str:username>/",  # if somethign is broken check this. i put in a / at the end on saturday at 4:45pm
        views.SpecificUserLifeTimePickAPIView.as_view(),
        name="specific_user_lifetime_pick_list",
    ),
    path("challenges/", views.ChallengesAPIView.as_view(), name="challenges"),
]
