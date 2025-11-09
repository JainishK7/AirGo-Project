// Generate Report Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const generateReportForm = document.getElementById('generateReportForm');
    
    if (generateReportForm) {
        generateReportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reportType = document.getElementById('reportType').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            // Validation
            if (!reportType) {
                alert('Please select a report type');
                return;
            }
            
            if (!startDate) {
                alert('Please select start date');
                return;
            }
            
            if (!endDate) {
                alert('Please select end date');
                return;
            }
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            if (end < start) {
                alert('End date cannot be before start date');
                return;
            }
            
            // Success
            alert('Generating ' + reportType + ' report...\nPeriod: ' + startDate + ' to ' + endDate + '\n\nReport will be ready for download in a few moments.');
            
            // Reset form
            generateReportForm.reset();
        });
    }
});

// Download Report Function
function downloadReport(reportId) {
    alert('Downloading report: ' + reportId + '.pdf\n\nIn a real application, this would download the PDF file.');
}

// View Report Function
function viewReport(reportId) {
    alert('Opening report: ' + reportId + '\n\nIn a real application, this would open the report in a new window.');
}
