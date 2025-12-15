// ==========================================
// RPEcoJourney CMS - Browse Content Scripts
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Load and display content from localStorage
    loadPublishedContent();
    
    // Category tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide content lists
            const tabName = this.getAttribute('data-tab');
            const contentLists = document.querySelectorAll('.content-list');
            contentLists.forEach(list => {
                if (list.id === tabName) {
                    list.classList.remove('hidden');
                } else {
                    list.classList.add('hidden');
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterAndDisplayContent();
        });
    }
    
    // Sort functionality
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            filterAndDisplayContent();
        });
    }
});

function loadPublishedContent() {
    // Get content from localStorage
    const contentData = JSON.parse(localStorage.getItem('rpecojourney_content')) || [];
    
    // Get all content lists
    const allContentList = document.getElementById('all-content');
    const environmentList = document.getElementById('environment');
    const socialList = document.getElementById('social');
    const governanceList = document.getElementById('governance');
    
    if (contentData.length === 0) {
        // No content published yet - keep empty states
        return;
    }
    
    // Clear empty states only if we have content
    allContentList.innerHTML = '';
    environmentList.innerHTML = '';
    socialList.innerHTML = '';
    governanceList.innerHTML = '';
    
    // Add content to appropriate sections
    contentData.forEach(content => {
        const card = createContentCard(content);
        
        // Add to all content
        allContentList.appendChild(card.cloneNode(true));
        
        // Add to category-specific section
        switch(content.category) {
            case 'environment':
                environmentList.appendChild(card.cloneNode(true));
                break;
            case 'social':
                socialList.appendChild(card.cloneNode(true));
                break;
            case 'governance':
                governanceList.appendChild(card.cloneNode(true));
                break;
        }
    });
}

function createContentCard(content) {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.setAttribute('data-category', content.category);
    card.setAttribute('data-title', content.title.toLowerCase());
    
    // Category emoji mapping
    const categoryEmojis = {
        environment: '🌿',
        social: '👥',
        governance: '⚖️'
    };
    
    // Category color mapping
    const categoryColors = {
        environment: { bg: '#E8F4E3', text: '#6BAE53' },
        social: { bg: '#E3F2FD', text: '#5AB3E8' },
        governance: { bg: '#FFF3CD', text: '#FF9800' }
    };
    
    const color = categoryColors[content.category] || { bg: '#E8F4E3', text: '#6BAE53' };
    const emoji = categoryEmojis[content.category] || '📄';
    
    card.innerHTML = `
        <div class="content-card-image">
            <span style="font-size: 3rem;">${emoji}</span>
        </div>
        <div class="content-card-body">
            <div class="content-card-category" style="background-color: ${color.bg}; color: ${color.text};">
                ${emoji} ${content.category.charAt(0).toUpperCase() + content.category.slice(1)}
            </div>
            <h3 class="content-card-title">${content.title}</h3>
            <p class="content-card-description">${content.description}</p>
            <div style="font-size: 0.85rem; color: #999; margin-top: auto;">
                <p>By ${content.author} • ${content.publishedDate}</p>
            </div>
        </div>
    `;
    
    return card;
}

function filterAndDisplayContent() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const sortBy = document.getElementById('sortFilter')?.value || '';
    
    const cards = document.querySelectorAll('.content-card');
    let visibleCards = [];
    
    cards.forEach(card => {
        const title = card.getAttribute('data-title') || '';
        const category = card.getAttribute('data-category') || '';
        
        // Check if matches search
        if (!searchTerm || title.includes(searchTerm)) {
            visibleCards.push({ element: card, title: title, category: category });
        }
    });
    
    // Apply sorting
    if (sortBy === 'newest') {
        // Default order is newest first (reverse of insertion)
        visibleCards.reverse();
    } else if (sortBy === 'oldest') {
        // Keep original order
    } else if (sortBy === 'title') {
        // Sort alphabetically
        visibleCards.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    // Show/hide cards based on visibility
    cards.forEach(card => {
        const isVisible = visibleCards.some(v => v.element === card);
        card.style.display = isVisible ? '' : 'none';
    });
}
