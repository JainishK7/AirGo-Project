// Respond to Feedback
function respondFeedback(feedbackId) {
    const response = prompt('Enter your response to customer:');
    if (response && response.trim() !== '') {
        alert('Response sent to customer for feedback ' + feedbackId + '\n\nYour response: ' + response);
    }
}

// Escalate Feedback
function escalateFeedback(feedbackId) {
    if (confirm('Escalate this feedback to management?')) {
        alert('Feedback ' + feedbackId + ' has been escalated to management team for immediate action.');
    }
}

// Search Feedback
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchFeedback');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const feedbackCards = document.querySelectorAll('.feedback-review-card');
            
            feedbackCards.forEach(function(card) {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    card.closest('.col-lg-6').style.display = '';
                } else {
                    card.closest('.col-lg-6').style.display = 'none';
                }
            });
        });
    }

    // Rating Filter
    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) {
        ratingFilter.addEventListener('change', function() {
            alert('Filtering by: ' + (this.value ? this.value + ' stars' : 'All ratings'));
        });
    }

    // Category Filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            alert('Filtering by category: ' + (this.value || 'All categories'));
        });
    }
});
