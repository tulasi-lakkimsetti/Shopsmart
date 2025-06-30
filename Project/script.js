// --- Utils ---
function updateCartCount() {
  const count = JSON.parse(localStorage.getItem('cart') || '[]').length;
  document.getElementById('cart-count').textContent = count;
}

// --- Fetch & Render ---
async function loadCategories() {
  const res = await fetch('/api/categories');
  const cats = await res.json();
  const container = document.getElementById('category-list');
  cats.forEach(c => {
    const div = document.createElement('div');
    div.className = 'category';
    div.textContent = c.name;
    container.append(div);
  });
}

async function loadProducts() {
  const res = await fetch('/api/products');
  const prods = await res.json();
  const container = document.getElementById('product-list');
  prods.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.name}" width="100%">
      <h3>${p.name}</h3>
      <p>${p.price} ₹</p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    `;
    container.append(div);
  });
}

async function loadReviews() {
  const res = await fetch('/api/reviews');
  const revs = await res.json();
  const container = document.getElementById('review-list');
  revs.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `<strong>${r.user}</strong><p>"${r.comment}"</p>`;
    container.append(div);
  });
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Added to cart!');
}

// --- Cart rendering ---
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  cart.forEach(id => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.textContent = `Product ID: ${id}`; // Or fetch details
    container.append(div);
  });
}

// --- Initialize ---
window.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  loadProducts();
  loadReviews();
  updateCartCount();
  document.getElementById('checkout').addEventListener('click', loadCart);
});
