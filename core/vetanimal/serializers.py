from datetime import datetime, time
from rest_framework import serializers
from .models import Category, Animal, Service,  Record, Review, Doctor



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
    class Meta:
        model = Record
        fields = ['animal', 'doctor', 'service', 'category', 'full_name', 'email', 'date', 'time']

    def validate(self, attrs):
        # Проверка, что выбранное время свободно
        doctor = attrs.get('doctor')
        date = attrs.get('date')
        time = attrs.get('time')

        if Record.objects.filter(doctor=doctor, date=date, time=time).exists():
            raise serializers.ValidationError("В это время доктор уже занят. Выберите другое время.")

        # Проверка интервала с
        if not (8 <= time.hour < 18):
            raise serializers.ValidationError("Запись возможна только с 08:00 до 18:00.")

        # Проверка на часовой интервал между записями
        existing_times = Record.objects.filter(doctor=doctor, date=date).values_list('time', flat=True)
        for t in existing_times:
            if abs((datetime.combine(date, t) - datetime.combine(date, time)).seconds) < 3600:
                raise serializers.ValidationError("Интервал между записями должен быть не менее 1 часа.")

        return attrs



class ReviewListSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # имя пользователя

    class Meta:
        model = Review
        fields = ["id", "user", "text", "created_at"]



class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = ["id", "name", "specialization"]