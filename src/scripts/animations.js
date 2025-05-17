// Animation observer to trigger entrance animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          element.classList.add('animate');
        }, delay);
        
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}); 