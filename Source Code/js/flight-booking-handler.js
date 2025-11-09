// Parse URL parameters and populate flight summary
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get flight details from URL
    const flightNumber = urlParams.get('flight');
    const fromCity = urlParams.get('from');
    const toCity = urlParams.get('to');
    const date = urlParams.get('date');
    const depTime = urlParams.get('depTime');
    const arrTime = urlParams.get('arrTime');
    const airline = urlParams.get('airline');
    const price = parseInt(urlParams.get('price'));
    const passengers = parseInt(urlParams.get('passengers'));
    const duration = urlParams.get('duration');
    const flightClass = urlParams.get('class');
    
    // Update flight summary
    document.getElementById('summaryFrom').textContent = fromCity || 'Delhi';
    document.getElementById('summaryTo').textContent = toCity || 'Mumbai';
    document.getElementById('summaryDepTime').textContent = depTime || '10:00 AM';
    document.getElementById('summaryArrTime').textContent = arrTime || '12:15 PM';
    document.getElementById('summaryDuration').textContent = duration || '2h 15m';
    document.getElementById('summaryAirline').textContent = airline || 'Air India';
    document.getElementById('summaryFlight').textContent = flightNumber || 'AI-203';
    document.getElementById('summaryClass').textContent = flightClass || 'Economy';
    
    // Format and display date
    if (date) {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        document.getElementById('summaryDate').textContent = formattedDate;
    }
    
    // Update price summary
    const baseFare = Math.floor(price * 0.87); // 87% of total is base fare
    const taxesFees = price - baseFare;
    
    document.getElementById('summaryPrice').textContent = price.toLocaleString('en-IN');
    document.getElementById('baseFare').textContent = (baseFare * passengers).toLocaleString('en-IN');
    document.getElementById('taxesFees').textContent = (taxesFees * passengers).toLocaleString('en-IN');
    document.getElementById('passCount').textContent = passengers;
    
    // Calculate and display total
    updateTotalPrice(price * passengers);
    
    // Set max DOB to 18 years ago (adults only)
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    document.getElementById('dob').setAttribute('max', eighteenYearsAgo.toISOString().split('T')[0]);
});

// GST section toggle
document.getElementById('gstCheckbox').addEventListener('change', function() {
    const gstSection = document.getElementById('gstSection');
    if (this.checked) {
        gstSection.style.display = 'block';
    } else {
        gstSection.style.display = 'none';
    }
});

// Add-ons handling with dynamic price update
const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
addonCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateAddonDisplay();
        calculateTotal();
    });
});

function updateAddonDisplay() {
    // Meal
    if (document.getElementById('mealAddon').checked) {
        document.getElementById('mealRow').style.display = 'flex';
    } else {
        document.getElementById('mealRow').style.display = 'none';
    }
    
    // Baggage
    if (document.getElementById('baggageAddon').checked) {
        document.getElementById('baggageRow').style.display = 'flex';
    } else {
        document.getElementById('baggageRow').style.display = 'none';
    }
    
    // Insurance
    if (document.getElementById('insuranceAddon').checked) {
        document.getElementById('insuranceRow').style.display = 'flex';
    } else {
        document.getElementById('insuranceRow').style.display = 'none';
    }
    
    // Seat
    if (document.getElementById('seatAddon').checked) {
        document.getElementById('seatRow').style.display = 'flex';
    } else {
        document.getElementById('seatRow').style.display = 'none';
    }
}

function calculateTotal() {
    const urlParams = new URLSearchParams(window.location.search);
    const basePrice = parseInt(urlParams.get('price')) || 4599;
    const passengers = parseInt(urlParams.get('passengers')) || 1;
    
    let total = basePrice * passengers;
    
    // Add addon costs
    if (document.getElementById('mealAddon').checked) {
        total += parseInt(document.getElementById('mealAddon').value);
    }
    if (document.getElementById('baggageAddon').checked) {
        total += parseInt(document.getElementById('baggageAddon').value);
    }
    if (document.getElementById('insuranceAddon').checked) {
        total += parseInt(document.getElementById('insuranceAddon').value);
    }
    if (document.getElementById('seatAddon').checked) {
        total += parseInt(document.getElementById('seatAddon').value);
    }
    
    updateTotalPrice(total);
}

