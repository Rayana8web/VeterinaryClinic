from .serializers import UserRegisterSerializer
from django.contrib.auth import login, logout
from .serializers import UserLoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

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


User = get_user_model()
token_generator = PasswordResetTokenGenerator()

class RequestPasswordReset(APIView):
    def post(self, request):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "If that email exists, a reset link was sent."}, status=200)

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        reset_link = f"http://localhost:3000/reset/{uidb64}/{token}/"  # frontend link

        send_mail(
            "Password Reset",
            f"Click the link to reset your password: {reset_link}",
            settings.EMAIL_HOST_USER,
            [user.email],
        )
        return Response({"detail": "Password reset link sent."}, status=200)


class ResetPassword(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({"detail": "Invalid link"}, status=400)

        if not token_generator.check_token(user, token):
            return Response({"detail": "Invalid or expired token"}, status=400)

        password = request.data.get("password")
        if not password:
            return Response({"detail": "Password is required"}, status=400)

        user.set_password(password)
        user.save()
        return Response({"detail": "Password has been reset."}, status=200)
