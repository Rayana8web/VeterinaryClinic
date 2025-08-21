from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status

from .models import Category, Animal, Record
from .serializers import CategoryListSerializer, AnimalListSerializer, RecordListSerializer

class IndexPageAPIView(APIView):

    def get(self, request):
            # 1. выводит существующии категории
        categories = Category.objects.all()
        categories_data = CategoryListSerializer(categories, many=True).data

            # 2. Проверка поиска
        search_query = request.GET.get("q")  # ?q=Барсик

        if search_query:
                # 3. Если есть поиск, ищем по имени животного
            animals = Animal.objects.filter(
                    Q(name__icontains=search_query)  # ищем по имени
                )
            animals_data = AnimalListSerializer(animals, many=True).data
        else:
            animals_data = []  # если поиска нет, список пустой

            # 4. ответ JSON
        return Response({
                "categories": categories_data,  # категории на главной
                "search_results": animals_data  # результаты поиска
        })

class RecordCreateView(APIView):
    """
    POST /api/appointment/create/ → создать запись к ветеринару
    """
    def post(self, request):
        serializer = RecordListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Запись успешно создана!", "appointment": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecordListView(APIView):

    def get(self, request):
        appointments = Record.objects.all().order_by("-date", "-time")
        serializer = RecordListSerializer(appointments, many=True)
        return Response(serializer.data)
