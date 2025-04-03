
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.five-gallery-container');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.five-gallery-prev');
    const nextButton = document.querySelector('.five-gallery-next');
    const dots = document.querySelectorAll('.gallery-dot');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Function to show the current slide
    function showSlide(index) {
        galleryItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        galleryItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index; // Uppdatera currentIndex här
    }

    // Previous button click
    prevButton.addEventListener('click', function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = galleryItems.length - 1;
        }
        showSlide(currentIndex);
    });

    // Next button click
    nextButton.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex >= galleryItems.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    });

    // Dot click
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            showSlide(parseInt(this.getAttribute('data-index')));
        });
    });

    // Swipe functionality
    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;
        const threshold = 50;

        if (swipeDistance > threshold) {
            currentIndex++;
            if (currentIndex >= galleryItems.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        } else if (swipeDistance < -threshold) {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = galleryItems.length - 1;
            }
            showSlide(currentIndex);
        }
    }

    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // Initialize first slide
    showSlide(currentIndex);
});