// 5 Different hotels with varying prices and amenities
const hotelDatabase = [
    {
        name: 'The Taj Mahal Palace',
        location: 'Mumbai',
        rating: 5,
        price: 12500,
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Bar'],
        roomType: 'Deluxe Room',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    },
    {
        name: 'The Oberoi',
        location: 'Delhi',
        rating: 5,
        price: 10500,
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        roomType: 'Premium Room',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400'
    },
    {
        name: 'ITC Grand Central',
        location: 'Mumbai',
        rating: 5,
        price: 9800,
        amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Business Center'],
        roomType: 'Executive Room',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'
    },
    {
        name: 'Marriott Suites',
        location: 'Pune',
        rating: 4,
        price: 6500,
        amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Parking'],
        roomType: 'Suite',
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
    },
    {
        name: 'Hyatt Regency',
        location: 'Bangalore',
        rating: 4,
        price: 5500,
        amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Parking'],
        roomType: 'Standard Room',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400'
    }
];

// Set minimum dates
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').setAttribute('min', today);
    document.getElementById('checkOut').setAttribute('min', today);
    document.getElementById('checkIn').value = today;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('checkOut').value = tomorrow.toISOString().split('T')[0];
});

// Handle hotel search
document.getElementById('hotelSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const city = document.getElementById('city').value.trim();
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    const rooms = document.getElementById('rooms').value;
    
    // Validation
    if (!city) {
        alert('Please enter a city');
        return;
    }
    
    if (!checkIn || !checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
        alert('Check-out date must be after check-in date');
        return;
    }
    
    // Calculate number of nights
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    // Display results
    displayHotelResults(city, checkIn, checkOut, guests, rooms, nights);
});

function displayHotelResults(city, checkIn, checkOut, guests, rooms, nights) {
    // Show search info
    document.getElementById('searchInfo').style.display = 'block';
    document.getElementById('cityDisplay').textContent = city;
    
    // Format dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const formattedCheckIn = checkInDate.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
    const formattedCheckOut = checkOutDate.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
    
    document.getElementById('checkInDisplay').textContent = formattedCheckIn;
    document.getElementById('checkOutDisplay').textContent = formattedCheckOut;
    document.getElementById('nightsDisplay').textContent = nights;
    document.getElementById('guestsDisplay').textContent = guests;
    document.getElementById('roomsDisplay').textContent = rooms;
    
    // Generate hotel cards
    const container = document.getElementById('hotelResultsContainer');
    container.innerHTML = '';
    
    hotelDatabase.forEach(function(hotel) {
        const totalPrice = hotel.price * nights * parseInt(rooms);
        
        const hotelCard = document.createElement('div');
        hotelCard.className = 'col-lg-12';
        hotelCard.innerHTML = `
            <div class="hotel-card">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
                    </div>
                    <div class="col-md-6">
                        <h4 class="mb-2">${hotel.name}</h4>
                        <div class="rating-stars mb-2">
                            ${'<i class="fas fa-star"></i>'.repeat(hotel.rating)}
                            <span class="text-muted ms-2">${hotel.rating} Star</span>
                        </div>
                        <p class="text-muted mb-2">
                            <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                        </p>
                        <p class="mb-2"><strong>${hotel.roomType}</strong></p>
                        <div class="mb-2">
                            ${hotel.amenities.map(function(amenity) {
                                return '<span class="amenity-badge">' + amenity + '</span>';
                            }).join('')}
                        </div>
                        <small class="text-success"><i class="fas fa-check-circle"></i> Free cancellation up to 24 hours</small>
                    </div>
                    <div class="col-md-3 text-center d-flex flex-column justify-content-center">
                        <h3 class="price mb-1">₹${totalPrice.toLocaleString('en-IN')}</h3>
                        <small class="text-muted d-block mb-2">for ${nights} night(s), ${rooms} room(s)</small>
                        <small class="text-muted d-block mb-3">₹${hotel.price.toLocaleString('en-IN')} per night</small>
                        <button class="btn btn-primary w-100" onclick="bookHotel('${hotel.name}', '${city}', '${checkIn}', '${checkOut}', ${hotel.price}, '${guests}', '${rooms}', ${nights}, '${hotel.roomType}', '${hotel.rating}')">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(hotelCard);
    });
    
    // Scroll to results
    document.getElementById('hotelResultsSection').scrollIntoView({ behavior: 'smooth' });
}

function bookHotel(hotelName, city, checkIn, checkOut, pricePerNight, guests, rooms, nights, roomType, rating) {
    // Create URL with all hotel details
    const bookingURL = 'hotel-booking.html?' +
        'hotel=' + encodeURIComponent(hotelName) + '&' +
        'city=' + encodeURIComponent(city) + '&' +
        'checkIn=' + encodeURIComponent(checkIn) + '&' +
        'checkOut=' + encodeURIComponent(checkOut) + '&' +
        'pricePerNight=' + pricePerNight + '&' +
        'guests=' + guests + '&' +
        'rooms=' + rooms + '&' +
        'nights=' + nights + '&' +
        'roomType=' + encodeURIComponent(roomType) + '&' +
        'rating=' + rating;
    
    window.location.href = bookingURL;
}
