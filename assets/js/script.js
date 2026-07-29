// Lenis smooth scroll
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// nav scroll state
const nav = document.getElementById('nav');
const progressBar = document.getElementById('progressBar');
lenis.on('scroll', ({ scroll }) => {
  nav.classList.toggle('scrolled', scroll > 20);
  const p = Math.min(scroll / (document.body.scrollHeight - window.innerHeight), 1);
  progressBar.style.width = (p * 100) + '%';
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const answer = item.querySelector('.faq-a');
  if (item.classList.contains('open')) { answer.style.maxHeight = answer.scrollHeight + 'px'; }
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
    if (!isOpen) { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
  });
});

// split text reveal (h1, h2)
function splitText(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="split-word" style="transition-delay:${i * 0.04}s">${w}</span>`).join(' ');
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

// parallax hero text
const heroCopyEl = document.querySelector('.hero-copy');
lenis.on('scroll', ({ scroll }) => {
  heroCopyEl.style.transform = `translateY(${scroll * 0.15}px)`;
});

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
    e.preventDefault();
    lenis.scrollTo(id, { offset: -80 });
  });
});