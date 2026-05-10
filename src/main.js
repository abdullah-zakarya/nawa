import './index.css';
import { CONFIG } from './config.js';

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

updateWhatsAppLinks();

// Initialize Lucide Icons
if (window.lucide) {
  window.lucide.createIcons();
}

// Reveal Animations on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Once animated, we don't need to observe it anymore
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

// Smooth scrolling for anchor links (handled by CSS, but good to have JS fallback or logic)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
