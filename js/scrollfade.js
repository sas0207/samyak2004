window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const sparrow = document.querySelector('.sparrow-img');

  // Fade out and scale down
  sparrow.style.opacity = 1 - scrollY / 300;
  sparrow.style.transform = `scale(${1 - scrollY / 1000})`;

  // Shimmer shift
  const shimmerShift = scrollY % 200;
  sparrow.style.backgroundPosition = `${shimmerShift}px ${shimmerShift}px`;
});
