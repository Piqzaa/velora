// Lenis smooth scroll (optional: if CDN fails, site keeps working)
let lenis = null;
try {
  lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
} catch (err) { /* Lenis indisponible : scroll natif */ }

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// nav scroll state
const nav = document.getElementById('nav');
const progressBar = document.getElementById('progressBar');
if (lenis) {
  lenis.on('scroll', ({ scroll }) => {
    nav.classList.toggle('scrolled', scroll > 20);
    const p = Math.min(scroll / (document.body.scrollHeight - window.innerHeight), 1);
    progressBar.style.width = (p * 100) + '%';
  });
} else {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    nav.classList.toggle('scrolled', scroll > 20);
    const p = Math.min(scroll / (document.body.scrollHeight - window.innerHeight), 1);
    progressBar.style.width = (p * 100) + '%';
  });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const answer = item.querySelector('.faq-a');
  const q = item.querySelector('.faq-q');
  q.setAttribute('role', 'button');
  q.setAttribute('tabindex', '0');
  q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
  q.setAttribute('aria-controls', answer.id || '');
  if (item.classList.contains('open')) { answer.style.maxHeight = answer.scrollHeight + 'px'; }
  const toggle = () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const ans = i.querySelector('.faq-a');
      if (ans) ans.style.maxHeight = null;
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; q.setAttribute('aria-expanded', 'true'); }
  };
  q.addEventListener('click', toggle);
  q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
});

// split text reveal (h1, h2) — préserve <em> et <br>
function splitText(el) {
  const parts = el.innerHTML.split(/(<[^>]+>)/);
  const out = [];
  let delay = 0;
  parts.forEach(part => {
    if (part.startsWith('<')) { out.push(part); return; }
    part.split(/\s+/).forEach(w => {
      if (w === '') return;
      out.push(`<span class="split-word" style="transition-delay:${delay * 0.04}s">${w}</span>`);
      out.push(' ');
      delay++;
    });
  });
  el.innerHTML = out.join('');
}
document.querySelectorAll('h1, h2').forEach(el => {
  splitText(el);
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.unobserve(el);
    el.querySelectorAll('.split-word').forEach((w, i) => {
      setTimeout(() => w.classList.add('is-visible'), i * 40);
    });
  }, { threshold: 0.2 });
  obs.observe(el);
});

// compteurs animés
document.querySelectorAll('[data-count-to]').forEach(el => {
  const target = parseFloat(el.dataset.countTo);
  const decimals = parseInt(el.dataset.decimals) || 0;
  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.unobserve(el);
    const dur = 1200;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const val = target * t;
      el.textContent = val.toFixed(decimals);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });
  obs.observe(el);
});

// parallax hero text (optimisé rAF)
const heroCopyEl = document.querySelector('.hero-copy');
let heroScrollY = 0;
if (lenis) {
  lenis.on('scroll', ({ scroll }) => { heroScrollY = scroll; });
} else {
  window.addEventListener('scroll', () => { heroScrollY = window.scrollY; });
}
function updateParallax() {
  if (heroCopyEl) heroCopyEl.style.transform = `translateY(${heroScrollY * 0.15}px)`;
  requestAnimationFrame(updateParallax);
}
updateParallax();

// hero video autoplay
const heroVideo = document.getElementById('heroVideo');
const heroPoster = document.getElementById('heroPoster');
if (heroVideo && heroPoster) {
  heroVideo.play().then(() => { heroPoster.remove(); }).catch(() => {});
}

// cursor trailing (desktop only)
if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
  const trail = document.getElementById('cursorTrail');
  let trailX = 0, trailY = 0, mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; trail.style.opacity = '1'; });
  document.addEventListener('mouseleave', () => { trail.style.opacity = '0'; });
  function animTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.transform = `translate(${trailX - 6}px, ${trailY - 6}px)`;
    requestAnimationFrame(animTrail);
  }
  animTrail();
}

// magnetic buttons
document.querySelectorAll('.btn-primary, .btn-light, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.12}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ancres smooth via lenis
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) { window.location.href = 'index.html' + id; return; }
    e.preventDefault();
    closeCartDrawer();
    if (lenis) lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: 'smooth' });
  });
});

