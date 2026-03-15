document.addEventListener("DOMContentLoaded", () => {
    // Intro Screen Fade Out
    const intro = document.querySelector(".intro");
    if (intro) {
        setTimeout(() => {
            intro.classList.add("hidden");
            setTimeout(() => intro.remove(), 1500);
        }, 3000);
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".menu");
    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            menu.classList.toggle("active");
        });
    }

    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll(".menu a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (hamburger && menu) {
                hamburger.classList.remove("active");
                menu.classList.remove("active");
            }
        });
    });

    // Scroll Observer for Active Nav and Fade animations
    const sections = document.querySelectorAll(".section");
    const menuItems = document.querySelectorAll(".menu li");
    const rightPanel = document.querySelector(".right-panel");

    const observerOptions = {
        root: rightPanel ? rightPanel : null,
        rootMargin: "0px",
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                if (menuItems.length > 0) {
                    menuItems.forEach(li => {
                        li.classList.remove("active");
                        const link = li.querySelector('a');
                        if (link && link.getAttribute('href') === `#${id}`) {
                            li.classList.add("active");
                        }
                    });
                }
                
                const fadeEls = entry.target.querySelectorAll('.fade-in');
                fadeEls.forEach(el => el.classList.add('visible'));
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        observer.observe(sec);
        // Prepare elements for fade in
        const fadeTriggers = sec.querySelectorAll('.section-title, .portfolio-item, .featured-item, .service-card, .about-container, .contact-container, .btn');
        fadeTriggers.forEach(el => el.classList.add('fade-in'));
    });

    // Lightbox Functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("close");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let images = [];
    let currentIndex = 0;

    // Attach click events dynamically on body for delegated events
    document.body.addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item') || e.target.closest('.featured-item') || e.target.closest('.photo');
        if (item && document.getElementById("lightbox")) {
            // Re-fetch in case of DOM elements loaded
            images = Array.from(document.querySelectorAll(".portfolio-item img, .featured-item img, .photo img"));
            const img = item.querySelector("img");
            if (!img) return;

            currentIndex = images.indexOf(img);
            if(currentIndex > -1) showLightbox(currentIndex);
        }
    });

    function showLightbox(index) {
        if (!lightbox) return;
        const img = images[index];
        if (!img) return;
        
        lightboxImg.src = img.src;
        
        const overlayTitle = img.parentElement.querySelector('.overlay h3');
        if (overlayTitle && lightboxCaption) {
            lightboxCaption.textContent = overlayTitle.textContent;
        } else if (lightboxCaption) {
            lightboxCaption.textContent = img.alt || "Cinematic Lens";
        }
        
        lightbox.classList.add("active");
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
    }

    if (lightbox) {
        lightbox.addEventListener("click", e => {
            if (e.target === lightbox) lightbox.classList.remove("active");
        });
    }

    function showNext() {
        if (images.length === 0) return;
        currentIndex = (currentIndex + 1) % images.length;
        showLightbox(currentIndex);
    }
    
    function showPrev() {
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showLightbox(currentIndex);
    }

    if (nextBtn) nextBtn.addEventListener("click", showNext);
    if (prevBtn) prevBtn.addEventListener("click", showPrev);

    document.addEventListener("keydown", (e) => {
        if (!lightbox || !lightbox.classList.contains("active")) return;
        if (e.key === "Escape") lightbox.classList.remove("active");
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });
});
