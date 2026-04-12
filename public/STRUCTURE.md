# Public Directory Structure

## Overview
This directory contains the standalone vanilla HTML/CSS/JS portfolio website that operates independently within the Next.js project. The portfolio features a dual-identity system that switches between "Core" (mechanical/hardware engineering) and "Code" (software development) modes.

## File Organization

```
public/
├── index.html              # Main portfolio page
├── css/
│   └── styles.css         # Complete styling with CSS variables & responsive design
├── js/
│   ├── main.js            # Core interactions (nav, smooth scroll, form handling)
│   └── mode-switcher.js   # Mode switching logic & content filtering
├── images/
│   ├── mechanical-hero.jpg    # Hero image for Core mode
│   ├── software-hero.jpg      # Hero image for Code mode
│   ├── about-hero.jpg         # About section portrait
│   ├── project-1.jpg          # Automotive suspension system
│   ├── project-2.jpg          # REST API architecture
│   ├── project-3.jpg          # IoT dashboard
│   ├── project-4.jpg          # Manufacturing design
│   ├── project-5.jpg          # Web platform
│   └── project-6.jpg          # Robotics control system
└── STRUCTURE.md           # This file

```

## Key Features

### CSS System
- **Custom Properties**: `--bg`, `--surface`, `--accent` automatically swap based on mode
- **Core Mode**: Dark industrial theme (#14161b background, #c26d2c orange accent)
- **Code Mode**: Deep tech theme (#0b0d12 background, #3a7bd5 blue accent)
- **8px Spacing Scale**: Consistent `--spacing-xs` through `--spacing-3xl`
- **Smooth Transitions**: 400ms cubic-bezier easing on all mode changes
- **Responsive Design**: Mobile-first with breakpoints at 768px and 1024px

### HTML Structure
- **Hero Section**: Image flips position based on mode (Core: left, Code: right)
- **Projects Grid**: Dynamic filtering—shows relevant projects per mode
  - Core projects tagged with `data-type="core"`
  - Code projects tagged with `data-type="code"`
  - Integration projects shown in both modes
- **Expertise Mapping**: Three progression levels (Known, Learning, Target)
  - Items filtered by `data-mode` attribute
- **Contact Form**: Simple email form with validation

### JavaScript
- **Mode Switcher**: Toggles `body.core` / `body.code` class, updates local storage, filters content
- **Main.js**: Navigation toggle, smooth scroll, form handling
- **No Dependencies**: Vanilla JavaScript—no external libraries needed

## How to Use

### Running Locally
1. Navigate to `/index.html` directly
2. Or from the Next.js app homepage, click "View Portfolio"

### Customizing Content
1. **Edit portfolio text**: Modify content in `index.html`
2. **Replace images**: Swap image files in `/images`
3. **Change colors**: Edit CSS variables at top of `styles.css` (--bg, --surface, --accent)
4. **Add projects**: Insert new `<article class="project-card">` elements in projects grid
5. **Update expertise**: Add/remove items in Known/Learning/Target sections with `data-mode` attributes

### Mode Attributes
Projects and expertise items use these attributes:
```html
<!-- Core-only items -->
<div data-mode="core">...</div>

<!-- Code-only items -->
<div data-mode="code">...</div>

<!-- Integration (shown in both modes) -->
<div data-mode="integration">...</div>

<!-- Project type filtering -->
<article class="project-card" data-type="core">...</article>
<article class="project-card" data-type="code">...</article>
<article class="project-card" data-type="integration">...</article>
```

## Performance Notes
- **No build step required**: Pure HTML/CSS/JS
- **Small footprint**: Total CSS ~700 lines, JS ~100 lines
- **Fast transitions**: GPU-accelerated transforms & opacity only
- **Accessible**: Semantic HTML, proper contrast ratios, ARIA attributes where needed

## Customization Quick Reference

| Element | File | How to Customize |
|---------|------|------------------|
| Person name | `index.html` line ~50 | Change "Devaprasath R" |
| Title | `index.html` line ~51 | Change "Engineer" |
| Core quote | `index.html` line ~53 | Change "Designing in steel" |
| Code quote | `index.html` line ~54 | Change "Building in code" |
| Colors | `styles.css` lines 1-27 | Edit --bg, --surface, --accent |
| Projects | `index.html` projects section | Add/remove project cards |
| Expertise | `index.html` expertise section | Add/remove expertise items |
| Contact email | `index.html` contact section | Update email link |

## Notes for Developers
- All styles use CSS custom properties for theme switching
- No preprocessor needed—plain CSS with Grid/Flexbox
- Mobile navigation handled with simple display toggle
- Form submission shows alert (can be replaced with API call)
- Mode preference stored in localStorage
- Image assets are JPG format (optimized for web)

---

**Last Updated**: April 2026
**Version**: 1.0 - Core/Code Dual Identity System
