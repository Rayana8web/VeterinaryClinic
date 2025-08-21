from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Animal, Service,  Category
from .serializers import AnimalListSerializer, ServiceListSerializer,   CategoryListSerializer

class IndexPageAPIView(APIView):

    def get(self, request):

        # категории животных
        categories = Category.objects.all()
        categories_serializer = CategoryListSerializer(categories, many=True)

        #  последние добавленные животные
        latest_animals = Animal.objects.order_by('-id')[:6]  #  последних животных
        animals_serializer = AnimalListSerializer(latest_animals, many=True)

        #  услуги
        services = Service.objects.all()[:6]  # 6 популярных услуг
        services_serializer = ServiceListSerializer(services, many=True)



        # Собираем все данные в один JSON
        data = {

            'categories': categories_serializer.data,
            'latest_animals': animals_serializer.data,
            'services': services_serializer.data,

        }

        return Response(data)

