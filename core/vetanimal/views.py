from rest_framework.permissions import IsAdminUser

from rest_framework.permissions import IsAuthenticated


from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status, generics
from .models import Category, Appointment, Review
from .serializers import CategoryListSerializer, AppointmentListSerializer, ReviewListSerializer
from django.shortcuts import get_object_or_404
from .filters import AppointmentFilter
from .models import Category, Service
from rest_framework.pagination import PageNumberPagination
from drf_yasg.utils import swagger_auto_schema












class AppointmentPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50

class IndexPageAPIView(APIView):

    def get(self, request):
        # ------------------- 1. Категории -------------------
        categories = Category.objects.all()
        categories_data = CategoryListSerializer(categories, many=True).data

        # ------------------- 2. Фильтрация записей по категории -------------------
        appointments = Appointment.objects.all().order_by("-created_at")
        appointment_filter = AppointmentFilter(request.GET, queryset=appointments)
        appointments = appointment_filter.qs

        # ------------------- 3. Пагинация -------------------
        paginator = AppointmentPagination()
        paginated_appointments = paginator.paginate_queryset(appointments, request)
        # Сериализуем записи (AppointmentSerializer нужно настроить)
        appointments_data = AppointmentListSerializer(paginated_appointments, many=True).data

        # ------------------- 4. JSON ответ -------------------
        return paginator.get_paginated_response({
            "categories": categories_data,
            "appointments": appointments_data
        })





class AppointmentListView(APIView):
    permission_classes = [IsAdminUser]  # ✅ Только админ

    def get(self, request):
        appointments = Appointment.objects.all().order_by("-date", "-time")
        serializer = AppointmentListSerializer(appointments, many=True)
        return Response(serializer.data)

class ReviewCreateAPIView (APIView):
    permission_classes = [IsAuthenticated]


    def post(self, request):
        serializer = ReviewListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewPageAPIView(APIView):
    def get(self, request):
        reviews= Review.objects.all().order_by("-created_at")
        serializer = ReviewListSerializer(reviews, many=True)
        return Response(serializer.data)
#Канайым

# список услуг для каждой категории
class CategoryDetailAPIView(APIView):
    @swagger_auto_schema(responses={200: CategoryListSerializer()})
    def get(self, request, category_name):
        category = get_object_or_404(Category, name__iexact=category_name)


        # Берём все услуги, связанные с этой категорией из базы
        services_qs = Service.objects.filter(category=category)

        services = [
            {
                "title": service.title,
                "description": service.description or "",
                "price": float(service.price) if service.price else 0
            }
            for service in services_qs
        ]

        data = {
            "id": category.id,
            "name": category.name,
            "photo": category.photo.url if category.photo else "",
            "services": services
        }

        return Response(data)

# создание приёма
class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentListSerializer

# список приёмов
class AppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentListSerializer
