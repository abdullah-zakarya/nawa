export function initTestimonialCarousel() {
  const carousel = document.getElementById('testimonial-carousel');
  const track = document.getElementById('testimonial-track');
  
  if (!carousel || !track) return;

  const originalSlides = Array.from(track.children);
  const originalLength = originalSlides.length;
  if (originalLength === 0) return;

  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('testimonial-dots');

  // Clone slides to support infinite scrolling: S2_clone S3_clone [S0 S1 S2 S3] S0_clone S1_clone
  const cloneStart1 = originalSlides[originalLength - 2].cloneNode(true);
  const cloneStart2 = originalSlides[originalLength - 1].cloneNode(true);
  const cloneEnd1 = originalSlides[0].cloneNode(true);
  const cloneEnd2 = originalSlides[1].cloneNode(true);

  // Add a cloned-slide class for tracking if needed
  [cloneStart1, cloneStart2, cloneEnd1, cloneEnd2].forEach(clone => {
    clone.classList.add('cloned-slide');
  });

  // Insert start clones (S2 and S3 clones prepended)
  track.insertBefore(cloneStart2, track.firstChild);
  track.insertBefore(cloneStart1, track.firstChild);

  // Append end clones (S0 and S1 clones appended)
  track.appendChild(cloneEnd1);
  track.appendChild(cloneEnd2);

  const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
  let currentIndex = 2; // Start on original S0 (index 2)
  let autoSlideInterval;
  const slideDelay = 5000;

  // Create dot indicators for original slides only
  dotsContainer.innerHTML = '';
  for (let i = 0; i < originalLength; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active-dot');
    dot.addEventListener('click', () => {
      goToSlide(i + 2); // Map dot i to index i + 2
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }

  const viewport = document.getElementById('testimonial-viewport') || carousel;
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));

  function updateCarousel() {
    const viewportWidth = viewport.offsetWidth;
    const activeSlide = slides[currentIndex];
    
    if (!activeSlide) return;
    
    const slideWidth = activeSlide.offsetWidth;
    
    // Center the active slide in the viewport
    const offset = (viewportWidth / 2) - (activeSlide.offsetLeft + slideWidth / 2);
    track.style.transform = `translate3d(${offset}px, 0, 0)`;


    // Update active/inactive classes
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('active-slide');
      } else {
        slide.classList.remove('active-slide');
      }
    });

    // Update dots (calculate mapped index using modulo)
    const activeDotIndex = (currentIndex - 2 + originalLength) % originalLength;
    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Visual prev is next in LTR, but in LTR carousel, decrement index to slide left
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Reset infinite loop position after the transition completes
  track.addEventListener('transitionend', () => {
    if (currentIndex < 2) {
      // If we go past S0 to S3_clone (index 1) or S2_clone (index 0)
      currentIndex += originalLength;
      track.style.transition = 'none';
      updateCarousel();
      track.offsetHeight; // Force reflow
      track.style.transition = '';
    } else if (currentIndex > 5) {
      // If we go past S3 to S0_clone (index 6) or S1_clone (index 7)
      currentIndex -= originalLength;
      track.style.transition = 'none';
      updateCarousel();
      track.offsetHeight; // Force reflow
      track.style.transition = '';
    }
  });

  // Navigation Button Events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  // Click directly on slides to navigate
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (currentIndex !== index) {
        goToSlide(index);
        resetAutoSlide();
      }
    });
  });

  // Mouse wheel horizontal swipe gesture support
  let wheelCooldown = false;
  carousel.addEventListener('wheel', (e) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (isHorizontal) {
      e.preventDefault();
      if (wheelCooldown) return;
      
      if (e.deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoSlide();

      wheelCooldown = true;
      setTimeout(() => {
        wheelCooldown = false;
      }, 600);
    }
  }, { passive: false });

  // Auto-play Slider Timer
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideDelay);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Drag and Swipe Gesture support (Touch & Desktop Mouse)
  let isDragging = false;
  let startX = 0;
  let dragDiff = 0;

  track.addEventListener('mousedown', dragStart);
  track.addEventListener('touchstart', dragStart, { passive: true });
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('mousemove', dragMove);
  track.addEventListener('touchmove', dragMove, { passive: true });

  function dragStart(e) {
    isDragging = true;
    startX = getPositionX(e);
    track.style.transition = 'none';
    track.classList.add('cursor-grabbing');
    clearInterval(autoSlideInterval);
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    dragDiff = currentX - startX;
    
    const viewportWidth = viewport.offsetWidth;
    const activeSlide = slides[currentIndex];
    if (!activeSlide) return;
    const slideWidth = activeSlide.offsetWidth;
    const baseOffset = (viewportWidth / 2) - (activeSlide.offsetLeft + slideWidth / 2);
    
    track.style.transform = `translate3d(${baseOffset + dragDiff}px, 0, 0)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    track.classList.remove('cursor-grabbing');
    
    // 80px swipe threshold
    if (dragDiff < -80) {
      nextSlide();
    } else if (dragDiff > 80) {
      prevSlide();
    } else {
      goToSlide(currentIndex);
    }
    
    dragDiff = 0;
    startAutoSlide();
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  // Window Resize Responsiveness
  let resizeTimeout;
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    updateCarousel();
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      track.style.transition = '';
    }, 100);
  });

  // Initialize
  updateCarousel();
  startAutoSlide();
}
