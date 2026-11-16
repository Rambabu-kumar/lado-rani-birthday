document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const photoItems = [...document.querySelectorAll('.gallery-item')];
  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  let currentIndex = 0;
  const open = (index) => {
    currentIndex = index;
    const item = photoItems[currentIndex];
    const img = item?.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxCaption.textContent = item.dataset.caption || 'Memory';
    lightbox.classList.add('active');
  };

  photoItems.forEach((item, index) => {
    item.addEventListener('click', () => open(index));
  });

  document.getElementById('close-lightbox')?.addEventListener('click', () => lightbox.classList.remove('active'));
  document.getElementById('prev-photo')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
    open(currentIndex);
  });
  document.getElementById('next-photo')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % photoItems.length;
    open(currentIndex);
  });
});
