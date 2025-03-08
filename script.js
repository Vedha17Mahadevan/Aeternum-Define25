// Slideshow functionality
let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
let slideInterval;

// Initialize slideshow
function initSlideshow() {
    if (slides.length > 0) {
        showSlide(0);
        startSlideInterval();
        setupSlideControls();
        setupImageUpload();
    }
}

// Start automatic slide transition
function startSlideInterval() {
    // Clear any existing interval
    clearInterval(slideInterval);
    // Set new interval
    slideInterval = setInterval(function() {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

// Show specific slide
function showSlide(n) {
    // Reset index if out of bounds
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }
    
    // Hide all slides and remove active dots
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        if (dots[i]) dots[i].classList.remove("active-dot");
    }
    
    // Display current slide and highlight dot
    slides[slideIndex].style.display = "block";
    if (dots[slideIndex]) dots[slideIndex].classList.add("active-dot");
    
    // Reset interval timer when manually changing slides
    startSlideInterval();
}

// Navigate to next slide
function nextSlide() {
    showSlide(slideIndex + 1);
}

// Navigate to previous slide
function prevSlide() {
    showSlide(slideIndex - 1);
}

// Setup slide navigation controls
function setupSlideControls() {
    // Previous and Next buttons
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    
    if (prevBtn) prevBtn.addEventListener("click", function() {
        prevSlide();
    });
    
    if (nextBtn) nextBtn.addEventListener("click", function() {
        nextSlide();
    });
    
    // Dot indicators
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function() {
            showSlide(parseInt(this.getAttribute("data-slide")));
        });
    }
    
    // Keyboard navigation
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") {
            prevSlide();
        } else if (e.key === "ArrowRight") {
            nextSlide();
        }
    });
}

// Function to add a new slide (missing in the original code)
function addNewSlide(imageSrc, title, description) {
    // Get the slideshow container
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    // Create a new slide
    const newSlide = document.createElement('div');
    newSlide.className = 'mySlides fade';
    newSlide.innerHTML = `
        <img src="${imageSrc}" alt="${title}">
        <div class="hero-text">
            <h2>${title}</h2>
            <p>${description}</p>
        </div>
    `;
    
    // Add the new slide to the container
    slideshowContainer.insertBefore(newSlide, document.querySelector('.slide-controls'));
    
    // Create a new dot for the slide
    const dotsContainer = document.querySelector('.slide-indicators');
    const newDot = document.createElement('span');
    newDot.className = 'dot';
    newDot.setAttribute('data-slide', slides.length.toString());
    dotsContainer.appendChild(newDot);
    
    // Update slides and dots arrays
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    
    // Refresh slide controls
    setupSlideControls();
    
    // Show the new slide
    showSlide(slides.length - 1);
}

// Setup image upload functionality
function setupImageUpload() {
    const uploadInput = document.getElementById("slide-upload");
    const previewContainer = document.querySelector(".upload-preview");
    
    if (uploadInput) {
        uploadInput.addEventListener("change", function() {
            const file = this.files[0];
            
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Create preview
                    previewContainer.innerHTML = `
                        <img src="${e.target.result}" alt="Upload Preview">
                        <div class="upload-actions">
                            <button id="confirm-upload" class="upload-action-btn">Add to Slideshow</button>
                            <button id="cancel-upload" class="upload-action-btn">Cancel</button>
                        </div>
                    `;
                    
                    // Setup confirmation buttons
                    document.getElementById("confirm-upload").addEventListener("click", function() {
                        addNewSlide(e.target.result, "New Slide", "Custom slide description");
                        previewContainer.innerHTML = "";
                    });
                    
                    document.getElementById("cancel-upload").addEventListener("click", function() {
                        previewContainer.innerHTML = "";
                    });
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
}

// Call the initSlideshow function when the page loads
document.addEventListener('DOMContentLoaded', initSlideshow);