// Car Search Form Validation
const carSearchForm = document.getElementById('carSearchForm');
if (carSearchForm) {
    carSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateCarSearch();
    });
}

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const pickupDateField = document.getElementById('pickupDate');
    const returnDateField = document.getElementById('returnDate');
    
    if (pickupDateField) {
        pickupDateField.setAttribute('min', today);
    }
    if (returnDateField) {
        returnDateField.setAttribute('min', today);
    }
});

function validateCarSearch() {
    const pickupLocation = document.getElementById('pickupLocation').value.trim();
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const carType = document.getElementById('carType').value;

    // Pickup location validation
    if (pickupLocation === '') {
        alert('Please enter pickup location');
        document.getElementById('pickupLocation').focus();
        return false;
    }

    if (pickupLocation.length < 3) {
        alert('Pickup location must be at least 3 characters');
        document.getElementById('pickupLocation').focus();
        return false;
    }

    // Pickup date validation
    if (pickupDate === '') {
        alert('Please select pickup date');
        document.getElementById('pickupDate').focus();
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedPickupDate = new Date(pickupDate);

    if (selectedPickupDate < today) {
        alert('Pickup date cannot be in the past');
        document.getElementById('pickupDate').focus();
        return false;
    }

    // Return date validation
    if (returnDate === '') {
        alert('Please select return date');
        document.getElementById('returnDate').focus();
        return false;
    }

    const selectedReturnDate = new Date(returnDate);

    if (selectedReturnDate <= selectedPickupDate) {
        alert('Return date must be after pickup date');
        document.getElementById('returnDate').focus();
        return false;
    }

    // Car type validation
    if (carType === '') {
        alert('Please select car type');
        document.getElementById('carType').focus();
        return false;
    }

    // Success
    alert('Searching for ' + carType + ' cars in ' + pickupLocation + '...\nPickup: ' + pickupDate + '\nReturn: ' + returnDate);
    return true;
}
