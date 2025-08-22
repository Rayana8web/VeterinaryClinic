from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status, generics

from .models import Category, Animal, Record, Appointment
from .serializers import CategoryListSerializer, AnimalListSerializer, RecordListSerializer, AppointmentSerializer
from django.shortcuts import get_object_or_404





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

#Канайым

# список услуг для каждой категории
CATEGORY_SPECIFIC_SERVICES = {
    "кошка": ["Чистка зубов", "Записаться на терапию", "Купить лекарства", "Записаться на вакцинацию"],
    "собака": ["Чистка зубов", "Записаться на терапию", "Купить лекарства", "Записаться на вакцинацию"],
}

class CategoryDetailAPIView(APIView):

    def get(self, request, category_id):
        category = get_object_or_404(Category, id=category_id)

        service_titles = CATEGORY_SPECIFIC_SERVICES.get(category.name, [])

        services = [
            {"title": title, "description": "", "price": 0}
            for title in service_titles
        ]

        data = {
            "id": category_id,
            "name": category.name,
            "photo": category.photo.url if category.photo else "",
            "services": services
        }

        return Response(data)


# создание приёма
class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

# список приёмов
class AppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
