// Parse URL parameters and populate car summary
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const carName = urlParams.get('car');
    const pickupCity = urlParams.get('pickupCity');
    const dropCity = urlParams.get('dropCity');
    const pickupDate = urlParams.get('pickupDate');
    const pickupTime = urlParams.get('pickupTime');
    const dropDate = urlParams.get('dropDate');
    const dropTime = urlParams.get('dropTime');
    const pricePerDay = parseInt(urlParams.get('pricePerDay'));
    const days = parseInt(urlParams.get('days'));
    const carType = urlParams.get('carType');
    
    // Update car summary
    document.getElementById('summaryCar').textContent = carName || 'Toyota Innova Crysta';
    document.getElementById('summaryPickupCity').textContent = pickupCity || 'Mumbai';
    document.getElementById('summaryDropCity').textContent = dropCity || 'Pune';
    document.getElementById('summaryDays').textContent = days || 2;
    document.getElementById('summaryType').textContent = carType || 'SUV';
    
    // Format and display dates
    if (pickupDate && dropDate) {
        const pickupDateTime = new Date(pickupDate + ' ' + pickupTime);
        const dropDateTime = new Date(dropDate + ' ' + dropTime);
        
        const formattedPickup = pickupDateTime.toLocaleDateString('en-IN', { 
            day: 'numeric', month: 'short', year: 'numeric' 
        }) + ' ' + pickupTime;
        
        const formattedDrop = dropDateTime.toLocaleDateString('en-IN', { 
            day: 'numeric', month: 'short', year: 'numeric' 
        }) + ' ' + dropTime;
        
        document.getElementById('summaryPickup').textContent = formattedPickup;
        document.getElementById('summaryDrop').textContent = formattedDrop;
    }
    
    // Calculate prices
    const baseAmount = pricePerDay * days;
    document.getElementById('baseAmount').textContent = baseAmount.toLocaleString('en-IN');
    document.getElementById('summaryPrice').textContent = baseAmount.toLocaleString('en-IN');
    document.getElementById('dayCount').textContent = days;
    
    updateTotalPrice(baseAmount);
    
    // Set max DOB to 21 years ago (minimum driving age)
    const twentyOneYearsAgo = new Date();
    twentyOneYearsAgo.setFullYear(twentyOneYearsAgo.getFullYear() - 21);
    document.getElementById('dob').setAttribute('max', twentyOneYearsAgo.toISOString().split('T')[0]);
    
    // Set min license expiry to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('licenseExpiry').setAttribute('min', today);
});

// Add-ons handling
const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
addonCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateAddonDisplay();
        calculateTotal();
    });
});

function updateAddonDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const days = parseInt(urlParams.get('days')) || 2;
    
    // GPS (per day)
    if (document.getElementById('gpsAddon').checked) {
        const gpsTotal = 300 * days;
        document.getElementById('gpsRow').style.display = 'flex';
        document.getElementById('gpsAmount').textContent = '₹' + gpsTotal.toLocaleString('en-IN');
    } else {
        document.getElementById('gpsRow').style.display = 'none';
    }
    
    // Child Seat (per day)
    if (document.getElementById('childSeatAddon').checked) {
        const childSeatTotal = 200 * days;
        document.getElementById('childSeatRow').style.display = 'flex';
        document.getElementById('childSeatAmount').textContent = '₹' + childSeatTotal.toLocaleString('en-IN');
    } else {
        document.getElementById('childSeatRow').style.display = 'none';
    }
    
    // Additional Driver
    if (document.getElementById('driverAddon').checked) {
        document.getElementById('driverRow').style.display = 'flex';
    } else {
        document.getElementById('driverRow').style.display = 'none';
    }
    
    // Insurance (per day)
    if (document.getElementById('insuranceAddon').checked) {
        const insuranceTotal = 500 * days;
        document.getElementById('insuranceRow').style.display = 'flex';
        document.getElementById('insuranceAmount').textContent = '₹' + insuranceTotal.toLocaleString('en-IN');
    } else {
        document.getElementById('insuranceRow').style.display = 'none';
    }
}

function calculateTotal() {
    const urlParams = new URLSearchParams(window.location.search);
    const pricePerDay = parseInt(urlParams.get('pricePerDay')) || 3500;
    const days = parseInt(urlParams.get('days')) || 2;
    
    let total = pricePerDay * days;
    
    // Add addon costs
    if (document.getElementById('gpsAddon').checked) {
        total += 300 * days;
    }
    if (document.getElementById('childSeatAddon').checked) {
        total += 200 * days;
    }
    if (document.getElementById('driverAddon').checked) {
        total += 1500;
    }
    if (document.getElementById('insuranceAddon').checked) {
        total += 500 * days;
    }
    
    updateTotalPrice(total);
}

function updateTotalPrice(total) {
    document.getElementById('totalAmount').textContent = total.toLocaleString('en-IN');
}

// Form validation and submission
document.getElementById('carBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const dob = document.getElementById('dob').value;
    const licenseNumber = document.getElementById('licenseNumber').value.trim();
    const licenseExpiry = document.getElementById('licenseExpiry').value;
    const address = document.getElementById('address').value.trim();
    
    // Validation
    if (!fullName || !email || !mobile || !dob || !licenseNumber || !licenseExpiry || !address) {
        alert('Please fill all required renter details');
        return;
    }
    
    // Name validation
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(fullName)) {
        alert('Name should contain only letters');
        return;
    }
    
    if (fullName.length < 3) {
        alert('Name must be at least 3 characters long');
        return;
    }
    
    // Age validation (must be 21+)
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 21 || (age === 21 && monthDiff < 0)) {
        alert('Driver must be at least 21 years old');
        return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Mobile validation
    const mobilePattern = /^[+]?[0-9\s\-()]{10,}$/;
    if (!mobilePattern.test(mobile)) {
        alert('Please enter a valid mobile number');
        return;
    }
    
    // License number validation
    if (licenseNumber.length < 8) {
        alert('Please enter a valid driving license number');
        return;
    }
    
    // License expiry validation
    const expiryDate = new Date(licenseExpiry);
    if (expiryDate <= today) {
        alert('Driving license has expired. Please renew before booking.');
        return;
    }
    
    // Address validation
    if (address.length < 10) {
        alert('Please enter a complete address (minimum 10 characters)');
        return;
    }
    
    // Terms acceptance
    if (!document.getElementById('termsAccepted').checked) {
        alert('Please accept the Terms & Conditions');
        return;
    }
    
    if (!document.getElementById('rentalPolicy').checked) {
        alert('Please accept the Rental Policy');
        return;
    }
    
    // Success
    const totalAmount = document.getElementById('totalAmount').textContent;
    const carName = document.getElementById('summaryCar').textContent;
    
    alert('Car Booking Confirmed! 🎉\n\n' +
          'Renter: ' + fullName + '\n' +
          'Car: ' + carName + '\n' +
          'Total Amount: ₹' + totalAmount + '\n\n' +
          'Confirmation sent to: ' + email + '\n\n' +
          'Redirecting to payment gateway...');
    
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 3000);
});

// Real-time validation
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

// License number formatting
document.getElementById('licenseNumber').addEventListener('input', function() {
    this.value = this.value.toUpperCase().replace(/\s/g, '');
});

// Age warning
document.getElementById('dob').addEventListener('change', function() {
    const birthDate = new Date(this.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 21) {
        alert('Warning: You must be at least 21 years old to rent a car');
        this.value = '';
    }
});
