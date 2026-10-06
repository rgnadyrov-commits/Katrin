/* =========================================================
   Katrin Luxe Locks — interactions
   ========================================================= */
(() => {
'use strict';

/* ---------------------------------------------------------
   НАСТРОЙКИ — впишите реальные контакты Катрин сюда.
   whatsapp : номер в международном формате, только цифры (например "995555123456")
   telegram : username без @ (например "katrin_luxe")
   instagram: username без @
   endpoint : (необязательно) URL формы-приёмника, например Formspree.
              Если указан — заявки будут отправляться и туда.
   --------------------------------------------------------- */
const CONFIG = { whatsapp: '', telegram: '', instagram: '', endpoint: '' };

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const FINE = matchMedia('(pointer:fine)').matches;
const REDUCED = matchMedia('(prefers-reduced-motion:reduce)').matches;
const root = document.documentElement;

/* =========================================================
   ДАННЫЕ (всё, что можно править без поиска по вёрстке)
   ========================================================= */
const SERVICES = [
  { t: 'Капсульное наращивание', s: 'Классика, которую не отличить от родных волос',
    for: 'Для длины и густоты. Подходит большинству типов волос.', time: 'ориентировочно 3–4 часа', wear: 'до 2–3 месяцев, затем коррекция',
    ico: '<path d="M16 6c-2 14 2 26-2 52M32 6c-2 14 2 26-2 52M48 6c-2 14 2 26-2 52"/><rect x="10" y="22" width="12" height="16" rx="6" fill="#ecd6a0"/><rect x="26" y="22" width="12" height="16" rx="6" fill="#ecd6a0"/><rect x="42" y="22" width="12" height="16" rx="6" fill="#ecd6a0"/>' },
  { t: 'Ленточное наращивание', s: 'Быстро, плоско и абсолютно незаметно',
    for: 'Для объёма и длины. Особенно хорошо для тонких и средних волос.', time: 'ориентировочно 1–1,5 часа', wear: 'около 6–8 недель, затем коррекция',
    ico: '<path d="M14 4v20M26 4v20M38 4v20M50 4v20M14 38v22M26 38v22M38 38v22M50 38v22"/><rect x="6" y="24" width="52" height="14" rx="3" fill="#ecd6a0"/>' },
  { t: 'Hair Talk · трессы', s: 'Без нагрева и клея — деликатно для тонких волос',
    for: 'Для тонких и редких волос, когда важна максимальная бережность.', time: 'ориентировочно 1,5–2 часа', wear: 'до переноса — около 1,5–2 месяцев',
    ico: '<path d="M4 26c8-14 16-14 24 0s16 14 24 0 8-6 8-6"/><path d="M4 38c8-14 16-14 24 0s16 14 24 0 8-6 8-6"/><path d="M12 22v20M24 30v20M36 22v20M48 30v20" stroke-dasharray="3 4"/><circle cx="32" cy="32" r="3" fill="#ecd6a0"/>' },
  { t: 'Коррекция', s: 'Возвращаем свежесть, посадку и аккуратный вид',
    for: 'Для тех, кто уже носит наращённые волосы и хочет обновить результат.', time: 'ориентировочно 2–3 часа', wear: 'каждые 2–3 месяца (для капсул)',
    ico: '<path d="M52 26A20 20 0 0 0 14 22"/><path d="M52 10v16H36"/><path d="M12 38a20 20 0 0 0 38 4"/><path d="M12 54V38h16"/><circle cx="32" cy="32" r="4" fill="#ecd6a0"/>' },
  { t: 'Бережное снятие', s: 'Мягко и без потерь для твоих волос',
    for: 'Если пора снять наращивание или поменять технику.', time: 'ориентировочно 1 час', wear: 'без боли и без вытягивания',
    ico: '<circle cx="16" cy="16" r="8"/><circle cx="16" cy="48" r="8" fill="#ecd6a0"/><path d="M22 21 58 46M22 43 58 18"/>' },
  { t: 'Консультация и подбор', s: 'Оттенок, длина, объём — до начала работы',
    for: 'Для тех, кто сомневается или впервые думает о наращивании.', time: 'ориентировочно 30 минут', wear: 'подбор материала и расчёт стоимости',
    ico: '<path d="M10 12h44a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H30L18 56V44h-8a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z"/><path d="M32 18c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9Z" fill="#ecd6a0"/>' }
];

// Пары «до / после» (в папке «Мои работы» это похожие по фону/одежде фото — проверьте соответствие).
const STORIES = [
  { id: 'pink',   before: 'work-pink-before.webp',   after: 'work-pink-after.webp',
    h: 'Больше длины, <em>плотнее низ</em>', p: 'Тонкие уставшие концы — и густые шелковистые волосы до лопаток и ниже. Переход не найти даже вблизи.', tags: ['Длина', 'Плотный срез', 'Естественный переход'] },
  { id: 'blonde', before: 'work-blonde-before.webp', after: 'work-blonde-after.webp',
    h: 'Блонд, <em>который сияет</em>', p: 'Из лёгкого, пушащегося блонда — в ровное зеркальное полотно с мягким омбре.', tags: ['Блонд', 'Объём', 'Сияние'] },
  { id: 'brown',  before: 'work-brown-before.webp',  after: 'work-brown-after.webp',
    h: 'Шатен <em>«как с обложки»</em>', p: 'Глубокий натуральный оттенок и длина, о которой мечтаешь: густо, ровно, блестяще.', tags: ['Шатен', 'Длина', 'Блеск'] }
];

const GALLERY = [
  { f: 'work-brown-after.webp',  c: 'Шатен · длина и блеск' },
  { f: 'work-pink-after.webp',   c: 'Шоколад · плотный низ' },
  { f: 'work-black.webp',        c: 'Глубокий чёрный' },
  { f: 'work-blonde-after.webp', c: 'Блонд · мягкое омбре' },
  { f: 'work-choco.webp',        c: 'Тёмный шоколад · зеркальный блеск' },
  { f: 'work-brown-before.webp', c: 'До: каре до лопаток' }
];

const SHADES = [
  { n: 'Платиновый', c: ['#9a8a68', '#cdbb8c', '#efe3c0'] },
  { n: 'Пепельный',  c: ['#4a4540', '#7a7168', '#a39a8e'] },
  { n: 'Карамель',   c: ['#5a3a24', '#a9733d', '#d09a5b'] },
  { n: 'Шоколад',    c: ['#2d1a10', '#4a2c1c', '#6b4128'] },
  { n: 'Чёрный',     c: ['#0a0807', '#171210', '#2a231f'] },
  { n: 'Медный',     c: ['#5c2a14', '#9a4a24', '#cf7a3e'] },
  { n: 'Омбре',      c: ['#2e2019', '#7b5a3a', '#e6cf9c'] }
];

/* ПРИМЕР ОТЗЫВОВ — замените на реальные отзывы клиенток (имя, город, услуга, текст). */
const REVIEWS = [
  { n: 'Анна',  svc: 'Капсульное наращивание', t: 'Боялась, что будут видны капсулы — вообще не видно! Подруги не поверили, что это наращённые. Оттенок подобрали идеально с первого раза.' },
  { n: 'Мария', svc: 'Ленточное наращивание', t: 'Тонкие волосы, всегда мечтала про объём. Сделали быстро, никакого дискомфорта и тяжести. Хожу и перебираю волосы весь день 😊' },
  { n: 'Дина',  svc: 'Консультация и подбор', t: 'Пришла со скриншотом из Pinterest — ушла с результатом, который даже лучше. Всё объяснила, ничего не навязывала. Честно и очень тепло.' },
  { n: 'Нино',  svc: 'Коррекция', t: 'После коррекции волосы как новые! Приятно, что мастер следит за состоянием моих собственных волос и говорит как о них заботиться.' },
  { n: 'Лейла', svc: 'Hair Talk', t: 'Очень переживала за свои тонкие волосы. Метод подошёл идеально — ни ощущения тяжести, ни дискомфорта. Спасибо!' },
  { n: 'Софи',  svc: 'Капсульное наращивание', t: 'Длина до талии за один визит. Люди на улице спрашивают, где я «отрастила». Теперь только к Катрин ✦' }
];

const FAQ = [
  ['Это больно?', 'Нет. Во время процедуры ты не должна чувствовать боли. В первые 1–3 дня возможно ощущение «новых волос» — это нормально, и оно быстро проходит.'],
  ['Испортит ли наращивание мои волосы?', 'При правильном выборе техники и уходе — нет. Именно поэтому мы начинаем с консультации: я смотрю на состояние твоих волос и честно говорю, что подойдёт. Важно приходить на коррекцию вовремя.'],
  ['Как долго можно носить?', 'Зависит от техники: капсулы обычно носят до 2–3 месяцев до коррекции, ленты — около 6–8 недель. Хорошие волосы можно использовать повторно, сроки уточним на консультации.'],
  ['Можно ли красить, укладывать, пользоваться плойкой?', 'Да. Наращённые волосы можно укладывать и подкручивать — с термозащитой и без лишнего нагрева у креплений. После визита я расскажу подробно.'],
  ['Можно ли мыть голову, плавать, ходить в хаммам?', 'Можно. У каждого вопроса есть свои мелочи (шампунь, сушка, расчёсывание) — я дам памятку по уходу после процедуры.'],
  ['Как узнать стоимость?', 'Пройди короткую анкету ниже: длина, объём и техника определяют итоговую цену. Я озвучу стоимость до начала работы — без неожиданностей.'],
  ['Как записаться?', 'Заполни короткую анкету ниже или напиши мне в мессенджер. Я отвечу, предложу удобное время и подготовлю расчёт.']
];

/* =========================================================
   Helpers
   ========================================================= */
function splitWords(el) {
  let i = 0;
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = part;
          wi.style.setProperty('--i', i++);
          w.appendChild(wi); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
  };
  walk(el);
}

function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('is-on');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('is-on'), 2800);
}

