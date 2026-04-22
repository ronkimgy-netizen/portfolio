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

// ── Swiper init ──
new Swiper('.prob-swiper', {
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