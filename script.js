/* ==========================================================================
   JavaScript Functionality - Debdeep Mandal Futuristic Portfolio Redesign
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu Drawer Navigation
  // ==========================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  
  function openDrawer() {
    mobileToggle.classList.add('active');
    mobileDrawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeDrawer() {
    mobileToggle.classList.remove('active');
    mobileDrawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileDrawer.classList.contains('active');
      if (isActive) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }
  
  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }
  
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // ==========================================
  // 2. Active Section Highlighting on Scroll
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 130;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    // Highlight desktop links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    // Highlight mobile links
    mobileLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================
  const scrollElements = document.querySelectorAll('.scroll-animate');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });
    
    scrollElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    const handleScrollAnimation = () => {
      scrollElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const inView = elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1.1;
        if (inView) {
          el.classList.add('animated');
        }
      });
    };
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
  }

  // ==========================================
  // 4. Contact Form Submission Handling
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = '<span>Sending...</span>';
      
      setTimeout(() => {
        submitBtn.style.opacity = '1';
        submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
        submitBtn.innerHTML = '<span>Message Sent Successfully!</span>';
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.style.background = '';
          submitBtn.innerHTML = originalText;
        }, 3500);
      }, 1000);
    });
  }

  // ==========================================
  // 5. Contact Information Copy-to-Clipboard
  // ==========================================
  const copyButtons = document.querySelectorAll('.copy-button');
  
  copyButtons.forEach(button => {
    const textToCopy = button.getAttribute('data-copy');
    const tooltip = button.querySelector('.tooltip');
    
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        button.classList.add('copied');
        if (tooltip) {
          tooltip.textContent = 'Copied!';
        }
        
        setTimeout(() => {
          button.classList.remove('copied');
          if (tooltip) {
            tooltip.textContent = 'Copy';
          }
        }, 2000);
      }).catch(err => {
        console.error('Copy failed: ', err);
        if (tooltip) {
          tooltip.textContent = 'Failed';
        }
      });
    });
  });

  // ==========================================
  // 6. Scroll-to-Top Button
  // ==========================================
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});