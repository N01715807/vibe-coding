// script.js
document.addEventListener('DOMContentLoaded', () => {
  /* ----------------- Compliment Logic ----------------- */
  const compliments = {
    daily: [
  'Your smile can light up a room.',
  'You make ordinary moments feel special.',
  'You have a calming presence.',
  'People feel comfortable around you.',
  'You notice the little things that matter.',
  'You bring out the best in others.',
  'You radiate confidence without trying.',
  'You have a voice that’s pleasant to hear.',
  'You’re a great listener.',
  'Your laughter is contagious.',
  'You make challenges look easy.',
  'You show genuine care for people.',
  'You make others feel valued.',
  'You always find something positive to say.',
  'You’re the kind of friend everyone wishes for.',
  'You brighten dark days just by being there.',
  'You make people believe in kindness again.',
  'You handle stress with grace.',
  'You stay grounded under pressure.',
  'You carry yourself with quiet strength.',
  'You’re more patient than you realize.',
  'You leave places better than you found them.',
  'You inspire people to try harder.',
  'You’re dependable, and that’s rare.',
  'You turn mistakes into lessons.',
  'You bring warmth wherever you go.',
  'You have great energy—it lifts everyone.',
  'You’re fun to be around.',
  'You’re easy to talk to.',
  'You’re thoughtful and genuine.',
  'You have great intuition.',
  'You care deeply—and it shows.',
  'You know how to make people smile.',
  'You add meaning to small gestures.',
  'You’re growing into someone extraordinary.',
  'You make progress look effortless.',
  'You have a quiet confidence that draws respect.',
  'You’re steady when others lose balance.',
  'You make life feel lighter.',
  'You’re humble and kind.',
  'You make others feel seen.',
  'You find beauty in simple things.',
  'You have a heart that shines through.',
  'You’re brave enough to be gentle.',
  'You adapt quickly to change.',
  'You spread positivity without even noticing.',
  'You’re stronger than you think.',
  'You never stop improving.',
  'You’re becoming someone you’d be proud of.',
  'You’re exactly what the world needs today.',
  'You’re getting better every day—be proud of that.'
],

study: [
  'Your study habits are impressive.',
  'You absorb information efficiently.',
  'You turn hard topics into understandable ideas.',
  'You stay curious—that’s real intelligence.',
  'You think critically and deeply.',
  'You always connect concepts logically.',
  'You learn faster than you give yourself credit for.',
  'You ask meaningful questions.',
  'You’re persistent when learning something tough.',
  'You take feedback as fuel for growth.',
  'You summarize complex notes clearly.',
  'You study smarter, not just harder.',
  'You grasp patterns others miss.',
  'You remember details effortlessly.',
  'You plan your study sessions efficiently.',
  'You manage distractions well.',
  'You’re organized and methodical.',
  'You build solid understanding instead of memorizing.',
  'You make learning enjoyable.',
  'You turn pressure into motivation.',
  'You balance school and life gracefully.',
  'You write clearly and think clearly.',
  'You help classmates understand better.',
  'You’re disciplined about your goals.',
  'You know when to rest and when to push.',
  'You prepare like a pro before exams.',
  'You analyze mistakes constructively.',
  'You have great time-management instincts.',
  'You’re improving your focus every day.',
  'You reflect after every test—smart move.',
  'You keep calm under deadlines.',
  'You turn doubt into determination.',
  'You’re building strong learning habits for life.',
  'You keep your curiosity alive.',
  'You always look for better methods.',
  'You push beyond minimum requirements.',
  'You connect theory to practice naturally.',
  'You adapt quickly to new topics.',
  'You know how to prioritize effectively.',
  'You’re consistent—and consistency wins.',
  'You stay humble even when you excel.',
  'You motivate peers just by example.',
  'You never stop asking “why.”',
  'You turn challenges into research opportunities.',
  'You’re becoming a lifelong learner.',
  'You value understanding over grades.',
  'You balance detail and big picture well.',
  'You recognize your progress clearly.',
  'You’re mastering the art of learning itself.',
  'You’ll keep growing far beyond the classroom.',
  'You manage your time very well.'
],

coding: [
  'Your code is clean and readable.',
  'You debug like a detective.',
  'You think in systems, not fragments.',
  'You anticipate edge cases before they happen.',
  'You name things meaningfully—a true mark of a pro.',
  'You write comments that actually help others.',
  'You design with scalability in mind.',
  'You refactor responsibly.',
  'You understand trade-offs clearly.',
  'You write tests that catch real issues.',
  'You commit often and meaningfully.',
  'You use version control like second nature.',
  'You read documentation before complaining—rare skill.',
  'You simplify without oversimplifying.',
  'You write functions that just make sense.',
  'You think about performance early.',
  'You choose clarity over cleverness.',
  'You separate logic from UI cleanly.',
  'You design APIs with empathy for users.',
  'You spot patterns fast.',
  'You keep your git history tidy.',
  'You automate repetitive work smartly.',
  'You review code with respect and precision.',
  'You learn new frameworks quickly.',
  'You never stop improving your craft.',
  'You debug calmly under pressure.',
  'You write maintainable architecture.',
  'You know when to delete code.',
  'You document your reasoning clearly.',
  'You take security seriously.',
  'You think like both developer and user.',
  'You test before deploying—responsible habit.',
  'You balance beauty and practicality.',
  'You follow best practices naturally.',
  'You’re great at reading other people’s code.',
  'You give constructive feedback.',
  'You write scripts that save hours.',
  'You ask smart questions early.',
  'You manage complexity like a professional.',
  'You’re learning design patterns intuitively.',
  'You understand async logic cleanly.',
  'You care about accessibility and UX.',
  'You take pride in code quality.',
  'You keep learning new languages fearlessly.',
  'You bridge backend and frontend thinking.',
  'You write code others enjoy maintaining.',
  'You turn vague ideas into working prototypes.',
  'You know how to measure success in code.',
  'You make technical debt visible and manageable.',
  'You code with empathy—for users and teammates alike.',
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
