// MPP 2.0 Case Study — script.js

// Comparison sliders
(function () {
  document.querySelectorAll('.cs-root').forEach(function (root) {
    var handle = root.querySelector('.cs-handle');
    var isDragging = false;

    function setPosition(pct) {
      pct = Math.max(0, Math.min(100, pct));
      root.style.setProperty('--position', pct + '%');
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }

    function fromEvent(e) {
      var rect = root.getBoundingClientRect();
      setPosition(((e.clientX - rect.left) / rect.width) * 100);
    }

    root.addEventListener('pointerdown', function (e) {
      isDragging = true;
      root.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    root.addEventListener('pointermove', function (e) {
      if (isDragging) fromEvent(e);
    });
    root.addEventListener('pointerup', function (e) {
      isDragging = false;
      try { root.releasePointerCapture(e.pointerId); } catch (_) {}
    });
    root.addEventListener('pointercancel', function () { isDragging = false; });

    handle.addEventListener('keydown', function (e) {
      var cur = parseFloat(root.style.getPropertyValue('--position')) || 50;
      var step = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowDown')  { setPosition(cur - step); e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp')    { setPosition(cur + step); e.preventDefault(); }
      if (e.key === 'Home') { setPosition(0);   e.preventDefault(); }
      if (e.key === 'End')  { setPosition(100); e.preventDefault(); }
    });
  });
})();

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
// Scroll reveal
(function () {
  var revEls = document.querySelectorAll('.rev');
  if (!revEls.length) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revEls.forEach(function (el) { obs.observe(el); });
})();