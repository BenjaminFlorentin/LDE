// ============================================================
// Mes Courses - logique de l'app
// ============================================================

const STORAGE_KEY = 'courses.cart.v1';
const CUSTOM_EMOJI = '📌';

// --- DOM refs ---
const viewHome     = document.getElementById('view-home');
const viewProducts = document.getElementById('view-products');
const cartBlock    = document.getElementById('cart-block');
const cartStatus   = document.getElementById('cart-status');
const cartList     = document.getElementById('cart-list');
const btnOpen      = document.getElementById('btn-open-products');
const btnBack      = document.getElementById('btn-back');
const searchInput  = document.getElementById('search-input');
const productsGrid = document.getElementById('products-grid');
const customAdd    = document.getElementById('custom-add');
const noResults    = document.getElementById('no-results');
const toast        = document.getElementById('toast');

// --- State ---
let cart = loadCart();

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// Removes accents and lowercases — "Pêché" -> "peche"
function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

// --- View switching ---
function showView(name) {
    viewHome.classList.toggle('active', name === 'home');
    viewProducts.classList.toggle('active', name === 'products');
    window.scrollTo(0, 0);
    if (name === 'products') {
        searchInput.value = '';
        renderProducts('');
        setTimeout(() => searchInput.focus(), 100);
    } else {
        renderCart();
    }
}

// --- Cart operations ---
function addProduct(product) {
    if (cart.some(item => item.id === product.id)) {
        showToast(`${product.emoji} Déjà dans ton caddie`);
        return;
    }
    cart.push({
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        done: false,
        custom: !!product.custom,
        addedAt: Date.now()
    });
    saveCart();
    renderProducts(searchInput.value);
    showToast(`${product.emoji} ${product.name} ajouté${product.name.endsWith('e') ? 'e' : ''}`);
}

function addCustom(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = 'custom-' + normalize(trimmed).replace(/\s+/g, '-') + '-' + Date.now().toString(36);
    addProduct({ id, name: trimmed, emoji: CUSTOM_EMOJI, custom: true });
    searchInput.value = '';
    renderProducts('');
}

function toggleItem(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.done = !item.done;
    saveCart();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

// --- Rendering ---
function renderCart() {
    // Cart block state
    const count = cart.length;
    cartBlock.classList.toggle('empty', count === 0);
    if (count === 0) {
        cartStatus.textContent = 'Ton caddie est vide';
    } else {
        cartStatus.textContent = `${count} article${count > 1 ? 's' : ''} dans ton caddie`;
    }

    // List
    cartList.innerHTML = '';
    for (const item of cart) {
        const li = document.createElement('li');
        li.className = 'item' + (item.done ? ' done' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.done;
        checkbox.setAttribute('aria-label', 'Marquer comme pris');
        checkbox.addEventListener('change', () => toggleItem(item.id));

        const emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.textContent = item.emoji || CUSTOM_EMOJI;

        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = item.name;

        const del = document.createElement('button');
        del.className = 'delete';
        del.setAttribute('aria-label', 'Supprimer l\'article');
        del.textContent = '×';
        del.addEventListener('click', () => removeItem(item.id));

        li.append(checkbox, emoji, name, del);
        cartList.append(li);
    }
}

function renderProducts(query) {
    const q = normalize(query);
    const inCartIds = new Set(cart.map(i => i.id));

    // Filter catalog
    const matches = q
        ? PRODUCTS.filter(p => normalize(p.name).includes(q))
        : PRODUCTS.slice();

    // Custom-add button: show only when query is non-empty and no exact match
    const exactMatch = q && PRODUCTS.some(p => normalize(p.name) === q);
    if (q && !exactMatch) {
        customAdd.textContent = `+ Ajouter "${query.trim()}" à ma liste`;
        customAdd.hidden = false;
    } else {
        customAdd.hidden = true;
    }

    // Grid
    productsGrid.innerHTML = '';
    for (const p of matches) {
        const btn = document.createElement('button');
        btn.className = 'product-card' + (inCartIds.has(p.id) ? ' in-cart' : '');
        btn.setAttribute('aria-label', `Ajouter ${p.name}`);

        const em = document.createElement('span');
        em.className = 'emoji';
        em.textContent = p.emoji;

        const nm = document.createElement('span');
        nm.className = 'name';
        nm.textContent = p.name;

        btn.append(em, nm);
        btn.addEventListener('click', () => addProduct(p));
        productsGrid.append(btn);
    }

    // Show "no results" only if query set, no matches, and no custom-add fallback either
    noResults.hidden = !(q && matches.length === 0 && customAdd.hidden);
}

// --- Toast ---
let toastTimer;
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1500);
}

// --- Event wiring ---
btnOpen.addEventListener('click', () => showView('products'));
btnBack.addEventListener('click', () => showView('home'));

searchInput.addEventListener('input', (e) => renderProducts(e.target.value));
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (!q) return;
        const exact = PRODUCTS.find(p => normalize(p.name) === normalize(q));
        if (exact) addProduct(exact);
        else addCustom(q);
    }
});

customAdd.addEventListener('click', () => addCustom(searchInput.value));

// --- Initial render ---
renderCart();
