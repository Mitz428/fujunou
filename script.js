document.addEventListener('DOMContentLoaded', () => {

  // 1. Carousel Logic
  const slides = document.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  if (totalSlides > 0) {
    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % totalSlides;
      slides[currentSlide].classList.add('active');
    };
    setInterval(nextSlide, 3000);
  }

  // 2. Mobile Menu Logic
  const menuBtn = document.getElementById('js-menu-btn');
  const menuDrawer = document.getElementById('js-menu-drawer');
  const menuOverlay = document.getElementById('js-menu-overlay');
  const menuIcon = menuBtn.querySelector('i');
  const menuText = menuBtn.querySelector('span');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      menuOverlay.classList.add('open');
      menuDrawer.classList.add('open');
      menuBtn.classList.add('active');
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-times');
      menuText.textContent = 'close';
    } else {
      menuOverlay.classList.remove('open');
      menuDrawer.classList.remove('open');
      menuBtn.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
      menuText.textContent = 'menu';
    }
  };

  if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // 3. Smooth Scroll for PC Nav
  document.querySelectorAll('.nav-list__item a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 4. Privacy Policy Modal
  const policyOpen = document.getElementById('js-policy-open');
  const policyModal = document.getElementById('js-policy-modal');
  const policyClose = document.getElementById('js-policy-close');
  const policyOverlay = document.getElementById('js-policy-overlay');

  const openModal = (e) => {
    e.preventDefault(); e.stopPropagation();
    policyModal.classList.add('open');
  };
  const closeModal = () => {
    policyModal.classList.remove('open');
  };

  if (policyOpen) policyOpen.addEventListener('click', openModal);
  if (policyClose) policyClose.addEventListener('click', closeModal);
  if (policyOverlay) policyOverlay.addEventListener('click', closeModal);

  // 5. Scroll Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});
