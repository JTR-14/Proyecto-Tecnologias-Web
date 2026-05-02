document.addEventListener('DOMContentLoaded', () => {
    // === ESTADO (Persistencia con LocalStorage) ===
    let cart = JSON.parse(localStorage.getItem('gamestore_cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('gamestore_wishlist')) || [];

    const saveState = () => {
        localStorage.setItem('gamestore_cart', JSON.stringify(cart));
        localStorage.setItem('gamestore_wishlist', JSON.stringify(wishlist));
        updateCounters();
        renderCart();
        renderWishlist();
        syncWishlistButtons();
    };

    // === CONTADORES ===
    const cartCounterEl = document.getElementById('cartCounter');
    const wishlistCounterEl = document.getElementById('wishlistCounter');

    const updateCounters = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCounterEl) cartCounterEl.textContent = totalItems;
        if (wishlistCounterEl) wishlistCounterEl.textContent = wishlist.length;
    };

    // === INYECTAR MODALES DE CARRITO Y WISHLIST ===
    const injectSidebars = () => {
        const sidebarHTML = `
        <!-- Overlay -->
        <div id="sidebarOverlay" class="fixed inset-0 bg-black/60 z-[110] hidden transition-opacity"></div>
        
        <!-- Cart Sidebar -->
        <div id="cartSidebar" class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-card border-l border-bordercolor shadow-2xl z-[120] transform translate-x-full transition-transform duration-300 flex flex-col">
            <div class="p-6 border-b border-bordercolor flex justify-between items-center bg-background">
                <h2 class="text-xl font-bold text-white flex items-center gap-2"><span class="text-2xl">🛒</span> Tu Carrito</h2>
                <button id="closeCartBtn" class="text-textsec hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div id="cartItemsContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
                <!-- Items here -->
            </div>
            <div class="p-6 border-t border-bordercolor bg-background">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-textsec">Total:</span>
                    <span id="cartTotal" class="text-2xl font-bold text-white">S/ 0.00</span>
                </div>
                <button id="checkoutBtn" class="w-full bg-primary hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-colors">Comprar</button>
            </div>
        </div>

        <!-- Wishlist Sidebar -->
        <div id="wishlistSidebar" class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-card border-l border-bordercolor shadow-2xl z-[120] transform translate-x-full transition-transform duration-300 flex flex-col">
            <div class="p-6 border-b border-bordercolor flex justify-between items-center bg-background">
                <h2 class="text-xl font-bold text-white flex items-center gap-2"><span class="text-2xl">❤️</span> Tus Deseos</h2>
                <button id="closeWishlistBtn" class="text-textsec hover:text-white transition-colors">
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

    // === FUNCIONES DE RENDERIZADO ===
    const parsePrice = (priceStr) => {
        // Extrae el número de "S/ 2,499.00" -> 2499.00
        return parseFloat(priceStr.replace(/[^0-9.-]+/g,""));
    };

    const renderCart = () => {
        const container = document.getElementById('cartItemsContainer');
        const totalEl = document.getElementById('cartTotal');
        container.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = `<div class="text-center text-textsec mt-10"><p class="mb-4 text-4xl">🛒</p><p>Tu carrito está vacío.</p></div>`;
            totalEl.textContent = 'S/ 0.00';
            return;
        }

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const itemHTML = `
            <div class="flex items-center gap-4 bg-background p-3 rounded-lg border border-bordercolor">
                <img src="${item.img}" alt="${item.title}" class="w-16 h-16 object-cover rounded-md bg-card">
                <div class="flex-1">
                    <h4 class="text-white text-sm font-semibold line-clamp-1">${item.title}</h4>
                    <p class="text-primary text-sm font-bold">S/ ${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="bg-card text-textsec hover:text-white px-2 py-1 rounded decrease-qty" data-index="${index}">-</button>
                        <span class="text-white text-sm w-4 text-center">${item.quantity}</span>
                        <button class="bg-card text-textsec hover:text-white px-2 py-1 rounded increase-qty" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="text-red-500 hover:text-red-400 p-2 remove-from-cart" data-index="${index}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);
        });

        totalEl.textContent = `S/ ${total.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

        // Eventos de botones dentro del carrito
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.dataset.index;
                cart[idx].quantity++;
                saveState();
            });
        });
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.dataset.index;
                if (cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                } else {
                    cart.splice(idx, 1);
                }
                saveState();
            });
        });
        document.querySelectorAll('.remove-from-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.dataset.index;
                cart.splice(idx, 1);
                saveState();
            });
        });
    };

    const renderWishlist = () => {
        const container = document.getElementById('wishlistItemsContainer');
        container.innerHTML = '';

        if (wishlist.length === 0) {
            container.innerHTML = `<div class="text-center text-textsec mt-10"><p class="mb-4 text-4xl">💔</p><p>Aún no tienes deseos.</p></div>`;
            return;
        }

        wishlist.forEach((item, index) => {
            const itemHTML = `
            <div class="flex items-center gap-4 bg-background p-3 rounded-lg border border-bordercolor">
                <img src="${item.img}" alt="${item.title}" class="w-16 h-16 object-cover rounded-md bg-card">
                <div class="flex-1">
                    <h4 class="text-white text-sm font-semibold line-clamp-1">${item.title}</h4>
                    <p class="text-primary text-sm font-bold">S/ ${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                </div>
                <button class="bg-primary hover:bg-purple-600 text-white p-2 rounded-lg transition-colors move-to-cart" data-index="${index}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </button>
                <button class="text-textsec hover:text-red-500 p-2 remove-from-wishlist" data-index="${index}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);
        });

        document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.dataset.index;
                wishlist.splice(idx, 1);
                saveState();
            });
        });

        document.querySelectorAll('.move-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.dataset.index;
                const item = wishlist[idx];
                
                const existingItem = cart.find(i => i.title === item.title);
                if (existingItem) existingItem.quantity++;
                else cart.push({ ...item, quantity: 1 });
                
                wishlist.splice(idx, 1);
                saveState();
                
                // Switch sidebar
                closeSidebar(wishlistSidebar);
                setTimeout(() => openSidebar(cartSidebar), 300);
            });
        });
    };

    const syncWishlistButtons = () => {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            const card = btn.closest('article');
            if(!card) return;
            const title = card.querySelector('.product-title').textContent.trim();
            const svg = btn.querySelector('svg');
            
            const isWished = wishlist.some(i => i.title === title);
            if (isWished) {
                btn.classList.add('liked');
                svg.setAttribute('fill', 'currentColor');
                svg.classList.add('text-red-500');
            } else {
                btn.classList.remove('liked');
                svg.setAttribute('fill', 'none');
                svg.classList.remove('text-red-500');
            }
        });
    };

    // === MANEJO DE SIDEBARS ===
    const openSidebar = (sidebar) => {
        sidebarOverlay.classList.remove('hidden');
        setTimeout(() => sidebar.classList.remove('translate-x-full'), 10);
    };

    const closeSidebar = (sidebar) => {
        sidebar.classList.add('translate-x-full');
        setTimeout(() => sidebarOverlay.classList.add('hidden'), 300);
    };

    if (cartOpenBtn) cartOpenBtn.addEventListener('click', () => openSidebar(cartSidebar));
    if (wishlistOpenBtn) wishlistOpenBtn.addEventListener('click', () => openSidebar(wishlistSidebar));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => closeSidebar(cartSidebar));
    if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', () => closeSidebar(wishlistSidebar));
    
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
            if (cart.length > 0) {
                alert('¡Compra simulada con éxito! Has comprado ' + cart.reduce((s,i)=>s+i.quantity,0) + ' items.');
                cart = [];
                saveState();
                closeSidebar(cartSidebar);
            } else {
                alert('El carrito está vacío.');
            }
        });
    }


    // === EVENTOS EN PRODUCTOS (Añadir al Carrito / Wishlist) ===
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('article');
            const title = card.querySelector('.product-title').textContent.trim();
            const priceStr = card.querySelector('.font-bold.text-xl').textContent.trim();
            const price = parsePrice(priceStr);
            const img = card.querySelector('img').src;

            const existingItem = cart.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ title, price, img, quantity: 1 });
            }
            saveState();

            // Feedback visual rápido
            const originalBg = btn.className;
            btn.classList.add('bg-green-500');
            setTimeout(() => btn.classList.remove('bg-green-500'), 300);
        });
    });

    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('article');
            const title = card.querySelector('.product-title').textContent.trim();
            const priceStr = card.querySelector('.font-bold.text-xl').textContent.trim();
            const price = parsePrice(priceStr);
            const img = card.querySelector('img').src;

            const existingIndex = wishlist.findIndex(item => item.title === title);
            if (existingIndex >= 0) {
                wishlist.splice(existingIndex, 1); // Quitar
            } else {
                wishlist.push({ title, price, img }); // Añadir
            }
            saveState();
        });
    });

    // === INICIALIZAR ESTADO VISUAL ===
    updateCounters();
    renderCart();
    renderWishlist();
    syncWishlistButtons();


    // === MENÚ RESPONSIVE (Hamburguesa) ===
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }

    // === MODALES DE LOGIN / REGISTRO ===
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');
    const openRegisterLink = document.getElementById('openRegisterLink');
    const openLoginLink = document.getElementById('openLoginLink');

    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
            loginModal.classList.add('flex');
        });
    }
    if (closeLogin && loginModal) closeLogin.addEventListener('click', () => { loginModal.classList.add('hidden'); loginModal.classList.remove('flex'); });
    if (closeRegister && registerModal) closeRegister.addEventListener('click', () => { registerModal.classList.add('hidden'); registerModal.classList.remove('flex'); });

    if (openRegisterLink && loginModal && registerModal) {
        openRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('hidden'); loginModal.classList.remove('flex');
            registerModal.classList.remove('hidden'); registerModal.classList.add('flex');
        });
    }
    if (openLoginLink && loginModal && registerModal) {
        openLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.classList.add('hidden'); registerModal.classList.remove('flex');
            loginModal.classList.remove('hidden'); loginModal.classList.add('flex');
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) { loginModal.classList.add('hidden'); loginModal.classList.remove('flex'); }
        if (e.target === registerModal) { registerModal.classList.add('hidden'); registerModal.classList.remove('flex'); }
    });


    // === BARRA DE BÚSQUEDA ===
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                card.style.display = title.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }

    // === PESTAÑAS DE FILTRO ===
    const tabTodos = document.getElementById('tab-todos');
    const tabOfertas = document.getElementById('tab-ofertas');
    const tabNovedades = document.getElementById('tab-novedades');
    const tabs = [tabTodos, tabOfertas, tabNovedades];

    const filterProducts = (category, activeTab) => {
        tabs.forEach(t => { if(t) { t.classList.remove('text-primary', 'border-b-2', 'border-primary'); t.classList.add('text-textsec'); }});
        if (activeTab) { activeTab.classList.remove('text-textsec'); activeTab.classList.add('text-primary', 'border-b-2', 'border-primary'); }
        
        productCards.forEach(card => {
            if (category === 'todos' || card.dataset.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    if (tabTodos) tabTodos.addEventListener('click', () => filterProducts('todos', tabTodos));
    if (tabOfertas) tabOfertas.addEventListener('click', () => filterProducts('oferta', tabOfertas));
    if (tabNovedades) tabNovedades.addEventListener('click', () => filterProducts('novedad', tabNovedades));
});
