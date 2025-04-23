// Wait for further work - cross page functionality 

// Get the current page filename
const currentPage = window.location.pathname.split('/').pop();

// Select all navigation links
document.querySelectorAll('nav a').forEach(anchor => {
anchor.addEventListener('click', function(e) {
    // Parse the href into its components
    const href = this.getAttribute('href');
    const hrefParts = href.split('#');
    const targetPage = hrefParts[0] || currentPage;
    const targetSection = hrefParts[1];
    
    // If this is a link to a section on the current page
    if ((targetPage === currentPage || targetPage === '') && targetSection) {
    // Prevent default behavior
    e.preventDefault();
    
    // Find and scroll to the target element
    const targetElement = document.getElementById(targetSection);
    if (targetElement) {
        targetElement.scrollIntoView({
        behavior: 'smooth'
        });
        
        // Remove the fragment from URL after scrolling
        setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
        }, 10);
    }
    }
    // For links to other pages, let the default behavior handle it
});
});