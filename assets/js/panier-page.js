function renderPanier() {
  const cart = getCart();
  const emptyEl = document.getElementById('panierEmpty');
  const itemsEl = document.getElementById('panierItems');
  const footerEl = document.getElementById('panierFooter');

  if (!cart.length) {
    emptyEl.style.display = '';
    itemsEl.style.display = 'none';
    footerEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  itemsEl.style.display = '';
  footerEl.style.display = '';

  itemsEl.innerHTML = cart.map(item => {
    const p = produits[item.id];
    if (!p) return '';
    const total = (p.price * item.qty).toFixed(2).replace('.', ',');
    return '<div class="panier-item">' +
      '<img src="' + p.images[0] + '" alt="' + p.name + '" class="panier-item-img">' +
      '<div class="panier-item-info">' +
        '<a href="produit.html?id=' + p.id + '" class="panier-item-name">' + p.name + '</a>' +
        '<span class="panier-item-price">' + p.price.toFixed(2).replace('.', ',') + '€</span>' +
      '</div>' +
      '<div class="panier-item-qty">' +
        '<button class="qty-btn-sm" data-id="' + p.id + '" data-action="minus">−</button>' +
        '<span>' + item.qty + '</span>' +
        '<button class="qty-btn-sm" data-id="' + p.id + '" data-action="plus">+</button>' +
      '</div>' +
      '<div class="panier-item-total">' + total + '€</div>' +
      '<button class="panier-item-remove" data-id="' + p.id + '" aria-label="Supprimer">✕</button>' +
    '</div>';
  }).join('');

  document.getElementById('panierTotalAmount').textContent =
    cartTotal().toFixed(2).replace('.', ',') + '€';

  // Qty buttons
  itemsEl.querySelectorAll('.qty-btn-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const cart = getCart();
      const item = cart.find(i => i.id === id);
      if (!item) return;
      if (btn.dataset.action === 'plus') updateQty(id, item.qty + 1);
      else updateQty(id, item.qty - 1);
      renderPanier();
    });
  });

  // Remove buttons
  itemsEl.querySelectorAll('.panier-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      renderPanier();
    });
  });
}

document.getElementById('checkoutBtn').addEventListener('click', checkout);
document.getElementById('clearCartBtn').addEventListener('click', () => {
  clearCart();
  renderPanier();
});

renderPanier();
