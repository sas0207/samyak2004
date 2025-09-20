document.addEventListener('DOMContentLoaded', () => {
  const sparrowImage = document.querySelector('.sparrow-image');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    // Example: Pause shimmer when scrolled past 200px
    if (scrollPosition > 200) {
      sparrowImage.style.animationPlayState = 'paused';
    } else {
      sparrowImage.style.animationPlayState = 'running';
    }
  });
});
