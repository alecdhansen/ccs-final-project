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
    # path("picks/current/", views.CurrentDayPickAPIView.as_view(), name="pick_list"),
]
# print(f'Hello {name}! This is {program}')
