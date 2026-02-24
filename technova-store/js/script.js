const products = [
    {
        id: 1,
        name: "ASUS ROG Strix G15",
        category: "laptopovi",
        price: 185000,
        image: "images/asus-rog.webp",
        description: "Gaming laptop sa AMD Ryzen 9 procesorom, RTX 4070, 16GB RAM, 1TB SSD, 300Hz ekran."
    },
    {
        id: 2,
        name: "Apple iPhone 15 Pro Max",
        category: "telefoni",
        price: 165000,
        image: "images/apple-iphone.webp",
        description: "Apple A17 Pro čip, 6.7\" Super Retina XDR, 48MP kamera, Titanium dizajn."
    },
    {
        id: 3,
        name: "Sony WH-1000XM5",
        category: "slusalice",
        price: 42000,
        image: "images/sony-wh.webp",
        description: "Industrijski vodeća ANC, 30h baterija, studijski kvalitet zvuka."
    },
    {
        id: 4,
        name: "Logitech G PRO",
        category: "misevi",
        price: 9500,
        image: "images/logitech-mouse.webp",
        description: "Profesionalni gaming miš, HERO 25K senzor, 25.600 DPI, ultra-lagan."
    },
    {
        id: 5,
        name: "Corsair K70 RGB PRO",
        category: "tastature",
        price: 18500,
        image: "images/Corsair-K70.png",
        description: "CHERRY MX Red prekidači, PBT keycaps, 8000Hz polling rate, RGB."
    },
    {
        id: 6,
        name: "Apple Watch Ultra",
        category: "smart-satovi",
        price: 95000,
        image: "images/apple-watch.jpg",
        description: "49mm titanium kućište, 100m vodootpornost, 36h baterija, GPS."
    },
    {
        id: 7,
        name: "Samsung Galaxy S24 Ultra",
        category: "telefoni",
        price: 155000,
        image: "images/samsung-galaxy.webp",
        description: "200MP kamera, S Pen, 6.8\" QHD+ 120Hz, 5000mAh, AI funkcije."
    },
    {
        id: 8,
        name: "MacBook Pro M3",
        category: "laptopovi",
        price: 245000,
        image: "images/apple-macbook-pro.webp",
        description: "Apple M3 čip, 14\" Liquid Retina XDR, 18h baterija, 8GB/512GB."
    },
    {
        id: 9,
        name: "AirPods Pro 2",
        category: "slusalice",
        price: 32000,
        image: "images/apple-airpods.webp",
        description: "Active Noise Cancellation, 2x jači ANC, 6h slušanja, MagSafe."
    },
    {
        id: 10,
        name: "Samsung Odyssey OLED G9",
        category: "monitori",
        price: 185000,
        image: "images/samsung-odyssey.jpg",
        description: "49\" DQHD 240Hz OLED, 0.03ms, zakrivljen, HDR400 True Black."
    },
    {
        id: 11,
        name: "Garmin Fenix 7",
        category: "smart-satovi",
        price: 75000,
        image: "images/Garmin-fenix.png",
        description: "Multisport GPS sat, solar punjenje, TOPO mape, 18 dana baterija."
    },
    {
        id: 12,
        name: "Keychron V3",
        category: "tastature",
        price: 12500,
        image: "images/Keychron-V3.png",
        description: "QMK/VIA programabilna, hot-swappable, South-facing RGB, TKL."
    },
    {
        id: 13,
        name: "iPad Pro 2024",
        category: "tableti",
        price: 145000,
        image: "images/apple-ipad-pro.webp",
        description: "M4 čip, 11\" Ultra Retina XDR, 256GB, Apple Pencil Pro podrška."
    },
    {
        id: 14,
        name: "Samsung Galaxy Watch",
        category: "smart-satovi",
        price: 35000,
        image: "images/Samsung-Galaxy-Watch.png",
        description: "46mm, AMOLED ekran, 4GB, GPS, 472mAh baterija."
    },
    {
        id: 15,
        name: "Apple Watch Ultra Orange",
        category: "smart-satovi",
        price: 95000,
        image: "images/apple-watch-orange.jpg",
        description: "49mm titanium, narandžasti Alpine Loop, 100m vodootpornost."
    },
    {
        id: 16,
        name: "iPhone 15 Pro Titanium",
        category: "telefoni",
        price: 145000,
        image: "images/apple-iphone-15-pro-titanium.webp",
        description: "Titanium dizajn, A17 Pro, 6.1\" 120Hz ProMotion, 48MP."
    },
    
];


