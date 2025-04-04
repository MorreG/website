const buttons = document.querySelectorAll('.read-more-btn');
const submitButton = document.querySelector('.submit-button')

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
    });
});

submitButton.addEventListener('mousemove', (e) => {
    const rect = submitButton.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    submitButton.style.setProperty('--x', x + 'px');
    submitButton.style.setProperty('--y', y + 'px');
});