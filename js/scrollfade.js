<script>
document.addEventListener("DOMContentLoaded", () => {
  const sparrowIntro = document.querySelector('.sparrow-intro');
  const shaderLayer = document.querySelector('.shader-layer');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // Fade in shimmer as you scroll
    shaderLayer.style.opacity = Math.min(scrollPercent / 100, 1);

    // Fade out intro and reveal site
    if (scrollPercent >= 99) {
      sparrowIntro.style.opacity = '0';
      sparrowIntro.style.pointerEvents = 'none';

      setTimeout(() => {
        sparrowIntro.remove();
        document.body.classList.add('reveal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1200);
    }
  });
});
</script>
