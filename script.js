// Preloader Function
function myFunction() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500); // Adjust timing to match your GIF duration
}

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupMobileMenu();
});

// Smooth Scroll & Active Link Handling
function setupNavigation() {
    const navList = document.querySelectorAll(".navbar-item a");
    const burger = document.getElementById("burger");
    const navItems = document.getElementById("navbar");

    navList.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default jump
            
            // Remove active class from all links
            navList.forEach(item => item.classList.remove("active"));

            // Add active class to clicked link
            this.classList.add("active");

            // Smooth scroll to section
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjust for navbar height
                    behavior: "smooth"
                });
            }

            // Close mobile menu after clicking
            if (window.innerWidth <= 1024) {
                navItems.classList.remove("active");
                burger.classList.remove("open");
                burger.innerHTML = `<i class="fa-solid fa-bars"></i>`; // Reset to burger icon
            }
        });
    });
}

// Mobile & Tablet Menu Toggle
function setupMobileMenu() {
    const burger = document.getElementById("burger");
    const navItems = document.getElementById("navbar");

    burger.addEventListener("click", () => {
        navItems.classList.toggle("active");
        burger.classList.toggle("open");

        if (burger.classList.contains("open")) {
            burger.innerHTML = `<i class="fa-solid fa-times"></i>`; // Show close icon (✖)
        } else {
            burger.innerHTML = `<i class="fa-solid fa-bars"></i>`; // Show burger icon (☰)
        }
    });
}


// Initialize all functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Directly set up form event listener
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Your existing validateForm logic will handle validation
            // If validateForm returns false, submission will be prevented
            return validateForm();
        });
    }
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const successDiv = document.getElementById('success');

    // Reset previous messages
    successDiv.textContent = '';

    // Basic validation
    if (name === '' || email === '' || subject === '' || message === '') {
        successDiv.textContent = 'Please fill in all fields';
        successDiv.style.color = 'red';
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        successDiv.textContent = 'Please enter a valid email address';
        successDiv.style.color = 'red';
        return false;
    }

    // If validation passes, show success message
    successDiv.textContent = 'Message sent successfully!';
    successDiv.style.color = 'green';
    return true;
}

// Track form submission state
let submitted = false;

function resetForm() {
    if (submitted) {
        document.getElementById('contact-form').reset();
        document.getElementById('success').textContent = '';
        submitted = false;
    }
}