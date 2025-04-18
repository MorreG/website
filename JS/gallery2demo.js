document.addEventListener('DOMContentLoaded', function() {
    // Find all galleries on the page
    const galleries = document.querySelectorAll('.s-gallery');
    
    // Initialize each gallery independently
    galleries.forEach(gallery => {
        initGallery(gallery);
    });
    
    function initGallery(galleryContainer) {
        // Find elements within this specific gallery
        const galleryItemsContainer = galleryContainer.querySelector('.s-gallery-container');
        const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
        const prevButton = galleryContainer.querySelector('.five-gallery-prev');
        const nextButton = galleryContainer.querySelector('.five-gallery-next');
        const dots = galleryContainer.querySelectorAll('.gallery-dot');
        
        // Check if we have gallery items - if not, don't initialize this gallery
        if (galleryItems.length === 0) {
            console.warn('Gallery container found but no gallery items within it');
            return;
        }
        
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Function to show the current slide for this gallery
        function showSlide(index) {
            // Validate index bounds
            if (index >= galleryItems.length) {
                index = 0;
            } else if (index < 0) {
                index = galleryItems.length - 1;
            }
            
            // Remove active class from all items
            galleryItems.forEach(item => {
                if (item) item.classList.remove('active');
            });
            
            // Add active class to current item
            if (galleryItems[index]) {
                galleryItems[index].classList.add('active');
            } else {
                console.error('Gallery item at index', index, 'not found');
            }
            
            // Handle dots if they exist
            if (dots.length > 0) {
                // Remove active class from all dots
                dots.forEach(dot => {
                    if (dot) dot.classList.remove('active');
                });
                
                // Add active class to current dot if it exists
                if (index < dots.length && dots[index]) {
                    dots[index].classList.add('active');
                }
            }
            
            currentIndex = index;
        }
        
        // Previous button click
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = galleryItems.length - 1;
                }
                showSlide(currentIndex);
            });
        }
        
        // Next button click
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex++;
                if (currentIndex >= galleryItems.length) {
                    currentIndex = 0;
                }
                showSlide(currentIndex);
            });
        }
        
        // Dot click for this gallery
        dots.forEach((dot) => {
            if (dot) {
                dot.addEventListener('click', function() {
                    const dotIndex = this.getAttribute('data-index') ? 
                        parseInt(this.getAttribute('data-index')) : 0;
                    
                    if (isNaN(dotIndex) || dotIndex < 0 || dotIndex >= galleryItems.length) {
                        console.error('Invalid dot index:', dotIndex);
                        return;
                    }
                    
                    showSlide(dotIndex);
                });
            }
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
        
        // Attach swipe events to the gallery items container instead of the whole gallery
        const swipeContainer = galleryItemsContainer || galleryContainer;
        
        swipeContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        swipeContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        // Initialize first slide
        showSlide(currentIndex);
    }
});