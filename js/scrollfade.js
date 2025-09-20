// Shimmer gradient scroll effect
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.3; // adjust speed of movement
  const layer = document.querySelector('.gradient-sparrow');
  if (layer) {
    layer.style.backgroundPosition = center ${y}px;
  }
});
