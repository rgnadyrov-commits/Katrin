/* =========================================================
   Katrin Luxe Locks — interactions + i18n (en / ru / tr / ka)
   ========================================================= */
(() => {
'use strict';

/* ---------------------------------------------------------
   НАСТРОЙКИ — впишите реальные контакты Катрин.
   whatsapp : номер цифрами в международном формате ("995555123456")
   telegram : username без @
   instagram: username без @
   endpoint : (необязательно) URL приёмника форм, например Formspree
   --------------------------------------------------------- */
const CONFIG = { whatsapp: '', telegram: '', instagram: '', endpoint: '' };

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const FINE = matchMedia('(pointer:fine)').matches;
const REDUCED = matchMedia('(prefers-reduced-motion:reduce)').matches;
const root = document.documentElement;
const IMG = 'assets/img/';
const UNS = id => `https://images.unsplash.com/photo-${id}?w=900&q=78&auto=format&fit=crop`;

/* =========================================================
   i18n
   ========================================================= */
const LANGS = ['en', 'ru', 'tr', 'ka'];
let lang = LANGS.includes(root.lang) ? root.lang : 'en';
let D = window.I18N[lang];
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const t = (path, vars) => {
  let s = get(D, path); if (s == null) s = get(window.I18N.en, path); if (s == null) return path;
  if (vars && typeof s === 'string') s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ''));
  return s;
};
const onLang = []; // функции перерисовки, вызываются при смене языка

/* =========================================================
   Неязыковые данные (фото, цвета)
   ========================================================= */
// кадры из промо-ролика Катрин
const SERVICE_IMGS = [IMG + 'svc-capsule.webp', IMG + 'svc-tape.webp', IMG + 'svc-talk.webp'];
// Пары «до / после» — проверьте соответствие фото.
const STORIES = [
  { before: 'work-pink-before.webp', after: 'work-pink-after.webp' },
  { before: 'work-blonde-before.webp', after: 'work-blonde-after.webp' },
  { before: 'work-brown-before.webp', after: 'work-brown-after.webp' }
];
const GALLERY = ['work-brown-after.webp', 'work-choco.webp', 'work-pink-after.webp', 'work-black.webp', 'work-blonde-after.webp'];
const SHADES = [
  ['#a8946b', '#d8c79f', '#efe3c4'], ['#6f665c', '#a69c8c', '#cfc6b6'], ['#4a2e1c', '#8a5a34', '#c08a55'],
  ['#24150d', '#46291a', '#6a4128'], ['#0c0a09', '#17120f', '#2a221d'], ['#4e2412', '#8d4523', '#c06a36'], ['#2a1c14', '#6b4c33', '#dcc391']
];
const DENS_V = [.82, 1, 1.2];
const MARK_CM = [30, 40, 55, 65, 80];
// шкала длин под фото девушки в Hair Lab (px холста 600×900)
const LAB_MARKS = [[30, 352], [40, 400], [55, 488], [65, 652], [80, 770]];

/* =========================================================
   Helpers
   ========================================================= */
