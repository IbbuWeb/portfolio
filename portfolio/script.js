/*==================== TOGGLE ICON NAVBAR ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*==================== STICKY NAVBAR ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 100);

    /*==================== REMOVE TOGGLE ICON AND NAVBAR WHEN CLICK NAVBAR LINK (SCROLL) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== SMOOTH SCROLL FOR NAVBAR LINKS ====================*/
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); // Prevent default jump behavior
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
        
                    if (targetElement) {
                        // Adjust scroll position to account for the fixed header
                        const headerOffset = document.querySelector('.header').offsetHeight;
                        // Use getBoundingClientRect for more accurate position relative to the viewport, then add current scrollY for absolute document position
                        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                        const offsetPosition = elementPosition - headerOffset;
        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
        // Close mobile menu if open
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});


/*==================== NOISE/PARTICLE BACKGROUND ANIMATION ====================*/
const noiseCanvas = document.getElementById('noise-canvas');
const noiseCtx = noiseCanvas.getContext('2d');

let noiseParticlesArray;

// Set canvas dimensions
function setNoiseCanvasSize() {
    noiseCanvas.width = window.innerWidth;
    noiseCanvas.height = window.innerHeight;
}
setNoiseCanvasSize();

// Particle class for noise background
class NoiseParticle {
    constructor() {
        this.x = Math.random() * noiseCanvas.width;
        this.y = Math.random() * noiseCanvas.height;
        this.size = Math.random() * 1 + 1; // 1 to 2px
        this.speedX = (Math.random() * 0.4) - 0.2; // -0.2 to 0.2
        this.speedY = (Math.random() * 0.4) - 0.2; // -0.2 to 0.2
        this.opacity = Math.random() * (0.25 - 0.08) + 0.08; // 0.08 to 0.25
        this.color = `rgba(255, 255, 255, ${this.opacity})`; // Soft white/gray
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = noiseCanvas.width;
        if (this.x > noiseCanvas.width) this.x = 0;
        if (this.y < 0) this.y = noiseCanvas.height;
        if (this.y > noiseCanvas.height) this.y = 0;
    }
    draw() {
        noiseCtx.fillStyle = this.color;
        noiseCtx.beginPath();
        noiseCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2); // Divide by 2 for radius
        noiseCtx.fill();
    }
}

// Create particle array
function initNoiseParticles() {
    noiseParticlesArray = [];
    const numberOfParticles = (noiseCanvas.width * noiseCanvas.height) / 10000; // Adjust density as needed
    for (let i = 0; i < numberOfParticles; i++) {
        noiseParticlesArray.push(new NoiseParticle());
    }
}

// Animation loop
function animateNoiseParticles() {
    noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);
    for (let i = 0; i < noiseParticlesArray.length; i++) {
        noiseParticlesArray[i].update();
        noiseParticlesArray[i].draw();
    }
    requestAnimationFrame(animateNoiseParticles);
}

// Event listeners for responsiveness
window.addEventListener('resize', () => {
    setNoiseCanvasSize();
    initNoiseParticles();
});

// Initialize and start animation
initNoiseParticles();
animateNoiseParticles();


