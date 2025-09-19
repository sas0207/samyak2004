document.addEventListener("DOMContentLoaded", () => {
  const progressCircle = document.querySelector('.progress');
  const percentText = document.querySelector('.scroll-percent');
  const introWrapper = document.querySelector('.intro-wrapper');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / scrollHeight) * 100, 100);
    const offset = 283 - (283 * scrollPercent) / 100;

    progressCircle.style.strokeDashoffset = offset;
    percentText.textContent = `${Math.floor(scrollPercent)}%`;

    if (scrollPercent >= 100) {
      introWrapper.style.opacity = '0';
      introWrapper.style.pointerEvents = 'none';
      introWrapper.style.transform = 'scale(0.95)';
    }
  });
});
