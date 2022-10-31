from django.urls import path, include

app_name = "api_v1"

urlpatterns = [
    path("", include("accounts.urls", namespace="accounts")),
    path("", include("cards.urls", namespace="cards")),
]
