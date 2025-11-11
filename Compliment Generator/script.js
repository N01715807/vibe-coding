// script.js
document.addEventListener('DOMContentLoaded', () => {
  /* ----------------- Compliment Logic ----------------- */
  const compliments = {
    daily: [
      'Your smile can light up a room.',
      'You look great today!',
      'Your kindness warms the people around you.',
      'You have a great sense of style.',
      'You’re thoughtful and notice things others miss.',
      'You are someone people can rely on.',
      'People are happier because you are around.',
      'You’re getting better every day—be proud of that.'
    ],
    study: [
      'Your study habits are impressive.',
      'You absorb new information quickly.',
      'You ask great questions—keep it up.',
      'Your focus is admirable.',
      'You learn from mistakes and grow.',
      'You have a strong work ethic.',
      'You retain knowledge better than you think.',
      'You manage your time very well.'
    ],
    coding: [
      'Your code is clean and readable.',
      'You debug like a pro—great instincts.',
      'Your solutions are elegant and practical.',
      'You think about edge cases—smart move.',
      'You write thoughtful commit messages.',
      'You collaborate well on code reviews.',
      'Your refactors improve maintainability.',
      'You learn new tools quickly.'
    ]
  };

  const btn = document.getElementById('complimentBtn');
  const display = document.getElementById('compliment');
  const select = document.getElementById('categorySelect');
  const lastIndex = { daily: -1, study: -1, coding: -1 };

  function pickRandom(category = 'daily') {
    const list = compliments[category] || [];
    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    let i;
    do { i = Math.floor(Math.random() * list.length); }
    while (i === lastIndex[category]);
    lastIndex[category] = i;
    return list[i];
  }

  function showCompliment(text) {
    display.classList.remove('show');
    void display.offsetWidth; // restart CSS animation
    display.textContent = text;
    display.classList.add('show');
    display.setAttribute('aria-live', 'polite');
  }

  // 初始提示
  (function init() {
    const initialLabel = select.options[select.selectedIndex].text;
    display.textContent = `Category: ${initialLabel}. Click the button to get a compliment.`;
  })();

  // 类别变化时提示
  select.addEventListener('change', () => {
    const label = select.options[select.selectedIndex].text;
    display.textContent = `Category: ${label}. Click the button to get a compliment.`;
    display.classList.remove('show');
  });

  // 键盘可达
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
  });

  /* ----------------- Confetti Module (delta-time + HiDPI safe) ----------------- */
  ;(function makeConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    Object.assign(canvas.style, {
      position: 'fixed', left: '0', top: '0',
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: '9999'
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    let CSS_W = 0, CSS_H = 0;
    const MAX_SCALE = 1.75;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_SCALE);
      CSS_W = window.innerWidth; CSS_H = window.innerHeight;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width  = Math.max(1, Math.floor(CSS_W * dpr));
      canvas.height = Math.max(1, Math.floor(CSS_H * dpr));
      canvas.style.width = CSS_W + 'px';
      canvas.style.height = CSS_H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 坐标=CSS像素
    }
    window.addEventListener('resize', resize);
    resize();

    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'];
    const rand = (a, b) => Math.random() * (b - a) + a;

    class Particle {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.size = rand(6, 12);
        this.color = colors[(Math.random() * colors.length) | 0];
        const speed = rand(2, 8);
        const angle = rand(-Math.PI / 2 - 0.8, -Math.PI / 2 + 0.8);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.rotation = rand(0, Math.PI * 2);
        this.angularVelocity = rand(-0.2, 0.2);
        this.gravity = 0.18;
        this.friction = 0.995;
        this.ttl = 80 + Math.floor(rand(0, 40)); // 基准帧计数
        this.age = 0;
        this.opacity = 1;
      }
      update(delta = 1) {
        this.vy += this.gravity * delta;
        const f = Math.pow(this.friction, delta);
        this.vx *= f; this.vy *= f;
        this.x += this.vx * delta; this.y += this.vy * delta;
        this.rotation += this.angularVelocity * delta;
        this.age += delta;
        this.opacity = Math.max(0, 1 - this.age / this.ttl);
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        ctx.restore();
      }
      isDead() {
        return this.age >= this.ttl || this.y > CSS_H + 50 || this.opacity <= 0.02;
      }
    }

    let particles = [];
    let running = false;
    let rafId = null;
    let last = 0;

    function emit(x, y, count = 24) {
      for (let i = 0; i < count; i++) particles.push(new Particle(x, y));
      if (!running) { running = true; last = performance.now(); rafId = requestAnimationFrame(loop); }
    }

    function loop(now) {
      const delta = (now - last) / 16.67; // 相对 60fps
      last = now;
      ctx.clearRect(0, 0, CSS_W, CSS_H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(Math.max(0.5, Math.min(delta, 2.5))); // clamp 防止后台超大步长
        p.draw(ctx);
        if (p.isDead()) particles.splice(i, 1);
      }
      if (particles.length > 0) rafId = requestAnimationFrame(loop);
      else { running = false; rafId = null; }
    }

    // 全局触发/销毁（可选）
    window.__fireConfetti = function ({ x, y, count } = {}) {
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        x = window.innerWidth / 2; y = window.innerHeight / 3;
      }
      emit(x, y, Number.isFinite(count) ? count : 28);
    };
    window.__destroyConfetti = function () {
      particles = []; if (rafId) cancelAnimationFrame(rafId);
      running = false; rafId = null;
      window.removeEventListener('resize', resize);
      canvas.remove();
      delete window.__fireConfetti;
      delete window.__destroyConfetti;
    };

    // 把 confetti 接到按钮点击
    btn.addEventListener('click', () => {
      const category = select.value || 'daily';
      const text = pickRandom(category);
      showCompliment(text);
      try {
        const r = btn.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        window.__fireConfetti({ x, y, count: 32 });
      } catch {
        window.__fireConfetti();
      }
    });
  })();
});
