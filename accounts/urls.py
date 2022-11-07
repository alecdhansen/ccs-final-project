from django.urls import path
from .views import ProfileListAPIView, ProfileUpdateAPIView

app_name = "accounts"

urlpatterns = [
    path("user/profile/", ProfileListAPIView.as_view(), name="all_profiles"),
    path("user/profile/<int:pk>/", ProfileUpdateAPIView.as_view(), name="profile_list"),
]