// promo countdown — prochain réapprovisionnement (dimanche 23h59)
function startCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  function tick() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    let daysTo = (7 - end.getDay()) % 7;
    if (end.getDay() === 0 && now < end) daysTo = 0;
    if (daysTo === 0 && now >= end) daysTo = 7;
    end.setDate(end.getDate() + daysTo);
    let diff = Math.max(0, end - now);
    const d = Math.floor(diff / 86400000);
    diff -= d * 86400000;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    el.textContent = (d > 0 ? d + 'j ' : '') + h + ':' + m + ':' + s;
  }
  tick();
  setInterval(tick, 1000);
}
startCountdown();

// boutons "Ajouter au panier" (délégation globale)
function flashAddedBtn(btn) {
  const original = btn.getAttribute('data-label') || btn.textContent;
  btn.textContent = '✓ Ajouté';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 1500);
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;
  e.preventDefault();
  const id = btn.dataset.id || 'hamac';
  const p = produits[id];
  addToCart(id, 1);
  flyToCart(btn);
  if (document.getElementById('cartDrawer')) {
    openCartDrawer();
  } else {
    showCartToast(p ? p.name : '');
  }
  flashAddedBtn(btn);
});

// =====================================================
// STICKY CTA — barre fixe "ajouter au panier" (tous écrans)
// =====================================================
const mobileCta = document.getElementById('mobileCtaBar');
const produitSection = document.getElementById('produit');
if (mobileCta && produitSection) {
  function updateMobileCta() {
    const rect = produitSection.getBoundingClientRect();
    const isDesktop = window.innerWidth >= 781;
    const nearBottom = (window.innerHeight + window.scrollY) > (document.body.scrollHeight - 480);
    const trigger = isDesktop ? rect.top < 0 : rect.top < window.innerHeight * 0.6;
    mobileCta.classList.toggle('show', trigger && !nearBottom);
  }
  if (lenis) lenis.on('scroll', updateMobileCta);
  else window.addEventListener('scroll', updateMobileCta);
  window.addEventListener('resize', updateMobileCta);
  updateMobileCta();
}

// =====================================================
// CART DRAWER (page d'accueil uniquement)
// =====================================================
const FREE_SHIPPING = 50;

function renderCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  const cart = getCart();
  const itemsEl = document.getElementById('drawerItems');
  const countEl = document.getElementById('drawerCount');
  if (countEl) countEl.textContent = cartCount();
  const total = cartTotal();
  const totalEl = document.getElementById('drawerTotal');
  if (totalEl) totalEl.textContent = total.toFixed(2).replace('.', ',') + '€';

  const msg = document.getElementById('shippingMsg');
  const bar = document.getElementById('shippingBar');
  if (msg && bar) {
    const unlockedNow = total >= FREE_SHIPPING;
    if (unlockedNow) {
      msg.innerHTML = '🎉 Livraison offerte débloquée !';
      bar.style.width = '100%';
      bar.classList.add('full');
      if (drawer._wasUnlocked !== true) confetti();
    } else {
      const missing = (FREE_SHIPPING - total).toFixed(2).replace('.', ',');
      msg.innerHTML = 'Plus que <strong>' + missing + '€</strong> pour la livraison offerte';
      bar.style.width = Math.min((total / FREE_SHIPPING) * 100, 100) + '%';
      bar.classList.remove('full');
    }
    drawer._wasUnlocked = unlockedNow;
  }

  const suggEl = document.getElementById('drawerSuggestion');
  if (suggEl) {
    if (cart.length && total > 0 && total < FREE_SHIPPING) {
      const missing = FREE_SHIPPING - total;
      const candidate = Object.values(produits)
        .filter(p => p.price <= missing + 0.01)
        .sort((a, b) => a.price - b.price)[0];
      if (candidate) {
        const candPrice = candidate.price.toFixed(2).replace('.', ',');
        suggEl.innerHTML =
          '<div class="drawer-suggestion">' +
            '<div class="ds-text">' +
              '<span class="ds-title">Plus que <strong>' + missing.toFixed(2).replace('.', ',') + '€</strong> pour la livraison offerte</span>' +
              '<span class="ds-sub">Ajoute le ' + candidate.name + ' (' + candPrice + '€) et c\'est offert.</span>' +
            '</div>' +
            '<button class="btn-primary btn-sm" data-suggest="' + candidate.id + '">Ajouter</button>' +
          '</div>';
        suggEl.querySelector('[data-suggest]').addEventListener('click', function () {
          addToCart(this.dataset.suggest, 1);
          flyToCart(this);
          renderCartDrawer();
        });
      } else {
        suggEl.innerHTML = '';
      }
    } else {
      suggEl.innerHTML = '';
    }
  }

  if (!cart.length) {
    itemsEl.innerHTML = '<div class="drawer-empty"><p>Votre panier est vide.</p><a href="#espaces" class="btn-primary">Découvrir nos produits</a></div>';
    return;
  }

  itemsEl.innerHTML = cart.map(item => {
    const p = produits[item.id];
    if (!p) return '';
    return '<div class="drawer-item">' +
      '<img src="' + p.images[0] + '" alt="' + p.name + '">' +
      '<div class="drawer-item-info">' +
        '<a href="produit.html?id=' + p.id + '" class="drawer-item-name">' + p.name + '</a>' +
        '<span class="drawer-item-price">' + p.price.toFixed(2).replace('.', ',') + '€</span>' +
      '</div>' +
      '<div class="drawer-item-qty">' +
        '<button class="qty-btn-sm" data-id="' + p.id + '" data-action="minus" aria-label="Diminuer">−</button>' +
        '<span>' + item.qty + '</span>' +
        '<button class="qty-btn-sm" data-id="' + p.id + '" data-action="plus" aria-label="Augmenter">+</button>' +
      '</div>' +
      '<button class="drawer-item-remove" data-id="' + p.id + '" aria-label="Supprimer">✕</button>' +
    '</div>';
  }).join('');

  itemsEl.querySelectorAll('.qty-btn-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const it = getCart().find(i => i.id === id);
      if (!it) return;
      if (btn.dataset.action === 'plus') updateQty(id, it.qty + 1);
      else updateQty(id, it.qty - 1);
      renderCartDrawer();
    });
  });
  itemsEl.querySelectorAll('.drawer-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      renderCartDrawer();
    });
  });
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  drawer.classList.add('open');
  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.classList.add('open');
  document.body.classList.add('drawer-open');
  drawer.setAttribute('aria-hidden', 'false');
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  drawer.classList.remove('open');
  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.classList.remove('drawer-open');
  drawer.setAttribute('aria-hidden', 'true');
}

if (document.getElementById('cartDrawer')) {
  const overlay = document.getElementById('cartOverlay');
  const closeBtn = document.getElementById('drawerClose');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) overlay.addEventListener('click', closeCartDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCartDrawer(); });
  document.querySelectorAll('.nav-cart').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); openCartDrawer(); });
  });
  updateCartBadge();
}

// =====================================================
// MICRO-INTERACTIONS — chat qui vole au panier
// =====================================================
function flyToCart(fromEl) {
  if (!fromEl) return;
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const start = fromEl.getBoundingClientRect();
  const end = badge.getBoundingClientRect();
  const el = document.createElement('span');
  el.className = 'fly-cat';
  el.textContent = '🐈';
  const half = 14;
  el.style.left = (start.left + start.width / 2 - half) + 'px';
  el.style.top = (start.top + start.height / 2 - half) + 'px';
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    const dx = end.left + end.width / 2 - (start.left + start.width / 2);
    const dy = end.top + end.height / 2 - (start.top + start.height / 2);
    el.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(0.15)';
    el.style.opacity = '0.4';
  });
  setTimeout(() => el.remove(), 650);
}

