from django.urls import path
from .views import IndexPageAPIView, AppointmentCreateView

urlpatterns = [
    path('index/', IndexPageAPIView.as_view(),),
    path("appointment/", AppointmentCreateView.as_view(),),

]