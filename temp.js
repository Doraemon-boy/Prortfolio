// // Smooth scroll for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     const href = this.getAttribute('href');
//     if (href !== '#') {
//       e.preventDefault();
//       const target = document.querySelector(href);
//       if (target) {
//         target.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   });
// });


const body = document.body;
const modeToggle = document.getElementById('modeToggle');
const showBtn = document.getElementById('showAllBtn');
const modal = document.getElementById('projectsModal');
const closeBtn = document.querySelector('.close-modal');
const modalGrid = document.getElementById('modalGrid');

const allProjects = Array.from(document.querySelectorAll('.project-card'));

// Mode content definitions

const modeContent = {
  core: 'Designing in Core and Dreaming in Code',
  code: 'Designing in Core and Dreaming in Code'
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
  
  modeToggle.setAttribute('aria-pressed', isCode);
  
  // Update body class
  body.classList.remove('core', 'code');
  body.classList.add(mode);

  // Update hero quote
  const quoteEl = document.getElementById('heroMainQuote');
  if (quoteEl) {
    quoteEl.textContent = modeContent[mode];
  }

  // Update hero image
  const heroImg = document.getElementById('heroImage');
  if (heroImg) {
    heroImg.src = isCode ? './images/software-hero.jpg' : './images/mechanical-hero.jpg';
  }

  // Filter projects: core mode shows core, code 
  updateProjectsView(mode);

  // Filter expertise items
  const expertiseItems = document.querySelectorAll('.expertise-list li');
  expertiseItems.forEach(item => {
    const itemMode = item.dataset.mode;
    const shouldShow = itemMode === mode;
    item.classList.toggle('hidden', !shouldShow);
  });

  updateStageIcons(mode);

  // Save preference
  localStorage.setItem('portfolioMode', mode);
}

function updateStageIcons(mode) {
  const levels = document.querySelectorAll('.expertise-level');

  const coreIcons = ['⚙️', '🚗', '🚀'];
  const codeIcons = ['💻', '🌐', '🤖'];

  levels.forEach((level, index) => {
    level.setAttribute(
      'data-icon',
      mode === 'code' ? codeIcons[index] : coreIcons[index]
    );
  });
}

function updateProjectsView(mode) {
  let filtered = allProjects.filter(project => {
    const type = project.dataset.type;

    return (
      (mode === 'core' && type === 'core') ||
      (mode === 'code' && type === 'code')
    );
  });

  allProjects.forEach(p => p.classList.add('hidden'));

  filtered.slice(0, 3).forEach(p => {
    p.classList.remove('hidden');
  });
}

if (showBtn) {
  showBtn.addEventListener('click', () => {
    modal.classList.add('active');

    modalGrid.innerHTML = '';

    let projectsArray = Array.from(allProjects);

    let mode = document.body.classList.contains('code') ? 'code' : 'core';

    projectsArray.sort((a, b) => {
      if (a.dataset.type === mode && b.dataset.type !== mode) return -1;
      if (a.dataset.type !== mode && b.dataset.type === mode) return 1;
      return 0;
    });

    projectsArray.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.remove('hidden');
      modalGrid.appendChild(clone);
    });

    // 🔥 smooth scroll to top
    const modalContent = document.querySelector('.modal-content');
    modalContent.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});