(function () {
  'use strict';

  const DOM = {
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    navToggle: document.querySelector('.nav-toggle'),
    navLinksContainer: document.querySelector('.nav-links'),
    backToTop: document.getElementById('backToTop'),
    statNumbers: document.querySelectorAll('.stat-number'),
    sections: document.querySelectorAll('.section'),
  };

  let statAnimated = false;

  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  DOM.navToggle.addEventListener('click', () => {
    DOM.navToggle.classList.toggle('active');
    DOM.navLinksContainer.classList.toggle('open');
  });

  DOM.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      DOM.navToggle.classList.remove('active');
      DOM.navLinksContainer.classList.remove('open');
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      DOM.navToggle.classList.remove('active');
      DOM.navLinksContainer.classList.remove('open');
    }
  });

  const updateActiveLink = () => {
    const scrollY = window.scrollY + 150;

    DOM.sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        DOM.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const handleBackToTop = () => {
    DOM.backToTop.classList.toggle('visible', window.scrollY > 400);
  };

  const animateStats = () => {
    if (statAnimated) return;

    DOM.statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = Math.max(1, Math.floor(target / 60));
      let current = 0;

      const update = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target + '+';
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(update);
      };

      update();
    });

    statAnimated = true;
  };

  DOM.sections.forEach(s => s.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'sobre-mi') {
          animateStats();
        }
      }
    });
  }, { threshold: 0.15 });

  DOM.sections.forEach(el => observer.observe(el));

  DOM.statNumbers.forEach(stat => {
    const parent = stat.closest('.stat-card');
    if (parent) observer.observe(parent);
  });

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      updateActiveLink();
      handleBackToTop();
    });
  }, { passive: true });

  document.querySelectorAll('.carousel-container').forEach(container => {
    const slides = container.querySelectorAll('.carousel-slide');
    const mockup = container.closest('.phone-mockup, .laptop-mockup');
    if (!mockup) return;
    const dotsContainer = mockup.querySelector('.carousel-dots');
    const prevBtn = mockup.querySelector('.prev');
    const nextBtn = mockup.querySelector('.next');
    if (!dotsContainer || !prevBtn || !nextBtn) return;
    let current = 0;
    let startX = 0;
    let isDragging = false;
    const captions = Array.from(slides).map(s => s.dataset.caption || '');
    const projectCard = mockup.closest('.project-card-wide');
    const captionEl = projectCard ? projectCard.querySelector('.carousel-caption') : null;

    const goTo = (index) => {
      slides.forEach(s => s.classList.remove('active'));
      dotsContainer.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsContainer.children[current].classList.add('active');
      if (captionEl) captionEl.innerHTML = `<b>La imagen muestra:</b> ${captions[current]}`;
    };

    const initDots = () => {
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    };

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        goTo(current + (diff < 0 ? 1 : -1));
        isDragging = false;
      }
    }, { passive: true });

    container.addEventListener('touchend', () => { isDragging = false; }, { passive: true });

    initDots();
  });

  updateActiveLink();

  setTimeout(() => {
    document.querySelector('#inicio')?.classList.add('visible');
  }, 100);

})();
