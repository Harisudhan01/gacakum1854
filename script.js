window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');

            // Trigger content reveal animation
            if (mainContent) {
                mainContent.classList.remove('content-hidden');
                mainContent.classList.add('reveal-content');
            }

            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 800);
        }, 1200); // Buffer for premium feel
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 3000; // Change slide every 3 seconds

    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');

        // Calculate next slide index
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to next slide
        slides[currentSlide].classList.add('active');
    }

    // Start automatic sliding
    setInterval(nextSlide, slideInterval);

    // Number Counting Animation
    const statsSection = document.querySelector('.stats-strip');
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false; // Flag to ensure animation runs only once

    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    statNumbers.forEach(num => startCount(num));
                    started = true;
                }
            });
        }, { threshold: 0.3 }); // Start when 30% visible

        observer.observe(statsSection);
    }

    function startCount(el) {
        const target = parseInt(el.innerText);
        const duration = 2000; // 2 seconds
        const step = 20; // Update every 20ms
        const increment = target / (duration / step);
        let current = 0;

        // Reset to 0 before starting
        el.innerText = '0';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current);
            }
        }, step);
    }

    // Scroll Top Button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Sticky Navbar Script
    const navbar = document.querySelector('.nav-bar');
    if (navbar) {
        const sticky = navbar.offsetTop;

        window.onscroll = function () {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        };
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('.nav-bar');

    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', () => {
            navBar.classList.toggle('nav-active');
            // Change icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (navBar.classList.contains('nav-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Video Playback Logic
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        if (video) {
            item.addEventListener('click', () => {
                if (video.paused) {
                    // Pause other playing videos if any
                    document.querySelectorAll('video').forEach(v => {
                        v.pause();
                        v.parentElement.classList.remove('playing');
                    });
                    video.play();
                    item.classList.add('playing');
                } else {
                    video.pause();
                    item.classList.remove('playing');
                }
            });
        }
    });
});
