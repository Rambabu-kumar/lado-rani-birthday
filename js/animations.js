document.addEventListener('DOMContentLoaded', () => {
  const burst = (x, y) => {
    for (let i = 0; i < 16; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'heart-piece';
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.width = '8px';
      piece.style.height = '8px';
      piece.style.animationDuration = `${1 + Math.random() * 1.2}s`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 1500);
    }
  };

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.matches('.button, .heart-badge, .gift-box')) {
      const rect = target.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  });
});
