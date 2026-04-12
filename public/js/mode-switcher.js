// Mode Switcher - Core vs Code

const modeToggle = document.getElementById('modeToggle');
const modeLabel = document.getElementById('modeLabel');
const body = document.body;

// Mode content definitions
const modeContent = {
  core: {
    quote: 'Designing in steel.'
  },
  code: {
    quote: 'Building in code.'
  }
};

// Initialize mode from localStorage or default
const savedMode = localStorage.getItem('portfolioMode') || 'core';
setMode(savedMode);

// Mode toggle click handler
modeToggle.addEventListener('click', () => {
  const currentMode = body.classList.contains('core') ? 'core' : 'code';
  const newMode = currentMode === 'core' ? 'code' : 'core';
  setMode(newMode);
});

function setMode(mode) {
  const isCode = mode === 'code';
  
  // Update body class
  body.classList.remove('core', 'code');
  body.classList.add(mode);

  // Update mode label
  modeLabel.textContent = isCode ? 'Code' : 'Core';

  // Update hero quote
  const quoteEl = document.getElementById('heroQuote');
  if (quoteEl) {
    quoteEl.textContent = modeContent[mode].quote;
  }

  // Update hero image
  const heroImg = document.getElementById('heroImage');
  if (heroImg) {
    heroImg.src = isCode ? '/images/software-hero.jpg' : '/images/mechanical-hero.jpg';
  }

  // Filter projects: core mode shows core + integration, code mode shows code + integration
  const projects = document.querySelectorAll('.project-card');
  projects.forEach(project => {
    const projectType = project.dataset.type;
    const shouldShow = 
      (mode === 'core' && (projectType === 'core' || projectType === 'integration')) ||
      (mode === 'code' && (projectType === 'code' || projectType === 'integration'));
    
    project.classList.toggle('hidden', !shouldShow);
  });

  // Filter expertise items
  const expertiseItems = document.querySelectorAll('.expertise-list li');
  expertiseItems.forEach(item => {
    const itemMode = item.dataset.mode;
    const shouldShow = itemMode === mode;
    item.classList.toggle('hidden', !shouldShow);
  });

  // Save preference
  localStorage.setItem('portfolioMode', mode);
}
