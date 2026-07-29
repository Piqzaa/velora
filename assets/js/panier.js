const CART_KEY = 'velora_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty) {
  if (!qty || qty < 1) qty = 1;
  let cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
  updateCartBadge();
}

function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
}

function updateQty(id, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    if (qty < 1) {
      cart = cart.filter(i => i.id !== id);
    } else {
      item.qty = qty;
    }
  }
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function cartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const p = produits[item.id];
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function checkout() {
  const total = cartTotal();
  if (total <= 0) return;
  alert('Paiement Stripe à venir — total : ' + total.toFixed(2).replace('.', ',') + '€');
}

document.addEventListener('DOMContentLoaded', updateCartBadge);