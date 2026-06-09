import './index.css';
import { CONFIG } from './config.js';
import { HEADER_HTML, MOBILE_MENU_HTML, FOOTER_HTML, WHATSAPP_BTN_HTML } from './components/navigation.js';
import { initTestimonialCarousel } from './testimonials.js';

// Dynamically render the shared components (Header, Footer, Mobile Menu, WhatsApp button)
function renderSharedComponents() {
  // 1. Render Header
  const headerEl = document.querySelector('header');
  if (headerEl) {
    headerEl.innerHTML = HEADER_HTML;
  }

  // 2. Render Footer
  const footerEl = document.querySelector('footer');
  if (footerEl) {
    footerEl.innerHTML = FOOTER_HTML;
  }

  // 3. Render Mobile Menu
  // Remove existing mobile menu elements to avoid duplicates
  const oldBackdrop = document.getElementById('mobile-menu-backdrop');
  const oldMenu = document.getElementById('mobile-menu');
  if (oldBackdrop) oldBackdrop.remove();
  if (oldMenu) oldMenu.remove();

  const root = document.getElementById('root');
  if (root) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = MOBILE_MENU_HTML;
    while (tempDiv.firstChild) {
      root.appendChild(tempDiv.firstChild);
    }
  }

  // 4. Render WhatsApp Floating Button
  const oldWhatsappBtns = document.querySelectorAll('a[href*="wa.me/"][class*="fixed bottom-8"]');
  oldWhatsappBtns.forEach(btn => btn.remove());

  if (root) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = WHATSAPP_BTN_HTML;
    while (tempDiv.firstChild) {
      root.appendChild(tempDiv.firstChild);
    }
  }
}

// Dynamically update WhatsApp links
function updateWhatsAppLinks() {
  const links = document.querySelectorAll('a[href*="wa.me/"]');
  links.forEach(link => {
    const currentHref = link.getAttribute('href');
    // Replace the existing number (digits after wa.me/) with the config number
    const newHref = currentHref.replace(/(wa\.me\/)([0-9]+)/, `$1${CONFIG.whatsappNumber}`);
    link.setAttribute('href', newHref);
  });
}

// Highlight active link based on window.location.pathname
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  
  const isMatch = (href) => {
    const cleanPath = currentPath.replace(/\.html$/, '').replace(/\/$/, '');
    const cleanHref = href.replace(/\.html$/, '').replace(/^\.\//, '/').replace(/\/$/, '');
    
    if (cleanHref === '/index' || cleanHref === '' || cleanHref === '/') {
      return cleanPath === '/index' || cleanPath === '' || cleanPath === '/';
    }
    return cleanPath === cleanHref || cleanPath.endsWith(cleanHref);
  };

  // Desktop Links
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (isMatch(href)) {
      link.classList.add('text-primary', 'font-bold');
      link.classList.remove('text-on-surface/60', 'font-medium');
    } else {
      link.classList.remove('text-primary', 'font-bold');
      link.classList.add('text-on-surface/60', 'font-medium');
    }
  });

  // Mobile Links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    const iconContainer = link.querySelector('div');
    const textLabel = link.querySelector('span');
    
    if (isMatch(href)) {
      if (iconContainer) {
        iconContainer.classList.add('bg-primary/10', 'text-primary');
        iconContainer.classList.remove('bg-white/5', 'text-on-surface/40');
      }
      if (textLabel) {
        textLabel.classList.add('text-primary');
        textLabel.classList.remove('text-on-surface/60');
      }
    } else {
      if (iconContainer) {
        iconContainer.classList.remove('bg-primary/10', 'text-primary');
        iconContainer.classList.add('bg-white/5', 'text-on-surface/40');
      }
      if (textLabel) {
        textLabel.classList.remove('text-primary');
        textLabel.classList.add('text-on-surface/60');
      }
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderSharedComponents();
  updateWhatsAppLinks();
  highlightActiveNav();

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize testimonial carousel slider
  initTestimonialCarousel();

  // Reveal Animations on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-right, .reveal-left, .reveal-scale').forEach(el => {
    observer.observe(el);
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (!mobileMenu || !mobileMenuBackdrop) return;
    mobileMenu.classList.remove('translate-x-full');
    mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu || !mobileMenuBackdrop) return;
    mobileMenu.classList.add('translate-x-full');
    mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
