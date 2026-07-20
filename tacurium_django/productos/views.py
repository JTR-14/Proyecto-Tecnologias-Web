import json
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib import messages
from django.db.models import Q
from django.core.files.storage import default_storage
from django.contrib.auth.decorators import user_passes_test

from .models import Producto, User
from .forms import ProductoForm

# Check if user is admin
def is_admin(user):
    return user.is_authenticated and user.role == 'admin'

# Catalog and Pages
def home(request):
    buscar = request.GET.get("buscar")
    if buscar:
        productos = Producto.objects.filter(estado=True).filter(
            Q(descripcion__icontains=buscar) | Q(nombre__icontains=buscar)
        )
    else:
        productos = Producto.objects.filter(estado=True)
    return render(request, 'index.html', {'productos': productos, 'buscar': buscar})

def componentes(request):
    buscar = request.GET.get("buscar")
    if buscar:
        productos = Producto.objects.filter(estado=True, categoria='Componentes').filter(
            Q(descripcion__icontains=buscar) | Q(nombre__icontains=buscar)
        )
    else:
        productos = Producto.objects.filter(estado=True, categoria='Componentes')
    return render(request, 'subpaginas/componentes.html', {'productos': productos, 'buscar': buscar})

def pcsgamer(request):
    buscar = request.GET.get("buscar")
    if buscar:
        productos = Producto.objects.filter(estado=True, categoria='PCs Gamer').filter(
            Q(descripcion__icontains=buscar) | Q(nombre__icontains=buscar)
        )
    else:
        productos = Producto.objects.filter(estado=True, categoria='PCs Gamer')
    return render(request, 'subpaginas/pcsgamer.html', {'productos': productos, 'buscar': buscar})

def perifericos(request):
    buscar = request.GET.get("buscar")
    if buscar:
        productos = Producto.objects.filter(estado=True, categoria='Perifericos').filter(
            Q(descripcion__icontains=buscar) | Q(nombre__icontains=buscar)
        )
    else:
        productos = Producto.objects.filter(estado=True, categoria='Perifericos')
    return render(request, 'subpaginas/perifericos.html', {'productos': productos, 'buscar': buscar})

def videojuegos(request):
    buscar = request.GET.get("buscar")
    if buscar:
        productos = Producto.objects.filter(estado=True, categoria='Videojuegos').filter(
            Q(descripcion__icontains=buscar) | Q(nombre__icontains=buscar)
        )
    else:
        productos = Producto.objects.filter(estado=True, categoria='Videojuegos')
    return render(request, 'subpaginas/videojuegos.html', {'productos': productos, 'buscar': buscar})

def acerca(request):
    return render(request, 'subpaginas/acerca.html')

# Profile & Auth
@login_required
def usuario(request):
    return render(request, 'subpaginas/usuario.html')

@login_required
@require_POST
def actualizar_foto(request):
    if request.FILES.get('foto'):
        user = request.user
        foto_file = request.FILES['foto']
        path = default_storage.save(f'avatars/{foto_file.name}', foto_file)
        user.foto = '/media/' + path
        user.save()
        messages.success(request, 'Foto de perfil actualizada correctamente.')
    return redirect('usuario')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        if not email or not password:
            messages.error(request, 'Todos los campos son obligatorios.')
            return redirect('home')
        try:
            user_obj = User.objects.get(email=email, estado=True)
            user = authenticate(request, username=user_obj.username, password=password)
            if user is not None:
                login(request, user)
                return redirect('usuario')
            else:
                messages.error(request, 'Las credenciales no coinciden con nuestros registros.')
        except User.DoesNotExist:
            messages.error(request, 'Las credenciales no coinciden con nuestros registros.')
        return redirect('home')
    return render(request, 'auth/login.html')

def register_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirmation')

        if not name or not email or not password:
            messages.error(request, 'Todos los campos son obligatorios.')
            return redirect('home')

        if password != password_confirm:
            messages.error(request, 'Las contraseñas no coinciden.')
            return redirect('home')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'El correo electrónico ya está registrado.')
            return redirect('home')

        username = email.split('@')[0]
        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            name=name,
            first_name=name
        )
        login(request, user)
        return redirect('home')
    return render(request, 'auth/register.html')

def logout_view(request):
    logout(request)
    return redirect('home')

# Product CRUD (Explicit Function-Based Views as requested)
@user_passes_test(is_admin, login_url='home')
def admin_productos(request):
    buscar = request.GET.get("buscar")
    if buscar:
        productos = Producto.objects.filter(estado=True).filter(
            Q(descripcion__icontains=buscar) | Q(nombre__icontains=buscar)
        )
    else:
        productos = Producto.objects.filter(estado=True)
    
    form = ProductoForm()
    return render(request, 'subpaginas/admin.html', {
        'productos': productos,
        'form': form,
        'buscar': buscar
    })

@user_passes_test(is_admin, login_url='home')
@require_POST
def agregar_producto(request):
    form = ProductoForm(request.POST)
    if form.is_valid():
        form.save()
        messages.success(request, 'Producto creado exitosamente')
    else:
        messages.error(request, 'Error al guardar el producto. Por favor verifica los datos.')
    return redirect('admin')

@user_passes_test(is_admin, login_url='home')
def editar_producto(request, id):
    producto = get_object_or_404(Producto, id=id, estado=True)
    if request.method == 'POST':
        form = ProductoForm(request.POST, instance=producto)
        if form.is_valid():
            form.save()
            messages.success(request, 'Producto actualizado exitosamente')
            return redirect('admin')
        else:
            messages.error(request, 'Error al actualizar el producto.')
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'subpaginas/editar_producto.html', {'form': form, 'producto': producto})

@user_passes_test(is_admin, login_url='home')
def eliminar_producto(request, id):
    # Soft Delete as requested:
    # "NO ejecutes .delete(). Cambia categoria.estado = False, guarda con categoria.save() y redirige al listado."
    producto = get_object_or_404(Producto, id=id)
    producto.estado = False
    producto.save()
    messages.success(request, 'Producto eliminado exitosamente')
    return redirect('admin')
