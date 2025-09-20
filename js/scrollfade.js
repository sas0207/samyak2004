<script>
document.addEventListener("DOMContentLoaded", () => {
  const sparrowIntro = document.querySelector('.sparrow-intro');
  const shinySparrow = document.querySelector('.sparrow-shiny');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    if (scrollPercent >= 30) {
      shinySparrow.style.opacity = '1'; // ✨ fade in shiny bird
    }

    if (scrollPercent >= 99) {
      sparrowIntro.style.opacity = '0';
      sparrowIntro.style.pointerEvents = 'none';
      sparrowIntro.style.transform = 'scale(0.95)';

      setTimeout(() => {
        sparrowIntro.remove();
        document.body.classList.add('reveal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  });
});
</script>
