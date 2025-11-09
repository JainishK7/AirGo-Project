// Analytics Data for Different Time Periods
const analyticsData = {
    today: {
        label: 'Today (08 Nov 2025)',
        revenue: {
            labels: ['12 AM', '4 AM', '8 AM', '12 PM', '4 PM', '8 PM'],
            data: [12, 18, 25, 42, 58, 67],
            domestic: '₹45,000',
            international: '₹22,000',
            total: '₹67,000',
            domesticPercent: 67,
            internationalPercent: 33
        },
        bookings: {
            confirmed: 15,
            pending: 8,
            cancelled: 2,
            completed: 3
        },
        routes: [
            { route: 'Delhi → Mumbai', bookings: 5, revenue: '₹28,500' },
            { route: 'Bangalore → Chennai', bookings: 3, revenue: '₹16,200' },
            { route: 'Mumbai → Goa', bookings: 4, revenue: '₹22,300' }
        ],
        metrics: {
            successRate: '88.5%',
            avgRating: '4.7/5.0',
            responseTime: '1.8 min',
            cancellationRate: '7.1%'
        }
    },
    week: {
        label: 'This Week (02 Nov - 08 Nov 2025)',
        revenue: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [285, 320, 298, 355, 410, 445, 467],
            domestic: '₹1.82L',
            international: '₹0.78L',
            total: '₹2.60L',
            domesticPercent: 70,
            internationalPercent: 30
        },
        bookings: {
            confirmed: 98,
            pending: 22,
            cancelled: 8,
            completed: 15
        },
        routes: [
            { route: 'Delhi → Mumbai', bookings: 28, revenue: '₹1.42L' },
            { route: 'Bangalore → Hyderabad', bookings: 22, revenue: '₹0.98L' },
            { route: 'Mumbai → Goa', bookings: 19, revenue: '₹0.85L' },
            { route: 'Chennai → Delhi', bookings: 16, revenue: '₹0.72L' }
        ],
        metrics: {
            successRate: '87.8%',
            avgRating: '4.6/5.0',
            responseTime: '2.1 min',
            cancellationRate: '9.2%'
        }
    },
    month: {
        label: 'This Month (November 2025)',
        revenue: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [4.2, 5.8, 7.1, 7.4],
            domestic: '₹18.2L',
            international: '₹6.3L',
            total: '₹24.5L',
            domesticPercent: 74,
            internationalPercent: 26
        },
        bookings: {
            confirmed: 842,
            pending: 156,
            cancelled: 89,
            completed: 160
        },
        routes: [
            { route: 'Delhi → Mumbai', bookings: 342, revenue: '₹4.2L' },
            { route: 'Bangalore → Hyderabad', bookings: 287, revenue: '₹3.1L' },
            { route: 'Mumbai → Goa', bookings: 256, revenue: '₹2.8L' },
            { route: 'Chennai → Delhi', bookings: 198, revenue: '₹2.3L' },
            { route: 'Kolkata → Pune', bookings: 164, revenue: '₹1.9L' }
        ],
        metrics: {
            successRate: '87.5%',
            avgRating: '4.6/5.0',
            responseTime: '2.3 min',
            cancellationRate: '12.5%'
        }
    },
    year: {
        label: 'This Year (2025)',
        revenue: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            data: [18.5, 22.3, 25.8, 28.4, 32.6, 35.2, 38.9, 42.1, 45.3, 48.7, 52.4],
            domestic: '₹285L',
            international: '₹105L',
            total: '₹390L',
            domesticPercent: 73,
            internationalPercent: 27
        },
        bookings: {
            confirmed: 8420,
            pending: 892,
            cancelled: 1156,
            completed: 6892
        },
        routes: [
            { route: 'Delhi → Mumbai', bookings: 3420, revenue: '₹48.2L' },
            { route: 'Bangalore → Hyderabad', bookings: 2870, revenue: '₹38.5L' },
            { route: 'Mumbai → Goa', bookings: 2560, revenue: '₹35.8L' },
            { route: 'Chennai → Delhi', bookings: 1980, revenue: '₹28.3L' },
            { route: 'Kolkata → Pune', bookings: 1640, revenue: '₹22.9L' }
        ],
        metrics: {
            successRate: '86.2%',
            avgRating: '4.5/5.0',
            responseTime: '2.5 min',
            cancellationRate: '13.8%'
        }
    }
};

