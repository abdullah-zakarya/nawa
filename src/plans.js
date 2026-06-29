import { CONFIG } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const toggle12 = document.getElementById('toggle-12');
  const toggle24 = document.getElementById('toggle-24');
  const cards = document.querySelectorAll('.plan-card');

  function setDuration(duration) {
    if (!toggle12 || !toggle24) return;
    
    // Toggle active classes on buttons
    if (duration === 12) {
      toggle12.classList.add('bg-primary', 'text-background', 'shadow-lg', 'shadow-primary/20');
      toggle12.classList.remove('text-on-surface/60', 'hover:text-on-surface');
      toggle24.classList.remove('bg-primary', 'text-background', 'shadow-lg', 'shadow-primary/20');
      toggle24.classList.add('text-on-surface/60', 'hover:text-on-surface');
    } else {
      toggle24.classList.add('bg-primary', 'text-background', 'shadow-lg', 'shadow-primary/20');
      toggle24.classList.remove('text-on-surface/60', 'hover:text-on-surface');
      toggle12.classList.remove('bg-primary', 'text-background', 'shadow-lg', 'shadow-primary/20');
      toggle12.classList.add('text-on-surface/60', 'hover:text-on-surface');
    }

    // Update each card's price, duration text, and WhatsApp checkout link
    cards.forEach(card => {
      const priceVal = card.querySelector('.price-val');
      const priceOriginal = card.querySelector('.price-original');
      const durationText = card.querySelector('.duration-text');
      const checkoutBtn = card.querySelector('.checkout-btn');

      const price = card.getAttribute(`data-price-${duration}`);
      const originalPrice = card.getAttribute(`data-original-${duration}`);
      const durText = card.getAttribute(`data-duration-text-${duration}`);
      const rawText = card.getAttribute(`data-text-${duration}`);

      if (priceVal) {
        priceVal.style.transition = 'opacity 0.15s ease';
        priceVal.style.opacity = '0';
        setTimeout(() => {
          priceVal.textContent = price;
          priceVal.style.opacity = '1';
        }, 150);
      }

      if (priceOriginal) {
        priceOriginal.style.transition = 'opacity 0.15s ease';
        priceOriginal.style.opacity = '0';
        setTimeout(() => {
          priceOriginal.textContent = originalPrice;
          priceOriginal.style.opacity = '1';
        }, 150);
      }

      if (durationText) {
        durationText.style.transition = 'opacity 0.15s ease';
        durationText.style.opacity = '0';
        setTimeout(() => {
          durationText.textContent = durText;
          durationText.style.opacity = '1';
        }, 150);
      }

      if (checkoutBtn) {
        const encodedText = encodeURIComponent(rawText);
        checkoutBtn.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`);
      }
    });
  }

  if (toggle12 && toggle24) {
    toggle12.addEventListener('click', () => setDuration(12));
    toggle24.addEventListener('click', () => setDuration(24));
    
    // Initialize with 12 weeks
    setDuration(12);
  }
});
