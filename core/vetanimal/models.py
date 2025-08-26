from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from datetime import time





class Category(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="categories/")

    def __str__(self):
        return self.name

class Animal(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="animals")

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class Service(models.Model):
    title = models.CharField(max_length=255, null=True, blank=True)  # Название услуги
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="services")
    photo = models.ImageField(upload_to="services/", blank=True, null=True)


    def __str__(self):
        return f"{self.title} ({self.category.name})"


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return self.name


User = get_user_model()

class Record(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="records"
    )
    service = models.ForeignKey(
        "Service",
        on_delete=models.CASCADE,
        related_name="records"
    )
    category = models.ForeignKey(
        "Category",
        on_delete=models.CASCADE,
        related_name="records"
    )
    full_name = models.CharField(max_length=255)  # ФИО владельца
    email = models.EmailField()
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.service.title} ({self.category.name}) [{self.date} {self.time}]"

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"



