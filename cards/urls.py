from django.urls import path
from datetime import date
from datetime import timedelta

from . import views

app_name = "cards"
today = date.today()
todays_date = today.strftime("%Y-%m-%d")
yesterday = today - timedelta(days=1)
yesterdays_date = yesterday.strftime("%Y-%m-%d")

urlpatterns = [
    path("games/", views.GameAPIView.as_view(), name="game_list"),
    path("picks/", views.PickAPIView.as_view(), name="pick_list"),
    path(
        f"picks/{yesterdays_date}/",
        views.PreviousDayPickAPIView.as_view(),
        name="yesterdays_pick_list",
    ),
]