function scrollToEl(sel) { const el = $(sel); if (el) el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); }

/* contact links */
function applyContactLinks() {
  const map = {
    instagram: CONFIG.instagram ? `https://instagram.com/${CONFIG.instagram}` : '',
    telegram:  CONFIG.telegram  ? `https://t.me/${CONFIG.telegram}` : '',
    whatsapp:  CONFIG.whatsapp  ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}` : ''
  };
  $$('[data-link]').forEach(a => {
    const href = map[a.dataset.link];
    if (href) { a.href = href; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.href = '#book'; }
  });
}

/* =========================================================
   FX: canvas — прядь за курсором, искры при клике
   ========================================================= */
const FX = (() => {
  const cv = $('#fx'); const ctx = cv.getContext('2d');
  const cursor = $('.cursor'); const dot = $('.cursor__dot'); const ring = $('.cursor__ring'); const ringLbl = $('.cursor__ring b');
  let W = 0, H = 0, dpr = 1;
  const N = 24;
  const pts = Array.from({ length: N }, () => ({ x: -200, y: -200 }));
  const ringPos = { x: -200, y: -200 };
  const m = { x: -200, y: -200 };
  let lastMove = 0, running = false, moved = false, lastDust = { x: 0, y: 0 };
  const parts = [];
  const COLS = ['#dcbd78', '#ecd6a0', '#b4d2e1', '#c58b52', '#fffdf8', '#c9a35a'];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function star(x, y, r, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath();
    ctx.moveTo(0, -r); ctx.quadraticCurveTo(r * .12, -r * .12, r, 0); ctx.quadraticCurveTo(r * .12, r * .12, 0, r);
    ctx.quadraticCurveTo(-r * .12, r * .12, -r, 0); ctx.quadraticCurveTo(-r * .12, -r * .12, 0, -r); ctx.fill(); ctx.restore();
  }

  function burst(x, y, n = 16, o = {}) {
    if (REDUCED) return;
    const power = o.power || 1, g = o.gravity || 0;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = (1.5 + Math.random() * 5) * power;
      parts.push({ type: Math.random() < .72 ? 's' : 'd', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (o.up || 0), g,
        life: 0, max: 700 + Math.random() * 600, r: 3 + Math.random() * 7 * power, rot: Math.random() * 6, vr: (Math.random() - .5) * .25, c: COLS[(Math.random() * COLS.length) | 0] });
    }
    parts.push({ type: 'ring', x, y, life: 0, max: 600, r: 6, c: '#c9a35a' });
    kick();
  }

  function dust(x, y) {
    parts.push({ type: 's', x: x + (Math.random() - .5) * 10, y: y + (Math.random() - .5) * 10, vx: (Math.random() - .5) * .8, vy: Math.random() * .6 + .2, g: .01,
      life: 0, max: 700 + Math.random() * 500, r: 2 + Math.random() * 3.5, rot: Math.random() * 6, vr: .05, c: COLS[(Math.random() * 4) | 0] });
  }

  function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }

  let prev = 0;
  function loop(t) {
    const dt = Math.min(32, t - prev || 16); prev = t;
    ctx.clearRect(0, 0, W, H);

    if (FINE && moved) {
      // trail
      pts[0].x = lerp(pts[0].x, m.x, .5); pts[0].y = lerp(pts[0].y, m.y, .5);
      for (let i = 1; i < N; i++) { pts[i].x = lerp(pts[i].x, pts[i - 1].x, .36); pts[i].y = lerp(pts[i].y, pts[i - 1].y, .36); }
      ringPos.x = lerp(ringPos.x, m.x, .18); ringPos.y = lerp(ringPos.y, m.y, .18);
      ring.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0)`;

      const strands = [['201,163,90', 2.6], ['94,150,182', 1.9], ['197,139,82', 1.5]];
      strands.forEach(([col, w], s) => {
        const P = [];
        for (let i = 0; i < N; i++) {
          const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, N - 1)];
          let dx = b.x - a.x, dy = b.y - a.y; const l = Math.hypot(dx, dy) || 1;
          const k = i / N, off = Math.sin(t * .004 + i * .5 + s * 2.1) * (s === 0 ? 0 : (s === 1 ? 1 : -1)) * (1 + k * 9);
          P.push({ x: pts[i].x - dy / l * off, y: pts[i].y + dx / l * off });
        }
        ctx.lineCap = 'round';
        for (let i = 1; i < N; i++) {
          const k = i / N;
          ctx.strokeStyle = `rgba(${col},${(1 - k) * .85})`; ctx.lineWidth = Math.max(.3, (1 - k) * w);
          ctx.beginPath(); ctx.moveTo(P[i - 1].x, P[i - 1].y); ctx.lineTo(P[i].x, P[i].y); ctx.stroke();
        }
      });
    }

    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life += dt;
      const k = p.life / p.max;
      if (k >= 1) { parts.splice(i, 1); continue; }
      if (p.type === 'ring') {
        ctx.strokeStyle = `rgba(201,163,90,${(1 - k) * .7})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p.x, p.y, p.r + k * 46, 0, 7); ctx.stroke(); continue;
      }
      p.vx *= .965; p.vy = p.vy * .965 + p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.globalAlpha = 1 - k * k; ctx.fillStyle = p.c;
      if (p.type === 's') star(p.x, p.y, p.r * (1 - k * .4), p.rot); else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r * .45, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
    }

    if (parts.length || (FINE && moved && performance.now() - lastMove < 1400)) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0, 0, W, H); }
  }

  function setHover(target) {
    const lab = target && target.closest('[data-cursor]');
    const link = target && target.closest('a,button,.svc,.acc__q,.opt,.sw,label,summary,[role=button],.ba-tab,.m');
    cursor.classList.toggle('is-label', !!lab);
    cursor.classList.toggle('is-link', !lab && !!link);
    if (lab) ringLbl.textContent = lab.dataset.cursor;
  }

  function init() {
    resize(); addEventListener('resize', resize);
    addEventListener('pointerdown', e => {
      if (e.button > 0) return;
      cursor.classList.add('is-down'); burst(e.clientX, e.clientY, 14);
    }, { passive: true });
    addEventListener('pointerup', () => cursor.classList.remove('is-down'), { passive: true });
    if (!FINE || REDUCED) return;
    root.classList.add('has-cursor');
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      m.x = e.clientX; m.y = e.clientY; lastMove = performance.now();
      if (!moved) { moved = true; pts.forEach(p => { p.x = m.x; p.y = m.y; }); ringPos.x = m.x; ringPos.y = m.y; }
      dot.style.transform = `translate3d(${m.x}px,${m.y}px,0)`;
      if (Math.hypot(m.x - lastDust.x, m.y - lastDust.y) > 46) { dust(m.x, m.y); lastDust = { x: m.x, y: m.y }; }
      setHover(e.target); cursor.classList.remove('is-hidden'); kick();
    }, { passive: true });
    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
  }
  return { init, burst };
})();

/* =========================================================
   Loader
   ========================================================= */
function initLoader() {
  const loader = $('#loader'); const t0 = performance.now();
  const done = () => {
    const wait = Math.max(0, 1500 - (performance.now() - t0));
    setTimeout(() => {
      loader.classList.add('is-done'); document.body.classList.remove('is-loading'); root.classList.add('ready');
      $$('.hero .split').forEach(h => h.classList.add('in'));
    }, wait);
  };
  if (document.readyState === 'complete') done(); else addEventListener('load', done);
  setTimeout(() => { if (!root.classList.contains('ready')) done(); }, 5000);
}

/* =========================================================
   Reveal / split / counters / scroll
   ========================================================= */
function initReveal() {
  $$('.split').forEach(splitWords);
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.matches('.stat')) countUp($('b', e.target));
  }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal], .split').forEach(el => { if (!el.closest('.hero') || el.matches('[data-reveal]')) io.observe(el); });
  $$('.hero [data-reveal]').forEach(el => { el.style.setProperty('--d', (+getComputedStyle(el).getPropertyValue('--d') || 0) + 1500); });
}

function countUp(el) {
  if (!el || el.dataset.done) return; el.dataset.done = 1;
  const to = +el.dataset.count, suf = el.dataset.suffix || '', dur = 1400, t0 = performance.now();
  const step = t => { const k = clamp((t - t0) / dur, 0, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suf : ''); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

function initScroll() {
  const bar = $('.progress span'), nav = $('#nav'), dock = $('#dock'), steps = $('#steps');
  let lastY = scrollY, ticking = false;
  const upd = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > 500 && y > lastY + 4 && !$('#menu').classList.contains('is-open'));
    if (y < lastY - 4 || y < 500) nav.classList.remove('is-hidden');
    lastY = y;
    const book = $('#book').getBoundingClientRect();
    dock.classList.toggle('is-on', y > 700 && !(book.top < innerHeight * .6 && book.bottom > 0));
    if (steps) { const r = steps.getBoundingClientRect(); steps.style.setProperty('--p', clamp((innerHeight * .8 - r.top) / (r.height + 120), 0, 1)); }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();

  // scroll-spy
  const pills = $$('.nav__pills .pill');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) pills.forEach(p => p.classList.toggle('is-active', p.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => spy.observe(s));

  // menu
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => {
    menu.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open); menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  $('#year').textContent = new Date().getFullYear();
  $$('[data-goto]').forEach(b => b.addEventListener('click', () => {
    scrollToEl(b.dataset.goto);
    if (b.dataset.svc != null) setTimeout(() => flipService(+b.dataset.svc, true), 650);
  }));
}

/* parallax: mouse (data-depth) + scroll (data-speed) */
function initParallax() {
  const els = $$('[data-depth],[data-speed]').map(el => ({ el, d: +el.dataset.depth || 0, s: +el.dataset.speed || 0, top: (el.closest('section') || document.body).offsetTop }));
  if (REDUCED || !els.length) return;
  const m = { x: 0, y: 0 }, c = { x: 0, y: 0 };
  if (FINE) addEventListener('pointermove', e => { m.x = e.clientX / innerWidth - .5; m.y = e.clientY / innerHeight - .5; }, { passive: true });
  const tick = () => {
    c.x = lerp(c.x, m.x, .07); c.y = lerp(c.y, m.y, .07);
    els.forEach(o => {
      const sy = o.s ? (scrollY - o.top + innerHeight * .5) * o.s : 0;
      o.el.style.translate = `${(c.x * o.d).toFixed(1)}px ${(c.y * o.d + sy).toFixed(1)}px`;
    });
    requestAnimationFrame(tick);
  };
  tick();
}

/* tilt + magnetic */
function initTiltMagnet() {
  if (!FINE || REDUCED) return;
  $$('.tilt').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(900px) rotateX(${(.5 - y) * 9}deg) rotateY(${(x - .5) * 11}deg) scale(1.02)`;
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%'); el.classList.add('is-tilting');
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; el.classList.remove('is-tilting'); });
  });
  $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.translate = `${(e.clientX - r.left - r.width / 2) * .28}px ${(e.clientY - r.top - r.height / 2) * .38}px`;
    });
    el.addEventListener('pointerleave', () => { el.style.translate = ''; });
  });
}

