document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fadeIn");
      } else {
        entry.target.classList.remove("fadeIn");
      }
    });
  });

  document.querySelectorAll(".fadeInOnScroll").forEach((el) => {
    observer.observe(el);
  });
});
