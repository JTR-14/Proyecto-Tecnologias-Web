@extends('layouts.app')

@section('content')
<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-black dark:text-white mb-6">Panel de Administración de Productos</h1>

    @if(session('success'))
        <div class="bg-green-500 text-white p-4 rounded-lg mb-6">
            {{ session('success') }}
        </div>
    @endif

    <!-- Formulario para agregar producto -->
    <div class="bg-black border border-white rounded-xl p-6 mb-8 shadow-lg">
        <h2 class="text-xl font-semibold text-white mb-4">Añadir Nuevo Producto</h2>
        
        <form action="{{ route('productos.store') }}" method="POST" class="space-y-4">
            @csrf
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="nombre" class="block text-sm font-medium text-white mb-1">Nombre del Producto</label>
                    <input type="text" name="nombre" id="nombre" required 
                        class="w-full bg-black border border-white text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5">
                </div>

                <div>
                    <label for="categoria" class="block text-sm font-medium text-white mb-1">Categoría</label>
                    <select name="categoria" id="categoria" required 
                        class="w-full bg-black border border-white text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5">
                        <option value="" disabled selected>Selecciona una categoría</option>
                        <option value="Componentes">Componentes</option>
                        <option value="PCs Gamer">PCs Gamer</option>
                        <option value="Perifericos">Periféricos</option>
                        <option value="Videojuegos">Videojuegos</option>
                    </select>
                </div>
            </div>

            <div>
                <label for="descripcion" class="block text-sm font-medium text-white mb-1">Descripción</label>
                <textarea name="descripcion" id="descripcion" rows="3" 
                    class="w-full bg-black border border-white text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="precio" class="block text-sm font-medium text-white mb-1">Precio (S/)</label>
                    <input type="number" step="0.01" name="precio" id="precio" required 
                        class="w-full bg-black border border-white text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5">
                </div>

                <div>
                    <label for="imagen" class="block text-sm font-medium text-white mb-1">URL de la Imagen</label>
                    <input type="url" name="imagen" id="imagen" 
                        class="w-full bg-black border border-white text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5">
                </div>
            </div>

            <button type="submit" class="w-full md:w-auto px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-purple-600 transition-colors">
                Guardar Producto
            </button>
        </form>
    </div>

    <!-- Lista de Productos -->
    <div class="bg-card border border-bordercolor rounded-xl shadow-lg overflow-hidden">
        <div class="p-6 border-b border-bordercolor">
            <h2 class="text-xl font-semibold text-white">Productos Existentes</h2>
        </div>
        
        <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-textsec">
                <thead class="text-xs text-textsec uppercase bg-background border-b border-bordercolor">
                    <tr>
                        <th scope="col" class="px-6 py-3">Imagen</th>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">Categoría</th>
                        <th scope="col" class="px-6 py-3">Precio</th>
                        <th scope="col" class="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($productos as $producto)
                        <tr class="border-b border-bordercolor hover:bg-background/50">
                            <td class="px-6 py-4">
                                @if($producto->imagen)
                                    <img src="{{ $producto->imagen }}" alt="{{ $producto->nombre }}" class="w-16 h-16 object-cover rounded">
                                @else
                                    <div class="w-16 h-16 bg-gray-700 flex items-center justify-center rounded text-xs">Sin img</div>
                                @endif
                            </td>
                            <td class="px-6 py-4 font-medium text-white">
                                {{ $producto->nombre }}
                            </td>
                            <td class="px-6 py-4 text-textsec">
                                <span class="bg-gray-800 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-600">{{ $producto->categoria }}</span>
                            </td>
                            <td class="px-6 py-4">
                                S/ {{ number_format($producto->precio, 2) }}
                            </td>
                            <td class="px-6 py-4">
                                <form action="{{ route('productos.destroy', $producto->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de eliminar este producto?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-500 hover:text-red-400 font-medium">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-6 py-4 text-center text-textsec">No hay productos registrados todavía.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
