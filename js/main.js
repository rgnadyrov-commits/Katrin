/* =========================================================
   Katrin Luxe Locks — interactions
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
   ДАННЫЕ
   ========================================================= */
const SERVICES = [
  { t: 'Капсульное наращивание', s: 'Классика, которую не отличить от своих волос. Подходит для длины и густоты.',
    img: UNS('1652204234951-17c05a05bb94'), time: '≈ 3–4 часа', wear: 'до 2–3 месяцев',
    det: 'Микрокапсулы закрепляются на тонких прядях у корней и не видны даже вблизи. Можно собирать волосы в хвост и делать укладки.' },
  { t: 'Ленточное наращивание', s: 'Самый быстрый способ получить объём — плоско и незаметно.',
    img: UNS('1496440737103-cd596325d314'), time: '≈ 1–1,5 часа', wear: '6–8 недель',
    det: 'Тонкие ленты ложатся плоско и не ощущаются. Отличный вариант для тонких и средних волос, когда нужен объём.' },
  { t: 'Hair Talk', s: 'Деликатная техника без нагрева — для тонких и ослабленных волос.',
    img: UNS('1628695444176-79ef329a6015'), time: '≈ 1,5–2 часа', wear: '1,5–2 месяца',
    det: 'Бережное крепление, которое почти не нагружает собственные волосы. Подходит, когда важна максимальная деликатность.' }
];
const EXTRA = [
  { t: 'Коррекция', s: 'Обновляем посадку и свежесть' },
  { t: 'Бережное снятие', s: 'Без боли и потерь для своих волос' },
  { t: 'Консультация', s: 'Подбор оттенка, длины и расчёт' }
];

// Пары «до / после» — проверьте, что фото в парах соответствуют друг другу.
const STORIES = [
  { before: 'work-pink-before.webp', after: 'work-pink-after.webp', h: 'Больше длины, плотнее низ', p: 'Тонкие уставшие кончики превратились в густые шелковистые волосы ниже лопаток. Переход не заметен даже вблизи.' },
  { before: 'work-blonde-before.webp', after: 'work-blonde-after.webp', h: 'Блонд, который сияет', p: 'Из пушащегося блонда — в ровное гладкое полотно с мягким переходом оттенка.' },
  { before: 'work-brown-before.webp', after: 'work-brown-after.webp', h: 'Шатен как с обложки', p: 'Глубокий натуральный оттенок и длина, о которой мечтаешь: густо, ровно и с блеском.' }
];
const GALLERY = [
  { f: 'work-brown-after.webp', c: 'Шатен · длина и блеск' },
  { f: 'work-choco.webp', c: 'Тёмный шоколад' },
  { f: 'work-pink-after.webp', c: 'Плотный низ' },
  { f: 'work-black.webp', c: 'Глубокий чёрный' },
  { f: 'work-blonde-after.webp', c: 'Блонд · мягкий переход' }
];

const SHADES = [
  { n: 'Платиновый', c: ['#a8946b', '#d8c79f', '#efe3c4'] },
  { n: 'Пепельный', c: ['#6f665c', '#a69c8c', '#cfc6b6'] },
  { n: 'Карамель', c: ['#4a2e1c', '#8a5a34', '#c08a55'] },
  { n: 'Шоколад', c: ['#24150d', '#46291a', '#6a4128'] },
  { n: 'Чёрный', c: ['#0c0a09', '#17120f', '#2a221d'] },
  { n: 'Медный', c: ['#4e2412', '#8d4523', '#c06a36'] },
  { n: 'Омбре', c: ['#2a1c14', '#6b4c33', '#dcc391'] }
];

/* ПРИМЕРЫ ОТЗЫВОВ — замените на реальные отзывы клиенток. */
const REVIEWS = [
  { n: 'Анна', svc: 'Капсульное наращивание', t: 'Боялась, что капсулы будет видно, — вообще не видно! Подруги не поверили, что это наращённые. Оттенок подобрали идеально с первого раза.' },
  { n: 'Мария', svc: 'Ленточное наращивание', t: 'Тонкие волосы, всегда мечтала об объёме. Сделали быстро, без дискомфорта и ощущения тяжести.' },
  { n: 'Дина', svc: 'Консультация', t: 'Пришла со скриншотом из Pinterest — ушла с результатом даже лучше. Всё объяснила и ничего не навязывала.' },
  { n: 'Нино', svc: 'Коррекция', t: 'После коррекции волосы как новые. Приятно, что мастер следит и за состоянием моих собственных волос.' },
  { n: 'Лейла', svc: 'Hair Talk', t: 'Очень переживала за свои тонкие волосы. Техника подошла идеально — лёгкость и никакого дискомфорта.' }
];