/* marquee: duplicate content for seamless loop */
function initMarquee() { $$('.marquee__track').forEach(t => { t.innerHTML += t.innerHTML; }); }

/* =========================================================
   Services
   ========================================================= */
function buildServices() {
  const grid = $('#svcGrid');
  grid.innerHTML = SERVICES.map((s, i) => `
    <div class="svc" data-i="${i}" tabindex="0" role="button" aria-pressed="false" aria-label="${s.t}. Нажмите, чтобы узнать подробнее" data-reveal style="--d:${(i % 3) * 110}" data-cursor="Подробнее">
      <div class="svc__in">
        <div class="svc__f">
          <span class="svc__num">0${i + 1}</span>
          <div>
            <svg class="svc__ico" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s.ico}</svg>
          </div>
          <div>
            <h3>${s.t}</h3><p>${s.s}</p>
            <span class="svc__more">Подробнее <i>↻</i></span>
          </div>
        </div>
        <div class="svc__b" aria-hidden="true">
          <div><h3>${s.t}</h3>
            <dl>
              <div><dt>Подходит</dt><dd>${s.for}</dd></div>
              <div><dt>Время</dt><dd>${s.time}</dd></div>
              <div><dt>Носка</dt><dd>${s.wear}</dd></div>
            </dl></div>
          <a href="#book" class="svc__go" data-svc="${s.t}" tabindex="-1">Хочу это <svg><use href="#arrow"/></svg></a>
        </div>
      </div>
    </div>`).join('');

  grid.addEventListener('click', e => {
    const go = e.target.closest('.svc__go');
    if (go) { quiz.setService(go.dataset.svc); return; }
    const card = e.target.closest('.svc'); if (card) flipService(+card.dataset.i);
  });
  grid.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('svc')) { e.preventDefault(); flipService(+e.target.dataset.i); }
  });
}
function flipService(i, forceOn) {
  const card = $(`.svc[data-i="${i}"]`); if (!card) return;
  const on = forceOn ? true : !card.classList.contains('is-flipped');
  card.classList.toggle('is-flipped', on); card.setAttribute('aria-pressed', on);
  $('.svc__b', card).setAttribute('aria-hidden', !on); $('.svc__go', card).tabIndex = on ? 0 : -1;
  card.classList.remove('is-focus'); void card.offsetWidth; if (forceOn) card.classList.add('is-focus');
}