// =====================================================
// CONFETTIS — livraison offerte débloquée
// =====================================================
function confetti() {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  const zone = drawer.querySelector('.cart-shipping') || drawer;
  for (let i = 0; i < 26; i++) {
    const c = document.createElement('span');
    c.className = 'confetti-bit';
    c.style.left = (Math.random() * 100) + '%';
    c.style.background = ['#C89B4B', '#6E7C5B', '#A65A38', '#E0B96E', '#4C5740'][i % 5];
    c.style.animationDelay = (Math.random() * 0.4) + 's';
    zone.appendChild(c);
    setTimeout(() => c.remove(), 1800);
  }
}

// =====================================================
// EMPREINTES DE PATTES au clic (desktop, subtil)
// =====================================================
if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
  document.addEventListener('click', e => {
    if (e.target.closest('a, button, input, textarea, .cart-drawer, #cartToast, .exit-modal')) return;
    if (Math.random() > 0.35) return;
    const paw = document.createElement('span');
    paw.className = 'click-paw';
    paw.style.left = e.clientX + 'px';
    paw.style.top = e.clientY + 'px';
    paw.style.setProperty('--rot', (Math.random() * 60 - 30).toFixed(0) + 'deg');
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 700);
  });
}

// =====================================================
// EXIT-INTENT — code -10% (desktop, une fois par session)
// =====================================================
function buildExitModal() {
  const modal = document.createElement('div');
  modal.className = 'exit-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML =
    '<div class="exit-card">' +
      '<button class="exit-close" aria-label="Fermer">✕</button>' +
      '<div class="exit-emoji">🐱</div>' +
      '<h3>Attendez !</h3>' +
      '<p>Recevez <strong>-10%</strong> sur votre premier hamac — et nos astuces pour que votre chat l\'adopte en 48h.</p>' +
      '<form id="exitForm">' +
        '<input type="email" placeholder="Votre email" required>' +
        '<button class="btn-primary btn-full" type="submit">Je veux mes -10%</button>' +
      '</form>' +
      '<button class="exit-skip">Non merci, je regarde encore</button>' +
    '</div>';
  document.body.appendChild(modal);

  function close() {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 350);
  }
  modal.querySelector('.exit-close').addEventListener('click', close);
  modal.querySelector('.exit-skip').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  modal.querySelector('#exitForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = modal.querySelector('input').value.trim();
    if (!email) return;
    try { localStorage.setItem('velora_exit_email', email); } catch (err) {}
    close();
    showCartToast('Code -10% envoyé : VELORA10');
  });

  requestAnimationFrame(() => modal.classList.add('show'));
}

if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
  let exitArmed = true;
  document.addEventListener('mouseout', e => {
    if (!exitArmed) return;
    if (e.relatedTarget || !e.clientY || e.clientY > 10) return;
    let shown = false;
    try { shown = sessionStorage.getItem('velora_exit') === '1'; } catch (err) {}
    if (shown) return;
    exitArmed = false;
    try { sessionStorage.setItem('velora_exit', '1'); } catch (err) {}
    setTimeout(buildExitModal, 300);
  });
}

// =====================================================
// ILLUMINATION JOURNÉE — au scroll + heure réelle
// =====================================================
const daylineItems = document.querySelectorAll('.dayline-item');
if (daylineItems.length) {
  const daylineIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        daylineIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.45 });
  daylineItems.forEach(el => daylineIO.observe(el));

  function hourBand(h) {
    return h < 9.5 ? 7 : h < 13.5 ? 12 : h < 17.5 ? 15 : 20;
  }
  function markLive() {
    const band = hourBand(new Date().getHours());
    daylineItems.forEach(it => {
      const isLive = parseInt(it.dataset.hour, 10) === band;
      it.classList.toggle('live', isLive);
      if (isLive && !it.querySelector('.dayline-live')) {
        const timeEl = it.querySelector('.dayline-time');
        if (timeEl) {
          const pill = document.createElement('span');
          pill.className = 'dayline-live';
          pill.textContent = 'En ce moment';
          timeEl.insertAdjacentElement('afterend', pill);
        }
      }
    });
  }
  markLive();
  setInterval(markLive, 60000);
}