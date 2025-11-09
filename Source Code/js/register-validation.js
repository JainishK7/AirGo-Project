// Get form and all input elements
const form = document.getElementById('registerForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const dob = document.getElementById('dob');
const gender = document.getElementById('gender');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const termsAccepted = document.getElementById('termsAccepted');

const togglePasswordBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const passwordStrength = document.getElementById('passwordStrength');
const pwStrengthText = document.getElementById('pwStrengthText');

const validationModal = document.getElementById('validationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const errorList = document.getElementById('errorList');
const successAlert = document.getElementById('successAlert');

// Safe guards: if any element missing, don't break (graceful)
if (!form) throw new Error('registerForm not found in DOM.');

// Password visibility toggle
togglePasswordBtn.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
});

// Password strength indicator
password.addEventListener('input', function() {
    const val = password.value;
    // Reset classes
    passwordStrength.classList.remove('strength-weak','strength-medium','strength-strong');
    pwStrengthText.textContent = '—';

    if (val.length === 0) {
        return;
    }

    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[a-z]/.test(val) && /[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^a-zA-Z0-9]/.test(val)) strength++;

    if (strength <= 1) {
        passwordStrength.classList.add('strength-weak');
        pwStrengthText.textContent = 'Very Weak';
    } else if (strength === 2) {
        passwordStrength.classList.add('strength-weak');
        pwStrengthText.textContent = 'Weak';
    } else if (strength === 3) {
        passwordStrength.classList.add('strength-medium');
        pwStrengthText.textContent = 'Medium';
    } else {
        passwordStrength.classList.add('strength-strong');
        pwStrengthText.textContent = 'Strong';
    }
});

// Set max DOB (18+)
(function setMaxDOB() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    if (dob) dob.setAttribute('max', maxDate.toISOString().split('T')[0]);
})();

// Prevent numbers in names
firstName.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
});
lastName.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
});

// Only numbers in mobile (allow + and spaces/hyphen)
mobile.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9+\s-]/g, '');
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const errors = [];
    const today = new Date();

    // First Name
    const firstNameVal = firstName.value.trim();
    if (!firstNameVal) {
        errors.push('Enter Your valid Name.');
    } else if (firstNameVal.length < 2) {
        errors.push('First Name must be at least 2 characters.');
    } else if (!/^[a-zA-Z\s]+$/.test(firstNameVal)) {
        errors.push('First Name can only contain letters.');
    }

    // Last Name
    const lastNameVal = lastName.value.trim();
    if (!lastNameVal) {
        errors.push('Last Name is required.');
    } else if (lastNameVal.length < 2) {
        errors.push('Last Name must be at least 2 characters.');
    } else if (!/^[a-zA-Z\s]+$/.test(lastNameVal)) {
        errors.push('Last Name can only contain letters.');
    }

    // Email
    const emailVal = email.value.trim();
    if (!emailVal) {
        errors.push('You must enter a valid email address.');
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVal)) {
        errors.push('Email format is invalid (e.g., user@example.com).');
    }

    // Mobile
    const mobileVal = mobile.value.trim().replace(/[\s+-]/g, '');
    if (!mobileVal) {
        errors.push('Mobile Number is required.');
    } else if (!/^[6-9]\d{9}$/.test(mobileVal)) {
        errors.push('Mobile must be 10 digits starting with 0-9.');
    }

    // DOB
    if (!dob.value) {
        errors.push('Date of Birth is required.');
    } else {
        const birthDate = new Date(dob.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            errors.push('You must be at least 18 years old.');
        }
    }

    // Gender
    if (!gender.value) {
        errors.push('Select Gender.');
    }

    // Password
    const passwordVal = password.value;
    if (!passwordVal) {
        errors.push('You must enter a valid Password min 8 char.');
    } else if (passwordVal.length < 8) {
        errors.push('Password must be at least 8 characters.');
    } else {
        if (!/[a-z]/.test(passwordVal)) errors.push('Password must have lowercase letter.');
        if (!/[A-Z]/.test(passwordVal)) errors.push('Password must have uppercase letter.');
        if (!/[0-9]/.test(passwordVal)) errors.push('Password must have a number.');
        if (!/[^a-zA-Z0-9]/.test(passwordVal)) errors.push('Password must have special character.');
    }

    // Confirm Password
    if (!confirmPassword.value) {
        errors.push('Confirm Password is required.');
    } else if (confirmPassword.value !== passwordVal) {
        errors.push('Passwords do not match.');
    }

    // Terms
    if (!termsAccepted.checked) {
        errors.push('You must accept Terms & Conditions.');
    }

    // Show modal if errors
    if (errors.length > 0) {
        showValidationModal(errors);
        return false;
    }

    // Success - show alert and redirect
    successAlert.textContent = `✅ Registration Successful! Welcome to AirGo, ${firstNameVal} ${lastNameVal}! Redirecting to login...`;
    successAlert.classList.remove('d-none');
    // small delay to show message, then redirect
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1200);

    return true;
});

// Show modal function
function showValidationModal(errors) {
    errorList.innerHTML = '';
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);
    });

    validationModal.style.display = 'block';
    validationModal.setAttribute('aria-hidden','false');
}

// Close modal
closeModalBtn.addEventListener('click', function() {
    validationModal.style.display = 'none';
    validationModal.setAttribute('aria-hidden','true');
});

// Close on outside click
window.addEventListener('click', function(event) {
    if (event.target === validationModal) {
        validationModal.style.display = 'none';
        validationModal.setAttribute('aria-hidden','true');
    }
});
