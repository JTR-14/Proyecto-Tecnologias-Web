document.addEventListener('DOMContentLoaded', () => {
    // === ESTADO (Arrays locales para simular carrito y wishlist) ===
    // 'carrito' y 'listaDeseos' son arrays que almacenan objetos de productos en memoria del navegador.
    // No se guardan en base de datos; son solo para la interfaz de usuario.
    // Cada objeto en 'carrito' tiene: { title, price, img, quantity }
    // Cada objeto en 'listaDeseos' tiene: { title, price, img }
    // Cargar estado inicial desde localStorage si existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let listaDeseos = JSON.parse(localStorage.getItem('listaDeseos')) || [];

    // 'guardarEstado' actualiza toda la interfaz después de cambios en 'carrito' o 'listaDeseos'.
    // Llama a funciones para refrescar contadores, renderizar listas y sincronizar botones.
    const guardarEstado = () => {
        // Guardar en localStorage para persistencia entre páginas
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('listaDeseos', JSON.stringify(listaDeseos));

        actualizarContadores();  // Actualiza números en íconos (ej. "3" en carrito)
        renderizarCarrito();      // Vuelve a dibujar el contenido del sidebar del carrito
        renderizarListaDeseos();  // Vuelve a dibujar el contenido del sidebar de wishlist
        sincronizarBotonesListaDeseos();  // Actualiza botones de corazón en productos
    };

    // === CONTADORES (Cálculo de totales para íconos) ===
    // Referencias a elementos HTML donde se muestran los números.
    const cartCounterEl = document.getElementById('cartCounter');      // Ícono del carrito en header
    const wishlistCounterEl = document.getElementById('wishlistCounter');  // Ícono de wishlist en header

    // 'actualizarContadores' calcula y muestra el total de items.
    // Para carrito: suma las cantidades de todos los productos (ej. 2 PS5 + 1 Xbox = 3 total).
    // Para wishlist: cuenta la longitud del array (cada producto cuenta como 1).
    const actualizarContadores = () => {
        // Suma todas las 'quantity' en 'carrito' usando reduce (acumulador + item.quantity)
        const totalItems = carrito.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCounterEl) cartCounterEl.textContent = totalItems;  // Muestra el número en el ícono

        // Longitud del array 'listaDeseos' (cada item es 1)
        if (wishlistCounterEl) wishlistCounterEl.textContent = listaDeseos.length;  // Muestra el número en el ícono
    };

    // === INYECTAR MODALES DE CARRITO Y WISHLIST ===
    const injectSidebars = () => {
        const sidebarHTML = `
        <!-- Overlay -->
        <div id="sidebarOverlay" class="fixed inset-0 bg-black/30 z-[110] hidden transition-opacity"></div>
        
        <!-- Cart Sidebar -->
        <div id="cartSidebar" class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-black/50 border-l border-white/20 shadow-2xl z-[120] transform translate-x-full transition-transform duration-300 flex flex-col">
            <div class="p-6 border-b border-white/20 flex justify-between items-center bg-gray-900">
                <h2 class="text-xl font-bold text-white flex items-center gap-2">Tu Carrito</h2>
                <button id="closeCartBtn" class="text-white/70 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div id="cartItemsContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
                <!-- Items here -->
            </div>
            <div class="p-6 border-t border-white/20 bg-gray-900">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-white/70">Total:</span>
                    <span id="cartTotal" class="text-2xl font-bold text-white">S/ 0.00</span>
                </div>
                <button id="checkoutBtn" class="w-full bg-primary hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-colors">Comprar</button>
            </div>
        </div>

        <!-- Wishlist Sidebar -->
        <div id="wishlistSidebar" class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-black/50 border-l border-white/20 shadow-2xl z-[120] transform translate-x-full transition-transform duration-300 flex flex-col">
            <div class="p-6 border-b border-white/20 flex justify-between items-center bg-gray-900">
                <h2 class="text-xl font-bold text-white flex items-center gap-2">Tus Deseos</h2>
                <button id="closeWishlistBtn" class="text-white/70 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div id="wishlistItemsContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
                <!-- Items here -->
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
    };

    if (!document.getElementById('cartSidebar')) {
        injectSidebars();
    }

    // === ELEMENTOS DEL DOM (Sidebars) ===
    const cartSidebar = document.getElementById('cartSidebar');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    const cartOpenBtn = document.getElementById('cartOpenBtn');
    const wishlistOpenBtn = document.getElementById('wishlistOpenBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const closeWishlistBtn = document.getElementById('closeWishlistBtn');

    // === FUNCIONES DE RENDERIZADO (Generan HTML dinámico para sidebars) ===
    // 'parsearPrecio' extrae el número flotante de un string como "S/ 499.00" -> 499.00
    // Se usa para convertir precios de texto a números para cálculos.
    const parsearPrecio = (priceStr) => {
        return parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
    };

    // 'renderizarCarrito' dibuja el contenido del sidebar del carrito.
    // Calcula el total sumando (precio * cantidad) de cada item.
    // Genera HTML para cada producto con botones de + / - / eliminar.
    // Si el carrito está vacío, muestra mensaje.
    const renderizarCarrito = () => {
        const container = document.getElementById('cartItemsContainer');  // Contenedor donde se inserta el HTML
        const totalEl = document.getElementById('cartTotal');  // Elemento donde se muestra el total
        container.innerHTML = '';  // Limpia contenido anterior
        let total = 0;  // Variable para acumular el total (precio * cantidad)

        if (carrito.length === 0) {
            // Si no hay items, muestra mensaje vacío y total 0
            container.innerHTML = `<div class="text-center text-white/70 mt-10"><p>Tu carrito está vacío.</p></div>`;
            totalEl.textContent = 'S/ 0.00';
            return;
        }

        // Recorre cada item en 'carrito' para generar HTML
        carrito.forEach((item, index) => {
            total += item.price * item.quantity;  // Suma al total (ej. 499 * 2 = 998)
            const itemHTML = `
            <div class="flex items-center gap-4 bg-black p-3 rounded-lg border border-white/20">
                <img src="${item.img}" alt="${item.title}" class="w-16 h-16 object-cover rounded-md bg-gray-900">
                <div class="flex-1">
                    <h4 class="text-white text-sm font-semibold line-clamp-1">${item.title}</h4>
                    <p class="text-primary text-sm font-bold">S/ ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="bg-gray-800 text-white/70 hover:text-white px-2 py-1 rounded decrease-qty" data-index="${index}">-</button>
                        <span class="text-white text-sm w-4 text-center">${item.quantity}</span>
                        <button class="bg-gray-800 text-white/70 hover:text-white px-2 py-1 rounded increase-qty" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="text-red-500 hover:text-red-400 p-2 remove-from-cart" data-index="${index}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);  // Agrega el HTML al contenedor
        });

        // Muestra el total formateado (ej. "S/ 1,498.00")
        totalEl.textContent = `S/ ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

        // Agrega eventos a los botones generados dinámicamente
        // Botón "+" : aumenta cantidad en 1, luego refresca UI
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indice = e.currentTarget.dataset.index;  // Índice del item en 'carrito'
                carrito[indice].quantity++;  // Aumenta cantidad (ej. de 1 a 2)
                guardarEstado();  // Refresca contadores y renderiza de nuevo
            });
        });
        // Botón "-" : disminuye cantidad; si llega a 0, elimina el item
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indice = e.currentTarget.dataset.index;
                if (carrito[indice].quantity > 1) {
                    carrito[indice].quantity--;  // Disminuye (ej. de 2 a 1)
                } else {
                    carrito.splice(indice, 1);  // Elimina item si cantidad es 1
                }
                guardarEstado();  // Refresca UI
            });
        });
        // Botón eliminar: quita el item del array 'carrito'
        document.querySelectorAll('.remove-from-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indice = e.currentTarget.dataset.index;
                carrito.splice(indice, 1);  // Elimina item por índice
                guardarEstado();  // Refresca UI
            });
        });
    };

    // 'renderizarListaDeseos' dibuja el contenido del sidebar de wishlist.
    // No calcula total (solo muestra precio individual).
    // Genera HTML para cada producto con botones de "mover al carrito" y "eliminar".
    // Si está vacía, muestra mensaje.
    const renderizarListaDeseos = () => {
        const container = document.getElementById('wishlistItemsContainer');  // Contenedor del HTML
        container.innerHTML = '';  // Limpia contenido anterior

        if (listaDeseos.length === 0) {
            // Si no hay items, muestra mensaje vacío
            container.innerHTML = `<div class="text-center text-white/70 mt-10"><p>Aún no tienes deseos.</p></div>`;
            return;
        }

        // Recorre cada item en 'listaDeseos' para generar HTML
        listaDeseos.forEach((item, index) => {
            const itemHTML = `
            <div class="flex items-center gap-4 bg-black p-3 rounded-lg border border-white/20">
                <img src="${item.img}" alt="${item.title}" class="w-16 h-16 object-cover rounded-md bg-gray-900">
                <div class="flex-1">
                    <h4 class="text-white text-sm font-semibold line-clamp-1">${item.title}</h4>
                    <p class="text-primary text-sm font-bold">S/ ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <button class="bg-primary hover:bg-purple-600 text-white p-2 rounded-lg transition-colors move-to-cart" data-index="${index}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
                <button class="text-white/70 hover:text-red-500 p-2 remove-from-wishlist" data-index="${index}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);  // Agrega HTML
        });

        // Botón eliminar: quita el item del array 'listaDeseos'
        document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indice = e.currentTarget.dataset.index;
                listaDeseos.splice(indice, 1);  // Elimina por índice
                guardarEstado();  // Refresca UI
            });
        });

        // Botón "mover al carrito": transfiere item de 'listaDeseos' a 'carrito'
        // Si ya existe en carrito, aumenta cantidad; si no, lo agrega con quantity: 1
        document.querySelectorAll('.move-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const indice = e.currentTarget.dataset.index;
                const item = listaDeseos[indice];  // Item a mover

                // Busca si ya está en 'carrito' por título
                const itemExistente = carrito.find(i => i.title === item.title);
                if (itemExistente) {
                    itemExistente.quantity++;  // Aumenta cantidad si existe
                } else {
                    carrito.push({ ...item, quantity: 1 });  // Agrega nuevo con cantidad 1
                }

                listaDeseos.splice(indice, 1);  // Elimina de wishlist
                guardarEstado();  // Refresca UI y cambia a sidebar del carrito
                // Switch sidebar
                cerrarSidebar(wishlistSidebar);
                setTimeout(() => abrirSidebar(cartSidebar), 300);
            });
        });
    };

    // 'sincronizarBotonesListaDeseos' actualiza el estado visual de los botones de corazón en las tarjetas de productos.
    // Si un producto está en 'listaDeseos', el botón se ve "liked" (rojo y lleno); si no, normal.
    // Se ejecuta después de cambios para mantener consistencia.
    const sincronizarBotonesListaDeseos = () => {
        const botonesListaDeseos = document.querySelectorAll('.wishlist-btn');  // Todos los botones de wishlist en productos
        botonesListaDeseos.forEach(btn => {
            const card = btn.closest('article');  // Encuentra la tarjeta del producto
            if (!card) return;
            const titulo = card.querySelector('.product-title').textContent.trim();  // Título del producto
            const svg = btn.querySelector('svg');  // Ícono del corazón

            // Verifica si el título está en 'listaDeseos' usando 'some' (devuelve true/false)
            const estaEnListaDeseos = listaDeseos.some(i => i.title === titulo);
            if (estaEnListaDeseos) {
                btn.classList.add('liked');  // Agrega clase para estilo
                svg.setAttribute('fill', 'currentColor');  // Llena el corazón
                svg.classList.add('text-red-500');  // Color rojo
            } else {
                btn.classList.remove('liked');  // Quita clase
                svg.setAttribute('fill', 'none');  // Corazón vacío
                svg.classList.remove('text-red-500');  // Sin color rojo
            }
        });
    };

    // === MANEJO DE SIDEBARS ===
    const abrirSidebar = (sidebar) => {
        sidebarOverlay.classList.remove('hidden');
        setTimeout(() => sidebar.classList.remove('translate-x-full'), 10);
    };

    const cerrarSidebar = (sidebar) => {
        sidebar.classList.add('translate-x-full');
        setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
    };

    if (cartOpenBtn) cartOpenBtn.addEventListener('click', () => abrirSidebar(cartSidebar));
    if (wishlistOpenBtn) wishlistOpenBtn.addEventListener('click', () => abrirSidebar(wishlistSidebar));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => cerrarSidebar(cartSidebar));
    if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', () => cerrarSidebar(wishlistSidebar));

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            closeSidebar(cartSidebar);
            closeSidebar(wishlistSidebar);
        });
    }

    // Checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (carrito.length > 0) {
                alert('Funcionalidad de compra aún no está habilitada en esta vista.');
            } else {
                alert('El carrito está vacío.');
            }
        });
    }


    // === EVENTOS EN PRODUCTOS (Agregar al carrito / wishlist) ===
    // Botones "Añadir al carrito": extraen datos del producto y los agregan a 'carrito'.
    // Si ya existe, aumenta cantidad; si no, lo agrega con quantity: 1.
    const botonesAgregarCarrito = document.querySelectorAll('.add-to-cart-btn');
    botonesAgregarCarrito.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('article');  // Tarjeta del producto
            const titulo = card.querySelector('.product-title').textContent.trim();  // Título
            const precioTexto = card.querySelector('.font-bold.text-xl').textContent.trim();  // Precio como string
            const precio = parsearPrecio(precioTexto);  // Convierte a número (ej. "S/ 499.00" -> 499)
            const imagen = card.querySelector('img').src;  // URL de imagen

            // Busca si ya está en 'carrito' por título
            const itemExistente = carrito.find(item => item.title === titulo);
            if (itemExistente) {
                itemExistente.quantity++;  // Aumenta cantidad (ej. de 1 a 2)
            } else {
                // Agrega nuevo objeto con quantity: 1
                carrito.push({ title: titulo, price: precio, img: imagen, quantity: 1 });
            }
            guardarEstado();  // Refresca UI (contadores, renderiza carrito)

            // Feedback visual: cambia color del botón brevemente
            const originalBg = btn.className;
            btn.classList.add('bg-green-500');  // Verde para confirmar
            setTimeout(() => btn.classList.remove('bg-green-500'), 300);  // Vuelve a normal
        });
    });

    // Botones "Wishlist" (corazón): alternan agregar/quitar de 'listaDeseos'.
    // Si no está, lo agrega; si está, lo quita.
    const botonesListaDeseos = document.querySelectorAll('.wishlist-btn');
    botonesListaDeseos.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('article');  // Tarjeta del producto
            const titulo = card.querySelector('.product-title').textContent.trim();  // Título
            const precioTexto = card.querySelector('.font-bold.text-xl').textContent.trim();  // Precio
            const precio = parsearPrecio(precioTexto);  // Convierte a número
            const imagen = card.querySelector('img').src;  // Imagen

            // Busca índice en 'listaDeseos' por título
            const indiceExistente = listaDeseos.findIndex(item => item.title === titulo);
            if (indiceExistente >= 0) {
                listaDeseos.splice(indiceExistente, 1);  // Quita si existe
            } else {
                listaDeseos.push({ title: titulo, price: precio, img: imagen });  // Agrega si no existe
            }
            guardarEstado();  // Refresca UI (contadores, botones, renderiza wishlist)
        });
    });

    // === INICIALIZAR ESTADO VISUAL ===
    // Al cargar la página, ejecuta funciones para mostrar estado inicial.
    actualizarContadores();  // Muestra contadores en íconos (ej. "0")
    renderizarCarrito();      // Dibuja carrito vacío inicialmente
    renderizarListaDeseos();  // Dibuja wishlist vacía inicialmente
    sincronizarBotonesListaDeseos();  // Sincroniza botones de corazón (todos vacíos)


    // === MENÚ RESPONSIVE (Hamburguesa) ===
    // Botón hamburguesa: alterna mostrar/ocultar el menú móvil.
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');  // Agrega/quita clase 'hidden' para mostrar/ocultar
        });
    }

    // === NAVEGACIÓN ACTIVA ===
    // Resalta el enlace del menú que coincide con la URL actual.
    const navLinks = document.querySelectorAll('#mobileNav a');  // Enlaces en menú móvil
    const currentUrl = window.location.href;  // URL de la página actual

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.remove('text-textsec');  // Quita color gris
            link.classList.add('text-white');       // Agrega color blanco para resaltar
        }
    });



    // === MODALES DE LOGIN / REGISTRO ===
    // Manejo de apertura/cierre de modales de autenticación.
    const loginBtn = document.getElementById('loginBtn');          // Botón perfil en header
    const loginModal = document.getElementById('loginModal');      // Modal de login
    const registerModal = document.getElementById('registerModal'); // Modal de registro
    const closeLogin = document.getElementById('closeLogin');      // Botón cerrar login
    const closeRegister = document.getElementById('closeRegister'); // Botón cerrar registro
    const openRegisterLink = document.getElementById('openRegisterLink'); // Enlace "Regístrate" en login
    const openLoginLink = document.getElementById('openLoginLink');       // Enlace "Inicia Sesión" en registro

    // Abre modal de login al clic en botón perfil
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');  // Muestra modal
            loginModal.classList.add('flex');       // Centra con flexbox
        });
    }
    // Cierra modal de login
    if (closeLogin && loginModal) closeLogin.addEventListener('click', () => {
        loginModal.classList.add('hidden');    // Oculta
        loginModal.classList.remove('flex');   // Quita centrado
    });
    // Cierra modal de registro
    if (closeRegister && registerModal) closeRegister.addEventListener('click', () => {
        registerModal.classList.add('hidden');
        registerModal.classList.remove('flex');
    });

    // Desde login, abre registro
    if (openRegisterLink && loginModal && registerModal) {
        openRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();  // Evita navegación
            loginModal.classList.add('hidden'); loginModal.classList.remove('flex');  // Cierra login
            registerModal.classList.remove('hidden'); registerModal.classList.add('flex');  // Abre registro
        });
    }
    // Desde registro, abre login
    if (openLoginLink && loginModal && registerModal) {
        openLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.classList.add('hidden'); registerModal.classList.remove('flex');  // Cierra registro
            loginModal.classList.remove('hidden'); loginModal.classList.add('flex');       // Abre login
        });
    }
    // Clic fuera del modal lo cierra
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) { loginModal.classList.add('hidden'); loginModal.classList.remove('flex'); }
        if (e.target === registerModal) { registerModal.classList.add('hidden'); registerModal.classList.remove('flex'); }
    });

    // Validación cliente para login/register
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginClientError = document.getElementById('loginClientError');
    const registerClientError = document.getElementById('registerClientError');

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const showFormError = (element, message) => {
        if (!element) return;
        element.textContent = message;
        element.classList.remove('hidden');
    };

    const hideFormError = (element) => {
        if (!element) return;
        element.textContent = '';
        element.classList.add('hidden');
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            hideFormError(loginClientError);

            const email = loginForm.querySelector('input[name="email"]').value.trim();
            const password = loginForm.querySelector('input[name="password"]').value.trim();

            if (!email) {
                event.preventDefault();
                showFormError(loginClientError, 'Ingresa tu correo electrónico.');
                return;
            }

            if (!isValidEmail(email)) {
                event.preventDefault();
                showFormError(loginClientError, 'El correo electrónico no es válido.');
                return;
            }

            if (!password) {
                event.preventDefault();
                showFormError(loginClientError, 'Ingresa tu contraseña.');
                return;
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            hideFormError(registerClientError);

            const name = registerForm.querySelector('input[name="name"]').value.trim();
            const email = registerForm.querySelector('input[name="email"]').value.trim();
            const password = registerForm.querySelector('input[name="password"]').value.trim();
            const passwordConfirmation = registerForm.querySelector('input[name="password_confirmation"]').value.trim();

            if (!name) {
                event.preventDefault();
                showFormError(registerClientError, 'Ingresa tu nombre.');
                return;
            }

            if (!email) {
                event.preventDefault();
                showFormError(registerClientError, 'Ingresa tu correo electrónico.');
                return;
            }

            if (!isValidEmail(email)) {
                event.preventDefault();
                showFormError(registerClientError, 'El correo electrónico no es válido.');
                return;
            }

            if (!password) {
                event.preventDefault();
                showFormError(registerClientError, 'Ingresa una contraseña.');
                return;
            }

            if (password.length < 8) {
                event.preventDefault();
                showFormError(registerClientError, 'La contraseña debe tener al menos 8 caracteres.');
                return;
            }

            if (password !== passwordConfirmation) {
                event.preventDefault();
                showFormError(registerClientError, 'Las contraseñas no coinciden.');
                return;
            }
        });
    }

    // === BARRA DE BÚSQUEDA ===
    // Filtra productos por título al escribir en el input.
    const inputBusqueda = document.getElementById('searchInput');
    const tarjetasProducto = document.querySelectorAll('.product-card');

    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', (e) => {
            const terminoBusqueda = e.target.value.toLowerCase();  // Texto en minúsculas
            tarjetasProducto.forEach(card => {
                const titulo = card.querySelector('.product-title').textContent.toLowerCase();  // Título en minúsculas
                card.style.display = titulo.includes(terminoBusqueda) ? 'flex' : 'none';  // Muestra/oculta si coincide
            });
        });
    }

    // === PESTAÑAS DE FILTRO ===
    // Cambia vista de productos por categoría (todos, oferta, novedad).
    const pestañaTodos = document.getElementById('tab-todos');
    const pestañaOfertas = document.getElementById('tab-ofertas');
    const pestañaNovedades = document.getElementById('tab-novedades');
    const pestañas = [pestañaTodos, pestañaOfertas, pestañaNovedades];

    // 'filtrarProductos' filtra tarjetas por data-category y resalta tab activa
    const filtrarProductos = (categoria, pestañaActiva) => {
        pestañas.forEach(t => { if (t) { t.classList.remove('text-primary', 'border-b-2', 'border-primary'); t.classList.add('text-textsec'); } });  // Quita resalto de todos
        if (pestañaActiva) { pestañaActiva.classList.remove('text-textsec'); pestañaActiva.classList.add('text-primary', 'border-b-2', 'border-primary'); }  // Resalta activo
        tarjetasProducto.forEach(card => {
            if (categoria === 'todos' || card.dataset.category === categoria) {  // 'todos' muestra todo; otros filtran por atributo
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Eventos para cada tab
    if (pestañaTodos) pestañaTodos.addEventListener('click', () => filtrarProductos('todos', pestañaTodos));
    if (pestañaOfertas) pestañaOfertas.addEventListener('click', () => filtrarProductos('oferta', pestañaOfertas));
    if (pestañaNovedades) pestañaNovedades.addEventListener('click', () => filtrarProductos('novedad', pestañaNovedades));
});


// === CAMBIAR MODO OSCURO Y CLARO ===
// Botón modo: alterna clase 'dark' en <html> y guarda en localStorage.
const botonModo = document.getElementById("modeBtn");

// Al cargar, verifica si había modo oscuro guardado
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');  // Aplica modo oscuro
}

// Al clic, alterna y guarda
botonModo.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");  // Agrega/quita 'dark'
    const esOscuro = document.documentElement.classList.contains("dark");  // true si está oscuro
    localStorage.setItem('darkMode', esOscuro);  // Guarda preferencia (true/false)
});