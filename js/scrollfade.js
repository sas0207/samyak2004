window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const shimmer = document.querySelector('.shimmer-aura');
  const wrapper = document.querySelector('.sparrow-wrapper');
  const siteContent = document.getElementById('site-content');
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // Shimmer movement only — bird stays fixed
  shimmer.style.backgroundPosition = `${scrollY % 200}px ${scrollY % 200}px`;

  // Fade out bird and reveal site at bottom
  if (scrollY >= maxScroll - 50) {
    wrapper.style.opacity = 0;
    siteContent.style.opacity = 1;
  }
});
