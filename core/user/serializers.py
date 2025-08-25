from rest_framework import serializers
from .models import MyUser
from django.contrib.auth import authenticate


class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ('email', 'username', 'password')

    def create(self, validated_data):
        user = MyUser(**validated_data)

        user.set_password(validated_data['password'])
        user.save()

        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if user and user.is_active:
            data['user'] = user
            return data
        raise serializers.ValidationError("Неверный email или пароль")