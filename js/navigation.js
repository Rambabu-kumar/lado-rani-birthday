
const navData = ['index.html','birthday.html','letter.html','memories.html','special.html','story.html','counter.html','quotes.html','shayari.html','promises.html','secret.html','coupons.html','wishes.html','gift.html','forever.html'];

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-nav-root]');
  if (!nav) return;
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const index = navData.indexOf(page) !== -1 ? navData.indexOf(page) : 0;
  const nextLink = index < navData.length - 1 ? navData[index + 1] : navData[0];
  nav.remove();

  const moreMemoryButton = document.createElement('a');
  moreMemoryButton.className = 'button more-memory-button';
  moreMemoryButton.href = nextLink;
  moreMemoryButton.textContent = 'More Memory';
  document.querySelector('main.page-shell')?.appendChild(moreMemoryButton);
});
