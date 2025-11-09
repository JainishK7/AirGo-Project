// Insurance Claim Form Validation
const insuranceClaimForm = document.getElementById('insuranceClaimForm');
if (insuranceClaimForm) {
    insuranceClaimForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateInsuranceClaim();
    });
}

function validateInsuranceClaim() {
    const policyNumber = document.getElementById('policyNumber').value.trim();
    const claimType = document.getElementById('claimType').value;
    const name = document.getElementById('claimName').value.trim();
    const email = document.getElementById('claimEmail').value.trim();
    const phone = document.getElementById('claimPhone').value.trim();
    const incidentDate = document.getElementById('incidentDate').value;
    const claimAmount = document.getElementById('claimAmount').value;
    const description = document.getElementById('claimDescription').value.trim();

    // Policy number validation
    if (policyNumber === '') {
        alert('Please enter your policy number');
        document.getElementById('policyNumber').focus();
        return false;
    }

    if (policyNumber.length < 5) {
        alert('Policy number must be at least 5 characters');
        document.getElementById('policyNumber').focus();
        return false;
    }

    // Claim type validation
    if (claimType === '') {
        alert('Please select claim type');
        document.getElementById('claimType').focus();
        return false;
    }

    // Name validation
    if (name === '') {
        alert('Please enter your name');
        document.getElementById('claimName').focus();
        return false;
    }

    if (name.length < 3) {
        alert('Name must be at least 3 characters');
        document.getElementById('claimName').focus();
        return false;
    }

    // Email validation
    if (email === '') {
        alert('Please enter your email address');
        document.getElementById('claimEmail').focus();
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('claimEmail').focus();
        return false;
    }

    // Phone validation
    if (phone === '') {
        alert('Please enter your phone number');
        document.getElementById('claimPhone').focus();
        return false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        document.getElementById('claimPhone').focus();
        return false;
    }

    // Incident date validation
    if (incidentDate === '') {
        alert('Please select incident date');
        document.getElementById('incidentDate').focus();
        return false;
    }

    const today = new Date();
    const selectedDate = new Date(incidentDate);

    if (selectedDate > today) {
        alert('Incident date cannot be in the future');
        document.getElementById('incidentDate').focus();
        return false;
    }

    // Claim amount validation
    if (claimAmount === '' || claimAmount <= 0) {
        alert('Please enter a valid claim amount');
        document.getElementById('claimAmount').focus();
        return false;
    }

    // Description validation
    if (description === '') {
        alert('Please describe the incident');
        document.getElementById('claimDescription').focus();
        return false;
    }

    if (description.length < 20) {
        alert('Description must be at least 20 characters');
        document.getElementById('claimDescription').focus();
        return false;
    }

    // Success
    alert('Your claim has been submitted successfully!\nPolicy Number: ' + policyNumber + '\nClaim Amount: ₹' + claimAmount);
    insuranceClaimForm.reset();
    return true;
}
