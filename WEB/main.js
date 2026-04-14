/* ═══════════════════════════════════════════════════════════════
   CASA MUSEO HERMANAS MIRABAL — main.js
   Interacciones: Header scroll, nav activa, reveal animations,
   menú móvil, lazy loading de imágenes
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── DOM References ───────────────────────────────────────────
const header       = document.getElementById('site-header');
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav      = document.getElementById('main-nav');
const navLinks     = document.querySelectorAll('.nav-link');
const heroImage    = document.getElementById('hero-bg-image');
const sections     = document.querySelectorAll('section[id]');

// ── 1. HEADER SCROLL BEHAVIOR ────────────────────────────────
(function initHeaderScroll() {
  let lastScrollY = 0;

  function updateHeader() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // run on load
})();

// ── 2. ACTIVE NAV LINK (scroll spy) ─────────────────────────
(function initScrollSpy() {
  const sectionMap = {};

  sections.forEach(section => {
    sectionMap[section.id] = section;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));
})();

// ── 3. MOBILE MENU ──────────────────────────────────────────
(function initMobileMenu() {
  if (!hamburgerBtn || !mainNav) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Animate hamburger spans
    const spans = hamburgerBtn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      const spans = hamburgerBtn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburgerBtn.focus();
    }
  });
})();

// ── 4. REVEAL ON SCROLL ──────────────────────────────────────
(function initRevealAnimations() {
  const revealEls = document.querySelectorAll(
    '.section-header, .intro-grid, .stat-item, .sister-card, ' +
    '.casa-image-col, .casa-text-inner, .timeline-item, ' +
    '.activity-card, .visit-info-block, .cta-content, ' +
    '.feature-item'
  );

  revealEls.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger siblings in a group
    const parent = el.parentElement;
    const siblings = parent ? Array.from(parent.children) : [];
    const siblingIndex = siblings.indexOf(el);
    if (siblingIndex > 0 && siblingIndex <= 4) {
      el.classList.add(`reveal-delay-${siblingIndex}`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  revealEls.forEach(el => observer.observe(el));
})();

// ── 5. HERO IMAGE PARALLAX (subtle) ─────────────────────────
(function initHeroParallax() {
  if (!heroImage) return;

  // Mark image as loaded when ready
  if (heroImage.complete) {
    heroImage.classList.add('loaded');
  } else {
    heroImage.addEventListener('load', () => {
      heroImage.classList.add('loaded');
    });
  }

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;
        if (scrollY <= maxScroll) {
          const yOffset = scrollY * 0.35;
          heroImage.style.transform = `scale(1.04) translateY(${yOffset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── 6. SMOOTH ANCHOR NAVIGATION ─────────────────────────────
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerH = header ? header.getBoundingClientRect().height : 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
})();

// ── 7. TIMELINE INTERACTION ──────────────────────────────────
(function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const marker = item.querySelector('.timeline-marker');
      if (marker) {
        marker.style.boxShadow = `0 0 0 4px rgba(194, 107, 74, 0.2)`;
      }
    });
    item.addEventListener('mouseleave', () => {
      const marker = item.querySelector('.timeline-marker');
      if (marker) {
        marker.style.boxShadow = '';
      }
    });
  });
})();

// ── 8. FALLBACK IMAGE GRADIENT BACKGROUNDS ──────────────────
(function initImageFallbacks() {
  const images = document.querySelectorAll('img[onerror]');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
})();

// ── 9. REDUCED MOTION SUPPORT ────────────────────────────────
(function initReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-med',  '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
  }
})();

// ── DOMContentLoaded Guard ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial reveal check
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

console.log(
  '%cCasa Museo Hermanas Mirabal',
  'font-family: Georgia, serif; font-size: 18px; color: #2D4A3E; font-weight: bold;'
);
console.log(
  '%cPatria · Minerva · María Teresa — Las Mariposas',
  'font-family: Georgia, serif; font-size: 13px; color: #C26B4A; font-style: italic;'
);
