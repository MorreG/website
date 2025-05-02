document.addEventListener('DOMContentLoaded', function() {
    // Find all galleries on the page
    const galleries = document.querySelectorAll('.s-gallery');
    
    // Initialize each gallery independently
    galleries.forEach(gallery => {
        initGallery(gallery);
    });
    
    // Find all scroll-to-gallery buttons on the page
    const scrollButtons = document.querySelectorAll('.poi');
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the target gallery ID and slide index from data attributes
            const galleryId = this.getAttribute('data-gallery-id');
            const slideIndex = parseInt(this.getAttribute('data-slide-index') || 0);
            
            // Find the target gallery
            const targetGallery = document.getElementById(galleryId);
            
            if (!targetGallery) {
                console.error(`Gallery with ID ${galleryId} not found`);
                return;
            }
            
            // Scroll to the gallery with smooth animation
            targetGallery.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // After scroll completes, show the desired slide
            setTimeout(() => {
                // Find the gallery container within the target
                const gallery = targetGallery.querySelector('.s-gallery');
                if (!gallery) {
                    console.error('Gallery container not found within target element');
                    return;
                }
                
                // Dispatch a custom event to the gallery to change slides
                const changeSlideEvent = new CustomEvent('changeSlide', {
                    detail: { slideIndex: slideIndex }
                });
                gallery.dispatchEvent(changeSlideEvent);
            }, 800); // Adjust timing as needed for scroll duration
        });
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
        
        // Function to show the current slide for this gallery
        function showSlide(index) {
            // Validate index bounds
            if (index >= galleryItems.length) {
                index = 0;
            } else if (index < 0) {
                index = galleryItems.length - 1;
            }
            
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
        
        // Add event listener for the custom changeSlide event
        galleryContainer.addEventListener('changeSlide', function(e) {
            const targetIndex = e.detail.slideIndex;
            showSlide(targetIndex);
        });
        
        // Initialize first slide
        showSlide(currentIndex);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Simple button click handler
    const farilaPoi = document.querySelector('a[href="#stockholm"]');
    
    if (farilaPoi) {
      farilaPoi.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 1. Scroll to the Stockholm gallery section
        const stockholmGallery = document.getElementById('stockholm');
        if (stockholmGallery) {
          stockholmGallery.scrollIntoView({ behavior: 'smooth' });
        }
        
        // 2. Show the correct slide after a slight delay
        const targetSlideIndex = 2; // Adjust this index as needed for the Färila slide
        
        // Add delay before sliding (500ms = 0.5 seconds, adjust as needed)
        setTimeout(function() {
          // Find gallery elements
          const galleryContainer = document.querySelector('.s-gallery-container');
          const dots = document.querySelectorAll('.gallery-dot');
          
          // Move container to show the target slide
          if (galleryContainer) {
            galleryContainer.style.transform = `translateX(-${targetSlideIndex * 100}%)`;
          }
          
          // Update active dot
          if (dots.length > targetSlideIndex) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[targetSlideIndex].classList.add('active');
          }
        }, 500); // 500ms delay - adjust this value as needed
      });
    }
  });