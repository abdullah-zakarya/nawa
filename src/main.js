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

// View Switcher (Routing)
const homeView = document.getElementById('home-view');
const calculatorView = document.getElementById('calculator-view');
const desktopNavLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveNav(activeHref) {
  // Desktop Links
  desktopNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === activeHref) {
      link.classList.add('text-brand-primary', 'font-bold');
      link.classList.remove('text-on-surface/60', 'font-medium');
    } else {
      link.classList.remove('text-brand-primary', 'font-bold');
      link.classList.add('text-on-surface/60', 'font-medium');
    }
  });

  // Mobile Links
  mobileNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    const iconContainer = link.querySelector('div');
    const textLabel = link.querySelector('span');
    
    if (href === activeHref) {
      if (iconContainer) {
        iconContainer.classList.add('bg-brand-primary/10', 'text-brand-primary');
        iconContainer.classList.remove('bg-white/5', 'text-on-surface/40');
      }
      if (textLabel) {
        textLabel.classList.add('text-brand-primary');
        textLabel.classList.remove('text-on-surface/60');
      }
    } else {
      if (iconContainer) {
        iconContainer.classList.remove('bg-brand-primary/10', 'text-brand-primary');
        iconContainer.classList.add('bg-white/5', 'text-on-surface/40');
      }
      if (textLabel) {
        textLabel.classList.remove('text-brand-primary');
        textLabel.classList.add('text-on-surface/60');
      }
    }
  });
}

function showView(view) {
  if (view === 'calculator') {
    homeView.classList.add('hidden');
    calculatorView.classList.remove('hidden');
    updateActiveNav('#calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    calculatorView.classList.add('hidden');
    homeView.classList.remove('hidden');
  }
}

// Intercept clicks on links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    
    if (targetId === '#calculator') {
      e.preventDefault();
      showView('calculator');
      window.location.hash = 'calculator';
    } else {
      // It's a home link
      const wasInCalculator = !calculatorView.classList.contains('hidden');
      if (wasInCalculator) {
        showView('home');
      }
      
      // Update nav highlights
      updateActiveNav(targetId === '#' ? '#' : targetId);

      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.location.hash = '';
      } else {
        // Let normal anchor scrolling happen, but if we switched views, we need to do it manually
        if (wasInCalculator) {
          e.preventDefault();
          setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      }
    }
  });
});

// Check URL Hash on Load
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#calculator') {
    showView('calculator');
  } else if (window.location.hash) {
    updateActiveNav(window.location.hash);
  }
});

// Calorie Calculator Logic
const calorieForm = document.getElementById('calorie-form');
const calcPlaceholder = document.getElementById('calculator-placeholder');
const calcResults = document.getElementById('calculator-results');

if (calorieForm) {
  calorieForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const gender = calorieForm.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = calorieForm.querySelector('input[name="goal"]:checked').value;

    // 1. Calculate BMR (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 2. Calculate TDEE
    const tdee = bmr * activity;

    // 3. Calculate Target Calories based on Goal
    let targetCalories = tdee;
    let goalText = '';
    if (goal === 'loss') {
      targetCalories = tdee - (tdee * 0.20); // 20% deficit
      goalText = 'خسارة دهون (تنشيف)';
    } else if (goal === 'maintain') {
      targetCalories = tdee;
      goalText = 'المحافظة على الوزن';
    } else if (goal === 'gain') {
      targetCalories = tdee + 350; // Lean bulk surplus
      goalText = 'بناء عضلات (تضخيم)';
    }

    targetCalories = Math.round(targetCalories);
    const roundedBmr = Math.round(bmr);
    const roundedTdee = Math.round(tdee);

    // 4. Calculate Macros
    // Protein: 2.2g per kg bodyweight
    const proteinG = Math.round(weight * 2.2);
    const proteinKcal = proteinG * 4;

    // Fats: 25% of target calories
    const fatsKcal = Math.round(targetCalories * 0.25);
    const fatsG = Math.round(fatsKcal / 9);

    // Carbs: Remaining calories
    const carbsKcal = Math.max(0, targetCalories - (proteinKcal + (fatsG * 9)));
    const carbsG = Math.round(carbsKcal / 4);

    // 5. Update DOM elements
    document.getElementById('target-calories').textContent = targetCalories.toLocaleString('ar-EG');
    document.getElementById('result-bmr').textContent = roundedBmr.toLocaleString('ar-EG');
    document.getElementById('result-tdee').textContent = roundedTdee.toLocaleString('ar-EG');

    document.getElementById('macro-protein').textContent = proteinG.toLocaleString('ar-EG');
    document.getElementById('macro-protein-kcal').textContent = proteinKcal.toLocaleString('ar-EG');
    document.getElementById('macro-carbs').textContent = carbsG.toLocaleString('ar-EG');
    document.getElementById('macro-carbs-kcal').textContent = carbsKcal.toLocaleString('ar-EG');
    document.getElementById('macro-fats').textContent = fatsG.toLocaleString('ar-EG');
    document.getElementById('macro-fats-kcal').textContent = (fatsG * 9).toLocaleString('ar-EG');

    // Update progress bars widths
    const totalMacrosG = proteinG + carbsG + fatsG;
    const proteinPct = Math.round((proteinG / totalMacrosG) * 100);
    const carbsPct = Math.round((carbsG / totalMacrosG) * 100);
    const fatsPct = Math.round((fatsG / totalMacrosG) * 100);

    document.getElementById('bar-protein').style.width = `${proteinPct}%`;
    document.getElementById('bar-carbs').style.width = `${carbsPct}%`;
    document.getElementById('bar-fats').style.width = `${fatsPct}%`;

    // 6. WhatsApp Link Generation
    const whatsappCalcBtn = document.getElementById('whatsapp-calc-btn');
    if (whatsappCalcBtn) {
      const messageText = `مرحباً كوتش يوسف، قمت بحساب سعراتي واحتياجاتي عبر حاسبة موقع نواة البدنية، وهذه هي التفاصيل:\n\n` +
                          `• الجنس: ${gender === 'male' ? 'ذكر' : 'أنثى'}\n` +
                          `• العمر: ${age} سنة\n` +
                          `• الوزن: ${weight} كجم\n` +
                          `• الطول: ${height} سم\n` +
                          `• الهدف: ${goalText}\n\n` +
                          `• الاحتياج اليومي المستهدف: ${targetCalories} سعرة حرارية\n` +
                          `• معدل BMR: ${roundedBmr} سعرة\n` +
                          `• معدل TDEE: ${roundedTdee} سعرة\n\n` +
                          `توزيع الماكروز المقترح:\n` +
                          `• البروتين: ${proteinG} جرام (${proteinKcal} سعرة)\n` +
                          `• الكربوهيدرات: ${carbsG} جرام (${carbsKcal} سعرة)\n` +
                          `• الدهون: ${fatsG} جرام (${fatsG * 9} سعرة)\n\n` +
                          `أود معرفة الخطوات القادمة والاشتراك في الباقة المناسبة لي للبدء فوراً!`;

      const encodedMessage = encodeURIComponent(messageText);
      whatsappCalcBtn.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`);
    }

    // 7. Toggle visibility
    calcPlaceholder.classList.add('hidden');
    calcResults.classList.remove('hidden');
    
    // Trigger Lucide icons update if any new icon rendered
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Scroll results into view smoothly
    calcResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

