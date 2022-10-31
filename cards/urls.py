from django.urls import path

from . import views

app_name = "cards"

urlpatterns = [
    path("cards/", views.CardAPIView.as_view(), name="card_list"),
]
