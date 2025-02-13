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



document.addEventListener('DOMContentLoaded', () => {
    // Wait for config.js to load before initializing EmailJS
    setTimeout(() => {
        if (typeof CONFIG !== "undefined") {
            emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
        } else {
            console.error("Config file not loaded!");
        }
    }, 500);

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            sendEmail();
        });
    }
});

function sendEmail() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const successDiv = document.getElementById('success');

    // Reset previous messages
    successDiv.textContent = '';

    // Basic validation
    if (!name || !email || !subject || !message) {
        successDiv.textContent = 'Please fill in all fields';
        successDiv.style.color = 'red';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        successDiv.textContent = 'Please enter a valid email address';
        successDiv.style.color = 'red';
        return;
    }

    // Send email using EmailJS with hidden credentials
    emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
        name: name,
        email: email,
        subject: subject,
        message: message
    })
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        successDiv.textContent = "Message sent successfully!";
        successDiv.style.color = "green";

        // Reset form after submission
        document.getElementById("contact-form").reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.textContent = "";
        }, 3000);
    }, function(error) {
        console.log("FAILED...", error);
        successDiv.textContent = "Failed to send message. Try again!";
        successDiv.style.color = "red";
    });
}
