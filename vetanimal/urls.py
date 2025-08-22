from django.urls import path
from .views import IndexPageAPIView, RecordCreateView, RecordListView, CategoryDetailAPIView, AppointmentListView, \
    AppointmentCreateView

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
    path("record/", RecordCreateView.as_view(),),
    path("records/", RecordListView.as_view(),),
    path('category/<int:category_id>/', CategoryDetailAPIView.as_view(), ),

    # запись
    path("appointments/", AppointmentListView.as_view(),),
    path("appointments/create/", AppointmentCreateView.as_view(),),
]