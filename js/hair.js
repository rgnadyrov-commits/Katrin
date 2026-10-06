/* =========================================================
   Hair renderer — реалистичная визуализация волос (вид со спины).
   Рисует тысячи прядей в оттенках серого (объём и блики),
   затем окрашивает их выбранным оттенком (hard-light).
   ========================================================= */
window.HairRenderer = (() => {
  'use strict';
  const W = 600, H = 900;
  const CX = 300, CY = 205, RX = 86, RY = 100;
  // длина (см) → нижняя точка прядей (px)
  const MARKS = [[30, 300], [40, 372], [55, 482], [65, 612], [80, 792]];
  const endYFor = cm => {
    for (let i = 1; i < MARKS.length; i++) {
      const [a, ya] = MARKS[i - 1], [b, yb] = MARKS[i];
      if (cm <= b) return ya + (yb - ya) * (Math.max(cm, a) - a) / (b - a);
    }
    return MARKS[MARKS.length - 1][1];
  };
  const rnd = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const hexToRgb = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };

  function create(canvas) {
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const bodyC = mk(), shadeC = mk(), hiC = mk(), colC = mk(), tmpC = mk();
    let bodyDrawn = false;

    /* ---------- Body (back view) ---------- */
    function drawBody() {
      const tmp = mk(), b = tmp.getContext('2d');
      const ARM_L = new Path2D('M134 370 C104 378 86 410 85 462 C84 540 90 602 94 652 C98 722 104 792 112 852 C116 882 132 898 147 893 C159 889 161 866 159 846 C157 790 153 720 151 660 C149 600 151 540 155 486 Z');
      const ARM_R = new Path2D('M466 370 C496 378 514 410 515 462 C516 540 510 602 506 652 C502 722 496 792 488 852 C484 882 468 898 453 893 C441 889 439 866 441 846 C443 790 447 720 449 660 C451 600 449 540 445 486 Z');
      const TORSO = new Path2D('M266 236 C266 282 262 302 256 318 C226 336 170 344 136 368 C116 386 124 432 150 472 C160 540 176 600 182 650 C186 700 170 760 166 820 C164 850 166 880 168 900 L432 900 C434 880 436 850 434 820 C430 760 414 700 418 650 C424 600 440 540 450 472 C476 432 484 386 464 368 C430 344 374 336 344 318 C338 302 334 282 334 236 Z');
      const SK = '#e2b99b', SK_D = '#a9765a', SK_L = '#f3d4bd';
      const cyl = (x0, x1, dark = .55) => {
        const g = b.createLinearGradient(x0, 0, x1, 0);
        g.addColorStop(0, `rgba(120,70,45,${dark})`); g.addColorStop(.28, 'rgba(120,70,45,0)'); g.addColorStop(.55, 'rgba(255,236,220,.22)');
        g.addColorStop(.78, 'rgba(120,70,45,0)'); g.addColorStop(1, `rgba(120,70,45,${dark})`);
        return g;
      };
      // arms
      [[ARM_L, 84, 162], [ARM_R, 438, 516]].forEach(([p, x0, x1]) => {
        b.fillStyle = SK; b.fill(p);
        b.save(); b.clip(p);
        b.fillStyle = cyl(x0, x1, .6); b.fillRect(0, 0, W, H);
        const sh = b.createRadialGradient((x0 + x1) / 2, 400, 4, (x0 + x1) / 2, 410, 60);
        sh.addColorStop(0, 'rgba(255,240,228,.35)'); sh.addColorStop(1, 'rgba(255,240,228,0)');
        b.fillStyle = sh; b.fillRect(0, 0, W, H);
        b.restore();
      });
      // torso
      b.fillStyle = SK; b.fill(TORSO);
      b.save(); b.clip(TORSO);
      b.fillStyle = cyl(130, 470, .5); b.fillRect(0, 0, W, H);
      [[190, 372], [410, 372]].forEach(([x, y]) => {
        const g = b.createRadialGradient(x, y, 4, x, y, 70); g.addColorStop(0, 'rgba(255,238,224,.4)'); g.addColorStop(1, 'rgba(255,238,224,0)');
        b.fillStyle = g; b.fillRect(0, 0, W, H);
      });
      b.filter = 'blur(9px)';
      b.strokeStyle = 'rgba(130,78,52,.32)'; b.lineWidth = 9;
      b.beginPath(); b.moveTo(300, 322); b.lineTo(300, 520); b.stroke();
      b.strokeStyle = 'rgba(130,78,52,.22)'; b.lineWidth = 14;
      b.beginPath(); b.moveTo(196, 404); b.quadraticCurveTo(230, 462, 266, 468); b.stroke();
      b.beginPath(); b.moveTo(404, 404); b.quadraticCurveTo(370, 462, 334, 468); b.stroke();
      b.filter = 'none';
      // ivory silk top with a soft scoop back
      const TOP = new Path2D('M150 478 C196 470 236 500 300 512 C364 500 404 470 450 478 C440 540 424 600 418 650 C414 700 430 760 434 820 L436 900 L164 900 L166 820 C170 760 186 700 182 650 C176 600 160 540 150 478 Z');
      b.fillStyle = '#e9e1d6'; b.fill(TOP);
      b.save(); b.clip(TOP);
      b.fillStyle = cyl(150, 450, .38); b.fillRect(0, 0, W, H);
      b.filter = 'blur(10px)';
      [[230, .18], [272, .1], [336, .12], [378, .18]].forEach(([x, a]) => {
        b.strokeStyle = `rgba(120,100,80,${a})`; b.lineWidth = 12;
        b.beginPath(); b.moveTo(x, 520); b.bezierCurveTo(x - 6, 650, x + 8, 760, x, 900); b.stroke();
      });
      b.strokeStyle = 'rgba(255,255,255,.55)'; b.lineWidth = 10;
      b.beginPath(); b.moveTo(300, 540); b.bezierCurveTo(296, 660, 304, 780, 300, 900); b.stroke();
      b.filter = 'none';
      const tv = b.createLinearGradient(0, 470, 0, 900);
      tv.addColorStop(0, 'rgba(0,0,0,.06)'); tv.addColorStop(.3, 'rgba(0,0,0,0)'); tv.addColorStop(1, 'rgba(60,40,20,.14)');
      b.fillStyle = tv; b.fillRect(0, 0, W, H);
      b.restore();
      b.strokeStyle = '#d8cfc3'; b.lineWidth = 4; b.lineCap = 'round';
      b.beginPath(); b.moveTo(206, 484); b.quadraticCurveTo(208, 410, 222, 346); b.stroke();
      b.beginPath(); b.moveTo(394, 484); b.quadraticCurveTo(392, 410, 378, 346); b.stroke();
      // nape shadow
      b.filter = 'blur(14px)'; b.fillStyle = 'rgba(90,50,32,.3)';
      b.beginPath(); b.ellipse(CX, 312, 72, 30, 0, 0, Math.PI * 2); b.fill(); b.filter = 'none';
      b.restore();
      // arm/torso contact shadow
      [[ARM_L, 156, 160], [ARM_R, 444, 440]].forEach(([p, xa, xb]) => {
        b.save(); b.clip(p); b.filter = 'blur(7px)'; b.strokeStyle = 'rgba(95,52,32,.4)'; b.lineWidth = 12;
        b.beginPath(); b.moveTo(xa, 480); b.bezierCurveTo(xa - 4, 600, xa - 4, 760, xb, 890); b.stroke(); b.restore();
      });
      // final: slightly soften edges and drop a ground shadow
      const bc = bodyC.getContext('2d');
      bc.clearRect(0, 0, W, H);
      const gs = bc.createRadialGradient(CX, 905, 10, CX, 905, 300);
      gs.addColorStop(0, 'rgba(20,40,34,.18)'); gs.addColorStop(1, 'rgba(20,40,34,0)');
      bc.fillStyle = gs; bc.fillRect(0, 680, W, 220);
      bc.filter = 'blur(.7px)'; bc.drawImage(tmp, 0, 0); bc.filter = 'none';
      bodyDrawn = true;
    }

    /* ---------- Hair geometry ---------- */
    function halfWidth(y, dens) {
      if (y < CY) { const t = (y - CY) / (RY + 6); return (RX + 8) * Math.sqrt(Math.max(0, 1 - t * t)); }
      const base = RX + 8;
      if (y < 292) return base - 10 * smooth(CY, 292, y);
      const flare = (48 * dens) * smooth(292, 410, y);
      return base - 10 + flare + Math.max(0, y - 400) * .05 * dens;
    }

    function strandPath(u, s, endY, dens, wave) {
      const clumps = 64, ci = Math.round((u + 1) / 2 * clumps), uc = ci / clumps * 2 - 1;
      const rootY = CY - RY + 3 + Math.abs(u) * 10 + rnd(s * 1.7) * 4;
      const hem = (1 - u * u) * 22 * Math.min(1, (endY - 300) / 120) - Math.pow(rnd(s * 3.1), 1.6) * 40;
      const yEnd = Math.max(rootY + 20, endY + hem);
      const pts = [];
      const ph = u * 1.1 + rnd(ci * 7.7) * .5, amp = wave * (0.88 + rnd(ci * 2.3) * 0.24);
      for (let y = rootY; ; y += 14) {
        const yy = Math.min(y, yEnd);
        const t = clamp((yy - 300) / Math.max(60, yEnd - 300), 0, 1);
        const ue = u + (uc - u) * t * t * .2;
        const hw = halfWidth(yy, yy > 292 ? dens : 1);
        const wv = amp * Math.sin((yy - 300) * .019 + ph) * smooth(290, 430, yy) * (1 + t * .4);
        pts.push([CX + ue * hw + wv + (rnd(s) - .5) * 1.5, yy]);
        if (yy >= yEnd) break;
      }
      return pts;
    }

    function stroke(c, pts) {
      c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
        c.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      const l = pts[pts.length - 1]; c.lineTo(l[0], l[1]); c.stroke();
    }

    /* ---------- Render ---------- */
    function render({ length = 55, shade = ['#3b2416', '#7a4a2a', '#b07a48'], density = 1, wave = 3 }) {
      if (!bodyDrawn) drawBody();
      const endY = endYFor(length);
      const N = Math.round(2600 * density);

      // 1. grayscale shading layer
      const s = shadeC.getContext('2d');
      s.clearRect(0, 0, W, H); s.lineCap = 'round';
      // dense under-layer to avoid gaps
      s.lineWidth = 5;
      for (let i = 0; i < 260 * density; i++) {
        const u = -0.97 + (i / (260 * density - 1)) * 1.94;
        const v = 92 + rnd(i * 9.3) * 22;
        s.strokeStyle = `rgba(${v},${v},${v},.9)`;
        stroke(s, strandPath(u, i + 9000, endY - 14, density, wave));
      }
      // main strands
      for (let i = 0; i < N; i++) {
        const u = (rnd(i * 1.37) * 2 - 1) * .995;
        const ci = Math.round((u + 1) / 2 * 64);
        const edge = Math.abs(u);
        let v = 118 + (rnd(ci * 5.1) - .5) * 30 + (rnd(i * 2.9) - .5) * 30 - edge * edge * 44;
        v = clamp(v, 40, 200);
        s.strokeStyle = `rgba(${v | 0},${v | 0},${v | 0},${(.45 + rnd(i * 4.4) * .4).toFixed(2)})`;
        s.lineWidth = .6 + rnd(i * 6.6) * .9;
        stroke(s, strandPath(u, i, endY, density, wave));
      }

      // soften: blend a slightly blurred copy back in (silky look instead of "wet" strands)
      const tm = tmpC.getContext('2d');
      tm.clearRect(0, 0, W, H); tm.filter = 'blur(1.1px)'; tm.drawImage(shadeC, 0, 0); tm.filter = 'none';
      s.globalAlpha = .7; s.drawImage(tmpC, 0, 0); s.globalAlpha = 1;
      // a few fine crisp strands on top for texture
      for (let i = 0; i < N * .25; i++) {
        const u = (rnd(i * 5.17 + 3) * 2 - 1) * .96;
        const v = 110 + (rnd(i * 7.3) - .5) * 60;
        s.strokeStyle = `rgba(${v | 0},${v | 0},${v | 0},.35)`; s.lineWidth = .5;
        stroke(s, strandPath(u, i + 7000, endY, density, wave));
      }

      // flyaways — a few stray hairs break the perfect outline
      for (let i = 0; i < 70 * density; i++) {
        const u = (rnd(i * 9.71 + 5) < .5 ? -1 : 1) * (.9 + rnd(i * 3.3) * .16);
        const pts = strandPath(u, i + 12000, endY - rnd(i) * 60, density, wave + 4);
        const off = (rnd(i * 4.1) - .3) * 14 * Math.sign(u);
        pts.forEach((p, k) => { p[0] += off * Math.sin(k / pts.length * Math.PI); });
        const v = 110 + rnd(i * 2.2) * 40;
        s.strokeStyle = `rgba(${v | 0},${v | 0},${v | 0},${(.18 + rnd(i * 6.1) * .25).toFixed(2)})`; s.lineWidth = .45;
        stroke(s, pts);
      }

      // 2. highlight strands, masked to light bands
      const h = hiC.getContext('2d');
      h.clearRect(0, 0, W, H); h.globalCompositeOperation = 'source-over'; h.lineCap = 'round';
      for (let i = 0; i < N * .55; i++) {
        const u = (rnd(i * 3.71 + 1) * 2 - 1) * .9;
        h.strokeStyle = `rgba(236,226,212,${(.18 + rnd(i * 8.8) * .32).toFixed(2)})`;
        h.lineWidth = .6 + rnd(i * 1.9) * .9;
        stroke(h, strandPath(u, i + 4000, endY, density, wave));
      }
      h.globalCompositeOperation = 'destination-in';
      const band2 = 300 + (endY - 300) * .38;
      const g = h.createLinearGradient(0, 100, 0, H);
      const p = y => clamp((y - 100) / (H - 100), 0, 1);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(p(CY - 80), 'rgba(0,0,0,.05)');
      g.addColorStop(p(CY - 30), 'rgba(0,0,0,.75)');
      g.addColorStop(p(CY + 20), 'rgba(0,0,0,.35)');
      g.addColorStop(p(CY + 60), 'rgba(0,0,0,.08)');
      g.addColorStop(p(Math.max(CY + 40, band2 - 70)), 'rgba(0,0,0,0)');
      if (endY > 360) {
        g.addColorStop(p(band2 - 20), 'rgba(0,0,0,.6)');
        g.addColorStop(p(band2 + 50), 'rgba(0,0,0,0)');
      }
      g.addColorStop(1, 'rgba(0,0,0,0)');
      h.fillStyle = g; h.fillRect(0, 0, W, H);
      // horizontal falloff — highlight strongest at the centre
      const gx = h.createLinearGradient(CX - 170, 0, CX + 170, 0);
      gx.addColorStop(0, 'rgba(0,0,0,0)'); gx.addColorStop(.38, 'rgba(0,0,0,1)'); gx.addColorStop(.62, 'rgba(0,0,0,1)'); gx.addColorStop(1, 'rgba(0,0,0,0)');
      h.fillStyle = gx; h.fillRect(0, 0, W, H);
      h.globalCompositeOperation = 'source-over';
      s.drawImage(hiC, 0, 0);

      // root shadow at the nape
      s.globalCompositeOperation = 'source-atop';
      const ns = s.createLinearGradient(0, 230, 0, 360);
      ns.addColorStop(0, 'rgba(0,0,0,0)'); ns.addColorStop(.6, 'rgba(0,0,0,.18)'); ns.addColorStop(1, 'rgba(0,0,0,0)');
      s.fillStyle = ns; s.fillRect(0, 0, W, H);
      s.globalCompositeOperation = 'source-over';

      // taper the ends: fade alpha over the last centimetres
      s.globalCompositeOperation = 'destination-in';
      const tp = s.createLinearGradient(0, endY - 70, 0, endY + 26);
      tp.addColorStop(0, 'rgba(0,0,0,1)'); tp.addColorStop(.6, 'rgba(0,0,0,.75)'); tp.addColorStop(1, 'rgba(0,0,0,0)');
      s.fillStyle = tp; s.fillRect(0, 0, W, H);
      s.globalCompositeOperation = 'source-over';

      // 3. colourise
      const c = colC.getContext('2d');
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, W, H);
      const cg = c.createLinearGradient(0, 110, 0, Math.max(endY, 320));
      cg.addColorStop(0, shade[0]); cg.addColorStop(.45, shade[1]); cg.addColorStop(1, shade[2]);
      c.fillStyle = cg; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = 'destination-in'; c.drawImage(shadeC, 0, 0);
      c.globalCompositeOperation = 'hard-light'; c.drawImage(shadeC, 0, 0);
      c.globalCompositeOperation = 'destination-in'; c.drawImage(shadeC, 0, 0);
      c.globalCompositeOperation = 'source-over';

      // 4. compose
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(bodyC, 0, 0);
      // soft contact shadow of the hair on the back
      ctx.save(); ctx.filter = 'blur(12px)'; ctx.globalAlpha = .35; ctx.drawImage(shadeC, 4, 10); ctx.restore();
      ctx.drawImage(colC, 0, 0);
    }

    return { render, endYFor, MARKS, W, H };
  }
  return { create };
})();
