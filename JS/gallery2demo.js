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

        console.log(`Gallery initialized with ${galleryItems.length} items`);
        
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
            
            console.log(`Showing slide ${index}`);
            
            // Move the container to show the current slide
            galleryItemsContainer.style.transform = `translateX(-${index * 100}%)`;
            
            // Remove active class from all dots
            if (dots.length > 0) {
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
                console.log('Previous button clicked');
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
                console.log('Next button clicked');
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
                    
                    console.log(`Dot clicked for index ${dotIndex}`);
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

        // Add resize event listener to handle viewport changes
        window.addEventListener('resize', function() {
            // Force recalculation of slide position
            showSlide(currentIndex);
            
            // Make sure container width is correct
            const galleryWidth = galleryContainer.offsetWidth;
            galleryItems.forEach(item => {
                item.style.minWidth = galleryWidth + 'px';
                item.style.width = galleryWidth + 'px';
            });
        });
    
        // Initial size calculation
        const galleryWidth = galleryContainer.offsetWidth;
        galleryItems.forEach(item => {
            item.style.minWidth = galleryWidth + 'px';
            item.style.width = galleryWidth + 'px';
        });
        
        // Initialize first slide
        showSlide(currentIndex);

    }
});


// TEST -- Slide to IMG

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#stockholm"]');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const slideIndex = parseInt(link.getAttribute('data-index'));
            if (!isNaN(slideIndex)) {
                setTimeout(() => {
                    activateSlide(slideIndex);
                }, 300);
            }
        });
    });

    function activateSlide(index) {
        const galleryItems = document.querySelectorAll('#stockholm .gallery-item');
        const dots = document.querySelectorAll('#stockholm .gallery-dot');

        galleryItems.forEach(item => {
            item.classList.toggle('active', parseInt(item.getAttribute('data-index')) === index);
        });
        dots.forEach(dot => {
            dot.classList.toggle('active', parseInt(dot.getAttribute('data-index')) === index);
        });
    }
});