let cart = [];

const formatPrice = (price) => {
    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'RSD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Generisanje HTML-a za proizvod

const generateProductHTML = (product) => {
    const { id, name, category, price, image, description } = product;
    
    return `
        <article class="product-card" data-id="${id}" data-category="${category}" data-price="${price}" data-name="${name.toLowerCase()}">
            <div class="product-image">
                <img src="${image}" alt="${name}" loading="lazy">
                <span class="product-category">${category}</span>
            </div>
            <div class="product-content">
                <h3 class="product-title">${name}</h3>
                <p class="product-desc">${description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(price)}</span>
                    <button class="btn-add-cart" data-id="${id}" aria-label="Dodaj u korpu">
                        <span class="material-symbols-outlined">
                            add
                        </span>
                    </button>
                </div>
            </div>
        </article>
    `;
};

const renderProducts = (productsToRender) => {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!productsGrid) return;
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    productsGrid.innerHTML = productsToRender.map(product => generateProductHTML(product)).join('');
};

// Filtriranje, pretraga i sortiranje

const filterProducts = () => {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    let filtered = [...products];
    
    // Filtriranje po kategoriji
    if (categoryFilter && categoryFilter.value !== 'all') {
        filtered = filtered.filter(p => p.category === categoryFilter.value);
    }
    
    // Pretraga
    if (searchInput && searchInput.value.trim()) {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sortiranje
    if (sortSelect) {
        const sortValue = sortSelect.value;
        switch (sortValue) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                filtered.sort((a, b) => a.id - b.id);
        }
    }
    
    renderProducts(filtered);
};

const debouncedFilter = debounce(filterProducts, 300);

// Korpa funkcionalnosti

const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification(`${product.name} dodat u korpu`);
    openCart();
};

const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
};

const updateQuantity = (productId, change) => {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
    }
};

const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
};

