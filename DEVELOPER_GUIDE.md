# RPEcoJourney CMS - Developer Guide & Quick Reference

## Quick Start

### File Access
```
RPEcoJourney-CMS/
├── index.html              ← Landing page
├── content-producer.html   ← Content creation
├── browse-content.html     ← Content discovery
├── add-content.html        ← Add new content
├── settings.html           ← User settings (Main file to reference)
├── css/styles.css          ← Complete styling (1900+ lines)
├── js/
│   ├── main.js
│   ├── content-producer.js
│   ├── browse-content.js
│   ├── add-content.js
│   └── settings.js         ← Settings functionality
└── assets/logo.png         ← Logo image
```

## Color Palette Reference

```css
--primary-green: #6BAE53      /* Main brand color */
--primary-blue: #5AB3E8       /* Secondary/interactive */
--white: #FFFFFF               /* Backgrounds/text */
--dark-gray: #333333           /* Text */
--light-gray: #F5F5F5          /* Light backgrounds */
--border-gray: #E0E0E0         /* Borders */
--text-gray: #666666           /* Muted text */
--danger: #e74c3c              /* Error/delete */
--warning: #f39c12             /* Caution/warning */
--success: #6BAE53             /* Success state */
```

## Settings Panel Navigation

### How Tab Switching Works

**HTML Structure:**
```html
<button class="settings-nav-btn" data-panel="system">
    System Information
</button>
<div class="settings-panel" id="system">
    <!-- Content -->
</div>
```

**JavaScript Event:**
The settings.js file automatically handles tab switching via:
1. Click listener on `.settings-nav-btn` buttons
2. Read `data-panel` attribute
3. Toggle `.active` class on both button and panel

**To Add New Panel:**
1. Add navigation button with `data-panel="new-name"`
2. Add settings-panel div with `id="new-name"`
3. No additional JS needed - it's automatic!

## CSS Variables Quick Reference

### Spacing (Use Consistently)
```css
margin: var(--spacing-sm);      /* 1rem / 16px */
padding: var(--spacing-md);     /* 1.5rem / 24px */
gap: var(--spacing-lg);         /* 2rem / 32px */
```

### Font Families
```css
font-family: var(--font-header); /* Bold text */
font-family: var(--font-body);   /* Regular text */
```

### Shadows
```css
box-shadow: var(--shadow-sm);   /* Subtle shadow */
box-shadow: var(--shadow-md);   /* Medium shadow */
box-shadow: var(--shadow-lg);   /* Large shadow */
```

## Component Snippets

### Creating a Toggle Switch
```html
<div class="toggle-item">
    <div class="toggle-info">
        <h4>Feature Name</h4>
        <p>Description</p>
    </div>
    <label class="toggle-switch">
        <input type="checkbox">
        <span class="toggle-slider"></span>
    </label>
</div>
```

### Creating a Form Group
```html
<div class="form-group">
    <label for="field-id">Label</label>
    <input type="text" id="field-id" class="settings-input" placeholder="...">
    <small class="form-hint">Helper text</small>
</div>
```

### Creating a Button
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-danger">Delete Action</button>
```

### Creating an Info Item
```html
<div class="info-item">
    <label>Version</label>
    <p>1.0.0</p>
</div>
```

### Creating Support Card
```html
<div class="support-card">
    <div class="support-icon">📧</div>
    <h5>Email</h5>
    <p>support@example.com</p>
    <small>24-48 hour response</small>
</div>
```

## Responsive Breakpoints

```css
/* Desktop: Default styles */
/* All styles apply from 1024px+ */

/* Tablet: 768px - 1023px */
@media screen and (max-width: 1024px) { ... }

/* Mobile: 480px - 767px */
@media screen and (max-width: 768px) { ... }

