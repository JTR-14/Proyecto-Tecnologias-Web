document.addEventListener('DOMContentLoaded', () => {
    // 1. Contadores
    let cartCount = 0;
    let wishlistCount = 0;

    const cartCounterEl = document.getElementById('cartCounter');
    const wishlistCounterEl = document.getElementById('wishlistCounter');

    // 2. Añadir al Carrito
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            if (cartCounterEl) cartCounterEl.textContent = cartCount;
            // Feedback visual rápido
            const originalBg = btn.className;
            btn.classList.add('bg-green-500');
            setTimeout(() => {
                btn.classList.remove('bg-green-500');
            }, 300);
        });
    });

    // 3. Toggle Lista de Deseos (Corazón)
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const svg = btn.querySelector('svg');
            const isLiked = btn.classList.contains('liked');
            
            if (isLiked) {
                btn.classList.remove('liked');
                svg.setAttribute('fill', 'none');
                svg.classList.remove('text-red-500');
                wishlistCount = Math.max(0, wishlistCount - 1);
            } else {
                btn.classList.add('liked');
                svg.setAttribute('fill', 'currentColor');
                svg.classList.add('text-red-500');
                wishlistCount++;
            }
            if (wishlistCounterEl) wishlistCounterEl.textContent = wishlistCount;
        });
    });

    // 4. Modales de Login y Registro
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

    if (closeLogin && loginModal) {
        closeLogin.addEventListener('click', () => {
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
        });
    }

    if (closeRegister && registerModal) {
        closeRegister.addEventListener('click', () => {
            registerModal.classList.add('hidden');
            registerModal.classList.remove('flex');
        });
    }

    if (openRegisterLink && loginModal && registerModal) {
        openRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
            registerModal.classList.remove('hidden');
            registerModal.classList.add('flex');
        });
    }

    if (openLoginLink && loginModal && registerModal) {
        openLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.classList.add('hidden');
            registerModal.classList.remove('flex');
            loginModal.classList.remove('hidden');
            loginModal.classList.add('flex');
        });
    }

    // Cerrar modales al hacer clic en el fondo oscuro
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
        }
        if (e.target === registerModal) {
            registerModal.classList.add('hidden');
            registerModal.classList.remove('flex');
        }
    });

    // 5. Barra de Búsqueda
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 6. Pestañas de Filtro (Ofertas, Novedades)
    const tabTodos = document.getElementById('tab-todos');
    const tabOfertas = document.getElementById('tab-ofertas');
    const tabNovedades = document.getElementById('tab-novedades');
    const tabs = [tabTodos, tabOfertas, tabNovedades];

    const filterProducts = (category, activeTab) => {
        // Resetear estilos
        tabs.forEach(t => {
            if(t) {
                t.classList.remove('text-primary', 'border-b-2', 'border-primary');
                t.classList.add('text-textsec');
            }
        });
        
        // Activar tab actual
        if (activeTab) {
            activeTab.classList.remove('text-textsec');
            activeTab.classList.add('text-primary', 'border-b-2', 'border-primary');
        }

        productCards.forEach(card => {
            if (category === 'todos') {
                card.style.display = 'flex';
            } else {
                if (card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    };

    if (tabTodos) tabTodos.addEventListener('click', () => filterProducts('todos', tabTodos));
    if (tabOfertas) tabOfertas.addEventListener('click', () => filterProducts('oferta', tabOfertas));
    if (tabNovedades) tabNovedades.addEventListener('click', () => filterProducts('novedad', tabNovedades));
});
