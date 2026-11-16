const personalMedia = {
  frontPic: Array.from({ length: 12 }, (_, index) => `assets/front pic/fp (${index + 1}).jpeg`),
  firstMeet: Array.from({ length: 15 }, (_, index) => `assets/first meet/fm (${index + 1}).jpeg`),
  lunchDate: [
    'assets/lunch date/WhatsApp Image 2026-10-30 at 10.58.15 PM.jpeg',
    'assets/lunch date/WhatsApp Image 2026-1f0-30 at 10.58.15 PM.jpeg',
    'assets/lunch date/WhatsApp Image 20d26-10-30 at 10.58.15 PM.jpeg',
    'assets/lunch date/WhatsApp Imdage 2026-10-30 at 10.58.15 PM.jpeg'
  ],
  secretPic: [
    'assets/secret pic/WhatsApp Imagde 2026-10-30 at 10.58.15 PM.jpeg',
    'assets/secret pic/WhatsApp Image 2026-10-30 at 10.58.15 PM.jpeg',
    'assets/secret pic/WhatsApp Image 2026-10-30 at 11.07.56 PM.jpeg',
    'assets/secret pic/WhatsApp Image 2026-10-30 at d10.58.15 PM.jpeg',
    'assets/secret pic/WhatsApp Image 2026-10-30g at 11.07.56 PM.jpeg',
    'assets/secret pic/WhatsApp Image 2026-1d0-30 at 10.58.15 PM.jpeg',
    'assets/secret pic/WhatsApp Image 2026d-10-30 at 10.58.15 PM.jpeg',
    'assets/secret pic/WhatsApp Image 20d26-10-30 at 10.58.15 PM.jpeg'
  ]
};

function createPhotoCard(src, caption, className = 'photo-card gallery-item') {
  const card = document.createElement('div');
  card.className = className;
  card.dataset.caption = caption;

  const image = document.createElement('img');
  image.src = src;
  image.alt = caption;
  image.loading = 'lazy';

  card.appendChild(image);
  return card;
}

function populatePhotoGrid(id, photos, caption, className) {
  const grid = document.getElementById(id);
  if (!grid) return;

  photos.forEach((src, index) => {
    const cardCaption = `${caption} ${index + 1}`;
    const cardClass = className || 'photo-card gallery-item';
    const card = createPhotoCard(src, cardCaption, cardClass);
    if (id === 'memories-photo-grid' && index > 0) card.classList.add('hidden');
    grid.appendChild(card);
  });
}

populatePhotoGrid('front-photo-grid', personalMedia.frontPic, 'A favorite photo with Risha');
populatePhotoGrid('memories-photo-grid', personalMedia.frontPic, 'A favorite memory with Risha', 'memory-card card-image gallery-item');
populatePhotoGrid('promise-photo-grid', personalMedia.frontPic.slice(8), 'A lovely moment with Risha');
populatePhotoGrid('first-meet-photo-grid', personalMedia.firstMeet, 'First-meet memory at Hanuman Mandir');
populatePhotoGrid('lunch-date-photo-grid', personalMedia.lunchDate, 'Lunch-date memory');
populatePhotoGrid('secret-cute-grid', personalMedia.secretPic.slice(0, 4), 'A secret memory');
populatePhotoGrid('secret-romantic-grid', personalMedia.secretPic.slice(4), 'A romantic secret memory');
