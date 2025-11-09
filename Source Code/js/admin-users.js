// Block User Function
function blockUser(userId) {
    if (confirm('Are you sure you want to block user ' + userId + '?')) {
        alert('User ' + userId + ' has been blocked!\nUser will no longer be able to access the system.');
    }
}

// Activate User Function
function activateUser(userId) {
    if (confirm('Activate user ' + userId + '?')) {
        alert('User ' + userId + ' has been activated!\nUser can now access the system.');
    }
}

// Delete User Function
function deleteUser(userId) {
    if (confirm('WARNING: This will permanently delete user ' + userId + ' and all their data.\n\nAre you sure you want to continue?')) {
        const confirmation = prompt('Type "DELETE" to confirm:');
        if (confirmation === 'DELETE') {
            alert('User ' + userId + ' has been permanently deleted!');
        } else {
            alert('Deletion cancelled');
        }
    }
}

// Search User Function
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchUser');
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
