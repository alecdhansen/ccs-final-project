from django.urls import path

from . import views

app_name = "cards"

urlpatterns = [
    path("games/", views.GameAPIView.as_view(), name="game_list"),
    path("picks/", views.PickAPIView.as_view(), name="pick_list"),
]
