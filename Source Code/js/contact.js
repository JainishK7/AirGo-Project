// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateContact();
    });
}

function validateContact() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Name validation
    if (name === '') {
        alert('Please enter your name');
        document.getElementById('contactName').focus();
        return false;
    }

    if (name.length < 3) {
        alert('Name must be at least 3 characters');
        document.getElementById('contactName').focus();
        return false;
    }

    // Email validation
    if (email === '') {
        alert('Please enter your email address');
        document.getElementById('contactEmail').focus();
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('contactEmail').focus();
        return false;
    }

    // Phone validation
    if (phone === '') {
        alert('Please enter your phone number');
        document.getElementById('contactPhone').focus();
        return false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        document.getElementById('contactPhone').focus();
        return false;
    }

    // Subject validation
    if (subject === '') {
        alert('Please enter a subject');
        document.getElementById('subject').focus();
        return false;
    }

    if (subject.length < 5) {
        alert('Subject must be at least 5 characters');
        document.getElementById('subject').focus();
        return false;
    }

    // Message validation
    if (message === '') {
        alert('Please enter your message');
        document.getElementById('message').focus();
        return false;
    }

    if (message.length < 10) {
        alert('Message must be at least 10 characters');
        document.getElementById('message').focus();
        return false;
    }

    // Success
    alert('Thank you for contacting us! We will get back to you soon.');
    contactForm.reset();
    return true;
}
