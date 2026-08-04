let currentProduitId = null;
let currentQty = 1;

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'hamac';
  const p = getProduit(id);
  if (!p) { document.getElementById('productContainer').innerHTML = '<p style="text-align:center;padding:80px 0;">Produit introuvable.</p>'; return; }

  currentProduitId = p.id;
  currentQty = 1;
  document.getElementById('qtyValue').textContent = '1';
  document.title = 'Velora — ' + p.name;
  document.getElementById('breadcrumbName').textContent = p.name;

  document.getElementById('detailName').textContent = p.name;
  document.getElementById('detailDesc').textContent = p.longDesc;

  const eyebrow = document.getElementById('detailEyebrow');
  if (p.badge) { eyebrow.textContent = p.badge; } else { eyebrow.textContent = 'Produit phare'; }

  // Rating
  document.getElementById('detailRating').innerHTML =
    '<span class="stars-icons">' + '★'.repeat(5) + '</span> ' +
    '<span class="rating-text">' + p.rating + '/5 — ' + p.reviews + ' avis</span>';

  // Price
  const priceEl = document.getElementById('detailPrice');
  if (p.oldPrice) {
    priceEl.innerHTML = '<span class="current">' + p.price.toFixed(2).replace('.', ',') + '€</span> ' +
      '<span class="old">' + p.oldPrice.toFixed(2).replace('.', ',') + '€</span>';
  } else {
    priceEl.innerHTML = '<span class="current">' + p.price.toFixed(2).replace('.', ',') + '€</span>';
  }

  // Features
  const featuresEl = document.getElementById('detailFeatures');
  featuresEl.innerHTML = p.features.map(f => '<li>' + f + '</li>').join('');

  // Gallery
  const mainImg = document.getElementById('galleryMain');
  mainImg.src = p.images[0];
  mainImg.alt = p.name;

  const badge = document.getElementById('galleryBadge');
  badge.textContent = p.badge || '';
  badge.style.display = p.badge ? 'block' : 'none';

  const thumbsEl = document.getElementById('galleryThumbs');
  if (p.images.length <= 1) {
    thumbsEl.style.display = 'none';
  } else {
    thumbsEl.style.display = '';
    thumbsEl.innerHTML = p.images.map((img, i) =>
      '<div class="thumb' + (i === 0 ? ' active' : '') + '" data-index="' + i + '">' +
        '<img src="' + img + '" alt="' + p.name + '">' +
      '</div>'
    ).join('');

    thumbsEl.querySelectorAll('.thumb').forEach(el => {
      el.addEventListener('click', () => {
        thumbsEl.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
        mainImg.src = p.images[parseInt(el.dataset.index)];
      });
    });
  }

  // Related
  const relatedSection = document.getElementById('relatedSection');
  if (p.related && p.related.length) {
    relatedSection.style.display = '';
    const grid = document.getElementById('relatedGrid');
    const curPrice = p.price;
    grid.innerHTML = p.related.map(id => {
      const rp = produits[id];
      if (!rp) return '';
      const packTotal = (curPrice + rp.price).toFixed(2).replace('.', ',');
      return '<a href="produit.html?id=' + rp.id + '" class="comp-card">' +
        '<img src="' + rp.images[0] + '" alt="' + rp.name + '">' +
        '<div class="comp-body">' +
          '<h3>' + rp.name + '</h3>' +
          '<p class="comp-desc">' + rp.shortDesc + '</p>' +
          '<div class="comp-price">' + rp.price.toFixed(2).replace('.', ',') + '€</div>' +
          '<div class="comp-bundle">' +
            '<span class="comp-pack">Pack avec le ' + p.name + ' : <strong>' + packTotal + '€</strong></span>' +
            '<button type="button" class="btn-primary btn-sm add-pack" data-pack="' + rp.id + '">Ajouter le pack</button>' +
          '</div>' +
        '</div></a>';
    }).join('');

    grid.querySelectorAll('.add-pack').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const relatedId = btn.dataset.pack;
        addToCart(p.id, 1);
        addToCart(relatedId, 1);
        flyToCart(btn);
        showCartToast('Pack ' + p.name + ' + ' + produits[relatedId].name);
        flashAddedBtn(btn);
      });
    });
  }

  // Lenis scroll reveal for related
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('is-visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

// Qty
document.getElementById('qtyMinus').addEventListener('click', () => {
  if (currentQty > 1) { currentQty--; document.getElementById('qtyValue').textContent = currentQty; }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  if (currentQty < 99) { currentQty++; document.getElementById('qtyValue').textContent = currentQty; }
});

// Add to cart
document.getElementById('addToCartBtn').addEventListener('click', () => {
  if (!currentProduitId) return;
  addToCart(currentProduitId, currentQty);
  flyToCart(document.getElementById('addToCartBtn'));
  const p = getProduit(currentProduitId);
  showCartToast(p ? p.name : '');
});

// Buy now
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!currentProduitId) return;
  addToCart(currentProduitId, currentQty);
  window.location.href = 'panier.html';
});

// Window selector
const windowNotes = {
  lisse: 'Vitre lisse : adhérence maximale, aucune précaution particulière.',
  double: 'Double vitrage : parfait, les ventouses adhèrent sans souci.',
  pvc: 'PVC ancienne : nettoyez bien la vitre, puis verrouillez les leviers à fond.',
  depoli: 'Verre dépoli ou texturé : déconseillé, les ventouses risquent de ne pas tenir.'
};
document.querySelectorAll('.ws-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.ws-opt').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    document.getElementById('windowNote').textContent = windowNotes[opt.dataset.w];
  });
});

initProductPage();
