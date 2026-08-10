from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.home, name='home'),
    path('componentes/', views.componentes, name='componentes'),
    path('pcsgamer/', views.pcsgamer, name='pcsgamer'),
    path('perifericos/', views.perifericos, name='perifericos'),
    path('videojuegos/', views.videojuegos, name='videojuegos'),
    path('acerca/', views.acerca, name='acerca'),

    
    path('usuario/', views.usuario, name='usuario'),
    path('usuario/foto/', views.actualizar_foto, name='usuario.foto.actualizar'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),

   
    path('listaproductos/', views.admin_productos, name='admin'),
    path('agregarproducto/', views.agregar_producto, name='productos.store'),
    path('editarproducto/<int:id>/', views.editar_producto, name='productos.edit'),
    path('eliminarproducto/<int:id>/', views.eliminar_producto, name='productos.destroy'),
]
