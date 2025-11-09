// Login Form Validation
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateLogin();
    });
}

function validateLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Email validation
    if (email === '') {
        alert('Please enter your email address');
        document.getElementById('email').focus();
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('email').focus();
        return false;
    }

    // Password validation
    if (password === '') {
        alert('Please enter your password');
        document.getElementById('password').focus();
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        document.getElementById('password').focus();
        return false;
    }

    // Success - redirect to index.html
    window.location.href = 'index.html';

    return true;
};
