// ==========================================
// RPEcoJourney CMS - Add Content Scripts
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // File upload handling with drag and drop
    const uploadAreas = document.querySelectorAll('.file-upload');
    
    uploadAreas.forEach(area => {
        // Prevent drag events on child elements
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, preventDefaults, false);
            area.querySelectorAll('*').forEach(child => {
                child.addEventListener(eventName, preventDefaults, false);
            });
        });
        
        // Drag and drop events
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.backgroundColor = '#e3f2fd';
            this.style.borderColor = '#5AB3E8';
        });
        
        area.addEventListener('dragenter', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.backgroundColor = '#e3f2fd';
            this.style.borderColor = '#5AB3E8';
        });
        
        area.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.backgroundColor = '';
            this.style.borderColor = '';
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.backgroundColor = '';
            this.style.borderColor = '';
            
            const files = e.dataTransfer.files;
            handleFiles(files, this);
        });
        
        // Click to select files
        const input = area.querySelector('input[type="file"]');
        if (input) {
            area.addEventListener('click', function(e) {
                // Don't trigger click if child elements are clicked
                if (e.target === this || e.target.closest('.file-upload') === this) {
                    input.click();
                }
            });
            
            input.addEventListener('change', function() {
                handleFiles(this.files, area);
            });
        }
    });
    
    // Form submission
    const form = document.getElementById('contentFormFull');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const title = document.getElementById('contentTitle')?.value;
            const description = document.getElementById('contentDescription')?.value;
            const category = document.getElementById('contentCategory')?.value;
            
            if (!title || !description || !category) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Save content to localStorage
            const content = {
                id: Date.now(),
                title: title,
                description: description,
                category: category,
                tags: document.getElementById('contentTags')?.value || '',
                image: '', // Image would need to be stored as base64 or reference
                publishedDate: new Date().toLocaleDateString(),
                author: 'You'
            };
            
            // Get existing content from localStorage
            let contentList = JSON.parse(localStorage.getItem('rpecojourney_content')) || [];
            contentList.push(content);
            localStorage.setItem('rpecojourney_content', JSON.stringify(contentList));
            
            // Show success modal
            const modal = document.getElementById('successModal');
            if (modal) {
                modal.style.display = 'block';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    modal.style.display = 'none';
                }, 3000);
            }
        });
    }
    
    // Close modal button - handle all modal close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    })
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Tags input
    const tagsInput = document.getElementById('contentTags');
    if (tagsInput) {
        tagsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag(this.value);
                this.value = '';
            }
        });
    }
    
    // Preview button functionality
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showContentPreview();
        });
    }
});

function handleFiles(files, uploadArea) {
    // Ensure we have files
    if (!files || files.length === 0) return;
    
    // Handle image preview for image upload areas
    const isImageUpload = uploadArea.id === 'imageUploadArea';
    const previewContainer = uploadArea.querySelector('.image-preview');
    
    // If it's an image upload and we have valid image files, show image preview
    if (isImageUpload && previewContainer) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Image Preview';
                previewContainer.innerHTML = '';
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }
    
    const summary = uploadArea.querySelector('.files-summary') || createFilesSummary();
    
    if (!uploadArea.querySelector('.files-summary')) {
        uploadArea.appendChild(summary);
    }
    
    const fileList = summary.querySelector('ul');
    
    Array.from(files).forEach(file => {
        const li = document.createElement('li');
        li.textContent = `✓ ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`;
        fileList.appendChild(li);
    });
}

function createFilesSummary() {
    const div = document.createElement('div');
    div.className = 'files-summary';
    div.innerHTML = '<h4>Selected Files:</h4><ul></ul>';
    return div;
}

function addTag(tag) {
    if (!tag.trim()) return;
    
    const tagsContainer = document.querySelector('.tags-container') || createTagsContainer();
    
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.innerHTML = `${tag} <button type="button">×</button>`;
    
    tagElement.querySelector('button').addEventListener('click', function() {
        tagElement.remove();
    });
    
    tagsContainer.appendChild(tagElement);
}

