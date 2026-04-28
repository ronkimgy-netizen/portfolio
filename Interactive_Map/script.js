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

document.querySelectorAll('.image-gallery img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.classList.add('open');
  });
});

document.getElementById('imgModalClose').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });

// ── Swiper init ──
new Swiper('.prob-swiper', {
  loop: true,
  grabCursor: true,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
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
