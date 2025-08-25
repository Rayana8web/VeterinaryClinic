from django.urls import path
from .views import UserRegisterView, UserLoginView, UserLogoutView


urlpatterns = [
    path('user/register/',UserRegisterView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view() ),
]