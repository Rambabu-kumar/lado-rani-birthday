
const pageName = (window.location.pathname.split('/').pop() || 'index.html');

document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  createRosePetals();
  attachPageFlows();
  setPageSpecific();
});

function createFloatingHearts() {
  const count = window.innerWidth < 600 ? 12 : 24;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-piece';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${10 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 4}s`;
    heart.style.opacity = `${0.2 + Math.random() * 0.7}`;
    document.body.appendChild(heart);
  }
}

function createRosePetals() {
  const count = window.innerWidth < 600 ? 8 : 16;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'rose-petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.top = `${-20 - Math.random() * 40}px`;
    petal.style.animationDuration = `${6 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 4}s`;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(petal);
  }
}

function attachPageFlows() {
  const welcomeBtn = document.getElementById('welcome-button');
  if (welcomeBtn) {
    welcomeBtn.addEventListener('click', () => {
      const envelope = document.querySelector('.hero-envelope');
      envelope?.classList.add('envelope-open');
      setTimeout(() => { window.location.href = 'birthday.html'; }, 750);
    });
  }

  const wishBtn = document.getElementById('make-wish');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      document.querySelectorAll('.cake-candle').forEach((c) => {
        c.style.transform = 'scaleY(0.2)';
        c.style.opacity = '0.2';
        setTimeout(() => {
          c.style.transform = 'scaleY(1)';
          c.style.opacity = '1';
        }, 700);
      });
      const card = document.getElementById('birthday-wish');
      card?.classList.remove('hidden');
    });
  }

  const skipLetter = document.getElementById('skip-letter');
  const typeText = document.getElementById('typewriter-text');
  if (skipLetter && typeText) {
    const fullText = typeText.dataset.full || typeText.textContent;
    typeText.textContent = '';
    let index = 0;
    const typing = () => {
      typeText.textContent = fullText.slice(0, index);
      index += 1;
      if (index <= fullText.length) setTimeout(typing, 22);
    };
    typing();
    skipLetter.addEventListener('click', () => { typeText.textContent = fullText; });
  }

  const memoryCards = [...document.querySelectorAll('.memory-card')];
  if (memoryCards.length) {
    let current = 0;
    const caption = document.getElementById('memory-caption');
    const count = document.getElementById('memory-count');
    const progress = document.getElementById('memory-progress');
    const render = () => {
      memoryCards.forEach((card, idx) => card.classList.toggle('hidden', idx !== current));
      if (caption) caption.textContent = memoryCards[current]?.dataset.caption || 'Romantic memory';
      if (count) count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(memoryCards.length).padStart(2, '0')}`;
      if (progress) progress.style.width = `${((current + 1) / memoryCards.length) * 100}%`;
    };
    document.getElementById('prev-memory')?.addEventListener('click', () => { current = (current - 1 + memoryCards.length) % memoryCards.length; render(); });
    document.getElementById('next-memory')?.addEventListener('click', () => { current = (current + 1) % memoryCards.length; render(); });
    render();
    memoryCards.forEach((card) => {
      card.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const image = document.getElementById('lightbox-img');
        const captionBox = document.getElementById('lightbox-caption');
        if (!lightbox || !image) return;
        image.src = card.querySelector('img')?.src || '';
        captionBox.textContent = card.dataset.caption || 'Memory';
        lightbox.classList.add('active');
      });
    });
    document.getElementById('close-lightbox')?.addEventListener('click', () => document.getElementById('lightbox')?.classList.remove('active'));
    document.getElementById('next-photo')?.addEventListener('click', () => { current = (current + 1) % memoryCards.length; render(); });
    document.getElementById('prev-photo')?.addEventListener('click', () => { current = (current - 1 + memoryCards.length) % memoryCards.length; render(); });
  }

  const quoteCards = [...document.querySelectorAll('.quote-card')];
  if (quoteCards.length) {
    let current = 0;
    const renderQuote = () => {
      quoteCards.forEach((card, idx) => card.classList.toggle('hidden', idx !== current));
      quoteCards.forEach((card, idx) => card.classList.toggle('active', idx === current));
    };
    document.getElementById('prev-quote')?.addEventListener('click', () => { current = (current - 1 + quoteCards.length) % quoteCards.length; renderQuote(); });
    document.getElementById('next-quote')?.addEventListener('click', () => { current = (current + 1) % quoteCards.length; renderQuote(); });
    renderQuote();
    quoteCards.forEach((card) => { card.querySelector('.heart-badge')?.addEventListener('click', () => { current = Number(card.dataset.index || 0); renderQuote(); }); });
  }

  if (pageName === 'counter.html') {
    const target = new Date('2025-08-30T00:00:00');
    const liveClock = document.getElementById('love-clock');
    const countdown = document.getElementById('birthday-countdown');
    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, now.getTime() - target.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * 1000 * 60 * 60;
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * 1000 * 60;
      const seconds = Math.floor(diff / 1000);
      liveClock.innerHTML = `<div><strong>${days}</strong><span>Days</span></div><div><strong>${hours}</strong><span>Hours</span></div><div><strong>${minutes}</strong><span>Minutes</span></div><div><strong>${seconds}</strong><span>Seconds</span></div>`;
      const nextBirthday = new Date(new Date().getFullYear(), 10, 17);
      if (new Date() > nextBirthday) {
        const after = new Date(new Date().getFullYear() + 1, 10, 17);
        const left = after - new Date();
        const d = Math.floor(left / (1000 * 60 * 60 * 24));
        const h = Math.floor((left / (1000 * 60 * 60)) % 24);
        const m = Math.floor((left / (1000 * 60)) % 60);
        countdown.textContent = `Next birthday is coming: ${d}d ${h}h ${m}m`; 
      } else {
        const remaining = nextBirthday - new Date();
        const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const m = Math.floor((remaining / (1000 * 60)) % 60);
        countdown.textContent = `${d}d ${h}h ${m}m until 17 November`;
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  if (pageName === 'shayari.html') {
    let hugs = 0;
    const button = document.getElementById('virtual-hug');
    const count = document.getElementById('hug-count');
    button?.addEventListener('click', () => {
      hugs += 1;
      count.textContent = String(hugs);
      const message = document.getElementById('hug-message');
      if (message) message.textContent = 'A warm hug is on the way to you, Lado Rani! 💗';
    });
  }

  if (pageName === 'promises.html') {
    const button = document.getElementById('seal-promises');
    const status = document.getElementById('seal-status');
    button?.addEventListener('click', () => {
      const checked = document.querySelectorAll('.promise-check:checked').length;
      status.textContent = checked > 0 ? `Sealed ${checked} beautiful promises with love ❤️` : 'Sealed with love ❤️';
    });
  }

  if (pageName === 'secret.html') {
    const form = document.getElementById('gallery-password-form');
    const input = document.getElementById('gallery-password');
    const message = document.getElementById('password-error');
    const locked = document.getElementById('locked-state');
    const unlocked = document.getElementById('unlocked-state');
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (input.value.trim() === '300925') {
        locked.classList.add('hidden');
        unlocked.classList.remove('hidden');
        message.textContent = '';
      } else {
        message.textContent = 'Incorrect password. Try again, Risha ❤️';
        locked.classList.add('shake');
        setTimeout(() => locked.classList.remove('shake'), 450);
      }
    });
    document.getElementById('lock-gallery')?.addEventListener('click', () => {
      unlocked.classList.add('hidden');
      locked.classList.remove('hidden');
      input.value = '';
    });
  }

  if (pageName === 'coupons.html') {
    document.querySelectorAll('.redeem-btn').forEach((btn) => {
      const key = btn.dataset.key;
      if (localStorage.getItem(`coupon-${key}`) === 'redeemed') {
        btn.textContent = 'Redeemed ✅';
        btn.disabled = true;
      }
      btn.addEventListener('click', () => {
        btn.textContent = 'Redeemed ✅';
        btn.disabled = true;
        localStorage.setItem(`coupon-${key}`, 'redeemed');
      });
    });
  }

  if (pageName === 'wishes.html') {
    document.getElementById('release-lantern')?.addEventListener('click', () => {
      const lantern = document.createElement('div');
      lantern.style.position = 'absolute';
      lantern.style.left = '50%';
      lantern.style.bottom = '10%';
      lantern.style.transform = 'translateX(-50%)';
      lantern.style.width = '28px';
      lantern.style.height = '36px';
      lantern.style.background = 'linear-gradient(180deg, #ffd7ab, #ff9db7)';
      lantern.style.borderRadius = '12px';
      lantern.style.boxShadow = '0 0 20px rgba(255, 164, 127, 0.7)';
      document.querySelector('.wish-sky')?.appendChild(lantern);
      setTimeout(() => {
        lantern.style.transform = 'translate(-50%, -170px) scale(1.2)';
        lantern.style.opacity = '0.7';
      }, 10);
      setTimeout(() => lantern.remove(), 2200);
    });
  }

  if (pageName === 'gift.html') {
    document.getElementById('gift-box')?.addEventListener('click', () => {
      document.getElementById('gift-reveal')?.classList.remove('hidden');
    });
  }
}

function setPageSpecific() {
  if (pageName === 'index.html') {
    const envelope = document.querySelector('.hero-envelope');
    const btn = document.getElementById('welcome-button');
    btn?.addEventListener('click', () => envelope?.classList.add('envelope-open'));
  }
}
