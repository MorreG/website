// Select all links that point to sections within the page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add click event listener to each link
    anchor.addEventListener('click', function(e) {
        // Prevent default behavior (which would update URL)
        e.preventDefault();
        
        // Get the target section ID from the href attribute
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        // If the target element exists, scroll to it
        if (targetElement) {
        // Smooth scroll to the element
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
        
        // After scrolling is complete, remove the fragment from URL
        // Using setTimeout to ensure this happens after the scroll
        setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 10); // Small timeout to ensure scrolling has initiated
        }
    });
    });