from django.urls import path
from .views import UserRegisterView, UserLoginView, UserLogoutView
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('user/register/',UserRegisterView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view() ),

    #Reset password
    path("request-reset/", RequestPasswordReset.as_view(), name="request-reset"),
    path("reset/<uidb64>/<token>/", ResetPassword.as_view(), name="reset-password"),
]