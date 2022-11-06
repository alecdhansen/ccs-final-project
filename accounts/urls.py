from django.urls import path
from .views import ProfileListAPIView

app_name = "accounts"

urlpatterns = [
    path("user/profile/<int:pk>/", ProfileListAPIView.as_view(), name="profile_list")
]