/* =========================================================
   Works: before/after + mosaic + lightbox
   ========================================================= */
let lightbox;
function buildWorks() {
  const IMG = 'assets/img/';
  const ba = $('#ba'), range = $('.ba__range', ba), iB = $('.ba__img--before', ba), iA = $('.ba__img--after', ba);
  const tabs = $('#baTabs'), info = $('#baInfo');
  tabs.innerHTML = STORIES.map((s, i) => `<button class="ba-tab ${i ? '' : 'is-on'}" data-i="${i}" aria-label="История ${i + 1}"><img src="${IMG}${s.after}" alt="" loading="lazy"></button>`).join('');
  let auto = 0, userTouched = false;

  const setPos = v => { ba.style.setProperty('--pos', v + '%'); range.value = v; };
  range.addEventListener('input', () => { userTouched = true; cancelAnimationFrame(auto); ba.style.setProperty('--pos', range.value + '%'); });
  range.addEventListener('pointerdown', () => { userTouched = true; cancelAnimationFrame(auto); });

  function sweep() {
    if (REDUCED || userTouched) return;
    const keys = [[50, 14], [14, 86], [86, 50]]; let seg = 0, t0 = performance.now(); const dur = 1000;
    const step = t => {
      if (userTouched) return;
      const k = clamp((t - t0) / dur, 0, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setPos(lerp(keys[seg][0], keys[seg][1], e));
      if (k < 1) auto = requestAnimationFrame(step); else if (++seg < keys.length) { t0 = performance.now(); auto = requestAnimationFrame(step); }
    };
    auto = requestAnimationFrame(step);
  }

  function show(i) {
    const s = STORIES[i];
    $$('.ba-tab', tabs).forEach((b, k) => b.classList.toggle('is-on', k === i));
    ba.style.opacity = .35;
    setTimeout(() => {
      iB.src = IMG + s.before; iA.src = IMG + s.after; setPos(50); ba.style.opacity = 1; userTouched = false; sweep();
    }, 220);
    info.style.opacity = 0;
    setTimeout(() => {
      info.innerHTML = `<h3>${s.h}</h3><p>${s.p}</p><ul>${s.tags.map(t => `<li>${t}</li>`).join('')}</ul>`; info.style.opacity = 1;
    }, 220);
  }
  ba.style.transition = 'opacity .35s'; info.style.transition = 'opacity .35s';
  iB.src = IMG + STORIES[0].before; iA.src = IMG + STORIES[0].after;
  info.innerHTML = `<h3>${STORIES[0].h}</h3><p>${STORIES[0].p}</p><ul>${STORIES[0].tags.map(t => `<li>${t}</li>`).join('')}</ul>`;
  tabs.addEventListener('click', e => { const b = e.target.closest('.ba-tab'); if (b) show(+b.dataset.i); });
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { setTimeout(sweep, 500); o.disconnect(); } }, { threshold: .55 }).observe(ba);

  // mosaic
  const mos = $('#mosaic');
  const tile = (g, i, cls = '') => `<figure class="m ${cls}" data-reveal data-i="${i}" data-cursor="Смотреть" style="--d:${(i % 3) * 90}"><img src="${IMG}${g.f}" alt="${g.c}" loading="lazy" width="480" height="640"><figcaption class="m__cap">${g.c}</figcaption></figure>`;
  mos.innerHTML = [
    tile(GALLERY[0], 0, 'm--tall'), tile(GALLERY[1], 1), tile(GALLERY[2], 2),
    tile(GALLERY[3], 3, 'm--tall'),
    tile(GALLERY[4], 4),
    `<div class="m m--cta" data-reveal><h3>Твоя история — <em>следующая</em></h3><a href="#book" class="btn btn--dark magnetic"><span>Записаться</span><svg><use href="#arrow"/></svg></a></div>`,
    `<div class="m m--quote" data-reveal><div><svg><use href="#star"/></svg><q>Хочу, чтобы ты любила своё отражение</q></div></div>`
  ].join('');
  mos.addEventListener('click', e => { const f = e.target.closest('.m[data-i]'); if (f) lightbox.open(+f.dataset.i); });
  // observe dynamically added reveals
  $$('[data-reveal]', mos).forEach(el => revealIO.observe(el));
  $$('[data-reveal]', $('#svcGrid')).forEach(el => revealIO.observe(el));
}

