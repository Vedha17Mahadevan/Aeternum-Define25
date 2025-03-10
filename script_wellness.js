// Add smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll function
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                document.getElementById('menu-toggle').checked = false;
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Smooth scroll to target with offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', highlightActiveSection);
    
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        const offset = document.querySelector('header').offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const offset = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${offset * 0.5}px`;
        }
    });
});

// Open calm music in a new window
function openCalmMusic() {
    window.open("https://youtu.be/FaRrq7cYu84?feature=shared", "_blank");
}

// Navigate to chatbot page
function openChatbot() {
    // Create animated transition
    const transition = document.createElement('div');
    transition.classList.add('page-transition');
    document.body.appendChild(transition);
    
    // Wait for animation to finish before redirecting
    setTimeout(() => {
        window.location.href = "https://afa2c21279b7b06950.gradio.live";  // Replace with actual chatbot URL
    }, 500);
}

// Add CSS for page transition
const style = document.createElement('style');
style.innerHTML = `
    .page-transition {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--primary);
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        animation: fadeIn 0.5s forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Add intersection observer for revealing elements on scroll
const revealElements = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.grid > div, .section-header, .guru-container > div');
    elements.forEach(element => {
        element.classList.add('reveal-element');
        revealOnScroll.observe(element);
    });
};

// Add CSS for reveal animations
const revealStyle = document.createElement('style');
revealStyle.innerHTML = `
    .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// Initialize reveal animations after page load
window.addEventListener('load', revealElements);