function updateTotalPrice(total) {
    document.getElementById('totalAmount').textContent = total.toLocaleString('en-IN');
}

// Form validation and submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('title').value;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const nationality = document.getElementById('nationality').value;
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const city = document.getElementById('city').value.trim();
    
    // Validation
    if (!title || !firstName || !lastName || !dob || !gender || !nationality) {
        alert('Please fill all required passenger details');
        return;
    }
    
    // Name validation (only letters and spaces)
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(firstName)) {
        alert('First name should contain only letters');
        return;
    }
    
    if (!namePattern.test(lastName)) {
        alert('Last name should contain only letters');
        return;
    }
    
    // Name length validation
    if (firstName.length < 2) {
        alert('First name must be at least 2 characters');
        return;
    }
    
    if (lastName.length < 2) {
        alert('Last name must be at least 2 characters');
        return;
    }
    
    // Age validation (must be 18+)
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 18 || (age === 18 && monthDiff < 0)) {
        alert('Passenger must be at least 18 years old');
        return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Mobile validation (Indian format)
    const mobilePattern = /^[+]?[0-9\s\-()]{10,}$/;
    if (!mobilePattern.test(mobile)) {
        alert('Please enter a valid mobile number');
        return;
    }
    
    if (!city) {
        alert('Please enter your city');
        return;
    }
    
    // GST validation if checked
    if (document.getElementById('gstCheckbox').checked) {
        const gstNumber = document.getElementById('gstNumber').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        
        if (!gstNumber || !companyName) {
            alert('Please fill all GST details or uncheck the GST option');
            return;
        }
        
        // Basic GST format validation (15 characters)
        if (gstNumber.length !== 15) {
            alert('GST number must be 15 characters');
            return;
        }
    }
    
    // Terms acceptance validation
    if (!document.getElementById('termsAccepted').checked) {
        alert('Please accept the Terms & Conditions');
        return;
    }
    
    if (!document.getElementById('cancelPolicy').checked) {
        alert('Please accept the Cancellation Policy');
        return;
    }
    
    // If all validations pass
    const totalAmount = document.getElementById('totalAmount').textContent;
    const flightNumber = document.getElementById('summaryFlight').textContent;
    
    alert('Booking Confirmed! 🎉\n\n' +
          'Passenger: ' + title + ' ' + firstName + ' ' + lastName + '\n' +
          'Flight: ' + flightNumber + '\n' +
          'Total Amount: ₹' + totalAmount + '\n\n' +
          'Confirmation details sent to: ' + email + '\n\n' +
          'Redirecting to payment gateway...');
    
    // In a real application, this would redirect to payment gateway
    setTimeout(function() {
        // Redirect to success page or payment gateway
        window.location.href = 'index.html';
    }, 3000);
});

// Real-time email validation feedback
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailPattern.test(email)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
    } else if (email) {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
    }
});

// Real-time mobile validation feedback
document.getElementById('mobile').addEventListener('blur', function() {
    const mobile = this.value.trim();
    const mobilePattern = /^[+]?[0-9\s\-()]{10,}$/;
    
    if (mobile && !mobilePattern.test(mobile)) {
        this.classList.add('is-invalid');
        this.classList.remove('is-valid');
    } else if (mobile) {
        this.classList.add('is-valid');
        this.classList.remove('is-invalid');
    }
});

// Prevent spaces in passport field
document.getElementById('passport').addEventListener('input', function() {
    this.value = this.value.replace(/\s/g, '').toUpperCase();
});

// GST number formatting
document.getElementById('gstNumber').addEventListener('input', function() {
    this.value = this.value.replace(/\s/g, '').toUpperCase();
});
