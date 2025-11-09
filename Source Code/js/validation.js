// Set minimum date to today when page loads
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const departDateField = document.getElementById('departDate');
    const returnDateField = document.getElementById('returnDate');
    
    if (departDateField) {
        departDateField.setAttribute('min', today);
    }
    if (returnDateField) {
        returnDateField.setAttribute('min', today);
    }
});

// Flight Search Form Validation (for both index and flights pages)
const flightSearchForm = document.getElementById('flightSearchForm');
const flightBookingForm = document.getElementById('flightBookingForm');

if (flightSearchForm) {
    flightSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateFlightSearch();
    });
}

if (flightBookingForm) {
    flightBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateFlightSearch();
    });
}

function validateFlightSearch() {
    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();
    const departDate = document.getElementById('departDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const tripType = document.getElementById('tripType').value;
    const passengers = document.getElementById('passengers').value;
    const travelClass = document.getElementById('class').value;

    // Validate trip type
    if (tripType === '') {
        alert('Please select a trip type');
        document.getElementById('tripType').focus();
        return false;
    }

    // Validate from city
    if (from === '') {
        alert('Please enter departure city');
        document.getElementById('from').focus();
        return false;
    }

    if (from.length < 3) {
        alert('Departure city must be at least 3 characters');
        document.getElementById('from').focus();
        return false;
    }

    // Validate to city
    if (to === '') {
        alert('Please enter arrival city');
        document.getElementById('to').focus();
        return false;
    }

    if (to.length < 3) {
        alert('Arrival city must be at least 3 characters');
        document.getElementById('to').focus();
        return false;
    }

    // Check if cities are different
    if (from.toLowerCase() === to.toLowerCase()) {
        alert('Departure and arrival cities cannot be the same');
        document.getElementById('to').focus();
        return false;
    }

    // Validate departure date
    if (departDate === '') {
        alert('Please select departure date');
        document.getElementById('departDate').focus();
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDepartDate = new Date(departDate);

    if (selectedDepartDate < today) {
        alert('Departure date cannot be in the past');
        document.getElementById('departDate').focus();
        return false;
    }

    // Validate return date for round trip
    if (tripType === 'round-trip') {
        if (returnDate === '') {
            alert('Please select return date for round trip');
            document.getElementById('returnDate').focus();
            return false;
        }

        const selectedReturnDate = new Date(returnDate);
        if (selectedReturnDate < selectedDepartDate) {
            alert('Return date cannot be before departure date');
            document.getElementById('returnDate').focus();
            return false;
        }

        if (selectedReturnDate.getTime() === selectedDepartDate.getTime()) {
            alert('Return date should be different from departure date');
            document.getElementById('returnDate').focus();
            return false;
        }
    }

    // Validate passengers
    if (passengers < 1 || passengers > 9) {
        alert('Number of passengers must be between 1 and 9');
        document.getElementById('passengers').focus();
        return false;
    }

    // Validate class
    if (travelClass === '') {
        alert('Please select a travel class');
        document.getElementById('class').focus();
        return false;
    }

    // If all validations pass
    alert('Searching for flights from ' + from + ' to ' + to + '...\nDeparture: ' + departDate + '\nPassengers: ' + passengers + '\nClass: ' + travelClass);
    return true;
}

// Update return date requirement based on trip type
const tripTypeField = document.getElementById('tripType');
if (tripTypeField) {
    tripTypeField.addEventListener('change', function() {
        const returnDateField = document.getElementById('returnDate');
        if (this.value === 'round-trip') {
            returnDateField.required = true;
        } else {
            returnDateField.required = false;
        }
    });
}