function initLightbox() {
  const lb = $('#lb'), img = $('#lbImg'), cap = $('#lbCap'); let i = 0;
  const IMG = 'assets/img/';
  const show = n => { i = (n + GALLERY.length) % GALLERY.length; img.src = IMG + GALLERY[i].f; img.alt = GALLERY[i].c; cap.textContent = GALLERY[i].c; };
  const api = {
    open(n) { show(n); lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lbX').focus(); },
    close() { lb.hidden = true; document.body.style.overflow = ''; }
  };
  $('#lbX').addEventListener('click', api.close); $('#lbP').addEventListener('click', () => show(i - 1)); $('#lbN').addEventListener('click', () => show(i + 1));
  lb.addEventListener('click', e => { if (e.target === lb) api.close(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') api.close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1);
  });
  let sx = 0; lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(i + (d < 0 ? 1 : -1)); });
  $$('[data-lightbox]').forEach(el => el.addEventListener('click', () => {
    const f = 'work-' + el.dataset.lightbox + '.webp'; const idx = GALLERY.findIndex(g => g.f === f); api.open(Math.max(0, idx));
  }));
  lightbox = api;
}

/* =========================================================
   Hair Lab
   ========================================================= */
const lab = { shade: 2, len: 55, dens: 1 };
const DENS = [{ n: 'лёгкая', s: .8 }, { n: 'естественная', s: 1 }, { n: 'пышная', s: 1.28 }];
const TOP = 74, K = 3.8;
const lenY = L => TOP + L * K;
const lenName = L => L < 35 ? 'каре' : L < 47 ? 'до плеч' : L < 60 ? 'до лопаток' : L < 72 ? 'до талии' : 'до бёдер';
const MARKS = [[30, 'каре'], [40, 'плечи'], [55, 'лопатки'], [65, 'талия'], [80, 'бёдра']];
let quiz;

