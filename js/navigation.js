
const navData = ['index.html','birthday.html','letter.html','memories.html','special.html','story.html','counter.html','quotes.html','shayari.html','promises.html','secret.html','coupons.html','wishes.html','gift.html','forever.html'];

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-nav-root]');
  if (!nav) return;
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const index = navData.indexOf(page) !== -1 ? navData.indexOf(page) : 0;
  const prevLink = index > 0 ? navData[index - 1] : null;
  const nextLink = index < navData.length - 1 ? navData[index + 1] : navData[0];
  nav.innerHTML = `
    <div class="nav-inner">
      <div class="nav-group">
        <a class="nav-btn" href="${prevLink || '#'}" ${prevLink ? '' : 'aria-disabled="true" tabindex="-1"'} ${prevLink ? '' : 'onclick="return false;"'}>Previous</a>
        <a class="nav-btn" href="index.html">Home</a>
        <a class="nav-btn" href="${nextLink || '#'}" ${nextLink ? '' : 'aria-disabled="true" tabindex="-1"'} ${nextLink ? '' : 'onclick="return false;"'}>${index === navData.length - 1 ? 'Replay' : 'Next'}</a>
      </div>
      <div class="nav-group">
        <div class="page-progress" aria-label="Page progress"><span class="bar" style="--progress:${((index + 1) / navData.length) * 100}%"></span></div>
        <span class="status-pill">Page ${index + 1} of ${navData.length}</span>
      </div>
      <div class="nav-group chapter-menu">
        <button class="chapter-btn" type="button" aria-label="Open chapter menu">Chapters ▾</button>
        <div class="chapter-drawer" aria-label="Chapter menu">
          ${navData.map((item, i) => `<a class="chapter-item ${i === index ? 'active' : ''}" href="${item}"><span>Page ${i + 1}</span><span>${item.replace('.html', '').replace(/-/g, ' ')}</span></a>`).join('')}
        </div>
      </div>
    </div>
  `;
  const chapterBtn = nav.querySelector('.chapter-btn');
  const drawer = nav.querySelector('.chapter-drawer');
  const moreMemoryButton = document.createElement('a');
  moreMemoryButton.className = 'button more-memory-button';
  moreMemoryButton.href = nextLink;
  moreMemoryButton.textContent = 'More Memory';
  document.querySelector('main.page-shell')?.appendChild(moreMemoryButton);

  chapterBtn?.addEventListener('click', () => drawer.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) drawer.classList.remove('open');
  });
});
