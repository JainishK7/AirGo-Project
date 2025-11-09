// Add Flight Function
function addFlight() {
    const flightNo = document.getElementById('flightNo').value.trim();
    const airline = document.getElementById('airline').value.trim();
    const fromCity = document.getElementById('fromCity').value.trim();
    const toCity = document.getElementById('toCity').value.trim();
    const departureTime = document.getElementById('departureTime').value;
    const arrivalTime = document.getElementById('arrivalTime').value;
    const price = document.getElementById('price').value;
    const status = document.getElementById('status').value;

    // Validation
    if (!flightNo || !airline || !fromCity || !toCity || !departureTime || !arrivalTime || !price || !status) {
        alert('Please fill in all fields');
        return;
    }

    if (flightNo.length < 4) {
        alert('Flight number must be at least 4 characters');
        return;
    }

    if (price <= 0) {
        alert('Price must be greater than 0');
        return;
    }

    // Success message
    alert('Flight ' + flightNo + ' added successfully!\nAirline: ' + airline + '\nRoute: ' + fromCity + ' → ' + toCity);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addFlightModal'));
    if (modal) {
        modal.hide();
    }
    
    // Reset form
    document.getElementById('addFlightForm').reset();
}

// Delete Flight Function
function deleteFlight(flightNo) {
    if (confirm('Are you sure you want to delete flight ' + flightNo + '?')) {
        alert('Flight ' + flightNo + ' has been deleted successfully!');
        // In a real application, this would make an API call
    }
}

// Search Flight Function
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchFlight');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('.admin-table tbody tr');
            
            tableRows.forEach(function(row) {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const addFlightForm = document.getElementById('addFlightForm');
    if (addFlightForm) {
        addFlightForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addFlight();
        });
    }
});
