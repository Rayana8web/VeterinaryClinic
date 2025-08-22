from datetime import datetime

from rest_framework import serializers
from .models import Category, Animal, Service, Record, Appointment


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "photo"]

class AnimalListSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Animal
        fields = ["id", "name", "age", "photo", "category"]

class ServiceListSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Service
        fields = ["id", "title", "description", "price", "category"]

class RecordListSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field="name",
        queryset=Category.objects.all()
    )

    class Meta:
        model = Record
        fields = ["id", "owner_name", "owner_phone", "category", "date", "time", "reason", "created_at"]
        read_only_fields = ["created_at"]



#Канайым
# для услуги
class ServiceDetailSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)

# для категории
class CategoryDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    photo = serializers.ImageField()
    services = ServiceDetailSerializer(many=True)


# для записи
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

    def validate(self, data):
        service = data["service"]
        date = data["date"]
        time_selected = data["time"]

        selected_datetime = datetime.combine(date, time_selected)

        appointments = Appointment.objects.filter(service=service, date=date)

        for appt in appointments:
            appt_datetime = datetime.combine(appt.date, appt.time)
            diff = abs((appt_datetime - selected_datetime).total_seconds())
            if diff < 3600:
                raise serializers.ValidationError(
                    "Это время недоступно, интервал между записями 1 час"
                )

        return data