function toast(msg) {
  let el = $('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('is-on');
  clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove('is-on'), 2800);
}
const scrollToEl = sel => { const el = $(sel); if (el) el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); };
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function applyContactLinks() {
  const map = {
    instagram: CONFIG.instagram ? `https://instagram.com/${CONFIG.instagram}` : '',
    telegram: CONFIG.telegram ? `https://t.me/${CONFIG.telegram}` : '',
    whatsapp: CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}` : ''
  };
  $$('[data-link]').forEach(a => {
    const href = map[a.dataset.link];
    if (href) { a.href = href; a.target = '_blank'; a.rel = 'noopener'; } else a.href = '#book';
  });
}

function splitWords(el) {
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
        const w = document.createElement('span'); w.className = 'w';
        const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = part; wi.style.setProperty('--i', i++);
        w.appendChild(wi); frag.appendChild(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
  });
  walk(el);
}

/* статические тексты: data-i18n (innerHTML) и data-i18n-attr="attr=key;attr2=key2" */
function applyStatic() {
  document.title = t('meta.title');
  const md = $('meta[name=description]'); if (md) md.content = t('meta.desc');
  $$('[data-i18n]').forEach(el => {
    const html = t(el.dataset.i18n);
    if (el.hasAttribute('data-split')) {
      const wasIn = el.classList.contains('in');
      el.innerHTML = html; splitWords(el);
      if (wasIn) { el.classList.add('in'); }
      el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    } else if (el.hasAttribute('data-fill')) {
      el.innerHTML = html.trim().split(/\s+/).map(w => `<span class="fw">${w}</span>`).join(' ');
    } else el.innerHTML = html;
  });
  $$('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(';').forEach(pair => {
    const [attr, key] = pair.split('='); if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
  }));
  $('#langCode').textContent = lang.toUpperCase();
  $$('.lang__list [data-lang]').forEach(b => b.setAttribute('aria-selected', b.dataset.lang === lang));
}

function setLang(l) {
  if (!LANGS.includes(l) || l === lang) return;
  lang = l; D = window.I18N[l]; root.lang = l;
  try { localStorage.setItem('kll-lang', l); } catch (e) {}
  const u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u);
  applyStatic();
  onLang.forEach(fn => fn(true));
}

function initLangSwitch() {
  const box = $('#lang'), btn = $('.lang__btn', box);
  const close = () => { box.classList.remove('is-open'); btn.setAttribute('aria-expanded', false); };
  btn.addEventListener('click', e => { e.stopPropagation(); const o = !box.classList.contains('is-open'); box.classList.toggle('is-open', o); btn.setAttribute('aria-expanded', o); });
  $$('[data-lang]', box).forEach(b => b.addEventListener('click', () => { setLang(b.dataset.lang); close(); }));
  document.addEventListener('click', e => { if (!box.contains(e.target)) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* =========================================================
   Loader, reveal, scroll
   ========================================================= */
let revealIO;
function initLoader() {
  const t0 = performance.now();
  const done = () => setTimeout(() => {
    $('#loader').classList.add('is-done'); document.body.classList.remove('is-loading'); root.classList.add('ready');
    $$('.hero [data-split]').forEach(h => h.classList.add('in'));
  }, Math.max(0, 1200 - (performance.now() - t0)));
  if (document.readyState === 'complete') done(); else addEventListener('load', done, { once: true });
  setTimeout(() => { if (!root.classList.contains('ready')) done(); }, 4500);
}

function initReveal() {
  revealIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -5% 0px' });
  $$('[data-reveal]').forEach(el => {
    if (el.closest('.hero')) el.style.setProperty('--d', (parseInt(el.style.getPropertyValue('--d')) || 0) + 1250);
    revealIO.observe(el);
  });
  $$('[data-split]').forEach(el => { if (!el.closest('.hero')) revealIO.observe(el); });
}
// instant = при смене языка новые элементы показываем сразу
const observe = (scope, instant) => $$('[data-reveal]', scope).forEach(el => instant ? el.classList.add('in') : revealIO.observe(el));

function initScroll() {
  const bar = $('.progress span'), nav = $('#nav'), dock = $('#dock'), totop = $('#totop');
  const st = $('.statement'), heroImg = $('.hero__media img'), aboutImg = $('.about__img img');
  let lastY = scrollY, ticking = false;
  const upd = () => {
    const y = scrollY, vh = innerHeight, h = root.scrollHeight - vh;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle('is-scrolled', y > 30);
    if (y > 600 && y > lastY + 6 && !$('#menu').classList.contains('is-open')) nav.classList.add('is-hidden');
    else if (y < lastY - 6 || y < 600) nav.classList.remove('is-hidden');
    lastY = y;
    const words = $$('.fw', st), r = st.getBoundingClientRect();
    const p = clamp((vh * .82 - r.top) / (r.height + vh * .3), 0, 1), n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
    if (!REDUCED) {
      if (y < vh && innerWidth > 760) heroImg.style.translate = `0 ${y * .12}px`;
      const ar = aboutImg.parentElement.getBoundingClientRect();
      if (ar.top < vh && ar.bottom > 0) aboutImg.style.transform = `translateY(${-((vh - ar.top) / (vh + ar.height)) * 14}%)`;
    }
    const b = $('#book').getBoundingClientRect();
    const dockOn = y > vh * .8 && !(b.top < vh && b.bottom > 0);
    dock.classList.toggle('is-on', dockOn); document.body.classList.toggle('dock-on', dockOn);
    totop.classList.toggle('is-on', y > vh * .9);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener('resize', upd); upd();
  onLang.push(upd);

  const pills = $$('.nav__pills .pill');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) pills.forEach(p => p.classList.toggle('is-active', p.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => { menu.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open); menu.setAttribute('aria-hidden', !open); document.body.style.overflow = open ? 'hidden' : ''; };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  $('#year').textContent = new Date().getFullYear();
  totop.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); history.replaceState(null, '', location.pathname + location.search); });
}

/* =========================================================
   Cursor, click ripple, hero light, magnetic
   ========================================================= */
function initPointer() {
  const cv = $('#fx'), ctx = cv.getContext('2d');
  let W, H; const parts = []; let running = false;
  const resize = () => { const dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); addEventListener('resize', resize);
  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.t += 16; const k = p.t / p.max;
      if (k >= 1) { parts.splice(i, 1); continue; }
      const e = 1 - Math.pow(1 - k, 3);
      if (p.ring) { ctx.strokeStyle = `rgba(196,160,90,${(1 - k) * .8})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, 6 + e * 34, 0, 7); ctx.stroke(); }
      else { ctx.fillStyle = `rgba(196,160,90,${1 - k})`; ctx.beginPath(); ctx.arc(p.x + Math.cos(p.a) * e * p.d, p.y + Math.sin(p.a) * e * p.d, 1.8 * (1 - k * .5), 0, 7); ctx.fill(); }
    }
    if (parts.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0, 0, W, H); }
  };
  const burst = (x, y, n = 8) => {
    if (REDUCED) return;
    parts.push({ ring: 1, x, y, t: 0, max: 650 });
    for (let i = 0; i < n; i++) parts.push({ x, y, a: i / n * Math.PI * 2 + Math.random() * .4, d: 22 + Math.random() * 18, t: 0, max: 600 + Math.random() * 200 });
    if (!running) { running = true; requestAnimationFrame(loop); }
  };
  addEventListener('pointerdown', e => { if (e.button === 0) burst(e.clientX, e.clientY); }, { passive: true });
  initPointer.burst = burst;

  if (!FINE || REDUCED) return;
  root.classList.add('has-cursor');
  const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), lbl = $('.cursor__ring b');
  const m = { x: -100, y: -100 }, r = { x: -100, y: -100 };
  const hero = $('.hero');
  addEventListener('pointermove', e => {
    m.x = e.clientX; m.y = e.clientY;
    dot.style.transform = `translate3d(${m.x}px,${m.y}px,0)`;
    const tg = e.target;
    const lab = tg.closest && tg.closest('[data-cursor]');
    const link = tg.closest && tg.closest('a,button,label,input,.svc,.g,.sw,.ba-tab,.lab__stage');
    cur.classList.toggle('is-label', !!lab); cur.classList.toggle('is-link', !lab && !!link);
    cur.classList.toggle('is-dark', !!(tg.closest && tg.closest('.book__copy')));
    if (lab) lbl.textContent = lab.dataset.cursor;
    cur.classList.remove('is-hidden');
    if (scrollY < innerHeight) { hero.style.setProperty('--lx', m.x + 'px'); hero.style.setProperty('--ly', m.y + scrollY + 'px'); }
  }, { passive: true });
  document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
  (function follow() { r.x = lerp(r.x, m.x, .18); r.y = lerp(r.y, m.y, .18); ring.style.transform = `translate3d(${r.x}px,${r.y}px,0)`; requestAnimationFrame(follow); })();

  $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const b = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - b.left - b.width / 2) * .22}px ${(e.clientY - b.top - b.height / 2) * .3}px`;
    });
    el.addEventListener('pointerleave', () => { el.style.translate = ''; });
  });
}

/* =========================================================
   Services
   ========================================================= */
let quiz;
function buildServices() {
  const render = instant => {
    $('#svcGrid').innerHTML = t('data.services').map((s, i) => `
      <article class="svc" data-reveal style="--d:${i * 120}">
        <div class="svc__img"><img src="${SERVICE_IMGS[i]}" alt="" loading="lazy"></div>
        <div class="svc__body">
          <h3>${s.t}</h3><p>${s.s}</p>
          <div class="svc__meta"><span>${s.time}</span><span>${s.wear}</span></div>
          <div class="svc__det"><div>
            <p>${s.det}</p>
            <button type="button" class="btn btn--dark" data-svc="${i}"><span>${t('services.book')}</span><svg class="arr"><use href="#arrow"/></svg></button>
          </div></div>
          <button type="button" class="svc__more" aria-expanded="false"><span>${t('services.more')}</span><i><svg><use href="#plus"/></svg></i></button>
        </div>
      </article>`).join('');
    $('#svcExtra').innerHTML = t('data.extra').map((s, i) => `
      <button type="button" class="ex" data-svc="x${i}" data-reveal style="--d:${i * 100}">
        <div><b>${s.t}</b><small>${s.s}</small></div><span class="round"><svg><use href="#arrow"/></svg></span>
      </button>`).join('');
    observe($('#services'), instant);
  };
  render(false); onLang.push(render);
  $('#services').addEventListener('click', e => {
    const go = e.target.closest('[data-svc]');
    if (go) { quiz.setService(go.dataset.svc); return; }
    const card = e.target.closest('.svc'); if (!card) return;
    const open = !card.classList.contains('is-open');
    card.classList.toggle('is-open', open); $('.svc__more', card).setAttribute('aria-expanded', open);
    $('.svc__more span', card).textContent = open ? t('services.less') : t('services.more');
  });
}
const serviceName = code => code == null || code === '' ? '' : (code[0] === 'x' ? t('data.extra')[+code.slice(1)].t : t('data.services')[+code].t);

/* =========================================================
   Works: before/after, gallery, lightbox
   ========================================================= */
function buildWorks() {
  const ba = $('#ba'), range = $('.ba__range', ba), iB = $('.ba__img--before', ba), iA = $('.ba__img--after', ba);
  const tabs = $('#baTabs'), info = $('#baInfo');
  let touched = false, raf = 0, cur = 0;
  const setPos = v => { ba.style.setProperty('--pos', v + '%'); range.value = v; };
  range.addEventListener('input', () => { touched = true; cancelAnimationFrame(raf); ba.style.setProperty('--pos', range.value + '%'); });
  // перетаскивание пальцем/мышью в любом месте фото; вертикальный свайп по-прежнему прокручивает страницу
  let dragging = false, sx = 0, sy = 0, decided = false;
  const posFrom = e => { const r = ba.getBoundingClientRect(); return clamp((e.clientX - r.left) / r.width * 100, 0, 100); };
  ba.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    touched = true; cancelAnimationFrame(raf);
    dragging = true; decided = e.pointerType === 'mouse'; sx = e.clientX; sy = e.clientY;
    if (decided) { ba.setPointerCapture(e.pointerId); ba.classList.add('is-drag'); setPos(posFrom(e)); }
  });
  ba.addEventListener('pointermove', e => {
    if (!dragging) return;
    if (!decided) {
      const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
      if (dx < 6 && dy < 6) return;
      if (dy > dx) { dragging = false; return; }       // вертикальный жест — это прокрутка
      decided = true; try { ba.setPointerCapture(e.pointerId); } catch (_) {} ba.classList.add('is-drag');
    }
    setPos(posFrom(e));
  });
  const stop = e => {
    if (dragging && !decided && e.type === 'pointerup') setPos(posFrom(e)); // короткий тап — перенос рамки в точку касания
    dragging = false; ba.classList.remove('is-drag');
  };
  ba.addEventListener('pointerup', stop); ba.addEventListener('pointercancel', () => { dragging = false; ba.classList.remove('is-drag'); });
  const hint = () => {
    if (REDUCED || touched) return;
    const keys = [[50, 28], [28, 72], [72, 50]]; let s = 0, t0 = performance.now();
    const step = tm => {
      if (touched) return;
      const k = clamp((tm - t0) / 900, 0, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setPos(lerp(keys[s][0], keys[s][1], e));
      if (k < 1) raf = requestAnimationFrame(step); else if (++s < keys.length) { t0 = performance.now(); raf = requestAnimationFrame(step); }
    };
    raf = requestAnimationFrame(step);
  };
  const renderInfo = i => {
    const s = t('data.stories')[i];
    info.innerHTML = `<span class="n">0${i + 1} / 0${STORIES.length}</span><h3>${s.h}</h3><p>${s.p}</p>`;
  };
  const show = i => {
    cur = i;
    $$('.ba-tab', tabs).forEach((b, k) => b.classList.toggle('is-on', k === i));
    iB.src = IMG + STORIES[i].before; iA.src = IMG + STORIES[i].after; setPos(50); renderInfo(i);
  };
  tabs.innerHTML = STORIES.map((s, i) => `<button class="ba-tab" data-i="${i}"><img src="${IMG + s.after}" alt=""></button>`).join('');
  const labelTabs = () => $$('.ba-tab', tabs).forEach((b, i) => b.setAttribute('aria-label', `${t('works.story')} ${i + 1}`));
  tabs.addEventListener('click', e => {
    const b = e.target.closest('.ba-tab'); if (!b) return;
    info.style.opacity = 0; ba.style.opacity = .6;
    setTimeout(() => { show(+b.dataset.i); info.style.opacity = 1; ba.style.opacity = 1; touched = false; hint(); }, 250);
  });
  ba.style.transition = 'opacity .3s';
  show(0); labelTabs();
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { setTimeout(hint, 700); o.disconnect(); } }, { threshold: .5 }).observe(ba);

  const g = $('#gallery');
  const renderGallery = instant => {
    const caps = t('data.gallery');
    g.innerHTML = GALLERY.map((f, i) => `<figure class="g" data-i="${i}" data-reveal style="--d:${i * 80}"><img src="${IMG + f}" alt="${escapeHTML(caps[i])}" loading="lazy"><figcaption>${caps[i]}</figcaption></figure>`).join('');
    observe(g, instant);
  };
  renderGallery(false);
  dragScroll(g, i => lightbox.open(i));
  onLang.push(instant => { renderInfo(cur); labelTabs(); renderGallery(instant); });
}

function dragScroll(el, onClick) {
  let down = false, sx = 0, sl = 0, moved = 0;
  el.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = el.scrollLeft; });
  addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); if (moved > 5) el.classList.add('is-drag'); el.scrollLeft = sl - dx; });
  addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => el.classList.remove('is-drag'), 20); });
  if (onClick) el.addEventListener('click', e => { if (moved > 5) return; const f = e.target.closest('[data-i]'); if (f) onClick(+f.dataset.i); });
}

let lightbox;
function initLightbox() {
  const lb = $('#lb'), img = $('#lbImg'), cap = $('#lbCap'); let i = 0;
  const show = n => { i = (n + GALLERY.length) % GALLERY.length; img.src = IMG + GALLERY[i]; img.alt = cap.textContent = t('data.gallery')[i]; };
  lightbox = {
    open(n) { show(n); lb.hidden = false; document.body.style.overflow = 'hidden'; },
    close() { lb.hidden = true; document.body.style.overflow = ''; }
  };
  $('#lbX').onclick = lightbox.close; $('#lbP').onclick = () => show(i - 1); $('#lbN').onclick = () => show(i + 1);
  lb.addEventListener('click', e => { if (e.target === lb) lightbox.close(); });
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') lightbox.close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
}

/* =========================================================
   Hair Lab — длину можно выбрать касанием фото или перетаскиванием метки
   ========================================================= */
const lab = { shade: 2, len: 55, dens: 1, wave: 0 };
const lenIdx = L => L < 35 ? 0 : L < 47 ? 1 : L < 60 ? 2 : L < 72 ? 3 : 4;
const lenName = L => t('data.lengths')[lenIdx(L)];
const shadeName = i => t('data.shades')[i];

function initLab() {
  const hair = window.HairRenderer.create($('#hairCanvas'), {
    // фото: Unsplash (бесплатная лицензия) — девушка со спины, волосы собраны
    photo: { src: 'https://images.unsplash.com/photo-1735463358546-fc3c6741dfa4?w=1200&q=82&auto=format', x: -55, y: -148, w: 783, h: 1175 },
    marks: LAB_MARKS
  });
  const stage = $('#labStage'), handle = $('#labHandle'), hintEl = $('#labHint');
  const swHTML = SHADES.map((c, i) => `<button type="button" class="sw" data-i="${i}" role="radio" style="--c1:${c[0]};--c2:${c[1]};--c3:${c[2]}"></button>`).join('');
  $('#swatches').innerHTML = swHTML; $('#qSwatches').innerHTML = swHTML;

  // y на холсте (0..900) → см, обратная функция к шкале
  const cmForY = y => {
    const M = LAB_MARKS;
    if (y <= M[0][1]) return M[0][0];
    for (let i = 1; i < M.length; i++) if (y <= M[i][1]) return M[i - 1][0] + (M[i][0] - M[i - 1][0]) * (y - M[i - 1][1]) / (M[i][1] - M[i - 1][1]);
    return M[M.length - 1][0];
  };

  let pending = false;
  const draw = () => {
    if (pending) return; pending = true;
    requestAnimationFrame(() => {
      pending = false;
      hair.render({ length: lab.len, shade: SHADES[lab.shade], density: DENS_V[lab.dens], wave: lab.wave ? 9 : 2.5 });
    });
  };
  const labels = () => {
    $$('.sw').forEach(b => { const i = +b.dataset.i; b.setAttribute('aria-label', shadeName(i)); b.title = shadeName(i); });
    $('#lenMarks').innerHTML = MARK_CM.map((cm, i) => `<span style="left:${(cm - 30) / 50 * 100}%">${t('data.marks')[i]}</span>`).join('');
    $('#ruler').innerHTML = MARK_CM.map((cm, i) => `<span class="m" data-l="${cm}" style="top:${hair.endYFor(cm) / hair.H * 100}%">${t('data.marks')[i]}</span>`).join('');
  };
  const ui = () => {
    const cm = t('lab.cm');
    $('#shadeName').textContent = shadeName(lab.shade); $('#qShadeOut').textContent = shadeName(lab.shade);
    $('#lenName').textContent = `${lenName(lab.len)} · ${lab.len} ${cm}`; $('#qLenOut').textContent = `${lab.len} ${cm}`;
    $('#labBadge').textContent = `${lenName(lab.len)} · ${shadeName(lab.shade)}`;
    $('#labHandleTxt').textContent = `${lab.len} ${cm}`;
    handle.style.top = hair.endYFor(lab.len) / hair.H * 100 + '%';
    $$('.sw').forEach(b => { const on = +b.dataset.i === lab.shade; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); });
    $$('#densSeg button').forEach(b => b.classList.toggle('is-on', +b.dataset.v === lab.dens));
    $$('#waveSeg button').forEach(b => b.classList.toggle('is-on', +b.dataset.v === lab.wave));
    $$('#ruler .m').forEach(m => m.classList.toggle('is-near', Math.abs(+m.dataset.l - lab.len) <= 4));
    ['#lenRange', '#qLen'].forEach(id => { const r = $(id); r.value = lab.len; r.style.setProperty('--fill', (lab.len - 30) / 50 * 100 + '%'); });
    draw();
  };
  const setLen = v => { lab.len = clamp(Math.round(v), 30, 80); ui(); };
  const lenFromPointer = e => { const r = stage.getBoundingClientRect(); return cmForY((e.clientY - r.top) / r.height * hair.H); };
  const used = () => stage.classList.add('is-used');

  // касание/клик по фото — длина до этой точки
  stage.addEventListener('click', e => { if (e.target.closest('.lab__handle')) return; used(); setLen(lenFromPointer(e)); });
  // перетаскивание метки
  let drag = false;
  handle.addEventListener('pointerdown', e => { drag = true; used(); handle.setPointerCapture(e.pointerId); handle.classList.add('is-drag'); e.preventDefault(); });
  handle.addEventListener('pointermove', e => { if (drag) setLen(lenFromPointer(e)); });
  const end = () => { drag = false; handle.classList.remove('is-drag'); };
  handle.addEventListener('pointerup', end); handle.addEventListener('pointercancel', end);

  document.addEventListener('click', e => { const b = e.target.closest('.sw'); if (b) { lab.shade = +b.dataset.i; ui(); } });
  ['#lenRange', '#qLen'].forEach(id => $(id).addEventListener('input', e => setLen(+e.target.value)));
  $('#densSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.dens = +b.dataset.v; ui(); } });
  $('#waveSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.wave = +b.dataset.v; ui(); } });
  $('#labSend').addEventListener('click', () => { toast(t('lab.saved')); scrollToEl('#book'); });
  labels(); ui();
  onLang.push(() => { labels(); ui(); });
  lab.reset = () => { Object.assign(lab, { shade: 2, len: 55, dens: 1, wave: 0 }); ui(); };
}

/* =========================================================
   Reviews & FAQ
   ========================================================= */
function buildReviews() {
  const track = $('#rvTrack'), sc = $('#rvScroll');
  const stars = '<svg><use href="#star"/></svg>'.repeat(5);
  const render = instant => {
    track.innerHTML = t('data.reviews').map((r, i) => `
      <article class="rv" data-reveal style="--d:${i * 80}">
        <div class="rv__stars" aria-label="${t('reviews.stars')}">${stars}</div>
        <p class="rv__txt">“${r.t}”</p>
        <div class="rv__who"><span class="rv__av">${r.n[0]}</span><div><b>${r.n}</b><span>${r.svc}</span></div></div>
      </article>`).join('');
    observe(track, instant);
  };
  render(false); onLang.push(render);
  const by = d => sc.scrollBy({ left: d * (track.firstElementChild.offsetWidth + 20), behavior: 'smooth' });
  $('#rvPrev').onclick = () => by(-1); $('#rvNext').onclick = () => by(1);
  dragScroll(sc);
}

function buildFAQ() {
  const acc = $('#acc');
  const render = instant => {
    const open = $$('.acc__i', acc).findIndex(x => x.classList.contains('is-open'));
    acc.innerHTML = t('data.faq').map(([q, a], i) => {
      const on = open === -1 ? i === 0 : i === open;
      return `<div class="acc__i${on ? ' is-open' : ''}" data-reveal style="--d:${i * 60}">
        <button class="acc__q" aria-expanded="${on}" aria-controls="fa${i}"><span>${q}</span><i><svg><use href="#plus"/></svg></i></button>
        <div class="acc__a" id="fa${i}" role="region"><div><p>${a}</p></div></div>
      </div>`;
    }).join('');
    observe(acc, instant);
  };
  render(false); onLang.push(render);
  acc.addEventListener('click', e => {
    const b = e.target.closest('.acc__q'); if (!b) return;
    const it = b.parentElement, open = !it.classList.contains('is-open');
    $$('.acc__i', acc).forEach(x => { x.classList.remove('is-open'); $('.acc__q', x).setAttribute('aria-expanded', false); });
    if (open) { it.classList.add('is-open'); b.setAttribute('aria-expanded', true); }
  });
}

/* =========================================================
   Quiz
   ========================================================= */
function initQuiz() {
  const form = $('#quiz'), steps = $$('.qs', form), TOTAL = steps.length;
  const err = $('#qErr'), back = $('#qBack'), next = $('#qNext'), done = $('#qDone');
  let cur = 1, chan = 'WhatsApp', service = '', lastErr = '';
  const val = () => Object.fromEntries(new FormData(form).entries());
  const contactKey = { WhatsApp: 'quiz.cWa', Telegram: 'quiz.cTg', Instagram: 'quiz.cIg' };

  const validate = n => {
    const v = val();
    if (n === 1 && !v.goal) return 'quiz.e1';
    if (n === 2 && (!v.now || !v.dens)) return 'quiz.e2';
    if (n === 4 && !v.when) return 'quiz.e4';
    if (n === 5) {
      if (!v.name || v.name.trim().length < 2) { $('#fName').parentElement.classList.add('is-bad'); return 'quiz.eName'; }
      const c = (v.contact || '').trim();
      const ok = chan === 'WhatsApp' ? c.replace(/\D/g, '').length >= 7 : c.replace('@', '').length >= 3;
      if (!ok) { $('#fContact').parentElement.classList.add('is-bad'); return chan === 'WhatsApp' ? 'quiz.eWa' : 'quiz.eNick'; }
    }
    return '';
  };
  const labels = () => {
    $('#qCount').textContent = t('quiz.step', { n: cur, t: TOTAL });
    $('span', next).textContent = cur === TOTAL ? t('quiz.submit') : t('quiz.next');
    $('#contactLbl').textContent = t(contactKey[chan]);
    err.textContent = lastErr ? t(lastErr) : '';
  };
  const go = n => {
    steps.forEach((s, i) => { s.classList.toggle('is-active', i + 1 === n); s.setAttribute('aria-hidden', i + 1 !== n); });
    cur = n; lastErr = '';
    $('#qBar').style.transform = `scaleX(${n / TOTAL})`;
    back.disabled = n === 1;
    labels();
  };
  const tryNext = () => {
    const e = validate(cur);
    if (e) { lastErr = e; err.textContent = t(e); return; }
    if (cur < TOTAL) go(cur + 1); else submit();
  };
  next.addEventListener('click', tryNext);
  back.addEventListener('click', () => cur > 1 && go(cur - 1));
  form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); tryNext(); } });
  form.addEventListener('input', () => { lastErr = ''; err.textContent = ''; $$('.field.is-bad', form).forEach(f => f.classList.remove('is-bad')); });
  $$('input[name=goal]', form).forEach(r => r.addEventListener('change', () => setTimeout(() => cur === 1 && go(2), 350)));
  $('#chanSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; chan = b.dataset.v;
    $$('#chanSeg button').forEach(x => x.classList.toggle('is-on', x === b));
    const c = $('#fContact'); c.placeholder = chan === 'WhatsApp' ? '+995 ...' : '@username'; c.inputMode = chan === 'WhatsApp' ? 'tel' : 'text';
    labels();
  });

  const L = (group, v) => t(`quiz.${group}_${v}`);
  const message = v => [
    t('msg.hello', { name: v.name.trim() }),
    t('msg.goal', { v: L('goal', v.goal) }),
    service !== '' ? t('msg.service', { v: serviceName(service) }) : '',
    t('msg.now', { a: L('now', v.now), b: L('dens', v.dens) }),
    t('msg.look', { len: lenName(lab.len), cm: lab.len, shade: shadeName(lab.shade), dens: t('data.dens')[lab.dens], wave: lab.wave ? t('msg.wave') : '' }),
    t('msg.when', { v: L('when', v.when) }) + (v.city && v.city.trim() ? t('msg.city', { v: v.city.trim() }) : ''),
    t('msg.contact', { ch: chan, v: v.contact.trim() }),
    v.comment && v.comment.trim() ? t('msg.comment', { v: v.comment.trim() }) : ''
  ].filter(Boolean).join('\n');

  const renderSummary = () => {
    const v = val(), msg = message(v), enc = encodeURIComponent(msg);
    const rows = [['sName', v.name.trim()], ['sGoal', L('goal', v.goal)], ['sLook', `${lenName(lab.len)}, ${shadeName(lab.shade)}`], ['sWhen', L('when', v.when)], ['sChannel', chan], ['sService', service !== '' ? serviceName(service) : t('quiz.sServiceNone')]];
    $('#summary').innerHTML = rows.map(([k, x]) => `<div><dt>${t('quiz.' + k)}</dt><dd>${escapeHTML(x)}</dd></div>`).join('');
    $('#sendWa').href = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${enc}` : `https://wa.me/?text=${enc}`;
    $('#sendTg').href = CONFIG.telegram ? `https://t.me/${CONFIG.telegram}?text=${enc}` : `https://t.me/share/url?url=%20&text=${enc}`;
    form._msg = msg;
    return { v, msg };
  };
  function submit() {
    const { v, msg } = renderSummary();
    if (CONFIG.endpoint) fetch(CONFIG.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...v, lang, service: serviceName(service), length: lab.len, shade: shadeName(lab.shade), channel: chan, message: msg }) }).catch(() => {});
    done.hidden = false;
    const r = $('.done__ok').getBoundingClientRect();
    if (initPointer.burst) { initPointer.burst(r.left + r.width / 2, r.top + r.height / 2, 14); setTimeout(() => initPointer.burst(r.left + r.width / 2, r.top + r.height / 2, 10), 220); }
  }
  $('#copyReq').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(form._msg || ''); toast(t('quiz.copied')); } catch { toast(t('quiz.copyFail')); }
  });
  $('#qAgain').addEventListener('click', () => { form.reset(); done.hidden = true; service = ''; lab.reset(); go(1); });
  go(1);
  onLang.push(() => { labels(); if (!done.hidden) renderSummary(); });
  quiz = { setService(code) { service = code; toast(t('quiz.added', { s: serviceName(code) })); scrollToEl('#book'); } };
}

