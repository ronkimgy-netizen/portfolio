const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if(nav) nav.style.boxShadow = scrollY > 40 ? '0 1px 0 #EAECF0' : '';
});

const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting){
      e.target.style.transitionDelay = (i * .05) + 's';
      e.target.classList.add('on');
      obs.unobserve(e.target);
    }
  });
}, {threshold:.08});
document.querySelectorAll('.rev').forEach(el => obs.observe(el));

function toggle(id) {
  document.getElementById(id).classList.toggle('open');
}

// ── Image lightbox ──
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('imgModalImg');
const modalCaption = document.getElementById('imgModalCaption');

function openModal(src, alt, caption) {
  modalImg.src = src;
  modalImg.alt = alt;
  modalCaption.textContent = caption || '';
  modalCaption.style.display = caption ? 'block' : 'none';
  modal.classList.add('open');
}

document.querySelectorAll('.image-gallery img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openModal(img.src, img.alt, ''));
});

document.querySelectorAll('.preview-item').forEach(item => {
  const img = item.querySelector('img');
  const caption = item.querySelector('span');
  if (!img) return;
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openModal(img.src, img.alt, caption ? caption.textContent : ''));
});

document.getElementById('imgModalClose').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modal.classList.remove('open');
    conceptModal.classList.remove('open');
  }
});

// ── Concept card lightbox ──
const conceptModal = document.getElementById('conceptModal');
const conceptModalImg = document.getElementById('conceptModalImg');
const conceptModalText = document.getElementById('conceptModalText');

document.querySelectorAll('.full-bleed-card img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const card = img.closest('.full-bleed-card');
    const ul = card.querySelector('ul');
    conceptModalImg.src = img.src;
    conceptModalImg.alt = img.alt;
    conceptModalText.innerHTML = ul ? ul.innerHTML : '';
    conceptModal.classList.add('open');
  });
});

document.getElementById('conceptModalClose').addEventListener('click', () => conceptModal.classList.remove('open'));
conceptModal.addEventListener('click', e => { if (e.target === conceptModal) conceptModal.classList.remove('open'); });

// ── Swiper init ──
new Swiper('.prob-swiper', {
  loop: true,
  grabCursor: true,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

new Swiper('.full-bleed-swiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  grabCursor: true,
  autoHeight: true,
  pagination: { el: '.full-bleed-swiper .swiper-pagination', clickable: true },
  navigation: { nextEl: '.full-bleed-swiper-next', prevEl: '.full-bleed-swiper-prev' },
});

// ── Final Design gallery scroll ──
function scrollFdGallery(direction) {
  const track = document.getElementById('fdGalleryTrack');
  if (!track) return;
  const card = track.querySelector('.fd-card');
  if (!card) return;
  const step = card.offsetWidth + 24; // card width + gap
  track.scrollBy({ left: step * direction, behavior: 'smooth' });
}