function initLab() {
  const sw = $('#swatches'), qsw = $('#qSwatches');
  const swHTML = (name) => SHADES.map((s, i) => `<button type="button" class="sw" data-i="${i}" role="radio" aria-label="${s.n}" title="${s.n}" style="--c1:${s.c[0]};--c2:${s.c[2]}"></button>`).join('');
  sw.innerHTML = swHTML(); qsw.innerHTML = swHTML();

  const scale = $('#labScale');
  let ticks = '';
  for (let c = 30; c <= 80; c += 5) { const y = lenY(c), big = c % 10 === 0; ticks += `<line x1="26" x2="${big ? 40 : 33}" y1="${y}" y2="${y}" class="tk"/>` + (big ? `<text x="22" y="${y + 3.5}" text-anchor="end" class="tn">${c}</text>` : ''); }
  scale.innerHTML = `<line x1="26" x2="26" y1="${lenY(30)}" y2="${lenY(80)}" class="tk"/>` + ticks +
    MARKS.map(([l, t]) => { const y = lenY(l); return `<g data-l="${l}"><line x1="226" x2="238" y1="${y}" y2="${y}"/><text x="242" y="${y + 3}">${t}</text></g>`; }).join('');

  // marks under slider placed by real value
  const mk = $('.range__marks'); mk.style.cssText = 'position:relative;height:18px;display:block';
  mk.innerHTML = MARKS.map(([l, t]) => `<span style="position:absolute;left:${(l - 30) / 50 * 100}%;transform:translateX(${l === 30 ? '0' : l === 80 ? '-100%' : '-50%'})">${t}</span>`).join('');

  const rnd = n => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
  function tress() {
    const L = lab.len * K, d = DENS[lab.dens].s, n = Math.round(42 * d), W = 112 * d, x1 = 150 - W / 2;
    let out = '', hi = '';
    for (let k = 0; k < n; k++) {
      const t = k / (n - 1), x = x1 + t * W, edge = Math.pow(Math.abs(t - .5) * 2, 3);
      const len = L - rnd(k) * 9 - edge * 12, a = 8 * Math.sin(t * 5.2 + .6) + (rnd(k + 9) - .5) * 3, a2 = a * .7 + 3 * Math.cos(t * 7);
      const dd = `M${x.toFixed(1)} ${TOP} C${(x + a).toFixed(1)} ${(TOP + len * .28).toFixed(1)} ${(x - a2).toFixed(1)} ${(TOP + len * .62).toFixed(1)} ${(x + a * .5).toFixed(1)} ${(TOP + len).toFixed(1)}`;
      out += `<path d="${dd}" stroke="url(#hairGrad)" stroke-width="${(3.9 + rnd(k + 3) * 1.6).toFixed(1)}" stroke-linecap="round" fill="none" opacity="${(.82 + rnd(k + 5) * .18).toFixed(2)}"/>`;
      if (k % 4 === 1) hi += `<path d="${dd}" stroke="#fff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity=".22"/>`;
      if (k % 5 === 3) hi += `<path d="${dd}" stroke="#000" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".12"/>`;
    }
    const cx = 150 - W * .14, sh = `M${cx} ${TOP} C${cx + 8} ${TOP + L * .3} ${cx - 8} ${TOP + L * .6} ${cx + 3} ${TOP + L * .96}`;
    $('#tress').innerHTML = out + hi + `<path d="${sh}" stroke="#fff" stroke-width="${(12 * d).toFixed(0)}" stroke-linecap="round" fill="none" opacity=".26" filter="url(#blur6)"/>`;
    const g = $('#hairGrad'); g.setAttribute('y2', TOP + L);
  }

  function render() {
    const s = SHADES[lab.shade]; tress();
    ['hg0', 'hg1', 'hg2'].forEach((id, k) => $('#' + id).setAttribute('stop-color', s.c[k]));
    $('#shadeName').textContent = s.n; $('#lenName').textContent = `${lenName(lab.len)} · ${lab.len} см`; $('#densName').textContent = DENS[lab.dens].n;
    $('#labChip').textContent = `${lenName(lab.len)} · ${s.n}`;
    $$('.sw').forEach(b => { const on = +b.dataset.i === lab.shade; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); });
    $$('#densSeg button').forEach(b => { const on = +b.dataset.v === lab.dens; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); });
    $$('.lab__scale g').forEach(g => g.classList.toggle('is-near', Math.abs(+g.dataset.l - lab.len) <= 3));
    ['lenRange', 'qLen'].forEach(id => { const r = $('#' + id); r.value = lab.len; r.style.setProperty('--fill', (lab.len - 30) / 50 * 100 + '%'); });
    $('#qLenOut').textContent = lab.len + ' см'; $('#qShadeOut').textContent = s.n;
    $('#labBg').style.background = `radial-gradient(60% 45% at 50% 30%,rgba(255,255,255,.85),transparent 70%), radial-gradient(55% 40% at 50% 85%, ${s.c[1]}55, transparent 72%)`;
  }
  const setShade = i => { lab.shade = i; render(); };
  sw.addEventListener('click', e => { const b = e.target.closest('.sw'); if (b) setShade(+b.dataset.i); });
  qsw.addEventListener('click', e => { const b = e.target.closest('.sw'); if (b) setShade(+b.dataset.i); });
  ['lenRange', 'qLen'].forEach(id => $('#' + id).addEventListener('input', e => { lab.len = +e.target.value; render(); }));
  $('#densSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { lab.dens = +b.dataset.v; render(); } });
  $('#labSend').addEventListener('click', () => { quiz.touchedLab = true; toast('Образ перенесён в анкету ✦'); scrollToEl('#book'); });
  render();
}

