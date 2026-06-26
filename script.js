// Smooth scroll behavior for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');

        if (targetId?.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add animation on scroll for project cards and about section
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.about-profile, .about-content').forEach(section => {
    observer.observe(section);
});

// Auto-rotating media carousel on the project detail page
const carousel = document.querySelector('[data-carousel]');

if (carousel) {
    const images = Array.from(carousel.querySelectorAll('.carousel-image'));
    const prevButton = carousel.querySelector('.carousel-btn.prev');
    const nextButton = carousel.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    let autoRotateTimer;

    const showImage = (index) => {
        currentIndex = (index + images.length) % images.length;
        images.forEach((image, imageIndex) => {
            image.classList.toggle('active', imageIndex === currentIndex);
        });
    };

    const startAutoRotate = () => {
        clearInterval(autoRotateTimer);
        autoRotateTimer = setInterval(() => showImage(currentIndex + 1), 3000);
    };

    if (images.length > 1) {
        showImage(0);
        startAutoRotate();

        prevButton?.addEventListener('click', () => {
            showImage(currentIndex - 1);
            startAutoRotate();
        });

        nextButton?.addEventListener('click', () => {
            showImage(currentIndex + 1);
            startAutoRotate();
        });

        const lightbox = document.querySelector('.image-lightbox');
        const lightboxImage = lightbox?.querySelector('#lightbox-image');
        const lightboxClose = lightbox?.querySelector('.lightbox-close');

        const closeLightbox = () => {
            lightbox?.classList.remove('active');
        };

        const openLightbox = (image) => {
            if (!lightbox || !lightboxImage) return;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add('active');
        };

        images.forEach(image => {
            image.addEventListener('click', () => openLightbox(image));
        });

        lightboxClose?.addEventListener('click', closeLightbox);
        lightbox?.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeLightbox();
            }
        });
    }
}