const FAQ = [
  ['Это больно?', 'Нет. Во время процедуры ты не должна чувствовать боли. В первые 1–3 дня возможно ощущение «новых волос» — это нормально и быстро проходит.'],
  ['Испортит ли наращивание мои волосы?', 'При правильном выборе техники и уходе — нет. Поэтому мы начинаем с консультации: я смотрю на состояние твоих волос и честно говорю, что подойдёт.'],
  ['Сколько можно носить?', 'Зависит от техники: капсулы обычно носят до 2–3 месяцев до коррекции, ленты — около 6–8 недель. Точные сроки обсудим на консультации.'],
  ['Можно ли красить и укладывать?', 'Да. Наращённые волосы можно укладывать и подкручивать — с термозащитой и без лишнего нагрева у креплений. После визита дам подробную памятку.'],
  ['Как ухаживать за наращёнными волосами?', 'Мягкий шампунь, бережное расчёсывание и сушка — расскажу всё лично и дам памятку по уходу.'],
  ['Как узнать стоимость?', 'Пройди короткую анкету ниже. Итоговая цена зависит от длины, объёма и техники — я назову её до начала работы.'],
  ['Как записаться?', 'Заполни анкету или напиши мне в мессенджер. Я отвечу, предложу удобное время и подготовлю расчёт.']
];

/* =========================================================
   Helpers
   ========================================================= */
function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('is-on');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('is-on'), 2800);
}
const scrollToEl = sel => { const el = $(sel); if (el) el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); };
const escapeHTML = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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
  $$('[data-split]').forEach(splitWords);
  revealIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -5% 0px' });
  $$('[data-reveal]').forEach(el => {
    if (el.closest('.hero')) el.style.setProperty('--d', (parseInt(el.style.getPropertyValue('--d')) || 0) + 1250);
    revealIO.observe(el);
  });
  $$('[data-split]').forEach(el => { if (!el.closest('.hero')) revealIO.observe(el); });
}
const observe = scope => $$('[data-reveal]', scope).forEach(el => revealIO.observe(el));

