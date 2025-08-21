from django.contrib import admin

from .models import Animal, Category, Product, Service

admin.site.register (Animal),
admin.site.register (Category),
admin.site.register (Product),
admin.site.register (Service),
