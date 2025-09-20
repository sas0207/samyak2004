<script>
document.addEventListener("DOMContentLoaded", () => {
  const sparrowIntro = document.querySelector('.sparrow-intro');
  const shinySparrow = document.querySelector('.sparrow-shiny');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;

  if (scrollPercent >= 99) {
    document.querySelector('.sparrow-intro').style.opacity = '0';
    document.querySelector('.sparrow-intro').style.pointerEvents = 'none';
    document.body.classList.add('reveal');
  }
});
</script>
