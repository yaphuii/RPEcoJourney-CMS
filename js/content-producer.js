// ==========================================
// RPEcoJourney CMS - Content Producer Scripts
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Modal handling
    const modal = document.getElementById('contentModal');
    const addContentBtn = document.querySelector('.btn-primary');
    const closeBtn = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.form-actions .btn-secondary');
    
    if (addContentBtn) {
        addContentBtn.addEventListener('click', function() {
            if (modal) modal.style.display = 'block';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (modal) modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // File upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const parent = this.closest('.file-upload') || this.closest('.form-group');
            if (parent) {
                const fileName = this.files[0]?.name || 'No file selected';
                const display = parent.querySelector('.file-name');
                if (display) {
                    display.textContent = 'Selected: ' + fileName;
                }
            }
        });
    });
    
    // Form submission
    const form = document.querySelector('.modal-body form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            alert('Content published successfully!');
            if (modal) modal.style.display = 'none';
            form.reset();
        });
    }
    
    // Category tab handling
    const categoryTabs = document.querySelectorAll('.category-tab');
    const contentItems = document.querySelectorAll('.content-item');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter content items
            contentItems.forEach(item => {
                if (item.getAttribute('data-category') === category || category === 'all') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Publish button
    const publishBtn = document.querySelector('.form-actions .btn-primary');
    if (publishBtn) {
        publishBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmed = confirm('Are you sure you want to publish this content?');
            if (confirmed) {
                alert('Content published successfully!');
                // Reset form and close modal
                if (form) form.reset();
                if (modal) modal.style.display = 'none';
            }
        });
    }
});
