(() => {
  const cfg = window.WASHINGTON_NOIR_CONFIG || {};
  const announce = message => {
    let note = document.querySelector('.site-notice');
    if (!note) { note = document.createElement('div'); note.className = 'site-notice'; note.setAttribute('role', 'status'); note.setAttribute('aria-live', 'polite'); document.body.appendChild(note); }
    note.textContent = message; note.classList.add('visible');
    window.clearTimeout(announce.timer); announce.timer = window.setTimeout(() => note.classList.remove('visible'), 4200);
  };
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open'); menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menuToggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('nav-open'); menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation'); menuToggle.textContent = '☰';
    }));
    document.addEventListener('click', e => {
      if (nav.classList.contains('nav-open') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('nav-open'); menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation'); menuToggle.textContent = '☰';
      }
    });
  }
  document.querySelectorAll('[data-social]').forEach(a => {
    const target = cfg.social && cfg.social[a.dataset.social];
    if (target) a.href = target;
    else { a.href = '#'; a.setAttribute('aria-label', `${a.textContent.trim()} profile link not configured`); a.addEventListener('click', e => { e.preventDefault(); announce('Social profile links will be connected after the client approves the concept.'); }); }
  });
  document.querySelectorAll('[data-email]').forEach(el => {
    if (cfg.contactEmail) { el.textContent = cfg.contactEmail; if (el.tagName === 'A') el.href = `mailto:${cfg.contactEmail}`; }
  });
  document.querySelectorAll('[data-product]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const url = cfg.checkout && cfg.checkout[a.dataset.product];
    if (url && !url.includes('your-checkout-provider.example')) window.open(url, '_blank', 'noopener,noreferrer');
    else announce('Demo preview: this purchase link will be connected to the client’s checkout after approval.');
  }));
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const image = lightbox.querySelector('img'), caption = lightbox.querySelector('.lightbox-caption');
    let items = [], index = 0, previouslyFocused = null;
    const show = i => { index = (i + items.length) % items.length; const source = items[index]; image.src = source.querySelector('img').currentSrc || source.querySelector('img').src; image.alt = source.querySelector('img').alt; caption.textContent = source.querySelector('img').alt; };
    const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.classList.remove('no-scroll'); if (previouslyFocused) previouslyFocused.focus(); };
    document.querySelectorAll('[data-lightbox]').forEach(btn => btn.addEventListener('click', () => {
      items = [...document.querySelectorAll(`[data-lightbox="${btn.dataset.lightbox}"]`)]; previouslyFocused = btn; show(items.indexOf(btn));
      lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); lightbox.querySelector('.lightbox-close').focus();
    }));
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (!lightbox.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(index - 1); if (e.key === 'ArrowRight') show(index + 1); if (e.key === 'Tab') { const controls = [...lightbox.querySelectorAll('button')]; const first = controls[0], last = controls[controls.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } } });
  }
  const form = document.querySelector('#contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault(); const data = new FormData(form); const email = cfg.contactEmail || 'hello@washingtonnoir.example';
    if (email.includes('.example')) { document.querySelector('#form-status').textContent = 'Please configure your real contact email in assets/js/config.js before publishing.'; return; }
    const subject = encodeURIComponent(`Website enquiry — ${data.get('interest')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`);
    document.querySelector('#form-status').textContent = 'Opening your email app. Send the pre-filled message to complete your enquiry.';
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
})();

// Graceful fallback for remote demo photos that may be removed or rate-limited.
document.querySelectorAll('img').forEach(img => { img.addEventListener('error', () => { img.classList.add('image-unavailable'); img.alt = img.alt || 'Temporary product photograph unavailable'; }, { once: true }); img.decoding = 'async'; });
