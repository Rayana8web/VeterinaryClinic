from django.db import models


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
    title = models.CharField(max_length=255)  # Название услуги
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="services")

    def __str__(self):
        return f"{self.title} ({self.category.name})"

class Appointment(models.Model):
    owner_name = models.CharField(max_length=100)  # имя владельца
    owner_phone = models.CharField(max_length=20)  # телефон владельца
    animal = models.ForeignKey("Animal", on_delete=models.CASCADE, related_name="appointments")
    date = models.DateField()  # день приёма
    time = models.TimeField()  # время приёма
    reason = models.TextField(blank=True, null=True)  # причина визита / жалобы

    created_at = models.DateTimeField(auto_now_add=True)  # когда запись создана

    def __str__(self):
        return f"Запись {self.owner_name} ({self.animal.name}) на {self.date} {self.time}"





