// Hotel Search Form Validation
const hotelSearchForm = document.getElementById('hotelSearchForm');
if (hotelSearchForm) {
    hotelSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateHotelSearch();
    });
}

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const checkInField = document.getElementById('checkIn');
    const checkOutField = document.getElementById('checkOut');
    
    if (checkInField) {
        checkInField.setAttribute('min', today);
    }
    if (checkOutField) {
        checkOutField.setAttribute('min', today);
    }
});

function validateHotelSearch() {
    const destination = document.getElementById('destination').value.trim();
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const rooms = document.getElementById('rooms').value;
    const guests = document.getElementById('guests').value;

    // Destination validation
    if (destination === '') {
        alert('Please enter destination');
        document.getElementById('destination').focus();
        return false;
    }

    if (destination.length < 3) {
        alert('Destination must be at least 3 characters');
        document.getElementById('destination').focus();
        return false;
    }

    // Check-in date validation
    if (checkIn === '') {
        alert('Please select check-in date');
        document.getElementById('checkIn').focus();
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn);

    if (checkInDate < today) {
        alert('Check-in date cannot be in the past');
        document.getElementById('checkIn').focus();
        return false;
    }

    // Check-out date validation
    if (checkOut === '') {
        alert('Please select check-out date');
        document.getElementById('checkOut').focus();
        return false;
    }

    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
        alert('Check-out date must be after check-in date');
        document.getElementById('checkOut').focus();
        return false;
    }

    // Rooms validation
    if (rooms < 1 || rooms > 10) {
        alert('Number of rooms must be between 1 and 10');
        document.getElementById('rooms').focus();
        return false;
    }

    // Guests validation
    if (guests < 1 || guests > 20) {
        alert('Number of guests must be between 1 and 20');
        document.getElementById('guests').focus();
        return false;
    }

    // Success
    alert('Searching for hotels in ' + destination + '...\nCheck-in: ' + checkIn + '\nCheck-out: ' + checkOut);
    return true;
}
