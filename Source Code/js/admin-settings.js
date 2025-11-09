// Profile Settings Form
document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileSettingsForm');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('adminName').value.trim();
            const email = document.getElementById('adminEmail').value.trim();
            const phone = document.getElementById('adminPhone').value.trim();
            
            // Validation
            if (name.length < 3) {
                alert('Name must be at least 3 characters');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            const phonePattern = /^[+]?[0-9\s\-()]{10,}$/;
            if (!phonePattern.test(phone)) {
                alert('Please enter a valid phone number');
                return;
            }
            
            alert('Profile updated successfully!');
        });
    }
    
    // Change Password Form
    const passwordForm = document.getElementById('changePasswordForm');
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            
            // Validation
            if (currentPassword.length < 6) {
                alert('Current password is invalid');
                return;
            }
            
            if (newPassword.length < 8) {
                alert('New password must be at least 8 characters');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (currentPassword === newPassword) {
                alert('New password must be different from current password');
                return;
            }
            
            alert('Password updated successfully!\nPlease login again with your new password.');
            passwordForm.reset();
        });
    }
    
    // System Settings Form
    const systemForm = document.getElementById('systemSettingsForm');
    
    if (systemForm) {
        systemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('System settings saved successfully!');
        });
    }
});
