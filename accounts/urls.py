from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path("user/", views.UserListAPIView.as_view(), name="all_profiles"),
    path("user/profile/", views.ProfileListAPIView.as_view(), name="all_profiles"),
    path(
        "user/profile/<int:pk>/",
        views.ProfileUpdateAPIView.as_view(),
        name="profile_list",
    ),
]
