document.addEventListener('DOMContentLoaded', () => {
  // --- Global Logo Logic ---
  // This ensures the logo is consistent across all pages and can be easily updated in one place.
  const LOGO_CONFIG = {
    header: 'assets/images/Logo_1.png',
    footer: 'assets/images/Logo_1.png',
    favicon: 'assets/images/logo_header_transparent.png'
  };

  const headerLogoImg = document.querySelector('.navbar .brand img');
  if (headerLogoImg) headerLogoImg.src = LOGO_CONFIG.header;

  const footerLogoImg = document.querySelector('footer .footer-col img');
  if (footerLogoImg) footerLogoImg.src = LOGO_CONFIG.footer;

  // Mobile Nav Toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Sticky Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Intersection Observer for Scroll Fade-ins and Scale-ins
  const animateElements = document.querySelectorAll('.fade-in, .scale-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before it enters the viewport
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // Handle Image Loading States
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading class if not cached
    if (!img.complete) {
      const parent = img.parentElement;
      if (parent && (parent.classList.contains('icon-box') || parent.classList.contains('card-img') || parent.classList.contains('course-card'))) {
        parent.classList.add('loading-bg');
      } else if (img.classList.contains('card-img')) {
        img.classList.add('loading-bg');
      }

      img.addEventListener('load', () => {
        const parent = img.parentElement;
        if (parent) parent.classList.remove('loading-bg');
        img.classList.remove('loading-bg');
      });
    }
  });

  // --- Hero Slider Logic ---
  const heroData = [
    {
      title: "Remote Pilot Training (RPTO)",
      subtext: "DGCA-approved drone pilot training programs with certification in collaboration with SynchroServe RPTO",
      theme: "theme-training"
    },
    {
      title: "Agriculture Drone Services",
      subtext: "Crop spraying, monitoring, and precision agriculture solutions.",
      theme: "theme-spraying"
    },
    {
      title: "Drone Repair & Maintenance Services",
      subtext: "Comprehensive repair, servicing, and preventive maintenance for drones to ensure optimal performance, safety, and compliance",
      theme: "theme-repair"
    },
    {
      title: "Drone-Based Survey & Mapping",
      subtext: "High-precision aerial surveys for infrastructure, land mapping, and planning.",
      theme: "theme-mapping"
    },
    {
      title: "Drone Sales & Consultation",
      subtext: "End-to-end support for drone procurement, setup, and operational guidance.",
      theme: "theme-sales"
    },
    {
      title: "Drone-Assisted Cable Deployment",
      subtext: "Building-to-building pilot rope deployment for faster and safer fiber installation.",
      theme: "theme-cable"
    }
  ];

  let currentSlide = 0;
  const slides = document.querySelectorAll('#hero-slider-bgs .slide');
  const dots = document.querySelectorAll('#hero-slider-nav .slider-dot');

  const hTitle = document.getElementById('hero-title');
  const hSubtext = document.getElementById('hero-subtext');

  const textContainer = document.getElementById('hero-text-container');

  function updateSlider(index) {
    // Background and dots
    slides.forEach((sl, i) => sl.classList.toggle('active-slide', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));

    if (!textContainer) return;

    // Animate content out
    textContainer.style.opacity = 0;
    textContainer.style.transform = 'translateY(10px)';

    setTimeout(() => {
      const data = heroData[index];
      if (hTitle) hTitle.innerHTML = data.title;
      if (hSubtext) hSubtext.innerHTML = data.subtext;

      // Update Themes dynamically
      textContainer.className = `hero-glass-panel fade-in appear ${data.theme}`;

      // Animate content in
      textContainer.style.opacity = 'var(--scroll-opacity, 1)';
      textContainer.style.transform = 'translateY(0)';
    }, 300); // match roughly CSS transition
  }

  // Setup initial class
  if (textContainer && heroData.length > 0) {
    textContainer.classList.add(heroData[0].theme);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      currentSlide = parseInt(e.target.dataset.index);
      updateSlider(currentSlide);
      resetSlideTimer();
    });
  });

  let slideInterval;
  function startSlideTimer() {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % heroData.length;
      updateSlider(currentSlide);
    }, 6000); // 6 seconds per slide
  }

  function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
  }

  if (dots.length > 0) {
    startSlideTimer();
  }

  // Hero Parallax Scroll Effect Mapping
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      // Calculate bounded progress between 0 and 1
      const progress = Math.min(scrollY / (heroHeight * 0.8), 1);

      // Removed background blur to match Spray page clarity
      heroSection.style.setProperty('--scroll-blur', `0px`);
      // Brightness down to 65%
      heroSection.style.setProperty('--scroll-brightness', `${1 - progress * 0.35}`);
      // Opacity of hero text down to 0
      heroSection.style.setProperty('--scroll-opacity', `${1 - progress}`);

      // Gradient mixing rgba(247,251,255,0.45) mixed with rgba(31,31,31,0.18)
      const topAlpha = progress * 0.55;
      const btmAlpha = progress * 0.25;
      heroSection.style.setProperty('--scroll-overlay', `linear-gradient(to bottom, rgba(247,251,255,${topAlpha}), rgba(31,31,31,${btmAlpha}))`);
    });
  }

  // --- Legal Page Tab System Logic ---
  const mainTabs = document.querySelectorAll('.main-tab');
  const subTabs = document.querySelectorAll('.sub-tab-btn');

  if (mainTabs.length > 0) {
    mainTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        // Switch Main Tabs
        mainTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Switch Main Content
        document.querySelectorAll('.legal-content-wrapper').forEach(wrapper => {
          wrapper.classList.remove('active-content');
        });
        document.getElementById(targetId).classList.add('active-content');
      });
    });
  }
});
