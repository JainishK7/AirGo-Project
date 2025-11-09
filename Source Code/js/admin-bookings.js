// Cancel Booking Function
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel booking ' + bookingId + '?')) {
        alert('Booking ' + bookingId + ' has been cancelled!\nRefund will be processed within 5-7 business days.');
    }
}

// Confirm Booking Function
function confirmBooking(bookingId) {
    if (confirm('Confirm booking ' + bookingId + '?')) {
        alert('Booking ' + bookingId + ' has been confirmed!\nConfirmation email sent to customer.');
    }
}

// Refund Booking Function
function refundBooking(bookingId) {
    const amount = prompt('Enter refund amount:');
    if (amount && amount > 0) {
        alert('Refund of ₹' + amount + ' initiated for booking ' + bookingId + '\nRefund will be processed within 5-7 business days.');
    } else if (amount !== null) {
        alert('Invalid refund amount');
    }
}

// Notify User Function
function notifyUser(bookingId) {
    const message = prompt('Enter notification message:');
    if (message && message.trim() !== '') {
        alert('Notification sent to user for booking ' + bookingId + '\nMessage: ' + message);
    }
}

// Search Booking Function
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchBooking');
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