// Chart instances
let revenueChart = null;
let bookingPieChart = null;
let currentPeriod = 'today';

// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    updateAnalytics('today');
    setupTimePeriodButtons();
});

// Initialize Chart Instances
function initializeCharts() {
    const revenueCtx = document.getElementById('revenueChart');
    const bookingPieCtx = document.getElementById('bookingPieChart');
    
    if (revenueCtx) {
        revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Revenue (₹ in thousands)',
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Revenue Trends',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    if (bookingPieCtx) {
        bookingPieChart = new Chart(bookingPieCtx, {
            type: 'pie',
            data: {
                labels: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#27ae60',
                        '#f39c12',
                        '#e74c3c',
                        '#3498db'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Booking Status Distribution',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }
}

// Setup Time Period Button Handlers
function setupTimePeriodButtons() {
    const buttons = document.querySelectorAll('#timePeriodButtons button');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            if (period === 'custom') {
                alert('Custom date range picker coming soon!');
                return;
            }
            
            // Update active button
            buttons.forEach(function(btn) {
                btn.classList.remove('btn-admin-primary', 'active');
                btn.classList.add('btn-outline-secondary');
            });
            this.classList.remove('btn-outline-secondary');
            this.classList.add('btn-admin-primary', 'active');
            
            // Update analytics
            updateAnalytics(period);
        });
    });
}

// Update Analytics Data
function updateAnalytics(period) {
    currentPeriod = period;
    const data = analyticsData[period];
    
    // Update period label
    document.getElementById('periodLabel').innerHTML = 'Showing data for: <strong>' + data.label + '</strong>';
    
    // Update Revenue Chart
    if (revenueChart) {
        revenueChart.data.labels = data.revenue.labels;
        revenueChart.data.datasets[0].data = data.revenue.data;
        revenueChart.update();
    }
    
    // Update Revenue Breakdown
    document.getElementById('domesticRevenue').textContent = data.revenue.domestic;
    document.getElementById('internationalRevenue').textContent = data.revenue.international;
    document.getElementById('totalRevenue').textContent = data.revenue.total;
    document.getElementById('domesticProgress').style.width = data.revenue.domesticPercent + '%';
    document.getElementById('internationalProgress').style.width = data.revenue.internationalPercent + '%';
    
    // Update Booking Pie Chart
    if (bookingPieChart) {
        bookingPieChart.data.datasets[0].data = [
            data.bookings.confirmed,
            data.bookings.pending,
            data.bookings.cancelled,
            data.bookings.completed
        ];
        bookingPieChart.update();
    }
    
    // Update Top Routes
    updateTopRoutes(data.routes);
    
    // Update Performance Metrics
    document.getElementById('successRate').textContent = data.metrics.successRate;
    document.getElementById('avgRating').textContent = data.metrics.avgRating;
    document.getElementById('responseTime').textContent = data.metrics.responseTime;
    document.getElementById('cancellationRate').textContent = data.metrics.cancellationRate;
}

// Update Top Routes
function updateTopRoutes(routes) {
    const routesContainer = document.getElementById('topRoutes');
    
    let html = '';
    routes.forEach(function(route) {
        html += '<div class="route-item">';
        html += '<div>';
        html += '<strong>' + route.route + '</strong>';
        html += '<span class="text-muted">' + ': '+ route.bookings + ' bookings</span>';
        html += '</div>';
        html += '<span class="badge badge-primary">' + route.revenue + '</span>';
        html += '</div>';
    });
    
    routesContainer.innerHTML = html;
}
