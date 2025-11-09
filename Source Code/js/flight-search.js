// 5 Different flight options that will be randomly selected
const flightDatabase = [
    {
        airline: 'Air India',
        code: 'AI',
        number: '203',
        departureTime: '10:00 AM',
        arrivalTime: '12:15 PM',
        duration: '2h 15m',
        basePrice: 4599,
        stops: 'Non-stop',
        class: 'Economy'
    },
    {
        airline: 'IndiGo',
        code: '6E',
        number: '401',
        departureTime: '02:30 PM',
        arrivalTime: '04:45 PM',
        duration: '2h 15m',
        basePrice: 3899,
        stops: 'Non-stop',
        class: 'Economy'
    },
    {
        airline: 'SpiceJet',
        code: 'SG',
        number: '212',
        departureTime: '06:45 AM',
        arrivalTime: '09:00 AM',
        duration: '2h 15m',
        basePrice: 3599,
        stops: 'Non-stop',
        class: 'Economy'
    },
    {
        airline: 'Vistara',
        code: 'UK',
        number: '815',
        departureTime: '08:15 PM',
        arrivalTime: '10:30 PM',
        duration: '2h 15m',
        basePrice: 5299,
        stops: 'Non-stop',
        class: 'Premium Economy'
    },
    {
        airline: 'AirAsia',
        code: 'I5',
        number: '512',
        departureTime: '12:00 PM',
        arrivalTime: '02:15 PM',
        duration: '2h 15m',
        basePrice: 3299,
        stops: 'Non-stop',
        class: 'Economy'
    }
];

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departDate').setAttribute('min', today);
    document.getElementById('departDate').value = today;
});

// Handle flight search
document.getElementById('flightSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fromCity = document.getElementById('from').value.trim();
    const toCity = document.getElementById('to').value.trim();
    const departDate = document.getElementById('departDate').value;
    const passengers = document.getElementById('passengers').value;
    const flightClass = document.getElementById('class').value;
    
    // Validation
    if (!fromCity || !toCity) {
        alert('Please enter both departure and arrival cities');
        return;
    }
    
    if (fromCity.toLowerCase() === toCity.toLowerCase()) {
        alert('Departure and arrival cities cannot be the same');
        return;
    }
    
    if (!departDate) {
        alert('Please select departure date');
        return;
    }
    
    // Display results
    displayFlightResults(fromCity, toCity, departDate, passengers, flightClass);
});

function displayFlightResults(fromCity, toCity, departDate, passengers, flightClass) {
    // Show search info
    document.getElementById('searchInfo').style.display = 'block';
    document.getElementById('fromCityDisplay').textContent = fromCity;
    document.getElementById('toCityDisplay').textContent = toCity;
    
    // Format date
    const date = new Date(departDate);
    const formattedDate = date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
    document.getElementById('dateDisplay').textContent = formattedDate;
    document.getElementById('passengersDisplay').textContent = passengers;
    
    // Generate flight cards
    const container = document.getElementById('flightResultsContainer');
    container.innerHTML = '';
    
    flightDatabase.forEach(function(flight) {
        const pricePerPerson = flight.basePrice;
        const totalPrice = pricePerPerson * parseInt(passengers);
        
        const flightCard = document.createElement('div');
        flightCard.className = 'col-lg-12';
        flightCard.innerHTML = `
            <div class="flight-card">
                <div class="row align-items-center">
                    <div class="col-md-2 text-center">
                        <img src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=200" alt="${flight.airline}" class="airline-logo">
                        <p class="mb-0"><strong>${flight.airline}</strong></p>
                        <small class="text-muted">${flight.code}-${flight.number}</small>
                    </div>
                    <div class="col-md-3">
                        <h4>${fromCity}</h4>
                        <p class="mb-0">${flight.departureTime}</p>
                        <small class="text-muted">${formattedDate}</small>
                    </div>
                    <div class="col-md-2 text-center">
                        <i class="fas fa-plane flight-icon"></i>
                        <p class="mb-0"><small>${flight.duration}</small></p>
                        <small class="text-muted">${flight.stops}</small>
                    </div>
                    <div class="col-md-3">
                        <h4>${toCity}</h4>
                        <p class="mb-0">${flight.arrivalTime}</p>
                        <small class="text-muted">${formattedDate}</small>
                    </div>
                    <div class="col-md-2 text-center">
                        <h3 class="price mb-2">₹${totalPrice.toLocaleString('en-IN')}</h3>
                        <small class="text-muted d-block mb-2">for ${passengers} passenger(s)</small>
                        <button class="btn btn-primary btn-sm" onclick="bookFlight('${flight.code}-${flight.number}', '${fromCity}', '${toCity}', '${departDate}', '${flight.departureTime}', '${flight.arrivalTime}', '${flight.airline}', ${pricePerPerson}, '${passengers}', '${flight.duration}', '${flightClass}')">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(flightCard);
    });
    
    // Scroll to results
    document.getElementById('flightResultsSection').scrollIntoView({ behavior: 'smooth' });
}

function bookFlight(flightNumber, from, to, date, depTime, arrTime, airline, price, passengers, duration, flightClass) {
    // Create URL with all flight details
    const bookingURL = 'flight-booking.html?' +
        'flight=' + encodeURIComponent(flightNumber) + '&' +
        'from=' + encodeURIComponent(from) + '&' +
        'to=' + encodeURIComponent(to) + '&' +
        'date=' + encodeURIComponent(date) + '&' +
        'depTime=' + encodeURIComponent(depTime) + '&' +
        'arrTime=' + encodeURIComponent(arrTime) + '&' +
        'airline=' + encodeURIComponent(airline) + '&' +
        'price=' + price + '&' +
        'passengers=' + passengers + '&' +
        'duration=' + encodeURIComponent(duration) + '&' +
        'class=' + encodeURIComponent(flightClass);
    
    window.location.href = bookingURL;
}
