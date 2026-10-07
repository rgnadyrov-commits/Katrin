/* =========================================================
   Переводы сайта: en (по умолчанию), ru, tr, ka.
   Ключи используются в HTML (data-i18n="...") и в main.js (t('...')).
   Отзывы (data.reviews) — ПРИМЕРЫ, замените на реальные.
   ========================================================= */
window.I18N = {

/* ===================== ENGLISH ===================== */
en: {
  langName: 'English',
  meta: { title: 'Katrin Luxe Locks — Hair Extensions', desc: 'Katrin Luxe Locks — hair extension specialist. Capsule, tape-in and Hair Talk extensions. Natural, gentle, luxurious.' },
  nav: { aria: 'Main navigation', top: 'Katrin Luxe Locks — back to top', about: 'About', services: 'Services', works: 'Works', lab: 'Hair Lab', reviews: 'Reviews', faq: 'FAQ', book: 'Book now', menu: 'Open menu', footer: 'Footer navigation', lang: 'Language', toTop: 'Back to top' },
  cur: { works: 'Works', view: 'View', drag: 'Drag' },
  hero: {
    tag1: 'Capsules', tag2: 'Tape-ins', tag3: 'Hair Talk',
    title: '<span class="t-light">Longer.</span> Fuller.<br>Luxurious.',
    cta: 'Find my look', thumb: 'See works', orb: 'Open Hair Lab',
    note: 'Hair extensions that look and feel like your own. Capsules, tape-ins and Hair Talk — with length, density and shade matched just for you.',
    cardT: 'Before & after', cardS: 'Katrin’s real work'
  },
  reel: { label: 'Showreel', title: 'Your hair.<br>Your moment.', sub: 'Luxury you can feel — from the first strand to the final look in the mirror.', watch: 'Watch with sound', watchProcess: 'Watch the process', katrin: 'Katrin at work', close: 'Close' },
  about: {
    label: 'About me',
    statement: 'I’m Katrin, a hair extension specialist. My goal is simple: when you look in the mirror, you see your own hair — just longer, fuller and more luxurious. With zero compromise on how natural it looks.',
    img: 'Katrin — hair extension specialist',
    f1t: 'Tailored to you', f1p: 'Shade, length and density matched to your hair, lifestyle and budget.',
    f2t: 'Gentle on your hair', f2p: 'I choose the technique based on your hair’s condition. If you don’t need extensions, I’ll tell you honestly.',
    f3t: 'Transparent pricing', f3p: 'You’ll know the price before we start. No surprises at the end.',
    btn: 'Discuss my look'
  },
  services: {
    label: 'Services', title: '<span class="t-light">Techniques</span> tailored to you',
    sub: 'Tap a card for details. Times are approximate — the exact ones depend on your hair.',
    more: 'Details', less: 'Close', book: 'Book this'
  },
  works: {
    label: 'Works', title: '<span class="t-light">Results</span> that speak for themselves',
    sub: 'Drag the divider to compare before and after. Katrin’s real work.',
    before: 'Before', after: 'After', beforeAlt: 'Hair before extensions', afterAlt: 'Hair after extensions',
    range: 'Before and after comparison', btn: 'I want this too', story: 'Story'
  },
  lab: {
    label: 'Hair Lab', title: '<span class="t-light">Try on</span> length and shade',
    sub: 'Choose the colour, length and density — the preview instantly shows how the result could look.',
    canvas: 'Hair length and shade preview',
    shade: 'Shade', length: 'Length', density: 'Density', texture: 'Texture',
    d0: 'Light', d1: 'Natural', d2: 'Voluminous', w0: 'Straight', w1: 'Wavy',
    btn: 'I want this look', fine: 'The preview is approximate. The exact shade and length are chosen during the consultation.',
    saved: 'Your look is saved in the form', cm: 'cm', hint: 'Tap the photo or drag the marker to change the length'
  },
  process: {
    label: 'How it works', title: '<span class="t-light">Five steps</span> to dream hair', btn: 'Start with a consultation',
    s1t: 'Getting to know you', s1p: 'Message me or fill in the short form. I’ll clarify your wishes and show you options.',
    s2t: 'Matching', s2p: 'Shade, length, density and technique — for your hair and budget. You’ll know the price in advance.',
    s3t: 'Extensions', s3p: 'Calm, unhurried and comfortable. You relax — I work.',
    s4t: 'Styling', s4p: 'Finishing touches so the result looks flawless from the very first minute.',
    s5t: 'Care & maintenance', s5p: 'I’ll explain how to care for your hair and remind you about maintenance so it always looks perfect.'
  },
  reviews: { label: 'Reviews', title: '<span class="t-light">What clients</span> say', prev: 'Previous', next: 'Next', stars: '5 out of 5' },
  faq: { label: 'FAQ', title: '<span class="t-light">Everything you wanted</span> to ask', sub: 'Didn’t find your answer? Message me — I’ll reply personally.' },
  book: {
    label: 'Booking', title: '<span class="t-light">Let’s create</span> your look',
    sub: 'Five short questions — and I’ll get back to you with options and a price estimate.',
    p1: 'Consultation with no obligation', p2: 'Price agreed before we start', p3: 'Shade and length matched to you'
  },
  quiz: {
    step: 'Step {n} of {t}', back: 'Back', next: 'Next', submit: 'Get a quote',
    q1: 'What would you like?', goal_length: 'Length', goal_length_s: 'I want it longer', goal_volume: 'Volume', goal_volume_s: 'I want it fuller',
    goal_both: 'Both', goal_both_s: 'length and volume', goal_fix: 'Maintenance', goal_fix_s: 'or removal', goal_unsure: 'Not sure yet', goal_unsure_s: 'help me choose',
    q2: 'What is your hair like now?', len: 'Length', dens: 'Density',
    now_shoulders: 'Shoulder-length', now_blades: 'To the shoulder blades', now_below: 'Longer',
    dens_fine: 'Fine', dens_medium: 'Medium', dens_thick: 'Thick',
    q3: 'What look do you dream of?', shade: 'Shade', hint: 'You can skip this — we’ll choose together at the consultation.',
    q4: 'When suits you?', when_week: 'Soon', when_week_s: 'this week', when_month: 'This month', when_month_s: 'within 30 days', when_later: 'Later', when_later_s: 'just looking',
    city: 'City', optional: '(optional)', cityPh: 'Your city',
    q5: 'How can I reach you?', name: 'Name', namePh: 'What should I call you?', channel: 'Messenger',
    cWa: 'WhatsApp number', cTg: 'Telegram — @username or number', cIg: 'Instagram — @username', comment: 'Comment', commentPh: 'For example: I want it like the photo from Pinterest',
    e1: 'Choose an option to continue', e2: 'Choose your current length and density', e4: 'Choose a convenient time', eName: 'Tell me how to address you', eWa: 'Enter your number (at least 7 digits)', eNick: 'Enter your username or number',
    doneT: 'Your request is ready', doneS: 'Send it to me in your favourite messenger — I’ll reply personally.',
    copy: 'Copy', again: 'Start over', copied: 'Request copied', copyFail: 'Could not copy',
    sName: 'Name', sGoal: 'Goal', sLook: 'Look', sWhen: 'When', sChannel: 'Contact', sService: 'Service', sServiceNone: 'we’ll choose together',
    added: '“{s}” added to the form'
  },
  msg: {
    hello: 'Hello Katrin! My name is {name}.', goal: 'I would like: {v}.', service: 'Interested in: {v}.', now: 'My hair now: {a}, {b}.',
    look: 'Dream look: {len} (~{cm} cm), shade “{shade}”, density {dens}{wave}.', wave: ', wavy',
    when: 'Convenient time: {v}.', city: ' City: {v}.', contact: 'Contact: {ch} — {v}.', comment: 'Comment: {v}'
  },
  footer: { studio: 'Hair Extensions Studio' },
  data: {
    services: [
      { t: 'Capsule extensions', s: 'The classic that’s impossible to tell from your own hair. For length and volume.', time: '≈ 3–4 hours', wear: 'lasts up to 2–3 months', det: 'Micro-capsules are attached to fine strands at the roots and stay invisible even up close. You can wear a ponytail and style your hair freely.' },
      { t: 'Tape-in extensions', s: 'The fastest way to add volume — flat and invisible.', time: '≈ 1–1.5 hours', wear: 'lasts 6–8 weeks', det: 'Thin tapes lie flat and can’t be felt. A great option for fine and medium hair when you need volume.' },
      { t: 'Hair Talk', s: 'A delicate heat-free technique for fine and weakened hair.', time: '≈ 1.5–2 hours', wear: 'lasts 1.5–2 months', det: 'A gentle attachment that puts almost no strain on your own hair. Ideal when maximum care is the priority.' }
    ],
    extra: [ { t: 'Maintenance', s: 'Refresh the fit and the look' }, { t: 'Gentle removal', s: 'Painless and safe for your own hair' }, { t: 'Consultation', s: 'Shade, length and a price estimate' } ],
    stories: [
      { h: 'More length, fuller ends', p: 'Thin, tired ends turned into thick, silky hair below the shoulder blades. The transition is invisible even up close.' },
      { h: 'Blonde that shines', p: 'From frizzy blonde to smooth, even hair with a soft shade transition.' },
      { h: 'Cover-worthy brunette', p: 'A deep natural shade and the length you dream of: thick, even and glossy.' }
    ],
    gallery: ['Brunette · length and shine', 'Dark chocolate', 'Fuller ends', 'Deep black', 'Blonde · soft transition'],
    shades: ['Platinum', 'Ash', 'Caramel', 'Chocolate', 'Black', 'Copper', 'Ombré'],
    lengths: ['bob', 'shoulder-length', 'to the shoulder blades', 'waist-length', 'hip-length'],
    marks: ['bob', 'shoulders', 'blades', 'waist', 'hips'],
    dens: ['light', 'natural', 'voluminous'],
    reviews: [
      { n: 'Anna', svc: 'Capsule extensions', t: 'I was afraid the capsules would show — you can’t see them at all! My friends didn’t believe it was extensions. The shade was perfect from the first try.' },
      { n: 'Maria', svc: 'Tape-in extensions', t: 'Fine hair, always dreamed of volume. It was quick, with no discomfort or heaviness.' },
      { n: 'Dina', svc: 'Consultation', t: 'I came with a Pinterest screenshot and left with an even better result. Everything was explained, nothing was pushed.' },
      { n: 'Nino', svc: 'Maintenance', t: 'After maintenance my hair looks brand new. I love that she takes care of my own hair too.' },
      { n: 'Leyla', svc: 'Hair Talk', t: 'I was really worried about my fine hair. The technique was perfect — light and completely comfortable.' }
    ],
    faq: [
      ['Does it hurt?', 'No. You shouldn’t feel any pain during the procedure. For the first 1–3 days you may notice the feeling of “new hair” — that’s normal and passes quickly.'],
      ['Will extensions damage my hair?', 'Not with the right technique and care. That’s why we start with a consultation: I check the condition of your hair and tell you honestly what will work.'],
      ['How long do they last?', 'It depends on the technique: capsules usually last up to 2–3 months before maintenance, tapes about 6–8 weeks. We’ll discuss exact timing at the consultation.'],
      ['Can I dye and style them?', 'Yes. Extensions can be styled and curled — with heat protection and without extra heat near the bonds. I’ll give you a detailed care guide after your visit.'],
      ['How do I care for extensions?', 'Gentle shampoo, careful brushing and drying — I’ll explain everything in person and give you a care guide.'],
      ['How do I find out the price?', 'Fill in the short form below. The final price depends on length, volume and technique — I’ll tell you before we start.'],
      ['How do I book?', 'Fill in the form or message me. I’ll reply, suggest a convenient time and prepare an estimate.']
    ]
  }
},

/* ===================== РУССКИЙ ===================== */
ru: {
  langName: 'Русский',
  meta: { title: 'Katrin Luxe Locks — наращивание волос', desc: 'Katrin Luxe Locks — мастер по наращиванию волос. Капсульное, ленточное наращивание и Hair Talk. Естественно, бережно, роскошно.' },
  nav: { aria: 'Основная навигация', top: 'Katrin Luxe Locks — наверх', about: 'Обо мне', services: 'Услуги', works: 'Работы', lab: 'Hair Lab', reviews: 'Отзывы', faq: 'Вопросы', book: 'Записаться', menu: 'Открыть меню', footer: 'Нижняя навигация', lang: 'Язык', toTop: 'Наверх' },
  cur: { works: 'Работы', view: 'Смотреть', drag: 'Тяни' },
  hero: {
    tag1: 'Капсулы', tag2: 'Ленты', tag3: 'Hair Talk',
    title: '<span class="t-light">Длиннее.</span> Гуще.<br>Роскошнее.',
    cta: 'Подобрать образ', thumb: 'Смотреть работы', orb: 'Открыть Hair Lab',
    note: 'Наращивание волос, которое не отличить от своих. Капсулы, ленты и Hair Talk — с индивидуальным подбором длины, густоты и оттенка.',
    cardT: 'До и после', cardS: 'Реальные работы Катрин'
  },
  reel: { label: 'Шоурил', title: 'Твои волосы.<br>Твой момент.', sub: 'Роскошь, которую чувствуешь — от первой пряди до финального взгляда в зеркало.', watch: 'Смотреть со звуком', watchProcess: 'Смотреть процесс', katrin: 'Катрин за работой', close: 'Закрыть' },
  about: {
    label: 'Обо мне',
    statement: 'Меня зовут Катрин, я мастер по наращиванию волос. Моя цель — чтобы ты смотрела в зеркало и видела свои волосы, только длиннее, гуще и роскошнее. Без компромиссов в естественности.',
    img: 'Катрин — мастер по наращиванию волос',
    f1t: 'Индивидуальный подбор', f1p: 'Оттенок, длина и густота — под твои волосы, образ жизни и бюджет.',
    f2t: 'Бережно к своим волосам', f2p: 'Техника выбирается по состоянию волос. Если наращивание тебе не нужно — скажу честно.',
    f3t: 'Прозрачная стоимость', f3p: 'Цену называю до начала работы. Никаких сюрпризов в конце.',
    btn: 'Обсудить мой образ'
  },
  services: {
    label: 'Услуги', title: '<span class="t-light">Техники,</span> подобранные под тебя',
    sub: 'Нажми на карточку, чтобы узнать подробности. Время и сроки ориентировочные — точные зависят от твоих волос.',
    more: 'Подробнее', less: 'Свернуть', book: 'Записаться'
  },
  works: {
    label: 'Работы', title: '<span class="t-light">Результат,</span> который говорит сам',
    sub: 'Потяни разделитель, чтобы сравнить до и после. Реальные работы Катрин.',
    before: 'До', after: 'После', beforeAlt: 'Волосы до наращивания', afterAlt: 'Волосы после наращивания',
    range: 'Сравнение до и после', btn: 'Хочу так же', story: 'История'
  },
  lab: {
    label: 'Hair Lab', title: '<span class="t-light">Примерь</span> длину и оттенок',
    sub: 'Выбери цвет, длину и густоту — визуализация сразу покажет, как может выглядеть результат.',
    canvas: 'Визуализация длины и оттенка волос',
    shade: 'Оттенок', length: 'Длина', density: 'Густота', texture: 'Текстура',
    d0: 'Лёгкая', d1: 'Естественная', d2: 'Пышная', w0: 'Прямые', w1: 'Волна',
    btn: 'Хочу такой образ', fine: 'Визуализация приблизительная. Точный подбор оттенка и длины — на консультации.',
    saved: 'Образ сохранён в анкете', cm: 'см', hint: 'Коснись фото или потяни метку, чтобы изменить длину'
  },
  process: {
    label: 'Как это проходит', title: '<span class="t-light">Пять шагов</span> к волосам мечты', btn: 'Начать с консультации',
    s1t: 'Знакомство', s1p: 'Пишешь мне или проходишь мини-анкету. Уточняю пожелания и показываю варианты.',
    s2t: 'Подбор', s2p: 'Оттенок, длина, густота и техника — под твои волосы и бюджет. Стоимость называю заранее.',
    s3t: 'Наращивание', s3p: 'Спокойно и без спешки. Ты отдыхаешь — я работаю.',
    s4t: 'Укладка', s4p: 'Финальные штрихи, чтобы результат выглядел безупречно с первой минуты.',
    s5t: 'Уход и коррекция', s5p: 'Расскажу, как ухаживать, и напомню о коррекции, чтобы волосы всегда выглядели идеально.'
  },
  reviews: { label: 'Отзывы', title: '<span class="t-light">Что говорят</span> клиентки', prev: 'Назад', next: 'Вперёд', stars: '5 из 5' },
  faq: { label: 'Вопросы', title: '<span class="t-light">Всё, что ты хотела</span> спросить', sub: 'Не нашла ответ? Напиши мне — отвечу лично.' },
  book: {
    label: 'Запись', title: '<span class="t-light">Давай создадим</span> твой образ',
    sub: 'Пять коротких вопросов — и я вернусь с вариантами и расчётом стоимости.',
    p1: 'Консультация без обязательств', p2: 'Стоимость — до начала работы', p3: 'Подбор оттенка и длины под тебя'
  },
  quiz: {
    step: 'Шаг {n} из {t}', back: 'Назад', next: 'Далее', submit: 'Получить расчёт',
    q1: 'Что ты хочешь получить?', goal_length: 'Длину', goal_length_s: 'хочу длиннее', goal_volume: 'Густоту', goal_volume_s: 'хочу пышнее',
    goal_both: 'Всё сразу', goal_both_s: 'длина и объём', goal_fix: 'Коррекцию', goal_fix_s: 'или снятие', goal_unsure: 'Пока не знаю', goal_unsure_s: 'подскажи, что мне подойдёт',
    q2: 'Какие у тебя волосы сейчас?', len: 'Длина', dens: 'Густота',
    now_shoulders: 'До плеч', now_blades: 'До лопаток', now_below: 'Ниже',
    dens_fine: 'Тонкие', dens_medium: 'Средние', dens_thick: 'Густые',
    q3: 'Какой образ мечтаешь?', shade: 'Оттенок', hint: 'Можно пропустить — подберём вместе на консультации.',
    q4: 'Когда тебе удобно?', when_week: 'Скоро', when_week_s: 'эта неделя', when_month: 'В месяце', when_month_s: 'до 30 дней', when_later: 'Позже', when_later_s: 'присматриваюсь',
    city: 'Город', optional: '(необязательно)', cityPh: 'Твой город',
    q5: 'Как с тобой связаться?', name: 'Имя', namePh: 'Как к тебе обращаться', channel: 'Мессенджер',
    cWa: 'Номер WhatsApp', cTg: 'Telegram — @username или номер', cIg: 'Instagram — @username', comment: 'Комментарий', commentPh: 'Например: хочу как на фото из Pinterest',
    e1: 'Выбери вариант, чтобы продолжить', e2: 'Выбери длину и густоту волос', e4: 'Выбери удобное время', eName: 'Подскажи, как к тебе обращаться', eWa: 'Укажи номер (минимум 7 цифр)', eNick: 'Укажи ник или номер',
    doneT: 'Заявка готова', doneS: 'Отправь её мне в удобный мессенджер — отвечу лично.',
    copy: 'Скопировать', again: 'Заполнить заново', copied: 'Заявка скопирована', copyFail: 'Не удалось скопировать',
    sName: 'Имя', sGoal: 'Цель', sLook: 'Образ', sWhen: 'Когда', sChannel: 'Связь', sService: 'Услуга', sServiceNone: 'подберём вместе',
    added: '«{s}» — добавлено в анкету'
  },
  msg: {
    hello: 'Здравствуйте, Катрин! Меня зовут {name}.', goal: 'Хочу: {v}.', service: 'Интересует: {v}.', now: 'Мои волосы сейчас: {a}, {b}.',
    look: 'Желаемый образ: {len} (~{cm} см), оттенок «{shade}», густота {dens}{wave}.', wave: ', волна',
    when: 'Когда удобно: {v}.', city: ' Город: {v}.', contact: 'Связь: {ch} — {v}.', comment: 'Комментарий: {v}'
  },
  footer: { studio: 'Hair Extensions Studio' },
  data: {
    services: [
      { t: 'Капсульное наращивание', s: 'Классика, которую не отличить от своих волос. Подходит для длины и густоты.', time: '≈ 3–4 часа', wear: 'носка до 2–3 месяцев', det: 'Микрокапсулы закрепляются на тонких прядях у корней и не видны даже вблизи. Можно собирать волосы в хвост и делать укладки.' },
      { t: 'Ленточное наращивание', s: 'Самый быстрый способ получить объём — плоско и незаметно.', time: '≈ 1–1,5 часа', wear: 'носка 6–8 недель', det: 'Тонкие ленты ложатся плоско и не ощущаются. Отличный вариант для тонких и средних волос, когда нужен объём.' },
      { t: 'Hair Talk', s: 'Деликатная техника без нагрева — для тонких и ослабленных волос.', time: '≈ 1,5–2 часа', wear: 'носка 1,5–2 месяца', det: 'Бережное крепление, которое почти не нагружает собственные волосы. Подходит, когда важна максимальная деликатность.' }
    ],
    extra: [ { t: 'Коррекция', s: 'Обновляем посадку и свежесть' }, { t: 'Бережное снятие', s: 'Без боли и потерь для своих волос' }, { t: 'Консультация', s: 'Подбор оттенка, длины и расчёт' } ],
    stories: [
      { h: 'Больше длины, плотнее низ', p: 'Тонкие уставшие кончики превратились в густые шелковистые волосы ниже лопаток. Переход не заметен даже вблизи.' },
      { h: 'Блонд, который сияет', p: 'Из пушащегося блонда — в ровное гладкое полотно с мягким переходом оттенка.' },
      { h: 'Шатен как с обложки', p: 'Глубокий натуральный оттенок и длина, о которой мечтаешь: густо, ровно и с блеском.' }
    ],
    gallery: ['Шатен · длина и блеск', 'Тёмный шоколад', 'Плотный низ', 'Глубокий чёрный', 'Блонд · мягкий переход'],
    shades: ['Платиновый', 'Пепельный', 'Карамель', 'Шоколад', 'Чёрный', 'Медный', 'Омбре'],
    lengths: ['каре', 'до плеч', 'до лопаток', 'до талии', 'до бёдер'],
    marks: ['каре', 'плечи', 'лопатки', 'талия', 'бёдра'],
    dens: ['лёгкая', 'естественная', 'пышная'],
    reviews: [
      { n: 'Анна', svc: 'Капсульное наращивание', t: 'Боялась, что капсулы будет видно, — вообще не видно! Подруги не поверили, что это наращённые. Оттенок подобрали идеально с первого раза.' },
      { n: 'Мария', svc: 'Ленточное наращивание', t: 'Тонкие волосы, всегда мечтала об объёме. Сделали быстро, без дискомфорта и ощущения тяжести.' },
      { n: 'Дина', svc: 'Консультация', t: 'Пришла со скриншотом из Pinterest — ушла с результатом даже лучше. Всё объяснила и ничего не навязывала.' },
      { n: 'Нино', svc: 'Коррекция', t: 'После коррекции волосы как новые. Приятно, что мастер следит и за состоянием моих собственных волос.' },
      { n: 'Лейла', svc: 'Hair Talk', t: 'Очень переживала за свои тонкие волосы. Техника подошла идеально — лёгкость и никакого дискомфорта.' }
    ],
    faq: [
      ['Это больно?', 'Нет. Во время процедуры ты не должна чувствовать боли. В первые 1–3 дня возможно ощущение «новых волос» — это нормально и быстро проходит.'],
      ['Испортит ли наращивание мои волосы?', 'При правильном выборе техники и уходе — нет. Поэтому мы начинаем с консультации: я смотрю на состояние твоих волос и честно говорю, что подойдёт.'],
      ['Сколько можно носить?', 'Зависит от техники: капсулы обычно носят до 2–3 месяцев до коррекции, ленты — около 6–8 недель. Точные сроки обсудим на консультации.'],
      ['Можно ли красить и укладывать?', 'Да. Наращённые волосы можно укладывать и подкручивать — с термозащитой и без лишнего нагрева у креплений. После визита дам подробную памятку.'],
      ['Как ухаживать за наращёнными волосами?', 'Мягкий шампунь, бережное расчёсывание и сушка — расскажу всё лично и дам памятку по уходу.'],
      ['Как узнать стоимость?', 'Пройди короткую анкету ниже. Итоговая цена зависит от длины, объёма и техники — я назову её до начала работы.'],
      ['Как записаться?', 'Заполни анкету или напиши мне в мессенджер. Я отвечу, предложу удобное время и подготовлю расчёт.']
    ]
  }
},

/* ===================== TÜRKÇE ===================== */
tr: {
  langName: 'Türkçe',
  meta: { title: 'Katrin Luxe Locks — Saç Kaynak', desc: 'Katrin Luxe Locks — saç kaynak uzmanı. Kapsül, bant ve Hair Talk kaynak. Doğal, nazik, lüks.' },
  nav: { aria: 'Ana menü', top: 'Katrin Luxe Locks — başa dön', about: 'Hakkımda', services: 'Hizmetler', works: 'Çalışmalar', lab: 'Hair Lab', reviews: 'Yorumlar', faq: 'SSS', book: 'Randevu al', menu: 'Menüyü aç', footer: 'Alt menü', lang: 'Dil', toTop: 'Başa dön' },
  cur: { works: 'Çalışmalar', view: 'Bak', drag: 'Kaydır' },
  hero: {
    tag1: 'Kapsül', tag2: 'Bant', tag3: 'Hair Talk',
    title: '<span class="t-light">Daha uzun.</span> Daha gür.<br>Daha lüks.',
    cta: 'Tarzımı bul', thumb: 'Çalışmaları gör', orb: 'Hair Lab’ı aç',
    note: 'Kendi saçınızdan ayırt edilemeyen saç kaynak. Kapsül, bant ve Hair Talk — uzunluk, yoğunluk ve renk size özel seçilir.',
    cardT: 'Öncesi ve sonrası', cardS: 'Katrin’in gerçek çalışmaları'
  },
  reel: { label: 'Tanıtım filmi', title: 'Saçların.<br>Senin anın.', sub: 'Hissedilen lüks — ilk tutamdan aynadaki son bakışa kadar.', watch: 'Sesli izle', watchProcess: 'Süreci izle', katrin: 'Katrin iş başında', close: 'Kapat' },
  about: {
    label: 'Hakkımda',
    statement: 'Ben Katrin, saç kaynak uzmanıyım. Amacım basit: aynaya baktığınızda kendi saçınızı görmeniz — sadece daha uzun, daha gür ve daha lüks. Doğallıktan hiç ödün vermeden.',
    img: 'Katrin — saç kaynak uzmanı',
    f1t: 'Size özel seçim', f1p: 'Renk, uzunluk ve yoğunluk; saçınıza, yaşam tarzınıza ve bütçenize göre.',
    f2t: 'Saçınıza nazik', f2p: 'Tekniği saçınızın durumuna göre seçerim. Kaynağa ihtiyacınız yoksa bunu dürüstçe söylerim.',
    f3t: 'Şeffaf fiyat', f3p: 'Fiyatı işe başlamadan önce söylerim. Sonunda sürpriz yok.',
    btn: 'Tarzımı konuşalım'
  },
  services: {
    label: 'Hizmetler', title: '<span class="t-light">Size özel</span> teknikler',
    sub: 'Ayrıntılar için karta dokunun. Süreler yaklaşıktır — kesin süre saçınıza bağlıdır.',
    more: 'Detaylar', less: 'Kapat', book: 'Randevu al'
  },
  works: {
    label: 'Çalışmalar', title: '<span class="t-light">Kendini anlatan</span> sonuçlar',
    sub: 'Öncesi ve sonrasını karşılaştırmak için ayırıcıyı kaydırın. Katrin’in gerçek çalışmaları.',
    before: 'Önce', after: 'Sonra', beforeAlt: 'Kaynak öncesi saç', afterAlt: 'Kaynak sonrası saç',
    range: 'Öncesi ve sonrası karşılaştırma', btn: 'Ben de istiyorum', story: 'Hikâye'
  },
  lab: {
    label: 'Hair Lab', title: '<span class="t-light">Uzunluğu ve rengi</span> dene',
    sub: 'Rengi, uzunluğu ve yoğunluğu seçin — görselleştirme sonucun nasıl görünebileceğini hemen gösterir.',
    canvas: 'Saç uzunluğu ve rengi görselleştirmesi',
    shade: 'Renk', length: 'Uzunluk', density: 'Yoğunluk', texture: 'Doku',
    d0: 'Hafif', d1: 'Doğal', d2: 'Hacimli', w0: 'Düz', w1: 'Dalgalı',
    btn: 'Bu tarzı istiyorum', fine: 'Görselleştirme yaklaşıktır. Kesin renk ve uzunluk danışmada belirlenir.',
    saved: 'Tarzınız forma kaydedildi', cm: 'cm', hint: 'Uzunluğu değiştirmek için fotoğrafa dokunun ya da işareti kaydırın'
  },
  process: {
    label: 'Nasıl ilerliyor', title: '<span class="t-light">Hayalinizdeki saça</span> beş adım', btn: 'Danışmayla başla',
    s1t: 'Tanışma', s1p: 'Bana yazın ya da kısa formu doldurun. İsteklerinizi netleştirip seçenekleri gösteririm.',
    s2t: 'Seçim', s2p: 'Renk, uzunluk, yoğunluk ve teknik — saçınıza ve bütçenize göre. Fiyatı önceden söylerim.',
    s3t: 'Kaynak', s3p: 'Sakin ve acele etmeden. Siz dinlenin, ben çalışayım.',
    s4t: 'Şekillendirme', s4p: 'Sonucun ilk dakikadan kusursuz görünmesi için son dokunuşlar.',
    s5t: 'Bakım ve düzeltme', s5p: 'Bakımı anlatır, düzeltme zamanını hatırlatırım — saçlarınız her zaman kusursuz görünsün.'
  },
  reviews: { label: 'Yorumlar', title: '<span class="t-light">Müşterilerim</span> ne diyor', prev: 'Geri', next: 'İleri', stars: '5 üzerinden 5' },
  faq: { label: 'SSS', title: '<span class="t-light">Sormak istediğiniz</span> her şey', sub: 'Cevabını bulamadınız mı? Bana yazın — bizzat yanıtlarım.' },
  book: {
    label: 'Randevu', title: '<span class="t-light">Tarzınızı</span> birlikte oluşturalım',
    sub: 'Beş kısa soru — size seçenekler ve fiyat tahminiyle dönerim.',
    p1: 'Zorunluluk olmadan danışma', p2: 'Fiyat işe başlamadan önce', p3: 'Size özel renk ve uzunluk seçimi'
  },
  quiz: {
    step: 'Adım {n} / {t}', back: 'Geri', next: 'İleri', submit: 'Fiyat al',
    q1: 'Ne elde etmek istiyorsunuz?', goal_length: 'Uzunluk', goal_length_s: 'daha uzun istiyorum', goal_volume: 'Hacim', goal_volume_s: 'daha gür istiyorum',
    goal_both: 'İkisi de', goal_both_s: 'uzunluk ve hacim', goal_fix: 'Düzeltme', goal_fix_s: 'ya da sökme', goal_unsure: 'Henüz bilmiyorum', goal_unsure_s: 'bana ne uyar, söyleyin',
    q2: 'Saçınız şu an nasıl?', len: 'Uzunluk', dens: 'Yoğunluk',
    now_shoulders: 'Omuza kadar', now_blades: 'Kürek kemiğine', now_below: 'Daha uzun',
    dens_fine: 'İnce', dens_medium: 'Orta', dens_thick: 'Gür',
    q3: 'Hayalinizdeki tarz nasıl?', shade: 'Renk', hint: 'Bu adımı atlayabilirsiniz — danışmada birlikte seçeriz.',
    q4: 'Ne zaman uygun?', when_week: 'Yakında', when_week_s: 'bu hafta', when_month: 'Bu ay', when_month_s: '30 gün içinde', when_later: 'Daha sonra', when_later_s: 'sadece bakıyorum',
    city: 'Şehir', optional: '(isteğe bağlı)', cityPh: 'Şehriniz',
    q5: 'Size nasıl ulaşayım?', name: 'Ad', namePh: 'Size nasıl hitap edeyim?', channel: 'Mesajlaşma',
    cWa: 'WhatsApp numarası', cTg: 'Telegram — @kullanıcı adı ya da numara', cIg: 'Instagram — @kullanıcı adı', comment: 'Yorum', commentPh: 'Örneğin: Pinterest’teki fotoğraftaki gibi istiyorum',
    e1: 'Devam etmek için bir seçenek seçin', e2: 'Saçınızın uzunluğunu ve yoğunluğunu seçin', e4: 'Uygun bir zaman seçin', eName: 'Size nasıl hitap edeceğimi yazın', eWa: 'Numaranızı girin (en az 7 rakam)', eNick: 'Kullanıcı adınızı ya da numaranızı girin',
    doneT: 'Talebiniz hazır', doneS: 'Bana istediğiniz uygulamadan gönderin — bizzat yanıtlarım.',
    copy: 'Kopyala', again: 'Yeniden doldur', copied: 'Talep kopyalandı', copyFail: 'Kopyalanamadı',
    sName: 'Ad', sGoal: 'Amaç', sLook: 'Tarz', sWhen: 'Ne zaman', sChannel: 'İletişim', sService: 'Hizmet', sServiceNone: 'birlikte seçeriz',
    added: '“{s}” forma eklendi'
  },
  msg: {
    hello: 'Merhaba Katrin! Benim adım {name}.', goal: 'İstediğim: {v}.', service: 'İlgilendiğim hizmet: {v}.', now: 'Şu anki saçım: {a}, {b}.',
    look: 'Hayalimdeki tarz: {len} (~{cm} cm), renk “{shade}”, yoğunluk {dens}{wave}.', wave: ', dalgalı',
    when: 'Uygun zaman: {v}.', city: ' Şehir: {v}.', contact: 'İletişim: {ch} — {v}.', comment: 'Yorum: {v}'
  },
  footer: { studio: 'Hair Extensions Studio' },
  data: {
    services: [
      { t: 'Kapsül kaynak', s: 'Kendi saçınızdan ayırt edilemeyen klasik yöntem. Uzunluk ve hacim için.', time: '≈ 3–4 saat', wear: '2–3 aya kadar', det: 'Mikro kapsüller köklerdeki ince tutamlara takılır ve yakından bile görünmez. Saçınızı toplayabilir, dilediğiniz gibi şekillendirebilirsiniz.' },
      { t: 'Bant kaynak', s: 'Hacim kazanmanın en hızlı yolu — düz ve görünmez.', time: '≈ 1–1,5 saat', wear: '6–8 hafta', det: 'İnce bantlar düz durur ve hissedilmez. Hacim gereken ince ve orta saçlar için harika bir seçenek.' },
      { t: 'Hair Talk', s: 'İnce ve yıpranmış saçlar için ısısız, nazik teknik.', time: '≈ 1,5–2 saat', wear: '1,5–2 ay', det: 'Kendi saçınıza neredeyse hiç yük bindirmeyen nazik bir bağlantı. En hassas bakımın önemli olduğu durumlar için.' }
    ],
    extra: [ { t: 'Düzeltme', s: 'Oturuşu ve tazeliği yenileriz' }, { t: 'Nazik sökme', s: 'Acısız, kendi saçınıza zarar vermeden' }, { t: 'Danışma', s: 'Renk, uzunluk ve fiyat tahmini' } ],
    stories: [
      { h: 'Daha uzun, daha dolgun uçlar', p: 'İnce ve yorgun uçlar, kürek kemiğinin altına uzanan gür ve ipeksi saçlara dönüştü. Geçiş yakından bile fark edilmiyor.' },
      { h: 'Parlayan sarı', p: 'Kabarık sarı saçtan, yumuşak renk geçişli pürüzsüz ve düzgün saça.' },
      { h: 'Kapak kızı esmer', p: 'Derin doğal bir ton ve hayalinizdeki uzunluk: gür, düzgün ve parlak.' }
    ],
    gallery: ['Esmer · uzunluk ve parlaklık', 'Koyu çikolata', 'Dolgun uçlar', 'Derin siyah', 'Sarı · yumuşak geçiş'],
    shades: ['Platin', 'Küllü', 'Karamel', 'Çikolata', 'Siyah', 'Bakır', 'Ombre'],
    lengths: ['kısa küt', 'omuza kadar', 'kürek kemiğine', 'bele kadar', 'kalçaya kadar'],
    marks: ['küt', 'omuz', 'kürek', 'bel', 'kalça'],
    dens: ['hafif', 'doğal', 'hacimli'],
    reviews: [
      { n: 'Anna', svc: 'Kapsül kaynak', t: 'Kapsüllerin görüneceğinden korkuyordum — hiç görünmüyor! Arkadaşlarım kaynak olduğuna inanmadı. Renk ilk seferde mükemmel seçildi.' },
      { n: 'Maria', svc: 'Bant kaynak', t: 'İnce saçlarım var, hep hacim hayal ettim. Hızlıca yapıldı, hiç rahatsızlık ya da ağırlık hissi yok.' },
      { n: 'Dina', svc: 'Danışma', t: 'Pinterest’ten bir ekran görüntüsüyle geldim, daha da iyi bir sonuçla ayrıldım. Her şeyi anlattı, hiçbir şeyi dayatmadı.' },
      { n: 'Nino', svc: 'Düzeltme', t: 'Düzeltmeden sonra saçlarım yepyeni gibi. Kendi saçımın sağlığına da özen göstermesi çok hoş.' },
      { n: 'Leyla', svc: 'Hair Talk', t: 'İnce saçlarım için çok endişeliydim. Teknik tam uydu — hafiflik ve hiç rahatsızlık yok.' }
    ],
    faq: [
      ['Acıtır mı?', 'Hayır. İşlem sırasında acı hissetmemelisiniz. İlk 1–3 gün “yeni saç” hissi olabilir — bu normaldir ve çabuk geçer.'],
      ['Kaynak saçıma zarar verir mi?', 'Doğru teknik ve bakımla hayır. Bu yüzden danışmayla başlıyoruz: saçınızın durumuna bakar, neyin uygun olduğunu dürüstçe söylerim.'],
      ['Ne kadar dayanır?', 'Tekniğe bağlıdır: kapsüller genellikle düzeltmeye kadar 2–3 ay, bantlar yaklaşık 6–8 hafta dayanır. Kesin süreleri danışmada konuşuruz.'],
      ['Boyatabilir ve şekillendirebilir miyim?', 'Evet. Kaynak saçlar şekillendirilebilir ve maşalanabilir — ısı koruyucuyla ve bağlantı noktalarına fazla ısı vermeden. Randevudan sonra ayrıntılı bir bakım rehberi veririm.'],
      ['Kaynak saça nasıl bakılır?', 'Yumuşak şampuan, nazik tarama ve kurutma — her şeyi bizzat anlatır, bakım rehberi veririm.'],
      ['Fiyatı nasıl öğrenirim?', 'Aşağıdaki kısa formu doldurun. Nihai fiyat uzunluk, hacim ve tekniğe bağlıdır — işe başlamadan önce söylerim.'],
      ['Nasıl randevu alırım?', 'Formu doldurun ya da bana mesaj atın. Yanıtlar, uygun bir zaman önerir ve fiyat tahmini hazırlarım.']
    ]
  }
},

/* ===================== ქართული ===================== */
ka: {
  langName: 'ქართული',
  meta: { title: 'Katrin Luxe Locks — თმის დაგრძელება', desc: 'Katrin Luxe Locks — თმის დაგრძელების სპეციალისტი. კაფსულური, ლენტური დაგრძელება და Hair Talk. ბუნებრივად, ფრთხილად, ფუფუნებით.' },
  nav: { aria: 'მთავარი მენიუ', top: 'Katrin Luxe Locks — ზემოთ', about: 'ჩემ შესახებ', services: 'სერვისები', works: 'ნამუშევრები', lab: 'Hair Lab', reviews: 'შეფასებები', faq: 'კითხვები', book: 'ჩაწერა', menu: 'მენიუს გახსნა', footer: 'ქვედა მენიუ', lang: 'ენა', toTop: 'ზემოთ' },
  cur: { works: 'ნამუშევრები', view: 'ნახვა', drag: 'გადაწიე' },
  hero: {
    tag1: 'კაფსულები', tag2: 'ლენტები', tag3: 'Hair Talk',
    title: '<span class="t-light">უფრო გრძელი.</span> უფრო ხშირი.<br>უფრო ფუფუნებით.',
    cta: 'ჩემი იმიჯის შერჩევა', thumb: 'ნამუშევრების ნახვა', orb: 'Hair Lab-ის გახსნა',
    note: 'თმის დაგრძელება, რომელსაც საკუთარი თმისგან ვერ გაარჩევ. კაფსულები, ლენტები და Hair Talk — სიგრძის, სიხშირისა და ფერის ინდივიდუალური შერჩევით.',
    cardT: 'მანამდე და შემდეგ', cardS: 'კატრინის რეალური ნამუშევრები'
  },
  reel: { label: 'შოურილი', title: 'შენი თმა.<br>შენი მომენტი.', sub: 'ფუფუნება, რომელსაც გრძნობ — პირველი კულულიდან სარკეში ბოლო მზერამდე.', watch: 'ნახე ხმით', watchProcess: 'ნახე პროცესი', katrin: 'კატრინი მუშაობისას', close: 'დახურვა' },
  about: {
    label: 'ჩემ შესახებ',
    statement: 'მე ვარ კატრინი, თმის დაგრძელების სპეციალისტი. ჩემი მიზანი მარტივია: სარკეში ჩახედვისას დაინახო შენი საკუთარი თმა — უბრალოდ უფრო გრძელი, უფრო ხშირი და უფრო ფუფუნებით. ბუნებრიობაზე კომპრომისის გარეშე.',
    img: 'კატრინი — თმის დაგრძელების სპეციალისტი',
    f1t: 'ინდივიდუალური შერჩევა', f1p: 'ფერი, სიგრძე და სიხშირე — შენს თმას, ცხოვრების სტილსა და ბიუჯეტს მორგებული.',
    f2t: 'ფრთხილად შენს თმასთან', f2p: 'ტექნიკას თმის მდგომარეობის მიხედვით ვარჩევ. თუ დაგრძელება არ გჭირდება, გულწრფელად გეტყვი.',
    f3t: 'გამჭვირვალე ფასი', f3p: 'ფასს მუშაობის დაწყებამდე გეტყვი. ბოლოს სიურპრიზები არ იქნება.',
    btn: 'ჩემი იმიჯის განხილვა'
  },
  services: {
    label: 'სერვისები', title: '<span class="t-light">ტექნიკები,</span> შენზე მორგებული',
    sub: 'დეტალებისთვის დააჭირე ბარათს. დრო მიახლოებითია — ზუსტი შენს თმაზეა დამოკიდებული.',
    more: 'დეტალები', less: 'დახურვა', book: 'ჩაწერა'
  },
  works: {
    label: 'ნამუშევრები', title: '<span class="t-light">შედეგი,</span> რომელიც თავად ლაპარაკობს',
    sub: 'გადაწიე გამყოფი, რომ შეადარო მანამდე და შემდეგ. კატრინის რეალური ნამუშევრები.',
    before: 'მანამდე', after: 'შემდეგ', beforeAlt: 'თმა დაგრძელებამდე', afterAlt: 'თმა დაგრძელების შემდეგ',
    range: 'მანამდე და შემდეგ შედარება', btn: 'მეც ასე მინდა', story: 'ისტორია'
  },
  lab: {
    label: 'Hair Lab', title: '<span class="t-light">მოირგე</span> სიგრძე და ფერი',
    sub: 'აირჩიე ფერი, სიგრძე და სიხშირე — ვიზუალიზაცია მაშინვე გაჩვენებს, როგორ შეიძლება გამოიყურებოდეს შედეგი.',
    canvas: 'თმის სიგრძისა და ფერის ვიზუალიზაცია',
    shade: 'ფერი', length: 'სიგრძე', density: 'სიხშირე', texture: 'ტექსტურა',
    d0: 'მსუბუქი', d1: 'ბუნებრივი', d2: 'ხშირი', w0: 'სწორი', w1: 'ტალღოვანი',
    btn: 'ასეთი იმიჯი მინდა', fine: 'ვიზუალიზაცია მიახლოებითია. ზუსტ ფერსა და სიგრძეს კონსულტაციაზე შევარჩევთ.',
    saved: 'იმიჯი შენახულია ანკეტაში', cm: 'სმ', hint: 'სიგრძის შესაცვლელად შეეხე ფოტოს ან გადაწიე ნიშნული'
  },
  process: {
    label: 'როგორ მიმდინარეობს', title: '<span class="t-light">ხუთი ნაბიჯი</span> ოცნების თმისკენ', btn: 'დაიწყე კონსულტაციით',
    s1t: 'გაცნობა', s1p: 'მომწერე ან შეავსე მოკლე ანკეტა. დავაზუსტებ სურვილებს და გაჩვენებ ვარიანტებს.',
    s2t: 'შერჩევა', s2p: 'ფერი, სიგრძე, სიხშირე და ტექნიკა — შენს თმასა და ბიუჯეტზე მორგებული. ფასს წინასწარ გეტყვი.',
    s3t: 'დაგრძელება', s3p: 'მშვიდად და აუჩქარებლად. შენ ისვენებ — მე ვმუშაობ.',
    s4t: 'დავარცხნა', s4p: 'ბოლო შტრიხები, რომ შედეგი პირველივე წუთიდან უნაკლოდ გამოიყურებოდეს.',
    s5t: 'მოვლა და კორექცია', s5p: 'აგიხსნი, როგორ მოუარო თმას, და შეგახსენებ კორექციას, რომ თმა ყოველთვის იდეალურად გამოიყურებოდეს.'
  },
  reviews: { label: 'შეფასებები', title: '<span class="t-light">რას ამბობენ</span> კლიენტები', prev: 'უკან', next: 'წინ', stars: '5-დან 5' },
  faq: { label: 'კითხვები', title: '<span class="t-light">ყველაფერი, რისი კითხვაც</span> გინდოდა', sub: 'პასუხი ვერ იპოვე? მომწერე — პირადად გიპასუხებ.' },
  book: {
    label: 'ჩაწერა', title: '<span class="t-light">მოდი, შევქმნათ</span> შენი იმიჯი',
    sub: 'ხუთი მოკლე კითხვა — და დაგიბრუნდები ვარიანტებითა და ფასის გათვლით.',
    p1: 'კონსულტაცია ვალდებულების გარეშე', p2: 'ფასი — მუშაობის დაწყებამდე', p3: 'შენზე მორგებული ფერი და სიგრძე'
  },
  quiz: {
    step: 'ნაბიჯი {n} / {t}', back: 'უკან', next: 'შემდეგი', submit: 'ფასის მიღება',
    q1: 'რისი მიღება გინდა?', goal_length: 'სიგრძე', goal_length_s: 'მინდა უფრო გრძელი', goal_volume: 'მოცულობა', goal_volume_s: 'მინდა უფრო ხშირი',
    goal_both: 'ორივე', goal_both_s: 'სიგრძე და მოცულობა', goal_fix: 'კორექცია', goal_fix_s: 'ან მოხსნა', goal_unsure: 'ჯერ არ ვიცი', goal_unsure_s: 'მირჩიე, რა მომიხდება',
    q2: 'როგორი თმა გაქვს ახლა?', len: 'სიგრძე', dens: 'სიხშირე',
    now_shoulders: 'მხრებამდე', now_blades: 'ბეჭებამდე', now_below: 'უფრო გრძელი',
    dens_fine: 'თხელი', dens_medium: 'საშუალო', dens_thick: 'ხშირი',
    q3: 'როგორ იმიჯზე ოცნებობ?', shade: 'ფერი', hint: 'შეგიძლია გამოტოვო — კონსულტაციაზე ერთად შევარჩევთ.',
    q4: 'როდის გაწყობს?', when_week: 'მალე', when_week_s: 'ამ კვირაში', when_month: 'ამ თვეში', when_month_s: '30 დღეში', when_later: 'მოგვიანებით', when_later_s: 'ჯერ ვათვალიერებ',
    city: 'ქალაქი', optional: '(არასავალდებულო)', cityPh: 'შენი ქალაქი',
    q5: 'როგორ დაგიკავშირდე?', name: 'სახელი', namePh: 'როგორ მოგმართო?', channel: 'მესენჯერი',
    cWa: 'WhatsApp-ის ნომერი', cTg: 'Telegram — @username ან ნომერი', cIg: 'Instagram — @username', comment: 'კომენტარი', commentPh: 'მაგალითად: მინდა როგორც Pinterest-ის ფოტოზე',
    e1: 'გასაგრძელებლად აირჩიე ვარიანტი', e2: 'აირჩიე თმის სიგრძე და სიხშირე', e4: 'აირჩიე მოსახერხებელი დრო', eName: 'მითხარი, როგორ მოგმართო', eWa: 'მიუთითე ნომერი (მინიმუმ 7 ციფრი)', eNick: 'მიუთითე username ან ნომერი',
    doneT: 'განაცხადი მზადაა', doneS: 'გამომიგზავნე მოსახერხებელ მესენჯერში — პირადად გიპასუხებ.',
    copy: 'კოპირება', again: 'თავიდან შევსება', copied: 'განაცხადი დაკოპირდა', copyFail: 'კოპირება ვერ მოხერხდა',
    sName: 'სახელი', sGoal: 'მიზანი', sLook: 'იმიჯი', sWhen: 'როდის', sChannel: 'კავშირი', sService: 'სერვისი', sServiceNone: 'ერთად შევარჩევთ',
    added: '„{s}“ — დაემატა ანკეტას'
  },
  msg: {
    hello: 'გამარჯობა, კატრინ! მე მქვია {name}.', goal: 'მინდა: {v}.', service: 'მაინტერესებს: {v}.', now: 'ჩემი თმა ახლა: {a}, {b}.',
    look: 'სასურველი იმიჯი: {len} (~{cm} სმ), ფერი „{shade}“, სიხშირე {dens}{wave}.', wave: ', ტალღოვანი',
    when: 'მოსახერხებელი დრო: {v}.', city: ' ქალაქი: {v}.', contact: 'კავშირი: {ch} — {v}.', comment: 'კომენტარი: {v}'
  },
  footer: { studio: 'Hair Extensions Studio' },
  data: {
    services: [
      { t: 'კაფსულური დაგრძელება', s: 'კლასიკა, რომელსაც საკუთარი თმისგან ვერ გაარჩევ. სიგრძისა და მოცულობისთვის.', time: '≈ 3–4 საათი', wear: '2–3 თვემდე', det: 'მიკროკაფსულები ფესვებთან წვრილ კულულებზე მაგრდება და ახლოდანაც არ ჩანს. შეგიძლია თმა აიკრა და სურვილისამებრ დაივარცხნო.' },
      { t: 'ლენტური დაგრძელება', s: 'მოცულობის მიღების ყველაზე სწრაფი გზა — ბრტყლად და შეუმჩნევლად.', time: '≈ 1–1,5 საათი', wear: '6–8 კვირა', det: 'თხელი ლენტები ბრტყლად დევს და არ იგრძნობა. შესანიშნავი ვარიანტია თხელი და საშუალო თმისთვის, როცა მოცულობა გჭირდება.' },
      { t: 'Hair Talk', s: 'ნაზი ტექნიკა გაცხელების გარეშე — თხელი და დასუსტებული თმისთვის.', time: '≈ 1,5–2 საათი', wear: '1,5–2 თვე', det: 'ფრთხილი დამაგრება, რომელიც საკუთარ თმას თითქმის არ ტვირთავს. იდეალურია, როცა მაქსიმალური სიფრთხილეა მნიშვნელოვანი.' }
    ],
    extra: [ { t: 'კორექცია', s: 'ვაახლებთ ფორმასა და სიახლეს' }, { t: 'ფრთხილი მოხსნა', s: 'უმტკივნეულოდ და საკუთარი თმის დაზიანების გარეშე' }, { t: 'კონსულტაცია', s: 'ფერის, სიგრძის შერჩევა და ფასის გათვლა' } ],
    stories: [
      { h: 'მეტი სიგრძე, უფრო ხშირი ბოლოები', p: 'თხელი, დაღლილი ბოლოები ბეჭებს ქვემოთ ხშირ, აბრეშუმისებრ თმად იქცა. გადასვლა ახლოდანაც არ ჩანს.' },
      { h: 'ქერა, რომელიც ბრწყინავს', p: 'გაფუებული ქერა თმიდან — გლუვ, თანაბარ თმამდე ფერის რბილი გადასვლით.' },
      { h: 'შატენი, როგორც ჟურნალის ყდაზე', p: 'ღრმა ბუნებრივი ფერი და სიგრძე, რომელზეც ოცნებობ: ხშირი, თანაბარი და ბზინვარე.' }
    ],
    gallery: ['შატენი · სიგრძე და ბზინვარება', 'მუქი შოკოლადი', 'ხშირი ბოლოები', 'ღრმა შავი', 'ქერა · რბილი გადასვლა'],
    shades: ['პლატინა', 'ნაცრისფერი', 'კარამელი', 'შოკოლადი', 'შავი', 'სპილენძი', 'ომბრე'],
    lengths: ['კარე', 'მხრებამდე', 'ბეჭებამდე', 'წელამდე', 'თეძოებამდე'],
    marks: ['კარე', 'მხრები', 'ბეჭები', 'წელი', 'თეძოები'],
    dens: ['მსუბუქი', 'ბუნებრივი', 'ხშირი'],
    reviews: [
      { n: 'ანა', svc: 'კაფსულური დაგრძელება', t: 'მეშინოდა, რომ კაფსულები გამოჩნდებოდა — საერთოდ არ ჩანს! მეგობრებს არ სჯეროდათ, რომ დაგრძელებულია. ფერი პირველივე ცდაზე იდეალურად შეირჩა.' },
      { n: 'მარია', svc: 'ლენტური დაგრძელება', t: 'თხელი თმა მაქვს და ყოველთვის მოცულობაზე ვოცნებობდი. სწრაფად გაკეთდა, დისკომფორტისა და სიმძიმის გარეშე.' },
      { n: 'დინა', svc: 'კონსულტაცია', t: 'Pinterest-ის სქრინშოტით მოვედი და კიდევ უკეთესი შედეგით წავედი. ყველაფერი ამიხსნა და არაფერს მთავაზობდა ძალით.' },
      { n: 'ნინო', svc: 'კორექცია', t: 'კორექციის შემდეგ თმა ახალივითაა. სასიამოვნოა, რომ ჩემი საკუთარი თმის მდგომარეობასაც აქცევს ყურადღებას.' },
      { n: 'ლეილა', svc: 'Hair Talk', t: 'ძალიან ვნერვიულობდი ჩემი თხელი თმის გამო. ტექნიკა იდეალურად მოერგო — სიმსუბუქე და არანაირი დისკომფორტი.' }
    ],
    faq: [
      ['მტკივნეულია?', 'არა. პროცედურის დროს ტკივილი არ უნდა იგრძნო. პირველ 1–3 დღეს შეიძლება იყოს „ახალი თმის“ შეგრძნება — ეს ნორმალურია და მალე გადის.'],
      ['დამიზიანებს თუ არა დაგრძელება საკუთარ თმას?', 'სწორი ტექნიკითა და მოვლით — არა. ამიტომ ვიწყებთ კონსულტაციით: ვამოწმებ თმის მდგომარეობას და გულწრფელად გეტყვი, რა მოგიხდება.'],
      ['რამდენ ხანს გრძელდება?', 'დამოკიდებულია ტექნიკაზე: კაფსულები კორექციამდე ჩვეულებრივ 2–3 თვე ძლებს, ლენტები — დაახლოებით 6–8 კვირა. ზუსტ ვადებს კონსულტაციაზე განვიხილავთ.'],
      ['შეიძლება შეღებვა და დავარცხნა?', 'დიახ. დაგრძელებული თმის დავარცხნა და დახვევა შეიძლება — თერმოდაცვით და სამაგრებთან ზედმეტი სიცხის გარეშე. ვიზიტის შემდეგ დეტალურ ინსტრუქციას მოგცემ.'],
      ['როგორ მოვუარო დაგრძელებულ თმას?', 'რბილი შამპუნი, ფრთხილი დავარცხნა და გაშრობა — ყველაფერს პირადად აგიხსნი და მოვლის ინსტრუქციას მოგცემ.'],
      ['როგორ გავიგო ფასი?', 'შეავსე მოკლე ანკეტა ქვემოთ. საბოლოო ფასი დამოკიდებულია სიგრძეზე, მოცულობასა და ტექნიკაზე — მუშაობის დაწყებამდე გეტყვი.'],
      ['როგორ ჩავეწერო?', 'შეავსე ანკეტა ან მომწერე მესენჯერში. გიპასუხებ, შემოგთავაზებ მოსახერხებელ დროს და მოვამზადებ ფასის გათვლას.']
    ]
  }
}
};
