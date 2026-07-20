from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Producto

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role', 'foto', 'estado')}),
    )
    list_display = ['username', 'email', 'role', 'estado', 'is_staff']

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'precio', 'stock', 'estado']
    list_filter = ['categoria', 'estado']
    search_fields = ['nombre', 'descripcion']