/* Extra Small: < 480px */
@media screen and (max-width: 480px) { ... }
```

## Password Strength Indicator

### How It Works
1. User types in password field (`#newPassword`)
2. `updatePasswordStrength()` is called
3. Function checks 5 criteria:
   - Uppercase letter (A-Z)
   - Lowercase letter (a-z)
   - Number (0-9)
   - Special character (!@#$%^&*)
   - Minimum length (8 chars)

### Strength Levels
- **Weak** (1-2 criteria): Red (#e74c3c)
- **Fair** (2 criteria): Orange (#f39c12)
- **Good** (3 criteria): Yellow (#f1c40f)
- **Strong** (4+ criteria): Green (#6BAE53)

### HTML Required
```html
<div class="password-strength">
    <label for="newPassword">New Password</label>
    <input type="password" id="newPassword">
    <div class="strength-bar">
        <div class="strength-bar-fill"></div>
    </div>
    <span class="strength-text">Strength</span>
</div>
```

## Form Handling

### Adding Form Validation
```javascript
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate fields
    if (!title.value) {
        alert('Title required');
        return;
    }
    
    // Submit or save
    console.log('Form submitted');
});
```

### Showing Save Feedback
```javascript
const saveBtn = document.querySelector('.btn-primary');
saveBtn.textContent = '✓ Saved!';
// Reset after 2 seconds
setTimeout(() => {
    saveBtn.textContent = 'Save Changes';
}, 2000);
```

## Modal Usage

### Opening a Modal
```javascript
const modal = document.getElementById('contentModal');
modal.style.display = 'block';
```

### Closing a Modal
```javascript
modal.style.display = 'none';
```

### Close on Outside Click
```javascript
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
```

## File Upload Handling

### Drag and Drop
```javascript
area.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '#e3f2fd';
});

area.addEventListener('drop', function(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
});
```

### Reading File Info
```javascript
Array.from(files).forEach(file => {
    console.log(file.name);           // "document.pdf"
    console.log(file.size);           // bytes
    console.log(file.type);           // "application/pdf"
});
```

## Common Tasks

### Switch Between Settings Panels
```javascript
// Happens automatically, but manual trigger:
const btn = document.querySelector('[data-panel="notifications"]');
btn.click();
```

### Update Styling Based on State
```javascript
const element = document.querySelector('.session-badge');
element.classList.add('mobile'); // Adds .session-badge.mobile styles
```

### Create New Settings Section
```html
<div class="settings-section">
    <h4>Section Title</h4>
    <!-- Add content -->
</div>
```

### Add Animations
```css
.element {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

## Testing Checklist

- [ ] All pages load in browser
- [ ] Navigation links work
- [ ] Settings tabs switch correctly
- [ ] Password strength indicator updates
- [ ] Delete confirmation dialog shows
- [ ] Forms submit correctly
- [ ] Modals open and close
- [ ] Mobile responsive (resize window)
- [ ] All colors display correctly
- [ ] Images load (check logo)

## Performance Tips

1. **Minimize Repaints**: Group DOM changes together
2. **Cache Selectors**: Store frequently used `querySelector` results
3. **Use Event Delegation**: Listen on parent instead of individual items
4. **Lazy Load Images**: Only load when needed
5. **Minify CSS/JS**: For production deployment

## Debugging Tips

### Check if Panel is Switching
```javascript
// In browser console:
document.querySelectorAll('.settings-panel').forEach(p => {
    console.log(p.id, p.classList.contains('active'));
});
```

### Check Active Navigation Button
```javascript
document.querySelector('.settings-nav-btn.active');
```

### Monitor Password Strength
```javascript
document.getElementById('newPassword').addEventListener('input', (e) => {
    console.log(e.target.value.length);
});
```

### View Form Data
```javascript
const formData = new FormData(document.querySelector('form'));
console.log(Object.fromEntries(formData));
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## Future Enhancements

### Backend Integration
```javascript
// Replace with actual API calls:
fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(r => r.json())
.then(data => console.log(data));
```

### Authentication
```javascript
// Check if user is logged in
if (!localStorage.getItem('user_token')) {
    window.location.href = '/login.html';
}
```

### Dark Mode
```css
:root.dark-mode {
    --primary-green: #7ac961;
    --dark-gray: #f0f0f0;
    /* etc. */
}
```

---

## Support & Maintenance

### Regular Tasks
- Monitor browser compatibility
- Test responsive design monthly
- Update CSS variables for theming
- Review JavaScript performance
- Update documentation

### Common Fixes
- Logo not showing: Check `assets/logo.png` path
- Styles not applying: Clear browser cache
- JavaScript not working: Check console for errors
- Modal stuck: Check z-index values

### Contact
For issues or enhancements, refer to the PROJECT_SUMMARY.md for architecture details.

---

**Last Updated:** 2025
**Version:** 1.0.0
**Status:** Production Ready
