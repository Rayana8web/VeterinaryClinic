from django.urls import path
from .views import IndexPageAPIView, RecordCreateView, RecordListView

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
    path("record/", RecordCreateView.as_view(),),
    path("records/", RecordListView.as_view(),),

]