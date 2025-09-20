document.addEventListener("DOMContentLoaded", () => {
  const sparrowIntro = document.querySelector('.sparrow-intro');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    if (scrollPercent >= 99) {
      sparrowIntro.style.opacity = '0';
      sparrowIntro.style.pointerEvents = 'none';
      sparrowIntro.style.transform = 'scale(0.95)';

      setTimeout(() => {
        sparrowIntro.remove(); // ✅ removes the bird section
        document.body.style.overflow = 'auto';
        document.body.classList.add('reveal'); // ✅ triggers fade-in
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  });
});
