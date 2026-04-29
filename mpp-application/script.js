// MPP 2.0 Case Study — script.js

// Lightbox for legacy screenshot images
(function () {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = '<img id="lightbox-img" alt="">';
  document.body.appendChild(overlay);

  document.querySelectorAll('.legacy img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      document.getElementById('lightbox-img').src = img.src;
      overlay.classList.add('active');
    });
  });

  overlay.addEventListener('click', function () {
    overlay.classList.remove('active');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') overlay.classList.remove('active');
  });
})();
