@extends('layouts.app')

@section('content')

<!-- Main Content -->
        <div id="default-carousel" class="relative w-full" data-carousel="slide">
            <div class="relative h-56 overflow-hidden rounded-base md:h-96">
                <!-- Item 1 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://pbs.twimg.com/media/GITR64wXgAA9Qns.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner promocional de nuevos lanzamientos">
                </div>
                <!-- Item 2 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://pbs.twimg.com/media/GITR64wXgAA9Qns.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner promocional de nuevos lanzamientos">
                </div>
                <!-- Item 3 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://pbs.twimg.com/media/GITR64wXgAA9Qns.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner promocional de nuevos lanzamientos">
                </div>
                <!-- Item 4 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://pbs.twimg.com/media/GITR64wXgAA9Qns.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner promocional de nuevos lanzamientos">
                </div>
                <!-- Item 5 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://pbs.twimg.com/media/GITR64wXgAA9Qns.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Banner promocional de nuevos lanzamientos">
                </div>
            </div>
            <!-- Slider indicators -->
            <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" class="w-3 h-3 rounded-base" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" class="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>
            <!-- Slider controls -->
            <button type="button" class="absolute top-0 inset-s-0 z-[400px] flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 inset-e-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>```
        </div>
        <!-- Encabezado de Sección -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 class="text-3xl font-bold text-black dark:text-white mb-1">Todos los Productos</h1>
                <p class="text-textsec text-sm">Mostrando todos los artículos disponibles</p>
            </div>
            <div class="flex items-center gap-4 w-full md:w-auto">
                <select class="bg-card border border-bordercolor text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" aria-label="Ordenar productos por">
                    <option>Mejor valorados</option>
                    <option>Menor precio</option>
                    <option>Mayor precio</option>
                </select>
            </div>
        </div>

        <!-- Filtros Tab -->
        <div class="flex gap-6 mb-8 border-b border-bordercolor overflow-x-auto">
            <button id="tab-todos" class="text-primary hover:text-primary border-b-2 border-primary pb-2 px-1 font-medium whitespace-nowrap cursor-pointer">Todos</button>
            <button id="tab-ofertas" class="text-textsec hover:text-primary pb-2 px-1 font-medium whitespace-nowrap transition-colors cursor-pointer">En oferta</button>
            <button id="tab-novedades" class="text-textsec hover:text-primary pb-2 px-1 font-medium whitespace-nowrap transition-colors cursor-pointer">Novedades</button>
        </div>

        <!-- Grid de Productos -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Producto 1 (Oferta) -->
            <article class="product-card bg-card rounded-xl border border-bordercolor overflow-hidden hover:border-primary transition-all group flex flex-col h-full shadow-lg relative" data-category="oferta">
                <div class="relative aspect-4/3 overflow-hidden bg-background flex items-center justify-center p-4">
                    <img src="https://pesonyb2c.vtexassets.com/arquivos/ids/224927-1600-auto?v=638660539931800000&width=1600&height=auto&aspect=true" alt="PlayStation 5" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300">
                    <span class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-10%</span>
                    <button class="wishlist-btn absolute top-3 right-3 p-2 bg-card rounded-full text-textsec hover:text-red-500 transition-colors shadow-lg" aria-label="Añadir a favoritos">
                        <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                </div>
                <div class="p-5 flex flex-col grow">
                    <div class="flex items-center gap-1 mb-2">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span class="text-xs text-textsec">4.9 (120)</span>
                    </div>
                    <h3 class="product-title text-white font-semibold text-lg mb-1 line-clamp-2">PlayStation 5 Consola</h3>
                    <p class="text-textsec text-sm mb-4">Videojuegos</p>
                    <div class="mt-auto flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-slate-400 line-through text-xs">S/ 550.00</span>
                            <span class="text-white font-bold text-xl">S/ 499.00</span>
                        </div>
                        <button class="add-to-cart-btn bg-primary hover:bg-purple-600 text-white hover:text-gray-200 p-2.5 rounded-lg transition-colors shadow-lg shadow-purple-500/60" aria-label="Añadir PlayStation 5 al carrito">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </article>

            <!-- Producto 2 (Normal) -->
            <article class="product-card bg-card rounded-xl border border-bordercolor overflow-hidden hover:border-primary transition-all group flex flex-col h-full shadow-lg relative" data-category="normal">
                <div class="relative aspect-4/3 overflow-hidden bg-background flex items-center justify-center p-4">
                    <img src="https://i.blogs.es/ce83f5/xbox-3/1024_2000.jpg" alt="Xbox Series X" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300">
                    <button class="wishlist-btn absolute top-3 right-3 p-2 bg-card rounded-full text-textsec hover:text-red-500 transition-colors shadow-lg" aria-label="Añadir a favoritos">
                        <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                </div>
                <div class="p-5 flex flex-col grow">
                    <div class="flex items-center gap-1 mb-2">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span class="text-xs text-textsec">4.8 (85)</span>
                    </div>
                    <h3 class="product-title text-white font-semibold text-lg mb-1 line-clamp-2">Xbox Series X 1TB</h3>
                    <p class="text-textsec text-sm mb-4">Videojuegos</p>
                    <div class="mt-auto flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-white font-bold text-xl">S/ 499.00</span>
                        </div>
                        <button class="add-to-cart-btn bg-primary hover:bg-purple-600 text-white hover:text-gray-200 p-2.5 rounded-lg transition-colors shadow-lg shadow-purple-500/60" aria-label="Añadir Xbox Series X al carrito">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </article>

            <!-- Producto 3 (Novedad) -->
            <article class="product-card bg-card rounded-xl border border-bordercolor overflow-hidden hover:border-primary transition-all group flex flex-col h-full shadow-lg relative" data-category="novedad">
                <div class="relative aspect-4/3 overflow-hidden bg-background flex items-center justify-center p-4">
                    <img src="https://www.awd-it.co.uk/media/catalog/product/x/p/xpanse_black_-_three_quarter_-_rgb.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=680&width=680&canvas=680:680" alt="PC Gamer" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300">
                    <span class="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">Novedad</span>
                    <button class="wishlist-btn absolute top-3 right-3 p-2 bg-card rounded-full text-textsec hover:text-red-500 transition-colors shadow-lg" aria-label="Añadir a favoritos">
                        <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                </div>
                <div class="p-5 flex flex-col grow">
                    <div class="flex items-center gap-1 mb-2">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span class="text-xs text-textsec">5.0 (42)</span>
                    </div>
                    <h3 class="product-title text-white font-semibold text-lg mb-1 line-clamp-2">PC Gamer Ultra RTX 4080</h3>
                    <p class="text-textsec text-sm mb-4">PCs Gamer</p>
                    <div class="mt-auto flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-white font-bold text-xl">S/ 2,499.00</span>
                        </div>
                        <button class="add-to-cart-btn bg-primary hover:bg-purple-600 text-white hover:text-gray-200 p-2.5 rounded-lg transition-colors shadow-lg shadow-purple-500/60" aria-label="Añadir PC Gamer Ultra al carrito">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </article>

            <!-- Producto 4 (Oferta) -->
            <article class="product-card bg-card rounded-xl border border-bordercolor overflow-hidden hover:border-primary transition-all group flex flex-col h-full shadow-lg relative" data-category="oferta">
                <div class="relative aspect-4/3 overflow-hidden bg-background flex items-center justify-center p-4">
                    <img src="https://cyccomputer.pe/62161-large_default/procesador-amd-ryzen-9-9950x3d-430ghz570ghz-128mb-16-core-am5-.jpg" alt="AMD Ryzen 9" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300">
                    <span class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-20%</span>
                    <button class="wishlist-btn absolute top-3 right-3 p-2 bg-card rounded-full text-textsec hover:text-red-500 transition-colors shadow-lg" aria-label="Añadir a favoritos">
                        <svg class="w-5 h-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </button>
                </div>
                <div class="p-5 flex flex-col grow">
                    <div class="flex items-center gap-1 mb-2">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span class="text-xs text-textsec">4.7 (210)</span>
                    </div>
                    <h3 class="product-title text-white font-semibold text-lg mb-1 line-clamp-2">AMD Ryzen 9 7950X</h3>
                    <p class="text-textsec text-sm mb-4">Componentes</p>
                    <div class="mt-auto flex items-center justify-between">
                        <div class="flex flex-col">
                            <span class="text-slate-400 line-through text-xs">S/ 750.00</span>
                            <span class="text-white font-bold text-xl">S/ 599.00</span>
                        </div>
                        <button class="add-to-cart-btn bg-primary hover:bg-purple-600 text-white hover:text-gray-200 p-2.5 rounded-lg transition-colors shadow-lg shadow-purple-500/60" aria-label="Añadir AMD Ryzen 9 al carrito">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                </div>
            </article>

        </section>
@endsection