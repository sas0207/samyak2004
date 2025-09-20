window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const sparrow = document.querySelector('.sparrow-img');
  const siteContent = document.getElementById('site-content');
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // Shimmer movement
  const shimmerShift = scrollY % 200;
  sparrow.style.backgroundPosition = `${shimmerShift}px ${shimmerShift}px`;

  // Reveal site content at bottom
  if (scrollY >= maxScroll - 50) {
    document.querySelector('.sparrow-intro').style.opacity = 0;
    siteContent.style.opacity = 1;
  }
});
