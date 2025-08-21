from rest_framework import serializers
from .models import  Category, Animal, Service, Product


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

class ProductListSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ["id", "title", "description", "price", "photo", "category"]