function initScroll() {
  const bar = $('.progress span'), nav = $('#nav'), dock = $('#dock');
  const st = $('.statement'), heroImg = $('.hero__media img'), aboutImg = $('.about__img img');
  // statement: word-by-word fill
  st.innerHTML = st.textContent.trim().split(/\s+/).map(w => `<span class="fw">${w}</span>`).join(' ');
  const words = $$('.fw', st);
  let lastY = scrollY, ticking = false;
  const upd = () => {
    const y = scrollY, vh = innerHeight, h = root.scrollHeight - vh;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle('is-scrolled', y > 30);
    if (y > 600 && y > lastY + 6 && !$('#menu').classList.contains('is-open')) nav.classList.add('is-hidden');
    else if (y < lastY - 6 || y < 600) nav.classList.remove('is-hidden');
    lastY = y;
    const r = st.getBoundingClientRect();
    const p = clamp((vh * .82 - r.top) / (r.height + vh * .3), 0, 1), n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
    if (!REDUCED) {
      if (y < vh) heroImg.style.translate = `0 ${y * .12}px`;
      const ar = aboutImg.parentElement.getBoundingClientRect();
      if (ar.top < vh && ar.bottom > 0) aboutImg.style.transform = `translateY(${-((vh - ar.top) / (vh + ar.height)) * 14}%)`;
    }
    const b = $('#book').getBoundingClientRect();
    dock.classList.toggle('is-on', y > vh * .8 && !(b.top < vh && b.bottom > 0));
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener('resize', upd); upd();

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
}

/* =========================================================
   Cursor, click ripple, hero light, magnetic
   ========================================================= */
function initPointer() {
  const cv = $('#fx'), ctx = cv.getContext('2d');
  let W, H, dpr; const parts = []; let running = false;
  const resize = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
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
    const t = e.target;
    const lab = t.closest && t.closest('[data-cursor]');
    const link = t.closest && t.closest('a,button,label,input,.svc,.g,.sw,.ba-tab');
    cur.classList.toggle('is-label', !!lab); cur.classList.toggle('is-link', !lab && !!link);
    cur.classList.toggle('is-dark', !!(t.closest && t.closest('.book__copy,.book__box > img')));
    if (lab) lbl.textContent = lab.dataset.cursor;
    cur.classList.remove('is-hidden');
    if (scrollY < innerHeight) { hero.style.setProperty('--lx', m.x + 'px'); hero.style.setProperty('--ly', m.y + scrollY + 'px'); }
  }, { passive: true });
  document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
  (function follow() {
    r.x = lerp(r.x, m.x, .18); r.y = lerp(r.y, m.y, .18);
    ring.style.transform = `translate3d(${r.x}px,${r.y}px,0)`;
    requestAnimationFrame(follow);
  })();

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
  $('#svcGrid').innerHTML = SERVICES.map((s, i) => `
    <article class="svc" data-reveal style="--d:${i * 120}">
      <div class="svc__img"><img src="${s.img}" alt="" loading="lazy"></div>
      <div class="svc__body">
        <h3>${s.t}</h3>
        <p>${s.s}</p>
        <div class="svc__meta"><span>${s.time}</span><span>носка ${s.wear}</span></div>
        <div class="svc__det"><div>
          <p>${s.det}</p>
          <button type="button" class="btn btn--dark" data-svc="${s.t}"><span>Записаться</span><svg class="arr"><use href="#arrow"/></svg></button>
        </div></div>
        <button type="button" class="svc__more" aria-expanded="false"><span>Подробнее</span><i><svg><use href="#plus"/></svg></i></button>
      </div>
    </article>`).join('');
  $('#svcExtra').innerHTML = EXTRA.map((s, i) => `
    <button type="button" class="ex" data-svc="${s.t}" data-reveal style="--d:${i * 100}">
      <div><b>${s.t}</b><small>${s.s}</small></div><span class="round"><svg><use href="#arrow"/></svg></span>
    </button>`).join('');
  $('#services').addEventListener('click', e => {
    const go = e.target.closest('[data-svc]');
    if (go) { quiz.setService(go.dataset.svc); return; }
    const card = e.target.closest('.svc');
    if (!card) return;
    const open = !card.classList.contains('is-open');
    card.classList.toggle('is-open', open); $('.svc__more', card).setAttribute('aria-expanded', open);
    $('.svc__more span', card).textContent = open ? 'Свернуть' : 'Подробнее';
  });
  observe($('#services'));
}

/* =========================================================
   Works: before/after, gallery, lightbox
   ========================================================= */
