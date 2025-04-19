const pois = document.querySelectorAll('.poi');

pois.forEach(poi => {
    poi.addEventListener('mouseenter', () => {
        createParticles(poi);
    });
});

// Function to create particle effects on POI hover
function createParticles(poi) {
    const numParticles = 8;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position around the POI
        const angle = Math.random() * Math.PI * 2;
        const distance = 15 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        
        // Random animation timing
        const duration = 0.5 + Math.random() * 1;
        const delay = Math.random() * 0.5;
        
        particle.style.animation = `sparkle ${duration}s ${delay}s ease-out`;
        
        poi.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode === poi) {
                poi.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
}