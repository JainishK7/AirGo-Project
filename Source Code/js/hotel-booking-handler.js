// Parse URL parameters and populate hotel summary
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const hotelName = urlParams.get('hotel');
    const city = urlParams.get('city');
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const pricePerNight = parseInt(urlParams.get('pricePerNight'));
    const guests = parseInt(urlParams.get('guests'));
    const rooms = parseInt(urlParams.get('rooms'));
    const nights = parseInt(urlParams.get('nights'));
    const roomType = urlParams.get('roomType');
    const rating = parseInt(urlParams.get('rating'));
    
    // Update hotel summary
    document.getElementById('summaryHotel').textContent = hotelName || 'The Taj Mahal Palace';
    document.getElementById('summaryCity').textContent = city || 'Mumbai';
    document.getElementById('summaryNights').textContent = nights || 2;
    document.getElementById('summaryGuests').textContent = guests || 2;
    document.getElementById('summaryRooms').textContent = rooms || 1;
    document.getElementById('summaryRoomType').textContent = roomType || 'Deluxe Room';
    
    // Format and display dates
    if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const formattedCheckIn = checkInDate.toLocaleDateString('en-IN', { 
            day: 'numeric', month: 'short', year: 'numeric' 
        });
        const formattedCheckOut = checkOutDate.toLocaleDateString('en-IN', { 
            day: 'numeric', month: 'short', year: 'numeric' 
        });
        document.getElementById('summaryCheckIn').textContent = formattedCheckIn;
        document.getElementById('summaryCheckOut').textContent = formattedCheckOut;
    }
    
    // Calculate prices
    const baseAmount = pricePerNight * nights * rooms;
    const taxAmount = Math.floor(baseAmount * 0.1); // 10% tax
    const totalAmount = baseAmount + taxAmount;
    
    document.getElementById('baseAmount').textContent = baseAmount.toLocaleString('en-IN');
    document.getElementById('taxAmount').textContent = taxAmount.toLocaleString('en-IN');
    document.getElementById('summaryPrice').textContent = totalAmount.toLocaleString('en-IN');
    document.getElementById('nightCount').textContent = nights;
    
    updateTotalPrice(totalAmount);
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
    const nights = parseInt(urlParams.get('nights')) || 2;
    
    // Breakfast (per night)
    if (document.getElementById('breakfastAddon').checked) {
        const breakfastTotal = 500 * nights;
        document.getElementById('breakfastRow').style.display = 'flex';
        document.getElementById('breakfastAmount').textContent = '₹' + breakfastTotal.toLocaleString('en-IN');
    } else {
        document.getElementById('breakfastRow').style.display = 'none';
    }
    
    // Airport Transfer
    if (document.getElementById('airportAddon').checked) {
        document.getElementById('airportRow').style.display = 'flex';
    } else {
        document.getElementById('airportRow').style.display = 'none';
    }
    
    // Spa
    if (document.getElementById('spaAddon').checked) {
        document.getElementById('spaRow').style.display = 'flex';
    } else {
        document.getElementById('spaRow').style.display = 'none';
    }
    
    // Late Checkout
    if (document.getElementById('lateCheckoutAddon').checked) {
        document.getElementById('lateCheckoutRow').style.display = 'flex';
    } else {
        document.getElementById('lateCheckoutRow').style.display = 'none';
    }
}

function calculateTotal() {
    const urlParams = new URLSearchParams(window.location.search);
    const pricePerNight = parseInt(urlParams.get('pricePerNight')) || 12500;
    const nights = parseInt(urlParams.get('nights')) || 2;
    const rooms = parseInt(urlParams.get('rooms')) || 1;
    
    const baseAmount = pricePerNight * nights * rooms;
    const taxAmount = Math.floor(baseAmount * 0.1);
    let total = baseAmount + taxAmount;
    
    // Add addon costs
    if (document.getElementById('breakfastAddon').checked) {
        total += 500 * nights;
    }
    if (document.getElementById('airportAddon').checked) {
        total += 1500;
    }
    if (document.getElementById('spaAddon').checked) {
        total += 2000;
    }
    if (document.getElementById('lateCheckoutAddon').checked) {
        total += 1000;
    }
    
    updateTotalPrice(total);
}

function updateTotalPrice(total) {
    document.getElementById('totalAmount').textContent = total.toLocaleString('en-IN');
}

// Form validation and submission
document.getElementById('hotelBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const idType = document.getElementById('idType').value;
    const idNumber = document.getElementById('idNumber').value.trim();
    
    // Validation
    if (!title || !firstName || !lastName || !email || !mobile || !idType || !idNumber) {
        alert('Please fill all required guest details');
        return;
    }
    
    // Name validation
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        alert('Names should contain only letters');
        return;
    }
    
    if (firstName.length < 2 || lastName.length < 2) {
        alert('Names must be at least 2 characters long');
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
    
    // ID Number validation (basic)
    if (idNumber.length < 5) {
        alert('Please enter a valid ID number');
        return;
    }
    
    // Terms acceptance
    if (!document.getElementById('termsAccepted').checked) {
        alert('Please accept the Terms & Conditions');
        return;
    }
    
    if (!document.getElementById('cancelPolicy').checked) {
        alert('Please accept the Cancellation Policy');
        return;
    }
    
    // Success
    const totalAmount = document.getElementById('totalAmount').textContent;
    const hotelName = document.getElementById('summaryHotel').textContent;
    
    alert('Hotel Booking Confirmed! 🎉\n\n' +
          'Guest: ' + title + ' ' + firstName + ' ' + lastName + '\n' +
          'Hotel: ' + hotelName + '\n' +
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

// ID Number formatting
document.getElementById('idNumber').addEventListener('input', function() {
    this.value = this.value.toUpperCase().replace(/\s/g, '');
});
