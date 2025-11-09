// Feedback Form Validation
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateFeedback();
    });
}

function validateFeedback() {
    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const bookingId = document.getElementById('bookingId').value.trim();
    const rating = document.getElementById('rating').value;
    const category = document.getElementById('category').value;
    const message = document.getElementById('feedbackMessage').value.trim();

    // Name validation
    if (name === '') {
        alert('Please enter your name');
        document.getElementById('feedbackName').focus();
        return false;
    }

    if (name.length < 3) {
        alert('Name must be at least 3 characters');
        document.getElementById('feedbackName').focus();
        return false;
    }

    // Email validation
    if (email === '') {
        alert('Please enter your email address');
        document.getElementById('feedbackEmail').focus();
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('feedbackEmail').focus();
        return false;
    }

    // Rating validation
    if (rating === '') {
        alert('Please select a rating');
        document.getElementById('rating').focus();
        return false;
    }

    // Category validation
    if (category === '') {
        alert('Please select a feedback category');
        document.getElementById('category').focus();
        return false;
    }

    // Message validation
    if (message === '') {
        alert('Please share your feedback');
        document.getElementById('feedbackMessage').focus();
        return false;
    }

    if (message.length < 10) {
        alert('Feedback must be at least 10 characters');
        document.getElementById('feedbackMessage').focus();
        return false;
    }

    // Success
    alert('Thank you for your feedback! Your opinion helps us improve.');
    feedbackForm.reset();
    return true;
}