const updateCartUI = () => {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartCount) {
        cartCount.textContent = getTotalItems();
    }
    
    if (cartTotal) {
        cartTotal.textContent = formatPrice(calculateTotal());
    }
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <p>Vaša korpa je prazna</p>
                    <span>Dodajte proizvode da biste započeli kupovinu</span>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80/111827/00f5ff?text=${encodeURIComponent(item.name.charAt(0))}'">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <span class="cart-item-category">${item.category}</span>
                        <span class="cart-item-price">${formatPrice(item.price)} x ${item.quantity}</span>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}" aria-label="Ukloni iz korpe">
                        <span class="material-symbols-outlined">
                            close_small
                        </span>
                    </button>
                </div>
            `).join('');
        }
    }
};

const openCart = () => {
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartPanel) cartPanel.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
};

const closeCart = () => {
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartPanel) cartPanel.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
};


const showNotification = (message) => {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
};

// Validacija forme

const validationRules = {
    firstName: {
        pattern: /^[a-zA-ZčćđšžČĆĐŠŽ\s]{2,30}$/,
        message: 'Ime mora sadržati samo slova (2-30 karaktera)'
    },
    lastName: {
        pattern: /^[a-zA-ZčćđšžČĆĐŠŽ\s]{2,30}$/,
        message: 'Prezime mora sadržati samo slova (2-30 karaktera)'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Unesite validnu email adresu'
    },
    phone: {
        pattern: /^[\+]?[0-9\s\-\(\)]{9,20}$/,
        message: 'Unesite validan broj telefona'
    },
    subject: {
        pattern: /.+/,
        message: 'Izaberite temu'
    },
    message: {
        pattern: /.{10,500}/,
        message: 'Poruka mora imati najmanje 10 karaktera'
    }
};

const validateField = (fieldName, value) => {
    const rule = validationRules[fieldName];
    if (!rule) return { valid: true, message: '' };
    
    const valid = rule.pattern.test(value.trim());
    return {
        valid,
        message: valid ? '' : rule.message
    };
};

const showFieldError = (fieldId, message) => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    if (field) {
        field.classList.toggle('error', !!message);
    }
    if (errorElement) {
        errorElement.textContent = message;
    }
};

const validateForm = (formData) => {
    const errors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(fieldName => {
        const value = formData.get(fieldName) || '';
        const validation = validateField(fieldName, value);
        
        if (!validation.valid) {
            errors[fieldName] = validation.message;
            isValid = false;
        }
        
        showFieldError(fieldName, validation.message);
    });
    
    // Provera checkbox-a
    const terms = formData.get('terms');
    if (!terms) {
        errors.terms = 'Morate prihvatiti uslove korišćenja';
        showFieldError('terms', 'Morate prihvatiti uslove korišćenja');
        isValid = false;
    } else {
        showFieldError('terms', '');
    }
    
    return { isValid, errors };
};

const handleProductClick = (e) => {
    const addToCartBtn = e.target.closest('.btn-add-cart');
    
    if (addToCartBtn) {
        const productId = parseInt(addToCartBtn.dataset.id);
        addToCart(productId);
    }
};

const handleCartClick = (e) => {
    const removeBtn = e.target.closest('.cart-item-remove');
    
    if (removeBtn) {
        const productId = parseInt(removeBtn.dataset.id);
        removeFromCart(productId);
    }
};

const initScrollAnimations = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Dodavanje fade-in klase elementima
    const animatableElements = document.querySelectorAll(
        '.feature-card, .product-card, .mission-card, .team-card, .testimonial-card, .skill-card, .faq-item'
    );
    
    animatableElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
};

// Mobile menu

const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('open');
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
            });
        });
        const closeMenuOnOutsideClick = (e) => {
            if (navMenu.classList.contains('open')) {
                if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navMenu.classList.remove('open');
                    mobileMenuBtn.classList.remove('open');
                }
            }
        };
        
        document.addEventListener('click', closeMenuOnOutsideClick);
        document.addEventListener('touchstart', closeMenuOnOutsideClick);
        navMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
};

// Navbar scroll efekat
const initNavbarScroll = () => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(11, 15, 26, 0.95)';
        } else {
            header.style.background = 'rgba(11, 15, 26, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
};

$(document).ready(function() {
    // Smooth scroll za anchor linkove
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });  
});

document.addEventListener('DOMContentLoaded', () => {
    // Render proizvoda na početnoj stranici
    if (document.getElementById('productsGrid')) {
        renderProducts(products);
    }
    
    // Event listener-i za filtere
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', debouncedFilter);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', filterProducts);
    }
    
    // Event delegation za proizvode
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.addEventListener('click', handleProductClick);
    }
    
    // Korpa dugme
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    
    // Zatvaranje korpe
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    // Event delegation za korpu
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        cartItems.addEventListener('click', handleCartClick);
    }
    
    // Checkout dugme
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Korpa je prazna!');
            } else {
                window.location.href = 'kontakt.html';
            }
        });
    }
    
    // Forma validacija
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const { isValid } = validateForm(formData);
            
            if (isValid) {
                const modal = document.getElementById('successModal');
                if (modal) {
                    modal.classList.add('show');
                }
                contactForm.reset();
            }
        });
        
        // Real-time validacija
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                const fieldName = input.name;
                const value = input.value;
                const validation = validateField(fieldName, value);
                showFieldError(fieldName, validation.message);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    const fieldName = input.name;
                    const value = input.value;
                    const validation = validateField(fieldName, value);
                    if (validation.valid) {
                        showFieldError(fieldName, '');
                    }
                }
            });
        });
    }
    
    // Modal zatvaranje
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const successModal = document.getElementById('successModal');
    
    if (modalCloseBtn && successModal) {
        modalCloseBtn.addEventListener('click', () => {
            successModal.classList.remove('show');
        });
        
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }

    // Inicijalizacija ostalih funkcija
    initScrollAnimations();
    initMobileMenu();
    initNavbarScroll();
    updateCartUI();

    // Escape key za zatvaranje korpe i modala
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            if (successModal) {
                successModal.classList.remove('show');
            }
        }
    });
});

// Pretraga iz URL-a
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash === '#products') {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            setTimeout(() => {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
});
