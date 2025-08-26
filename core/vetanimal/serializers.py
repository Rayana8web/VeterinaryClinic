from datetime import datetime, time

from rest_framework import serializers
from .models import Category, Animal, Service,  Record, Review


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
class RecordListSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field="name",  # или другое поле
        queryset=Category.objects.all()
    )
    service = serializers.SlugRelatedField(
        slug_field="name",  # или другое поле
        queryset=Service.objects.all()
    )

    class Meta:
        model = Record
        fields = "__all__"

    def validate(self, data):
        service = data["service"]
        date = data["date"]
        time_selected = data["time"]

        # Ограничиваем рабочее время 08:00–18:00
        if not (time(8, 0) <= time_selected <= time(18, 0)):
            raise serializers.ValidationError(
                {"time": "Запись возможна только с 08:00 до 18:00"}
            )

        selected_datetime = datetime.combine(date, time_selected)

        # Проверяем, есть ли запись в то же время
        if Record.objects.filter(service=service, date=date, time=time_selected).exists():
            raise serializers.ValidationError(
                {"time": "Это время уже занято, выберите другое"}
            )

        # Проверяем интервал в 1 час
        records = Record.objects.filter(service=service, date=date)
        for appt in records:
            appt_datetime = datetime.combine(appt.date, appt.time)
            diff = abs((appt_datetime - selected_datetime).total_seconds())
            if diff < 3600:
                raise serializers.ValidationError(
                    {"time": "Интервал между записями должен быть минимум 1 час"}
                )

        return data

class ReviewListSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # имя пользователя

    class Meta:
        model = Review
        fields = ["id", "user", "text", "created_at"]