from datetime import datetime

from rest_framework import serializers
from .models import Category, Animal, Service,  Appointment, Review


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
        fields = ["id", "title", "description", "price", "category", "photo"]





#Канайым
# для услуги
class ServiceDetailSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    photo = serializers.ImageField(required=False)


# для категории
class CategoryDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    photo = serializers.ImageField()
    services = ServiceDetailSerializer(many=True)


# для записи
class AppointmentListSerializer(serializers.ModelSerializer):
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


class ReviewListSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # имя пользователя

    class Meta:
        model = Review
        fields = ["id", "user", "text", "created_at"]