function buildWorks() {
  const ba = $('#ba'), range = $('.ba__range', ba), iB = $('.ba__img--before', ba), iA = $('.ba__img--after', ba);
  const tabs = $('#baTabs'), info = $('#baInfo');
  let touched = false, raf = 0;
  const setPos = v => { ba.style.setProperty('--pos', v + '%'); range.value = v; };
  range.addEventListener('input', () => { touched = true; cancelAnimationFrame(raf); ba.style.setProperty('--pos', range.value + '%'); });
  range.addEventListener('pointerdown', () => { touched = true; cancelAnimationFrame(raf); });
  const hint = () => {
    if (REDUCED || touched) return;
    const keys = [[50, 28], [28, 72], [72, 50]]; let s = 0, t0 = performance.now();
    const step = t => {
      if (touched) return;
      const k = clamp((t - t0) / 900, 0, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setPos(lerp(keys[s][0], keys[s][1], e));
      if (k < 1) raf = requestAnimationFrame(step); else if (++s < keys.length) { t0 = performance.now(); raf = requestAnimationFrame(step); }
    };
    raf = requestAnimationFrame(step);
  };
  const render = i => {
    const s = STORIES[i];
    $$('.ba-tab', tabs).forEach((b, k) => b.classList.toggle('is-on', k === i));
    iB.src = IMG + s.before; iA.src = IMG + s.after; setPos(50);
    info.innerHTML = `<span class="n">0${i + 1} / 0${STORIES.length}</span><h3>${s.h}</h3><p>${s.p}</p>`;
  };
  tabs.innerHTML = STORIES.map((s, i) => `<button class="ba-tab" aria-label="История ${i + 1}"><img src="${IMG + s.after}" alt=""></button>`).join('');
  tabs.addEventListener('click', e => {
    const b = e.target.closest('.ba-tab'); if (!b) return;
    const i = $$('.ba-tab', tabs).indexOf(b);
    info.style.opacity = 0; ba.style.opacity = .6;
    setTimeout(() => { render(i); info.style.opacity = 1; ba.style.opacity = 1; touched = false; hint(); }, 250);
  });
  ba.style.transition = 'opacity .3s';
  render(0);
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { setTimeout(hint, 700); o.disconnect(); } }, { threshold: .5 }).observe(ba);

  const g = $('#gallery');
  g.innerHTML = GALLERY.map((x, i) => `<figure class="g" data-i="${i}" data-reveal style="--d:${i * 80}"><img src="${IMG + x.f}" alt="${x.c}" loading="lazy"><figcaption>${x.c}</figcaption></figure>`).join('');
  observe(g);
  dragScroll(g, i => lightbox.open(i));
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
  const show = n => { i = (n + GALLERY.length) % GALLERY.length; img.src = IMG + GALLERY[i].f; img.alt = cap.textContent = GALLERY[i].c; };
  lightbox = {
    open(n) { show(n); lb.hidden = false; document.body.style.overflow = 'hidden'; },
    close() { lb.hidden = true; document.body.style.overflow = ''; }
  };
  $('#lbX').onclick = lightbox.close; $('#lbP').onclick = () => show(i - 1); $('#lbN').onclick = () => show(i + 1);
  lb.addEventListener('click', e => { if (e.target === lb) lightbox.close(); });
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') lightbox.close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
}

/* =========================================================
   Hair Lab
   ========================================================= */
const lab = { shade: 2, len: 55, dens: 1, wave: 0 };
const DENS = [{ n: 'лёгкая', v: .82 }, { n: 'естественная', v: 1 }, { n: 'пышная', v: 1.2 }];
const MARKS = [[30, 'каре'], [40, 'плечи'], [55, 'лопатки'], [65, 'талия'], [80, 'бёдра']];
const lenName = L => L < 35 ? 'каре' : L < 47 ? 'до плеч' : L < 60 ? 'до лопаток' : L < 72 ? 'до талии' : 'до бёдер';

