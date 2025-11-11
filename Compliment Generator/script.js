document.addEventListener('DOMContentLoaded', () => {
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
  // keep last indices per category to avoid immediate repeats
  const lastIndex = { daily: -1, study: -1, coding: -1 };

  function pickRandom(category = 'daily') {
    const list = compliments[category] || [];
    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    let i;
    do {
      i = Math.floor(Math.random() * list.length);
    } while (i === lastIndex[category]);
    lastIndex[category] = i;
    return list[i];
  }

  function showCompliment(text) {
    display.classList.remove('show');
    void display.offsetWidth; // force reflow to restart animation
    display.textContent = text;
    display.classList.add('show');
    display.setAttribute('aria-live', 'polite');
  }

  btn.addEventListener('click', () => {
    const category = select.value || 'daily';
    const text = pickRandom(category);
    showCompliment(text);
  });

  // Allow Enter/Space when focused on button
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });

  // when category changes, update hint text
  select.addEventListener('change', () => {
    const label = select.options[select.selectedIndex].text;
    display.textContent = `Category: ${label}. Click the button to get a compliment.`;
    display.classList.remove('show');
  });

  // set initial hint based on default
  (function init() {
    const initialLabel = select.options[select.selectedIndex].text;
    display.textContent = `Category: ${initialLabel}. Click the button to get a compliment.`;
  })();

  /* ----------------- Confetti / Particles ----------------- */
  // Small canvas-based confetti effect. Lightweight and dependency-free.
  ;(function makeConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    function resize() {
      width = canvas.width = Math.floor(window.innerWidth * devicePixelRatio || 1);
      height = canvas.height = Math.floor(window.innerHeight * devicePixelRatio || 1);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(devicePixelRatio || 1, devicePixelRatio || 1);
    }
    window.addEventListener('resize', resize);
    resize();

    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF'];

    function random(min, max) { return Math.random() * (max - min) + min; }

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(6, 12);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = random(0, Math.PI * 2);
        const speed = random(2, 8);
        const angle = random(-Math.PI / 2 - 0.8, -Math.PI / 2 + 0.8);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.18;
        this.friction = 0.995;
        this.ttl = 80 + Math.floor(random(0, 40)); // frames to live
        this.age = 0;
        this.angularVelocity = random(-0.2, 0.2);
        this.opacity = 1;
      }
      update() {
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.angularVelocity;
        this.age++;
        this.opacity = Math.max(0, 1 - this.age / this.ttl);
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        // draw rectangle as confetti
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        ctx.restore();
      }
    }

    let particles = [];
    let running = false;

    function emit(x, y, count = 24) {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
      }
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // update & draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.age >= p.ttl || p.y > window.innerHeight + 50 || p.opacity <= 0.02) {
          particles.splice(i, 1);
        }
      }
      if (particles.length > 0) {
        requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }

    // expose a global helper used below
    window.__fireConfetti = function (opts = {}) {
      // opts: x, y in client coordinates, count
      const count = typeof opts.count === 'number' ? opts.count : 28;
      let x = opts.x, y = opts.y;
      if (typeof x !== 'number' || typeof y !== 'number') {
        x = window.innerWidth / 2;
        y = window.innerHeight / 3;
      }
      // convert to high-DPI canvas coordinates
      const scale = devicePixelRatio || 1;
      emit(x * scale, y * scale, count);
    };
  })();

  // trigger confetti when a compliment is shown
  const originalShow = showCompliment;
  function showComplimentWithConfetti(text) {
    originalShow(text);
    // pick a point near the button to emit confetti
    try {
      const btnRect = document.getElementById('complimentBtn').getBoundingClientRect();
      const x = btnRect.left + btnRect.width / 2;
      const y = btnRect.top + btnRect.height / 2;
      // fire confetti with moderate count
      window.__fireConfetti({ x, y, count: 32 });
    } catch (e) {
      window.__fireConfetti();
    }
  }

  // replace handler to include confetti
  btn.removeEventListener && btn.removeEventListener('click', null);
  btn.addEventListener('click', () => {
    const category = select.value || 'daily';
    const text = pickRandom(category);
    showComplimentWithConfetti(text);
  });
});
