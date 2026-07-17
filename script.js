/* ==========================================
   JavaScript Functionality & Interactions
   Project: Mobile Apps Development Portfolio
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header scroll effect
    const header = document.querySelector('.navbar-header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }


    // 3. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const startCounter = (stat) => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const speed = 100; // time in ms to complete
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                if (isDecimal) {
                    stat.innerText = count.toFixed(1);
                } else {
                    stat.innerText = Math.ceil(count);
                }
                setTimeout(updateCount, 15);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    };

    // Intersection Observer for Stats
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => startCounter(stat));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }


    // 4. Update Hero Phone Image on Portfolio Hover (Premium Touch)
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const heroPhoneImg = document.querySelector('.active-phone-img');

    if (portfolioCards && heroPhoneImg) {
        portfolioCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const newSrc = card.getAttribute('data-screenshot');
                if (newSrc) {
                    heroPhoneImg.style.opacity = '0';
                    setTimeout(() => {
                        heroPhoneImg.setAttribute('src', newSrc);
                        heroPhoneImg.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }


    // 5. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card styles
                card.style.transition = 'all 0.4s ease';

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });


    // 6. Modals (Detail Views)
    const openButtons = document.querySelectorAll('.open-modal-btn');
    const modals = document.querySelectorAll('.app-modal');
    const closeButtons = document.querySelectorAll('.modal-close-btn');
    const backdrops = document.querySelectorAll('.modal-backdrop');

    // Open Modal
    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-app');
            const targetModal = document.getElementById(modalId);
            
            if (targetModal) {
                targetModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Disable scroll
                setTimeout(() => {
                    targetModal.classList.add('active');
                }, 10);
            }
        });
    });

    // Close Modal Function
    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scroll
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    // Close on Click Close Button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.app-modal');
            closeModal(modal);
        });
    });

    // Close on Click Backdrop
    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            const modal = backdrop.closest('.app-modal');
            closeModal(modal);
        });
    });

    // Close on ESC Key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.app-modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });


    // 7. Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerText = 'جاري إرسال طلبك... ⌛';
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';

            // Simulate server request
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                
                // Show Success
                formStatus.innerText = 'شكراً لتواصلك معنا! لقد تم استلام استفسارك بنجاح وسيتواصل معك مستشارنا التقني قريباً.';
                formStatus.classList.add('success');
                
                // Reset form
                contactForm.reset();
            }, 1500);
        });
    }


    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Modal Screenshots Gallery
    const modalContainers = document.querySelectorAll('.app-modal');
    modalContainers.forEach(modal => {
        const thumbBtns = modal.querySelectorAll('.thumb-btn');
        const screens = modal.querySelectorAll('.modal-screenshot-img');

        thumbBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetIndex = btn.getAttribute('data-index');

                // Reset active states for this modal's thumbs
                thumbBtns.forEach(tb => tb.classList.remove('active'));
                btn.classList.add('active');

                // Reset active screens
                screens.forEach(screen => {
                    if (screen.getAttribute('data-index') === targetIndex) {
                        screen.classList.add('active');
                    } else {
                        screen.classList.remove('active');
                    }
                });
            });
        });
    });
});
