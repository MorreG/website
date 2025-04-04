let lastScroll = 0;
let scrollThreshold = 100;    // When to switch to transparent
let hideThreshold = 500;      // Increased threshold for hiding navbar
let scrollDelta = 50;         // Minimum scroll difference to trigger hide/show

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('nav');
    
    // Determine if we're at the top
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('hidden');
        return;
    }
    
    // Add transparency after scrolling past threshold
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Only hide/show if we've scrolled significantly
    if (Math.abs(currentScroll - lastScroll) > scrollDelta) {
        if (currentScroll > lastScroll && currentScroll > hideThreshold) {
            // Scrolling down & past hide threshold
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    }
});