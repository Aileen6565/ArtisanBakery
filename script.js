// ==========================================================================
// Pure JavaScript: Add top-left button to change page background color
// ==========================================================================

(function() {
  if (window.__bgChangeButtonLoaded) return;
  window.__bgChangeButtonLoaded = true;

  // 1. Array of vibrant, unmistakable background colors
  const backgrounds = [
    { name: 'Vibrant Blue', color: '#1d4ed8', text: '#ffffff' },
    { name: 'Forest Green', color: '#15803d', text: '#ffffff' },
    { name: 'Crimson Red', color: '#b91c1c', text: '#ffffff' },
    { name: 'Warm Amber Orange', color: '#c2410c', text: '#ffffff' },
    { name: 'Royal Purple', color: '#7e22ce', text: '#ffffff' },
    { name: 'Ocean Teal', color: '#0f766e', text: '#ffffff' },
    { name: 'Original Hearth', color: '#100c09', text: '#fcf9f2' }
  ];

  let currentIndex = 0;

  // 2. Function to apply the background color across the entire page
  function applyBackgroundColor(theme) {
    // Set direct style properties on body and html
    document.body.style.backgroundColor = theme.color;
    document.body.style.background = theme.color;
    if (document.documentElement) {
      document.documentElement.style.backgroundColor = theme.color;
      document.documentElement.style.background = theme.color;
      document.documentElement.style.setProperty('--color-bg-base', theme.color);
      document.documentElement.style.setProperty('--color-bg-surface', theme.color);
    }

    // Direct inline styles on all section wrappers to ensure body background is 100% visible
    const elementsToClear = document.querySelectorAll(
      '.section, section, .signature-section, .story-section, .schedule-section, .contact-section, .site-footer'
    );
    elementsToClear.forEach(function(el) {
      el.style.backgroundColor = 'transparent';
      el.style.background = 'transparent';
    });

    // Make hero overlay transparent and reduce background image opacity so the color is immediately visible at the top
    const heroBg = document.querySelector('.hero-background-wrapper');
    if (heroBg) {
      heroBg.style.opacity = theme.color === '#100c09' ? '1' : '0.22';
      heroBg.style.transition = 'opacity 0.3s ease';
    }
    const heroOverlay = document.querySelector('.hero-overlay');
    if (heroOverlay) {
      heroOverlay.style.background = theme.color === '#100c09' ? '' : 'transparent';
    }

    // Dynamic style tag injected purely via JavaScript to override any CSS gradient rules
    let dynamicStyle = document.getElementById('dynamic-bg-override');
    if (!dynamicStyle) {
      dynamicStyle = document.createElement('style');
      dynamicStyle.id = 'dynamic-bg-override';
      document.head.appendChild(dynamicStyle);
    }

    dynamicStyle.textContent = `
      body {
        background-color: ${theme.color} !important;
        background: ${theme.color} !important;
        transition: background-color 0.3s ease !important;
      }
      .signature-section,
      .story-section,
      .schedule-section,
      .contact-section,
      .site-footer,
      .section {
        background: transparent !important;
        background-color: transparent !important;
      }
      .hero-background-wrapper {
        opacity: ${theme.color === '#100c09' ? '1' : '0.22'} !important;
      }
      .hero-overlay {
        background: ${theme.color === '#100c09' ? '' : 'transparent'} !important;
      }
    `;
  }

  // 3. Create button element purely with JavaScript
  function initButton() {
    let button = document.getElementById('bg-change-btn');
    if (!button) {
      button = document.createElement('button');
      button.id = 'bg-change-btn';
      button.type = 'button';
      button.textContent = '🎨 Change Background';

      // Style and position button at the top-left of the page
      button.style.position = 'fixed';
      button.style.top = '12px';
      button.style.left = '12px';
      button.style.zIndex = '999999';
      button.style.padding = '10px 18px';
      button.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      button.style.fontSize = '14px';
      button.style.fontWeight = '700';
      button.style.color = '#100c09';
      button.style.backgroundColor = '#e5a453';
      button.style.border = '2px solid #ffffff';
      button.style.borderRadius = '30px';
      button.style.cursor = 'pointer';
      button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.6)';
      button.style.outline = 'none';
      button.style.transition = 'all 0.2s ease';
      button.style.display = 'inline-flex';
      button.style.alignItems = 'center';
      button.style.gap = '8px';

      // Hover feedback
      button.onmouseenter = function() {
        button.style.backgroundColor = '#f7ca88';
        button.style.transform = 'translateY(-2px) scale(1.05)';
      };
      button.onmouseleave = function() {
        button.style.backgroundColor = '#e5a453';
        button.style.transform = 'translateY(0) scale(1)';
      };

      // Add click event listener to change background color
      button.onclick = function() {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        const currentTheme = backgrounds[currentIndex];
        applyBackgroundColor(currentTheme);
        button.textContent = '🎨 ' + currentTheme.name;
      };

      document.body.prepend(button);
    }

    // Also ensure 'Our Story' and 'Contact Us' elements remain yellow
    const textElements = document.querySelectorAll('a, span, h2, .dropdown-item');
    textElements.forEach(function(el) {
      const text = el.textContent.trim().toLowerCase();
      if (text === 'our story' || text === 'contact us') {
        el.style.color = 'yellow';
      }
    });

    // Support click-to-toggle on mobile for the About Us dropdown
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          dropdownMenu.classList.toggle('active');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initButton);
  } else {
    initButton();
  }
})();
