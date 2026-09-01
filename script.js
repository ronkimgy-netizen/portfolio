/* Scroll reveal — subtle fade + translateY via IntersectionObserver.
   Respects prefers-reduced-motion; content is fully visible without JS
   because .reveal styles are gated on the html.js class (set inline in <head>). */
/* Contact form — no backend on GitHub Pages, so the send button opens the
   visitor's email client with the message pre-addressed via a mailto: link. */
(function () {
  'use strict';

  var form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var message = form.elements.message.value.trim();
    if (!message) {
      form.elements.message.focus();
      return;
    }
    window.location.href = 'mailto:gwanyung90@gmail.com' +
      '?subject=' + encodeURIComponent('Portfolio contact') +
      '&body=' + encodeURIComponent(message);
  });
})();

(function () {
  'use strict';

  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();
