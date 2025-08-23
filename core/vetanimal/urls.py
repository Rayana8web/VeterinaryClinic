from django.urls import path
from .views import (IndexPageAPIView,  CategoryDetailAPIView, AppointmentListView,
    AppointmentCreateView, ReviewCreateAPIView, ReviewPageAPIView)

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
    path('category/<str:category_name>/', CategoryDetailAPIView.as_view(), ),


    # запись
    path("appointments/", AppointmentListView.as_view(),),
    path("appointments/create/", AppointmentCreateView.as_view(),),

    # отзыв
    path("reviews/", ReviewPageAPIView.as_view()),  # просмотр всех отзывов
    path("reviews/create/", ReviewCreateAPIView.as_view()),  # оставить отзыв
]

