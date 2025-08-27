from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer
from django.contrib.auth import login, logout
from .serializers import UserLoginSerializer



class UserRegisterView(APIView):
    def post(self, request):
        serializers = UserRegisterSerializer(data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status.HTTP_201_CREATED)
        return Response(status.HTTP_400_BAD_REQUEST)



class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)  # Создаём сессию пользователя
            return Response({"message": "Вы успешно вошли!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserLogoutView(APIView):
    def post(self, request):
        logout(request)  # Удаляет сессию пользователя
        return Response({"message": "Вы успешно вышли!"}, status=status.HTTP_200_OK)