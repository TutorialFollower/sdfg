// Create the dot
const dot = document.createElement('div');
dot.className = 'cursor-dot';
document.body.appendChild(dot);

// Style
dot.style.cssText = `
    width: 40px;
    height: 40px;
    background-color: #ff5722;
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999999;
    isolation:isolate /* Helps with visibility */
    will-change: transform;
`;

// Variables
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
let isMoving = false;
let moveTimeout;

// Track mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => isMoving = false, 50);
});

// Animation
function animate() {
    const lag = 0.1;
    currentX += (mouseX - currentX) * lag;
    currentY += (mouseY - currentY) * lag;
    
    const wobble = isMoving ? 2 : 0; // No wobble when stopped
    const wobbleX = Math.sin(Date.now() * 0.002) * wobble;
    const wobbleY = Math.cos(Date.now() * 0.002) * wobble;
    
    dot.style.transform = `translate(${currentX + wobbleX - 20}px, ${currentY + wobbleY - 20}px)`;
    requestAnimationFrame(animate);
}

animate();