function initLab() {
  const hair = window.HairRenderer.create($('#hairCanvas'));
  const swHTML = SHADES.map((s, i) => `<button type="button" class="sw" data-i="${i}" role="radio" aria-label="${s.n}" title="${s.n}" style="--c1:${s.c[0]};--c2:${s.c[1]};--c3:${s.c[2]}"></button>`).join('');
  $('#swatches').innerHTML = swHTML; $('#qSwatches').innerHTML = swHTML;
  $('#lenMarks').innerHTML = MARKS.map(([l, t]) => `<span style="left:${(l - 30) / 50 * 100}%">${t}</span>`).join('');
  $('#ruler').innerHTML = MARKS.map(([l, t]) => `<span class="m" data-l="${l}" style="top:${hair.endYFor(l) / hair.H * 100}%">${t}</span>`).join('');

  let pending = false;
  const draw = () => {
    if (pending) return; pending = true;
    requestAnimationFrame(() => {
      pending = false;
      hair.render({ length: lab.len, shade: SHADES[lab.shade].c, density: DENS[lab.dens].v, wave: lab.wave ? 9 : 2.5 });
    });
  };
  const ui = () => {
    const s = SHADES[lab.shade];
    $('#shadeName').textContent = s.n; $('#qShadeOut').textContent = s.n;
    $('#lenName').textContent = `${lenName(lab.len)} · ${lab.len} см`; $('#qLenOut').textContent = lab.len + ' см';
    $('#labBadge').textContent = `${lenName(lab.len)} · ${s.n}`;
    $$('.sw').forEach(b => { const on = +b.dataset.i === lab.shade; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); });
    $$('#densSeg button').forEach(b => b.classList.toggle('is-on', +b.dataset.v === lab.dens));
    $$('#waveSeg button').forEach(b => b.classList.toggle('is-on', +b.dataset.v === lab.wave));
    $$('#ruler .m').forEach(m => m.classList.toggle('is-near', Math.abs(+m.dataset.l - lab.len) <= 4));
    ['#lenRange', '#qLen'].forEach(id => { const r = $(id); r.value = lab.len; r.style.setProperty('--fill', (lab.len - 30) / 50 * 100 + '%'); });
    draw();
  };
  document.addEventListener('click', e => { const b = e.target.closest('.sw'); if (b) { lab.shade = +b.dataset.i; ui(); } });
  ['#lenRange', '#qLen'].forEach(id => $(id).addEventListener('input', e => { lab.len = +e.target.value; ui(); }));
  $('#densSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.dens = +b.dataset.v; ui(); } });
  $('#waveSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.wave = +b.dataset.v; ui(); } });
  $('#labSend').addEventListener('click', () => { toast('Образ сохранён в анкете'); scrollToEl('#book'); });
  ui();
  lab.reset = () => { Object.assign(lab, { shade: 2, len: 55, dens: 1, wave: 0 }); ui(); };
}

/* =========================================================
   Reviews & FAQ
   ========================================================= */
function buildReviews() {
  const track = $('#rvTrack'), sc = $('#rvScroll');
  const stars = '<svg><use href="#star"/></svg>'.repeat(5);
  track.innerHTML = REVIEWS.map((r, i) => `
    <article class="rv" data-reveal style="--d:${i * 80}">
      <div class="rv__stars" aria-label="5 из 5">${stars}</div>
      <p class="rv__txt">«${r.t}»</p>
      <div class="rv__who"><span class="rv__av">${r.n[0]}</span><div><b>${r.n}</b><span>${r.svc}</span></div></div>
    </article>`).join('');
  observe(track);
  const by = d => sc.scrollBy({ left: d * (track.firstElementChild.offsetWidth + 20), behavior: 'smooth' });
  $('#rvPrev').onclick = () => by(-1); $('#rvNext').onclick = () => by(1);
  dragScroll(sc);
}

function buildFAQ() {
  const acc = $('#acc');
  acc.innerHTML = FAQ.map(([q, a], i) => `
    <div class="acc__i${i ? '' : ' is-open'}" data-reveal style="--d:${i * 60}">
      <button class="acc__q" aria-expanded="${!i}" aria-controls="fa${i}"><span>${q}</span><i><svg><use href="#plus"/></svg></i></button>
      <div class="acc__a" id="fa${i}" role="region"><div><p>${a}</p></div></div>
    </div>`).join('');
  observe(acc);
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
  let cur = 1, chan = 'WhatsApp', service = '';
  const val = () => Object.fromEntries(new FormData(form).entries());
  const hints = { WhatsApp: ['Номер WhatsApp', '+995 ...', 'tel'], Telegram: ['Telegram — @username или номер', '@username', 'text'], Instagram: ['Instagram — @username', '@username', 'text'] };

  const validate = n => {
    const v = val();
    if (n === 1 && !v.goal) return 'Выбери вариант, чтобы продолжить';
    if (n === 2 && (!v.now || !v.dens)) return 'Выбери длину и густоту волос';
    if (n === 4 && !v.when) return 'Выбери удобное время';
    if (n === 5) {
      if (!v.name || v.name.trim().length < 2) { $('#fName').parentElement.classList.add('is-bad'); return 'Подскажи, как к тебе обращаться'; }
      const c = (v.contact || '').trim();
      const ok = chan === 'WhatsApp' ? c.replace(/\D/g, '').length >= 7 : c.replace('@', '').length >= 3;
      if (!ok) { $('#fContact').parentElement.classList.add('is-bad'); return chan === 'WhatsApp' ? 'Укажи номер (минимум 7 цифр)' : 'Укажи ник или номер'; }
    }
    return '';
  };
  const go = n => {
    steps.forEach((s, i) => { s.classList.toggle('is-active', i + 1 === n); s.setAttribute('aria-hidden', i + 1 !== n); });
    cur = n; err.textContent = '';
    $('#qBar').style.transform = `scaleX(${n / TOTAL})`; $('#qCount').textContent = `Шаг ${n} из ${TOTAL}`;
    back.disabled = n === 1;
    $('span', next).textContent = n === TOTAL ? 'Получить расчёт' : 'Далее';
  };
  const tryNext = () => {
    const e = validate(cur);
    if (e) { err.textContent = e; return; }
    if (cur < TOTAL) go(cur + 1); else submit();
  };
  next.addEventListener('click', tryNext);
  back.addEventListener('click', () => cur > 1 && go(cur - 1));
  form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); tryNext(); } });
  form.addEventListener('input', () => { err.textContent = ''; $$('.field.is-bad', form).forEach(f => f.classList.remove('is-bad')); });
  $$('input[name=goal]', form).forEach(r => r.addEventListener('change', () => setTimeout(() => cur === 1 && go(2), 350)));
  $('#chanSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; chan = b.dataset.v;
    $$('#chanSeg button').forEach(x => x.classList.toggle('is-on', x === b));
    const [l, ph, t] = hints[chan]; $('#contactLbl').textContent = l; const c = $('#fContact'); c.placeholder = ph; c.inputMode = t;
  });

  const message = v => [
    `Здравствуйте, Катрин! Меня зовут ${v.name.trim()}.`,
    `Хочу: ${v.goal}.`,
    service ? `Интересует: ${service}.` : '',
    `Мои волосы сейчас: ${v.now}, ${v.dens}.`,
    `Желаемый образ: ${lenName(lab.len)} (~${lab.len} см), оттенок «${SHADES[lab.shade].n}», густота ${DENS[lab.dens].n}${lab.wave ? ', волна' : ''}.`,
    `Когда удобно: ${v.when}.${v.city && v.city.trim() ? ' Город: ' + v.city.trim() + '.' : ''}`,
    `Связь: ${chan} — ${v.contact.trim()}.`,
    v.comment && v.comment.trim() ? `Комментарий: ${v.comment.trim()}` : ''
  ].filter(Boolean).join('\n');

  function submit() {
    const v = val(), msg = message(v), enc = encodeURIComponent(msg);
    const rows = [['Имя', v.name.trim()], ['Цель', v.goal], ['Образ', `${lenName(lab.len)}, ${SHADES[lab.shade].n}`], ['Когда', v.when], ['Связь', chan], ['Услуга', service || 'подберём вместе']];
    $('#summary').innerHTML = rows.map(([k, x]) => `<div><dt>${k}</dt><dd>${escapeHTML(x)}</dd></div>`).join('');
    $('#sendWa').href = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${enc}` : `https://wa.me/?text=${enc}`;
    $('#sendTg').href = CONFIG.telegram ? `https://t.me/${CONFIG.telegram}?text=${enc}` : `https://t.me/share/url?url=%20&text=${enc}`;
    form._msg = msg;
    if (CONFIG.endpoint) fetch(CONFIG.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...v, service, length: lab.len, shade: SHADES[lab.shade].n, channel: chan, message: msg }) }).catch(() => {});
    done.hidden = false;
    const r = $('.done__ok').getBoundingClientRect();
    if (initPointer.burst) { initPointer.burst(r.left + r.width / 2, r.top + r.height / 2, 14); setTimeout(() => initPointer.burst(r.left + r.width / 2, r.top + r.height / 2, 10), 220); }
  }
  $('#copyReq').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(form._msg || ''); toast('Заявка скопирована'); } catch { toast('Не удалось скопировать'); }
  });
  $('#qAgain').addEventListener('click', () => { form.reset(); done.hidden = true; service = ''; lab.reset(); go(1); });
  go(1);
  quiz = { setService(name) { service = name; toast(`«${name}» — добавлено в анкету`); scrollToEl('#book'); } };
}

/* =========================================================
   Boot
   ========================================================= */
applyContactLinks();
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
initPointer();
})();
