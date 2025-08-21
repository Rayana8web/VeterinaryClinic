from django.urls import path
from .views import IndexPageAPIView

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
]