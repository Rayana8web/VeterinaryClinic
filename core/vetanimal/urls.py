from django.urls import path
from .views import (IndexPageAPIView,  CategoryDetailAPIView, AppointmentListView,
    AppointmentCreateView)

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
    #path("record/", RecordCreateView.as_view(),),
    #path("records/", RecordListView.as_view(),),
    path('category/<str:category_name>/', CategoryDetailAPIView.as_view(), ),


    # запись
    path("appointments/", AppointmentListView.as_view(),),
    path("appointments/create/", AppointmentCreateView.as_view(),),
]