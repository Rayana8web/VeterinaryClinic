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