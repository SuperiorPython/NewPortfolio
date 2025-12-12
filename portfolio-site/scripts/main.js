document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('dynamic-nav');
  const headerHeight = header ? header.offsetHeight : 90;

  const navLinks = document.querySelectorAll('.nav-links-center a');
  const logoLink = document.querySelector('.logo-link');
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinksContainer = document.querySelector('.nav-links-center');
  const overlay = document.querySelector('.menu-overlay');

  /* -------------------------
   * Smooth scroll with offset
   * ------------------------- */
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Scroll so the section is a bit *below* the header, not jammed under it
    const offset = rect.top + scrollTop - headerHeight - 40; // 40px extra breathing room

    window.scrollTo({
      top: Math.max(offset, 0),
      behavior: 'smooth',
    });
  }

  // Nav links click
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(href);

      // Close mobile menu if open
      if (window.innerWidth <= 900 && navLinksContainer) {
        navLinksContainer.classList.remove('active');
        overlay && overlay.classList.remove('active');
        hamburger && hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Logo click
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      const href = logoLink.getAttribute('href') || '#hero';
      if (href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  }

  /* -------------------------
   * Hamburger + overlay
   * ------------------------- */
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  if (overlay && navLinksContainer) {
    overlay.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      overlay.classList.remove('active');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
    });
  }

  /* -------------------------
   * Scrollspy (active pill)
   * ------------------------- */

  const sections = document.querySelectorAll('.page-section');
  const sectionIdToNavLink = {};

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      sectionIdToNavLink[href.substring(1)] = link;
    }
  });

  // Observer fires when ~40% of a section is in the "middle band" of the viewport
  const observerOptions = {
    root: null,
    threshold: 0.4,
    rootMargin: '-15% 0px -45% 0px', // ignore very top & very bottom of viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      if (!id || !(id in sectionIdToNavLink)) return;

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        sectionIdToNavLink[id].classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // On load (e.g., if someone refreshes mid-page), pick the section that is MOST visible
  window.addEventListener('load', () => {
    let bestSection = null;
    let bestScore = 0;

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const ratio = Math.max(0, visibleHeight) / Math.max(rect.height, 1);

      if (ratio > bestScore) {
        bestScore = ratio;
        bestSection = sec;
      }
    });

    if (bestSection && sectionIdToNavLink[bestSection.id]) {
      navLinks.forEach((link) => link.classList.remove('active'));
      sectionIdToNavLink[bestSection.id].classList.add('active');
    }
  });

  /* -------------------------
   * Skills carousel
   * ------------------------- */
  const skillsTrack = document.getElementById('skillsTrack');
  const leftArrow = document.querySelector('.skills-arrow-left');
  const rightArrow = document.querySelector('.skills-arrow-right');

  if (skillsTrack && leftArrow && rightArrow) {
    const scrollAmount = 220; // px per click

    leftArrow.addEventListener('click', () => {
      skillsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
      skillsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
});
