from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="categories/")

    def __str__(self):
        return self.name

class Animal(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    photo = models.ImageField(upload_to="animals/")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="animals")

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class Service(models.Model):
    title = models.CharField(max_length=255)  # Название услуги
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="services")

    def __str__(self):
        return f"{self.title} ({self.category.name})"


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    photo = models.ImageField(upload_to="products/")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")

    def __str__(self):
        return self.title




