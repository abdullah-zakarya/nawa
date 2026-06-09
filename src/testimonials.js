export function initTestimonialCarousel() {
  const carousel = document.getElementById('testimonial-carousel');
  const track = document.getElementById('testimonial-track');
  const viewport = document.getElementById('testimonial-viewport');
  
  if (!carousel || !track || !viewport) return;

  // Select current slides (4 testimonials)
  let slides = Array.from(track.querySelectorAll('.testimonial-slide'));
  const originalLength = slides.length;
  if (originalLength === 0) return;

  // To build a smooth closed 3D cylinder, we double 4 slides to 8 slides
  if (originalLength === 4) {
    const slide0 = slides[0].cloneNode(true);
    const slide1 = slides[1].cloneNode(true);
    const slide2 = slides[2].cloneNode(true);
    const slide3 = slides[3].cloneNode(true);
    
    slide0.setAttribute('data-index', '4');
    slide1.setAttribute('data-index', '5');
    slide2.setAttribute('data-index', '6');
    slide3.setAttribute('data-index', '7');
    
    track.appendChild(slide0);
    track.appendChild(slide1);
    track.appendChild(slide2);
    track.appendChild(slide3);
    
    slides = Array.from(track.querySelectorAll('.testimonial-slide'));
  }

  const N = slides.length; // Total 8 slides
  const angleUnit = 360 / N; // 45 degrees spacing
  let currentIndex = 0;
  
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('testimonial-dots');

  // Create dot indicators for original 4 items
  const numDots = 4;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active-dot');
    dot.addEventListener('click', () => {
      // Find closest index matching this testimonial mod 4 to minimize rotation
      const diff = i - (currentIndex % numDots);
      goToSlide(currentIndex + diff);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

  // Calculate 3D Radius based on slide width and device type
  function getRadius() {
    const slideWidth = slides[0].offsetWidth || 650;
    const isMobile = window.innerWidth < 768;
    const overlapFactor = isMobile ? 0.72 : 0.8; 
    return (slideWidth / (2 * Math.sin(Math.PI / N))) * overlapFactor;
  }

  function updateCarousel() {
    const R = getRadius();
    const trackAngle = -currentIndex * angleUnit;
    
    // Rotate the 3D cylinder track
    track.style.transform = `translateZ(${-R}px) rotateY(${trackAngle}deg)`;

    slides.forEach((slide, index) => {
      const slideAngle = index * angleUnit;
      
      // Calculate relative angle to active slide to apply extra inward rotation
      let relativeAngle = (index - currentIndex) * angleUnit;
      while (relativeAngle > 180) relativeAngle -= 360;
      while (relativeAngle < -180) relativeAngle += 360;

      const diff = Math.abs(relativeAngle) / angleUnit;

      let extraRotateY = 0;
      if (diff === 1) {
        // Rotate side slides back towards the viewer (center stage curve)
        extraRotateY = -relativeAngle * 0.45; 
      }

      // Position slide in 3D circle (center with translate3d, rotate, push out in Z, rotate inwards)
      slide.style.transform = `translate3d(-50%, -50%, 0) rotateY(${slideAngle}deg) translateZ(${R}px) rotateY(${extraRotateY}deg)`;
      
      if (index === currentIndex) {
        slide.classList.add('active-slide');
      } else {
        slide.classList.remove('active-slide');
      }

      // Limit visibility: only show active slide and one before + one after
      if (diff === 0) {
        slide.style.opacity = '1';
        slide.style.filter = 'blur(0px)';
        slide.style.pointerEvents = 'auto';
        slide.style.zIndex = '20';
      } else if (diff === 1) {
        // One before and one after: lower opacity, blur, lower z-index
        slide.style.opacity = '0.35';
        slide.style.filter = 'blur(3px)';
        slide.style.pointerEvents = 'auto'; // allow clicking adjacent to snap
        slide.style.zIndex = '10';
      } else {
        // Rest are completely hidden in 3D background
        slide.style.opacity = '0';
        slide.style.filter = 'blur(6px)';
        slide.style.pointerEvents = 'none';
        slide.style.zIndex = '0';
      }
    });

    // Update dots
    const activeDotIndex = ((currentIndex % numDots) + numDots) % numDots;
    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });

    // No dynamic resizing call here anymore to prevent layout shift
  }

  function adjustViewportHeight() {
    let maxHeight = 0;
    slides.forEach(slide => {
      const card = slide.querySelector('.testimonial-card');
      if (card) {
        const height = card.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      }
    });
    if (maxHeight > 0) {
      viewport.style.height = `${maxHeight + 40}px`;
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Prevent angle/index overflow by resetting it silently after rotation finishes
  track.addEventListener('transitionend', () => {
    if (currentIndex < 0) {
      currentIndex += N;
      track.style.transition = 'none';
      updateCarousel();
      track.offsetHeight; // force reflow
      track.style.transition = '';
    } else if (currentIndex >= N) {
      currentIndex -= N;
      track.style.transition = 'none';
      updateCarousel();
      track.offsetHeight; // force reflow
      track.style.transition = '';
    }
  });

  // Navigation button controls
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

  // Snap to adjacent slides on click
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (currentIndex !== index) {
        // Calculate difference taking circular wrapping into account
        let diff = index - currentIndex;
        // Check shortcut rotation
        if (diff > N / 2) diff -= N;
        if (diff < -N / 2) diff += N;
        goToSlide(currentIndex + diff);
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

  // Auto-play interval
  let autoSlideInterval;
  const slideDelay = 5000;

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideDelay);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Drag and Swipe support (Touch & Desktop Mouse)
  let isDragging = false;
  let startX = 0;
  let dragAngleDiff = 0;
  let baseTrackAngle = 0;

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
    baseTrackAngle = -currentIndex * angleUnit;
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const diffX = currentX - startX;
    
    // Pixel drag to rotation scale (carousel width = 90deg rotation)
    const dragScale = 90 / carousel.offsetWidth;
    dragAngleDiff = diffX * dragScale;
    
    const R = getRadius();
    track.style.transform = `translateZ(${-R}px) rotateY(${baseTrackAngle + dragAngleDiff}deg)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    track.classList.remove('cursor-grabbing');
    
    const angleThreshold = angleUnit / 3; // 15 degrees threshold
    if (dragAngleDiff < -angleThreshold) {
      nextSlide();
    } else if (dragAngleDiff > angleThreshold) {
      prevSlide();
    } else {
      goToSlide(currentIndex);
    }
    
    dragAngleDiff = 0;
    startAutoSlide();
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  // Window Resize Listener
  let resizeTimeout;
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    adjustViewportHeight();
    updateCarousel();
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      track.style.transition = '';
    }, 100);
  });

  // Run initial calculations
  // Force a tiny defer to ensure DOM is fully painted and heights are measurable
  setTimeout(() => {
    adjustViewportHeight();
    updateCarousel();
  }, 100);
  
  startAutoSlide();
}