/* =========================================================
   Reviews
   ========================================================= */
function buildReviews() {
  const track = $('#rvTrack');
  const stars = '<svg><use href="#star"/></svg>'.repeat(5);
  track.innerHTML = REVIEWS.map(r => `
    <article class="rv tilt">
      <span class="rv__q" aria-hidden="true">“</span>
      <div class="rv__head"><div class="rv__av">${r.n[0]}</div><div><b>${r.n}</b><span>Клиентка Katrin</span></div></div>
      <div class="rv__stars" aria-label="5 из 5">${stars}</div>
      <p class="rv__txt">${r.t}</p>
      <span class="rv__tag">${r.svc}</span>
    </article>`).join('');
  const sc = $('#rvScroll');
  const by = d => sc.scrollBy({ left: d * (track.firstElementChild.offsetWidth + 22), behavior: 'smooth' });
  $('#rvPrev').addEventListener('click', () => by(-1)); $('#rvNext').addEventListener('click', () => by(1));
  // mouse drag
  let down = false, sx = 0, sl = 0, moved = 0;
  sc.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = sc.scrollLeft; moved = 0; });
  addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; moved = Math.abs(dx); if (moved > 4) sc.classList.add('is-drag'); sc.scrollLeft = sl - dx; });
  addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => sc.classList.remove('is-drag'), 30); });
  sc.setAttribute('data-cursor', 'Тяни ↔');
}

/* =========================================================
   FAQ
   ========================================================= */
function buildFAQ() {
  const acc = $('#acc');
  acc.innerHTML = FAQ.map(([q, a], i) => `
    <div class="acc__i ${i === 0 ? 'is-open' : ''}" data-reveal style="--d:${i * 70}">
      <button class="acc__q" aria-expanded="${i === 0}" aria-controls="fa${i}" id="fq${i}"><span>${q}</span><i></i></button>
      <div class="acc__a" id="fa${i}" role="region" aria-labelledby="fq${i}"><div><p>${a}</p></div></div>
    </div>`).join('');
  acc.addEventListener('click', e => {
    const b = e.target.closest('.acc__q'); if (!b) return;
    const item = b.parentElement, open = !item.classList.contains('is-open');
    $$('.acc__i', acc).forEach(x => { x.classList.remove('is-open'); $('.acc__q', x).setAttribute('aria-expanded', false); });
    if (open) { item.classList.add('is-open'); b.setAttribute('aria-expanded', true); }
  });
  $$('[data-reveal]', acc).forEach(el => revealIO.observe(el));
}

/* =========================================================
   Quiz (форма-анкета)
   ========================================================= */
