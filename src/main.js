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
  const oldWhatsappBtns = document.querySelectorAll('a.fixed[href*="wa.me/"]');
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

  // Links carrying a prefilled message: <a data-wa-text="...">
  document.querySelectorAll('a[data-wa-text]').forEach(link => {
    const text = encodeURIComponent(link.dataset.waText);
    link.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`);
  });
}

// "/", "/index" and "/index.html" all refer to the home page
function normalizePath(path) {
  const clean = path.replace(/\.html$/, '').replace(/\/$/, '');
  return clean === '' ? '/index' : clean;
}

function setActiveLinks(isActive) {
  // Desktop Links
  document.querySelectorAll('.nav-link').forEach(link => {
    const active = isActive(link.getAttribute('href'));
    link.classList.toggle('text-primary', active);
    link.classList.toggle('font-bold', active);
    link.classList.toggle('text-on-surface/60', !active);
    link.classList.toggle('font-medium', !active);
  });

  // Mobile Links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    const active = isActive(link.getAttribute('href'));
    const iconContainer = link.querySelector('div');
    const textLabel = link.querySelector('span');

    if (iconContainer) {
      iconContainer.classList.toggle('bg-primary/10', active);
      iconContainer.classList.toggle('text-primary', active);
      iconContainer.classList.toggle('bg-white/5', !active);
      iconContainer.classList.toggle('text-on-surface/40', !active);
    }
    if (textLabel) {
      textLabel.classList.toggle('text-primary', active);
      textLabel.classList.toggle('text-on-surface/60', !active);
    }
  });
}

// Highlight the active link: by page, or by visible section (scroll-spy) on pages with in-page links
function highlightActiveNav() {
  const currentPath = normalizePath(window.location.pathname);
  const onCurrentPage = (href) => normalizePath(new URL(href, window.location.href).pathname) === currentPath;
  const hashOf = (href) => new URL(href, window.location.href).hash;

  const sections = [...new Set(
    Array.from(document.querySelectorAll('.nav-link'))
      .map(link => link.getAttribute('href'))
      .filter(onCurrentPage)
      .map(hashOf)
      .filter(Boolean)
  )]
    .map(hash => document.querySelector(hash))
    .filter(Boolean)
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

  if (sections.length === 0) {
    setActiveLinks(onCurrentPage);
    return;
  }

  const update = () => {
    const headerOffset = 120;
    let current = sections[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top - headerOffset <= 0) current = section;
    });
    setActiveLinks(href => onCurrentPage(href) && hashOf(href) === `#${current.id}`);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
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
    mobileMenu.inert = false;
    document.body.style.overflow = 'hidden';
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    closeMenuBtn?.focus();
  }

  function closeMenu() {
    if (!mobileMenu || !mobileMenuBackdrop) return;
    const wasOpen = !mobileMenu.classList.contains('translate-x-full');
    mobileMenu.classList.add('translate-x-full');
    mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.inert = true;
    document.body.style.overflow = '';
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    if (wasOpen) mobileMenuBtn?.focus();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

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
