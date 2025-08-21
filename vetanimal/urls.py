from django.urls import path
from .views import IndexPageAPIView, RecordCreateView, RecordListView, CategoryDetailAPIView

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
    path("record/", RecordCreateView.as_view(),),
    path("records/", RecordListView.as_view(),),
    path('category/<int:category_id>/', CategoryDetailAPIView.as_view(), ),
]