window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const sparrow = document.querySelector('.sparrow-img');
  const intro = document.querySelector('.sparrow-intro');
  const siteContent = document.getElementById('site-content');
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // Shimmer movement only
  const shimmerShift = scrollY % 200;
  sparrow.style.backgroundPosition = `${shimmerShift}px ${shimmerShift}px`;

  // Fade out bird and reveal site at bottom
  if (scrollY >= maxScroll - 50) {
    intro.style.opacity = 0;
    siteContent.style.opacity = 1;
  }
});
