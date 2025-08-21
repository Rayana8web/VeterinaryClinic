from django.contrib import admin

from .models import Animal, Category, Appointment, Service

admin.site.register (Animal),
admin.site.register (Category),
admin.site.register (Appointment),
admin.site.register (Service),
