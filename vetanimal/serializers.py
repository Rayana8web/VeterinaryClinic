from rest_framework import serializers
from .models import  Category, Animal, Service, Record


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

class RecordListSerializer(serializers.ModelSerializer): #этo для создания записи

    animal = serializers.PrimaryKeyRelatedField(queryset=Animal.objects.all())
    # передается айди животного

    class Meta:
        model = Record
        fields = ["id", "owner_name", "owner_phone", "animal", "date", "time", "reason", "created_at"]
        read_only_fields = ["created_at"]

