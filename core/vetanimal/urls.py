from django.urls import path
from .views import (IndexPageAPIView,  CategoryDetailAPIView, RecordListView,
    RecordCreateView, ReviewCreateAPIView, ReviewPageAPIView,MyRecordsView, DoctorListAPIView, ServiceListAPIView)

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
    path('category/<str:category_name>/', CategoryDetailAPIView.as_view(), ),


    # запись
    path("records/", RecordListView.as_view(),),
    path("record/", RecordCreateView.as_view(),),
    path("my-records/", MyRecordsView.as_view(),),




    # отзыв
    path("reviews/", ReviewPageAPIView.as_view()),  # просмотр всех отзывов
    path("reviews/create/", ReviewCreateAPIView.as_view()),  # оставить отзыв



    # врачи
    path('doctors/', DoctorListAPIView.as_view(), ),



    #услуга
    path("services/", ServiceListAPIView.as_view(),),
]

