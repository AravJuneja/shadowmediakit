// Scroll-reveal for sections. Elements are visible by default in CSS;
// we only arm the hidden/fade-in state once the observer is watching,
// so content already on screen never gets stuck invisible.
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => {
  const rect = el.getBoundingClientRect();
  const alreadyVisible = rect.top < window.innerHeight * 0.85;
  el.classList.add('reveal--armed');
  if (alreadyVisible) {
    el.classList.add('is-visible');
  } else {
    io.observe(el);
  }
});

// Lightbox for gallery images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.lb-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-full');
    const alt = btn.querySelector('img')?.getAttribute('alt') || '';
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