/* =========================================================
   Видео: шоурил с раскрытием при прокрутке, процесс, окно со звуком
   ========================================================= */
function initVideos() {
  const small = matchMedia('(max-width:760px)').matches;
  const reel = $('#reel'), frame = $('#reelFrame'), rv = $('#reelVideo'), pv = $('#procVideo');
  // источник подставляем лениво: на телефоне — лёгкая версия без звука
  const load = v => { if (!v.src) { v.src = (small && v.dataset.srcSm) || v.dataset.src; } };
  const play = v => { if (REDUCED) return; load(v); const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  const vio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? play(e.target) : e.target.pause()), { threshold: .25 });
  [rv, pv].forEach(v => vio.observe(v));

  // раскрытие шоурила: из скруглённой карточки — во весь экран
  if (!small && !REDUCED) {
    let ticking = false;
    const upd = () => {
      ticking = false;
      const r = reel.getBoundingClientRect(), total = r.height - innerHeight;
      const p = clamp(-r.top / (total * .6), 0, 1), e = 1 - Math.pow(1 - p, 3);
      frame.style.setProperty('--ry', (12 * (1 - e)).toFixed(2) + '%');
      frame.style.setProperty('--rx', (8 * (1 - e)).toFixed(2) + '%');
      frame.style.setProperty('--rr', (36 * (1 - e)).toFixed(1) + 'px');
      frame.style.setProperty('--rs', (1.12 - .12 * e).toFixed(3));
      frame.style.setProperty('--ro', clamp((p - .45) / .4, 0, 1).toFixed(3));
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    addEventListener('resize', upd); upd();
  }

  // окно просмотра со звуком
  const modal = $('#vmodal'), mv = $('#vmodalV');
  const open = (src, poster) => {
    [rv, pv].forEach(v => v.pause());
    mv.poster = poster || ''; mv.src = src; modal.hidden = false; document.body.style.overflow = 'hidden';
    mv.muted = false; const p = mv.play(); if (p && p.catch) p.catch(() => {});
  };
  const close = () => { mv.pause(); mv.removeAttribute('src'); mv.load(); modal.hidden = true; document.body.style.overflow = ''; };
  $$('[data-video]').forEach(b => b.addEventListener('click', () => open(b.dataset.video, b.dataset.poster)));
  $('#vmodalX').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
}

/* =========================================================
   Boot
   ========================================================= */
applyStatic();
applyContactLinks();
initLangSwitch();
initLoader();
initReveal();
initQuiz();
buildServices();
buildWorks();
initLightbox();
initLab();
buildReviews();
buildFAQ();
initScroll();
initVideos();
initPointer();
})();
