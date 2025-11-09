// 5 Different car types with varying prices
const carDatabase = [
    {
        name: 'Volkswagen',
        type: 'Hatchback',
        transmission: 'Automatic',
        fuel: 'Diesel',
        seats: 4,
        pricePerDay: 3500,
        features: ['AC', 'Music System', 'GPS', 'Power Windows'],
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
    },
    {
        name: 'Mustang',
        type: 'Sports',
        transmission: 'Automatic',
        fuel: 'Petrol',
        seats: 4,
        pricePerDay: 7500,
        features: ['AC', 'Music System', 'Power Windows', 'ABS'],
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
    },
    {
        name: 'Maruti Swift',
        type: 'Hatchback',
        transmission: 'Manual',
        fuel: 'Petrol',
        seats: 5,
        pricePerDay: 1500,
        features: ['AC', 'Music System', 'Power Steering'],
        image: 'https://images.unsplash.com/photo-1583267746897-c27b1c863d73?w=400'
    },
    {
        name: 'Range Rover',
        type: 'Luxury',
        transmission: 'Automatic',
        fuel: 'Diesel',
        seats: 5,
        pricePerDay: 8500,
        features: ['AC', 'Sunroof', 'GPS', 'Leather Seats', 'Premium Sound'],
        image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400'
    },
    {
        name: 'Buggati',
        type: 'Sports',
        transmission: 'Manual',
        fuel: 'Petrol',
        seats: 2,
        pricePerDay: 12000,
        features: ['AC', 'Music System', 'Power Steering'],
        image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=400'
    }
];

// Set minimum dates
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const todayTime = new Date().toTimeString().split(' ')[0].substring(0, 5);
    
    document.getElementById('pickupDate').setAttribute('min', today);
    document.getElementById('dropDate').setAttribute('min', today);
    document.getElementById('pickupDate').value = today;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('dropDate').value = tomorrow.toISOString().split('T')[0];
    
    document.getElementById('pickupTime').value = '10:00';
    document.getElementById('dropTime').value = '10:00';
});

// Handle car search
document.getElementById('carSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const pickupCity = document.getElementById('pickupCity').value.trim();
    const dropCity = document.getElementById('dropCity').value.trim();
    const pickupDate = document.getElementById('pickupDate').value;
    const pickupTime = document.getElementById('pickupTime').value;
    const dropDate = document.getElementById('dropDate').value;
    const dropTime = document.getElementById('dropTime').value;
    
    // Validation
    if (!pickupCity || !dropCity) {
        alert('Please enter pickup and drop locations');
        return;
    }
    
    if (!pickupDate || !dropDate || !pickupTime || !dropTime) {
        alert('Please select pickup and drop date/time');
        return;
    }
    
    const pickupDateTime = new Date(pickupDate + ' ' + pickupTime);
    const dropDateTime = new Date(dropDate + ' ' + dropTime);
    
    if (dropDateTime <= pickupDateTime) {
        alert('Drop date/time must be after pickup date/time');
        return;
    }
    
    // Calculate rental days
    const days = Math.ceil((dropDateTime - pickupDateTime) / (1000 * 60 * 60 * 24));
    
    // Display results
    displayCarResults(pickupCity, dropCity, pickupDate, pickupTime, dropDate, dropTime, days);
});

function displayCarResults(pickupCity, dropCity, pickupDate, pickupTime, dropDate, dropTime, days) {
    // Show search info
    document.getElementById('searchInfo').style.display = 'block';
    document.getElementById('pickupCityDisplay').textContent = pickupCity;
    document.getElementById('dropCityDisplay').textContent = dropCity;
    
    // Format dates
    const pickupDateTime = new Date(pickupDate + ' ' + pickupTime);
    const dropDateTime = new Date(dropDate + ' ' + dropTime);
    
    const formattedPickup = pickupDateTime.toLocaleDateString('en-IN', { 
        day: 'numeric', month: 'short', year: 'numeric' 
    }) + ' ' + pickupTime;
    
    const formattedDrop = dropDateTime.toLocaleDateString('en-IN', { 
        day: 'numeric', month: 'short', year: 'numeric' 
    }) + ' ' + dropTime;
    
    document.getElementById('pickupDisplay').textContent = formattedPickup;
    document.getElementById('dropDisplay').textContent = formattedDrop;
    document.getElementById('daysDisplay').textContent = days;
    
    // Generate car cards
    const container = document.getElementById('carResultsContainer');
    container.innerHTML = '';
    
    carDatabase.forEach(function(car) {
        const totalPrice = car.pricePerDay * days;
        
        const carCard = document.createElement('div');
        carCard.className = 'col-lg-12';
        carCard.innerHTML = `
            <div class="car-card">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${car.image}" alt="${car.name}" class="car-image">
                    </div>
                    <div class="col-md-6">
                        <h4 class="mb-2">${car.name}</h4>
                        <p class="text-muted mb-2"><strong>${car.type}</strong></p>
                        <div class="mb-2">
                            <span class="car-spec-badge"><i class="fas fa-users"></i> ${car.seats} Seats</span>
                            <span class="car-spec-badge"><i class="fas fa-cog"></i> ${car.transmission}</span>
                            <span class="car-spec-badge"><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                        </div>
                        <div class="mb-2">
                            ${car.features.map(function(feature) {
                                return '<span class="feature-badge">' + feature + '</span>';
                            }).join('')}
                        </div>
                        <small class="text-success"><i class="fas fa-check-circle"></i> Free cancellation up to 24 hours</small>
                    </div>
                    <div class="col-md-3 text-center d-flex flex-column justify-content-center">
                        <h3 class="price mb-1">₹${totalPrice.toLocaleString('en-IN')}</h3>
                        <small class="text-muted d-block mb-2">for ${days} day(s)</small>
                        <small class="text-muted d-block mb-3">₹${car.pricePerDay.toLocaleString('en-IN')} per day</small>
                        <button class="btn btn-primary w-100" onclick="bookCar('${car.name}', '${pickupCity}', '${dropCity}', '${pickupDate}', '${pickupTime}', '${dropDate}', '${dropTime}', ${car.pricePerDay}, ${days}, '${car.type}', '${car.transmission}', '${car.fuel}', ${car.seats})">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(carCard);
    });
    
    // Scroll to results
    document.getElementById('carResultsSection').scrollIntoView({ behavior: 'smooth' });
}

function bookCar(carName, pickupCity, dropCity, pickupDate, pickupTime, dropDate, dropTime, pricePerDay, days, carType, transmission, fuel, seats) {
    // Create URL with all car details
    const bookingURL = 'car-booking.html?' +
        'car=' + encodeURIComponent(carName) + '&' +
        'pickupCity=' + encodeURIComponent(pickupCity) + '&' +
        'dropCity=' + encodeURIComponent(dropCity) + '&' +
        'pickupDate=' + encodeURIComponent(pickupDate) + '&' +
        'pickupTime=' + encodeURIComponent(pickupTime) + '&' +
        'dropDate=' + encodeURIComponent(dropDate) + '&' +
        'dropTime=' + encodeURIComponent(dropTime) + '&' +
        'pricePerDay=' + pricePerDay + '&' +
        'days=' + days + '&' +
        'carType=' + encodeURIComponent(carType) + '&' +
        'transmission=' + encodeURIComponent(transmission) + '&' +
        'fuel=' + encodeURIComponent(fuel) + '&' +
        'seats=' + seats;
    
    window.location.href = bookingURL;
}
