from django.contrib import admin

from .models import Animal, Category,  Service, Appointment, Review

admin.site.register (Animal),
admin.site.register (Category),
admin.site.register (Review),
admin.site.register (Service),
admin.site.register (Appointment),
