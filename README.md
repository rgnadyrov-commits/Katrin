# Katrin Luxe Locks — сайт

Статический сайт (HTML + CSS + JS, без сборки). Открывается двойным кликом по `index.html`
или через любой статический хостинг (GitHub Pages, Netlify, Vercel).

## Что нужно заполнить (js/main.js, вверху файла)

```js
const CONFIG = { whatsapp: '', telegram: '', instagram: '', endpoint: '' };
```

- `whatsapp` — номер цифрами, например `995555123456`
- `telegram`, `instagram` — username без `@`
- `endpoint` — (необязательно) URL приёмника форм (Formspree и т.п.)

Пока поля пусты, кнопки соцсетей ведут к форме записи, а отправка заявки открывает выбор получателя в мессенджере.

## Что заменить на реальное

- `REVIEWS` в `js/main.js` — **примеры отзывов**, замените на реальные.
- `STORIES` и `GALLERY` — подписи к работам и пары «до/после».
- `SERVICES` — время и сроки носки указаны ориентировочно, поправьте под реальные.

## Структура

```
index.html
css/style.css
js/main.js
assets/img/   — фото работ, портреты, логотип (webp)
assets/favicon.svg
```