function createTagsContainer() {
    const container = document.createElement('div');
    container.className = 'tags-container';
    const tagsInput = document.getElementById('contentTags');
    if (tagsInput) {
        tagsInput.parentElement.insertBefore(container, tagsInput.nextSibling);
    }
    return container;
}

// Preview image function
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = input.closest('.form-group')?.querySelector('img');
            if (preview) {
                preview.src = e.target.result;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Show content preview modal
function showContentPreview() {
    // Get form values
    const title = document.getElementById('contentTitle')?.value;
    const description = document.getElementById('contentDescription')?.value;
    const category = document.getElementById('contentCategory')?.value;
    const tags = document.getElementById('contentTags')?.value;
    const imageInput = document.getElementById('contentImage');
    
    // Validate required fields
    if (!title || !description || !category) {
        alert('Please fill in all required fields (Title, Category, Description)');
        return;
    }
    
    // Get category display name
    const categoryNames = {
        environment: '🌿 Environment',
        social: '👥 Social',
        governance: '⚖️ Governance'
    };
    
    // Update preview modal with form data
    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewDescription').textContent = description;
    document.getElementById('previewDate').textContent = new Date().toLocaleDateString();
    document.getElementById('previewAuthor').textContent = 'You';
    
    // Update category badge
    const categoryBadge = document.querySelector('.category-badge');
    if (categoryBadge) {
        categoryBadge.textContent = categoryNames[category] || category;
        categoryBadge.style.backgroundColor = category === 'environment' ? '#E8F4E3' : 
                                              category === 'social' ? '#E3F2FD' : '#FFF3CD';
        categoryBadge.style.color = category === 'environment' ? '#6BAE53' : 
                                    category === 'social' ? '#5AB3E8' : '#FF9800';
    }
    
    // Update tags display
    const previewTagsSection = document.getElementById('previewTagsSection');
    const previewTagsContainer = document.getElementById('previewTags');
    if (tags && tags.trim()) {
        previewTagsSection.style.display = 'block';
        previewTagsContainer.innerHTML = '';
        tags.split(',').forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag.trim();
            previewTagsContainer.appendChild(tagSpan);
        });
    } else {
        previewTagsSection.style.display = 'none';
    }
    
    // Update image preview
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImage = document.getElementById('previewImage');
            previewImage.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
    
    // Update media attachments
    const mediaList = [];
    const videoInput = document.getElementById('contentVideo');
    const docInput = document.getElementById('contentDocument');
    
    if (imageInput?.files?.[0]) {
        mediaList.push({ name: imageInput.files[0].name, size: imageInput.files[0].size, icon: '🖼️' });
    }
    if (videoInput?.files?.[0]) {
        mediaList.push({ name: videoInput.files[0].name, size: videoInput.files[0].size, icon: '🎬' });
    }
    if (docInput?.files?.[0]) {
        mediaList.push({ name: docInput.files[0].name, size: docInput.files[0].size, icon: '📄' });
    }
    
    const previewMedia = document.getElementById('previewMedia');
    if (mediaList.length > 0) {
        previewMedia.innerHTML = mediaList.map(file => `
            <div class="preview-media-item">
                <span class="icon">${file.icon}</span>
                <div class="info">
                    <div class="name">${file.name}</div>
                    <div class="size">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
            </div>
        `).join('');
    } else {
        previewMedia.innerHTML = '<p class="text-gray">No media files selected</p>';
    }
    
    // Show preview modal
    const previewModal = document.getElementById('previewModal');
    if (previewModal) {
        previewModal.style.display = 'block';
        
        // Close button functionality
        const closeBtn = previewModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                previewModal.style.display = 'none';
            });
        }
    }
}

// Helper function to prevent default drag and drop behavior
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