function initQuiz() {
  const form = $('#quiz'), steps = $$('.qs', form), TOTAL = steps.length;
  const dotsEl = $('#qDots'), bar = $('#qBar'), cnt = $('#qCount'), err = $('#qErr');
  const back = $('#qBack'), next = $('#qNext'), done = $('#qDone');
  let cur = 1, chan = 'WhatsApp', service = '';
  dotsEl.innerHTML = steps.map((_, i) => `<i>${i + 1}</i>`).join('');

  const val = () => Object.fromEntries(new FormData(form).entries());
  const hints = { WhatsApp: ['Номер WhatsApp', '+995 ...', 'tel'], Telegram: ['Telegram (@username или номер)', '@username', 'text'], Instagram: ['Instagram (@username)', '@username', 'text'] };

  function validate(n) {
    const v = val();
    if (n === 1 && !v.goal) return 'Выбери вариант — это поможет мне подготовиться ✦';
    if (n === 2 && (!v.now || !v.dens)) return 'Выбери длину и густоту волос сейчас';
    if (n === 4 && !v.when) return 'Выбери удобное время';
    if (n === 5) {
      if (!v.name || v.name.trim().length < 2) { $('#fName').closest('.field').classList.add('is-bad'); return 'Подскажи, как к тебе обращаться'; }
      const c = (v.contact || '').trim();
      const ok = chan === 'WhatsApp' ? c.replace(/\D/g, '').length >= 7 : c.replace('@', '').length >= 3;
      if (!ok) { $('#fContact').closest('.field').classList.add('is-bad'); return chan === 'WhatsApp' ? 'Укажи номер WhatsApp (минимум 7 цифр)' : 'Укажи свой ник или номер'; }
    }
    return '';
  }

  function go(n, dir = 1) {
    steps.forEach((s, i) => {
      s.classList.toggle('is-active', i + 1 === n);
      s.classList.toggle('is-left', i + 1 < n);
      s.setAttribute('aria-hidden', i + 1 !== n);
      $$('input,button,textarea', s).forEach(x => x.tabIndex = i + 1 === n ? 0 : -1);
    });
    cur = n; err.textContent = '';
    $$('i', dotsEl).forEach((d, i) => { d.classList.toggle('is-on', i + 1 === n); d.classList.toggle('is-done', i + 1 < n); d.textContent = i + 1 < n ? '✓' : i + 1; });
    bar.style.transform = `scaleX(${n / TOTAL})`; cnt.textContent = `${n} / ${TOTAL}`;
    back.disabled = n === 1;
    $('span', next).textContent = n === TOTAL ? 'Получить расчёт ✦' : 'Далее';
  }

  function tryNext() {
    const e = validate(cur);
    if (e) { err.textContent = e; form.classList.remove('is-shake'); void form.offsetWidth; form.classList.add('is-shake'); return; }
    if (cur < TOTAL) go(cur + 1); else submit();
  }
  next.addEventListener('click', tryNext);
  back.addEventListener('click', () => cur > 1 && go(cur - 1, -1));
  form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); tryNext(); } });
  form.addEventListener('change', () => { err.textContent = ''; $$('.field.is-bad').forEach(f => f.classList.remove('is-bad')); });
  form.addEventListener('input', () => { $$('.field.is-bad').forEach(f => f.classList.remove('is-bad')); err.textContent = ''; });
  // авто-переход после выбора в одношаговых вопросах
  $$('input[name=goal]', form).forEach(r => r.addEventListener('change', () => setTimeout(() => cur === 1 && go(2), 380)));

  $('#chanSeg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; chan = b.dataset.v;
    $$('#chanSeg button').forEach(x => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-checked', x === b); });
    const [lbl, ph, type] = hints[chan]; $('#contactLbl').textContent = lbl; const c = $('#fContact'); c.placeholder = ph; c.inputMode = type === 'tel' ? 'tel' : 'text';
  });

  function message(v) {
    const sh = SHADES[lab.shade].n, d = DENS[lab.dens].n;
    return [
      `Здравствуйте, Катрин! Меня зовут ${v.name.trim()} ✦`,
      `Хочу: ${v.goal}.`,
      service ? `Интересует: ${service}.` : '',
      `Мои волосы сейчас: ${v.now}, ${v.dens}.`,
      `Мечтаю об образе: ${lenName(lab.len)} (~${lab.len} см), оттенок «${sh}», густота ${d}.`,
      `Когда удобно: ${v.when}.${v.city && v.city.trim() ? ' Город: ' + v.city.trim() + '.' : ''}`,
      `Связь: ${chan} — ${v.contact.trim()}.`,
      v.comment && v.comment.trim() ? `Комментарий: ${v.comment.trim()}` : ''
    ].filter(Boolean).join('\n');
  }

  function submit() {
    const v = val(), msg = message(v), id = 'KL-' + String(Math.floor(Math.random() * 9000) + 1000);
    // ticket
    $('#ticket').innerHTML = `
      <div class="ticket__l">
        <span class="ticket__k">Luxe Locks · Boarding pass</span>
        <div class="ticket__route"><span>${v.now}</span><i></i><span>${lab.len} см</span></div>
        <div class="ticket__rows">
          <div><span>Пассажир</span><b>${escapeHTML(v.name.trim())}</b></div>
          <div><span>Длина</span><b>${lenName(lab.len)}</b></div>
          <div><span>Цель</span><b>${v.goal}</b></div>
          <div><span>Когда</span><b>${v.when}</b></div>
          <div><span>Оттенок</span><b>${SHADES[lab.shade].n}</b></div>
          <div><span>Связь</span><b>${chan}</b></div>
        </div>
      </div>
      <div class="ticket__r"><svg><use href="#star"/></svg><b>Katrin<br>Luxe Locks</b><small>${id}</small></div>`;
    const enc = encodeURIComponent(msg);
    $('#sendWa').href = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, '')}?text=${enc}` : `https://wa.me/?text=${enc}`;
    $('#sendTg').href = CONFIG.telegram ? `https://t.me/${CONFIG.telegram}?text=${enc}` : `https://t.me/share/url?url=%20&text=${enc}`;
    form._msg = msg;
    if (CONFIG.endpoint) {
      fetch(CONFIG.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...v, service, length: lab.len, shade: SHADES[lab.shade].n, channel: chan, message: msg }) }).catch(() => {});
    }
    done.hidden = false; form.classList.add('is-done');
    const r = $('#ticket').getBoundingClientRect();
    FX.burst(r.left + r.width / 2, r.top + 40, 60, { power: 1.5, gravity: .06, up: 3 });
    setTimeout(() => FX.burst(r.left + r.width * .2, r.top + 90, 24, { gravity: .05 }), 280);
    setTimeout(() => FX.burst(r.left + r.width * .8, r.top + 90, 24, { gravity: .05 }), 520);
  }

  $('#copyReq').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(form._msg || ''); toast('Заявка скопирована ✦'); }
    catch { toast('Не удалось скопировать — выдели текст вручную'); }
  });
  $('#qAgain').addEventListener('click', () => { form.reset(); done.hidden = true; form.classList.remove('is-done'); lab.shade = 2; lab.len = 55; lab.dens = 1; service = ''; go(1); $$('.sw').forEach(b => b.classList.toggle('is-on', +b.dataset.i === 2)); $('#qLen').dispatchEvent(new Event('input')); });

  go(1);
  quiz = { setService(name) { service = name; toast(`Услуга «${name}» добавлена в анкету ✦`); scrollToEl('#book'); }, touchedLab: false };
}
function escapeHTML(s) { return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/* =========================================================
   Boot
   ========================================================= */
let revealIO;
function boot() {
  applyContactLinks();
  initLoader();
  FX.init();
  // reveal observer must exist before dynamic builders
  revealIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  initMarquee();
  initQuiz();            // quiz object нужен services
  buildServices();
  buildWorks();
  initLightbox();
  buildReviews();
  buildFAQ();
  initLab();
  initReveal();
  initScroll();
  initParallax();
  initTiltMagnet();
}
boot();
})();
