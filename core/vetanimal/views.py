from rest_framework.permissions import IsAdminUser

from rest_framework.permissions import IsAuthenticated


from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from rest_framework import status, generics
from .models import Category, Record, Review
from .serializers import CategoryListSerializer, RecordListSerializer, ReviewListSerializer
from django.shortcuts import get_object_or_404
from .filters import RecordFilter
from .models import Category, Service
from rest_framework.pagination import PageNumberPagination
from drf_yasg.utils import swagger_auto_schema












class RecordPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50

class IndexPageAPIView(APIView):

    def get(self, request):
        # ------------------- 1. Категории -------------------
        categories = Category.objects.all()
        categories_data = CategoryListSerializer(categories, many=True).data

        # ------------------- 2. Фильтрация записей по категории -------------------
        records = Record.objects.all().order_by("-created_at")
        record_filter = RecordFilter(request.GET, queryset=records)
        records = record_filter.qs

        # ------------------- 3. Пагинация -------------------
        paginator = RecordPagination()
        paginated_records = paginator.paginate_queryset(records, request)
        # Сериализуем записи (RecordSerializer нужно настроить)
        records_data = RecordListSerializer(paginated_records, many=True).data

        # ------------------- 4. JSON ответ -------------------
        return paginator.get_paginated_response({
            "categories": categories_data,
            "records": records_data
        })

# создание приёма
class RecordCreateView(generics.CreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordListSerializer



class RecordListView(APIView):
    permission_classes = [IsAdminUser]  # ✅ Только админ

    def get(self, request):
        appointments = Record.objects.all().order_by("-date", "-time")
        serializer = RecordListSerializer(appointments, many=True)
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



# список приёмов
#class RecordListView(generics.ListAPIView):
    #queryset = Record.objects.all()
    #serializer_class = RecordListSerializer
