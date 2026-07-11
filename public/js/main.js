import "./data.js"

// Navigation
const navToggle = document.querySelector('#navToggle');
const navLinks = document.querySelector('#navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Mode Switcher - Core vs Code
const modeToggle = document.querySelector("#modeToggle");
const body = document.body;

modeToggle.addEventListener('click', () => {
  let mode = body.dataset.mode;
  body.dataset.mode = (mode === "Code" ? "Core" : "Code");
})
