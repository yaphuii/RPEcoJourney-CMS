// ==========================================
// RPEcoJourney CMS - Settings Panel Scripts
// ==========================================

// Settings Panel Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.settings-nav-btn');
    const panels = document.querySelectorAll('.settings-panel');

    // Initially show the first panel
    if (panels.length > 0) {
        panels[0].classList.add('active');
    }
    if (navButtons.length > 0) {
        navButtons[0].classList.add('active');
    }

    // Add click listeners to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            
            // Remove active class from all buttons and panels
            navButtons.forEach(btn => btn.classList.remove('active'));
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the selected panel
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
});

// Password Strength Indicator
const passwordInput = document.getElementById('newPassword');
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
    });
}

function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 'weak';
    
    // Check password criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    
    let criteriaCount = 0;
    if (hasUppercase) criteriaCount++;
    if (hasLowercase) criteriaCount++;
    if (hasNumbers) criteriaCount++;
    if (hasSpecial) criteriaCount++;
    if (isLongEnough) criteriaCount++;
    
    // Determine strength level
    if (criteriaCount >= 4) {
        strength = 'strong';
    } else if (criteriaCount >= 3) {
        strength = 'good';
    } else if (criteriaCount >= 2) {
        strength = 'fair';
    } else {
        strength = 'weak';
    }
    
    // Remove all strength classes
    strengthBar.classList.remove('weak', 'fair', 'good', 'strong');
    strengthText.classList.remove('weak', 'fair', 'good', 'strong');
    
    // Add appropriate class
    strengthBar.classList.add(strength);
    strengthText.classList.add(strength);
    
    // Update text
    const strengthLabels = {
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong'
    };
    
    strengthText.textContent = strengthLabels[strength];
}

// Form Actions - Save Changes
const saveButtons = document.querySelectorAll('.form-actions .btn-primary');
saveButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show a success message (in a real app, this would save to a server)
        const originalText = this.textContent;
        this.textContent = '✓ Saved!';
        this.style.backgroundColor = 'var(--primary-green)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);
    });
});

// Cancel Button
const cancelButtons = document.querySelectorAll('.form-actions .btn-secondary');
cancelButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Reset form or navigate back
        alert('Changes cancelled.');
    });
});

// Delete Account Warning
const deleteAccountBtn = document.querySelector('.btn-danger');
if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Confirm deletion
        const confirmed = confirm(
            'WARNING: Deleting your account is permanent and cannot be undone. ' +
            'All your content and data will be deleted. Are you absolutely sure?'
        );
        
        if (confirmed) {
            const reconfirm = confirm(
                'This is your last chance to cancel. Click OK to permanently delete your account.'
            );
            
            if (reconfirm) {
                // In a real app, this would send a delete request to the server
                alert('Account deletion requested. Your account will be deleted within 24 hours.');
            }
        }
    });
}

// Session Logout (if applicable)
const logoutButtons = document.querySelectorAll('.session-logout');
logoutButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Logged out from this session.');
        // In a real app, this would handle session logout
    });
});

// Toggle switches
const toggleInputs = document.querySelectorAll('.toggle-switch input');
toggleInputs.forEach(input => {
    input.addEventListener('change', function() {
        const label = this.closest('.toggle-item').querySelector('.toggle-info h4');
        const status = this.checked ? 'enabled' : 'disabled';
        // In a real app, this would save the preference
    });
});

// Export or print settings
function exportSettings() {
    window.print();
}

// Add animation on page load
window.addEventListener('load', function() {
    const panels = document.querySelectorAll('.settings-panel');
    panels.forEach((panel, index) => {
        panel.style.animation = `fadeIn 0.5s ease ${index * 0.1}s`;
    });
});
