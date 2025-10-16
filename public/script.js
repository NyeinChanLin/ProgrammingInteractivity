(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Ensure elements exist before adding event listeners
    if (!menuToggle || !mainNav) {
      console.warn('Mobile menu elements not found');
      return;
    }
    
    /**
     * Toggle mobile navigation menu
     */
    function toggleMobileMenu() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded attribute
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle active class on navigation
      mainNav.classList.toggle('active');
      
      // Log for demonstration purposes
      console.log('Mobile menu toggled:', !isExpanded ? 'opened' : 'closed');
    }
    
    /**
     * Close mobile menu when clicking outside
     */
    function handleOutsideClick(event) {
      const isClickInsideNav = mainNav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      const isMenuOpen = mainNav.classList.contains('active');
      
      if (!isClickInsideNav && !isClickOnToggle && isMenuOpen) {
        toggleMobileMenu();
      }
    }
    
    /**
     * Close mobile menu on escape key
     */
    function handleEscapeKey(event) {
      const isMenuOpen = mainNav.classList.contains('active');
      
      if (event.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
        menuToggle.focus(); // Return focus to toggle button
      }
    }
    
    /**
     * Close mobile menu when window is resized to desktop size
     */
    function handleResize() {
      if (window.innerWidth >= 768 && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
    
    // Add event listeners
    menuToggle.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);
    
    /**
     * Smooth scroll behavior for anchor links
     */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#' || targetId === '#get-started') {
          event.preventDefault();
          console.log('CTA button clicked:', targetId);
          return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          event.preventDefault();
          
          // Close mobile menu if open
          if (mainNav.classList.contains('active')) {
            toggleMobileMenu();
          }
          
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update focus for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
          
          console.log('Navigated to:', targetId);
        }
      });
    });

    console.log('Mobile navigation initialized');
    
    //This is where my code starts

    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
    });
    }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
    });

   animateOnScroll.forEach(currentElement => observer.observe(currentElement));
  });

  const cardAnimateOnScroll = document.querySelectorAll('.card-animate-on-scroll');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
    }, {
    threshold: 0.5,
    rootMargin: '0px 0px -200px 0px'
  })

  cardAnimateOnScroll.forEach(currentElement => observer.observe(currentElement));
})();
