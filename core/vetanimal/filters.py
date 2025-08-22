from django_filters import rest_framework as filters
from .models import Appointment

class AppointmentFilter(filters.FilterSet):
    category = filters.CharFilter(field_name="service__category__name", lookup_expr="icontains")

    class Meta:
        model = Appointment
        fields = ["category"]
