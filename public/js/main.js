import "./data.js"
import { Data } from "./data.js";

const body = document.body;

const desktop = window.matchMedia("(min-width: 1024px)");
const tablet = window.matchMedia("(min-width: 768px)");

const navToggle = document.querySelector('#navToggle');
const navLinks = document.querySelector('#navLinks');
const modeToggle = document.querySelector("#modeToggle");
const showBtn = document.querySelector('#showAllBtn');
const closeBtn = document.querySelector('#closeBtn');
const modal = document.querySelector('#projectsModal');
const projectsGrid = document.querySelector('#projectWrapper');
const modalGrid = document.getElementById('modalGrid');
const heroImage = document.querySelector('#heroImage');
const heroTitle = document.querySelector('#heroTitle');
const heroDescription = document.querySelector('#heroDescription');
const heroIntersts = document.querySelector('#heroInterests');

// Initial runs
renderHeroSection("Core");
renderProjects();
modalGrid.innerHTML = generateProjects(Data.Projects)
desktop.addEventListener("change", renderProjects);
tablet.addEventListener("change", renderProjects);


// Browser defaults
window.addEventListener("load", () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

// Navigation key
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    window.scrollTo({
        top: target.offsetTop - 70 ,
        behavior: "smooth"
    });
  });
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Mode Switcher - Core vs Code
modeToggle.addEventListener('click', () => {
  let mode = body.dataset.mode;
  const toSet = (mode === "Code" ? "Core" : "Code");

  body.dataset.mode = toSet;

  renderHeroSection(toSet);
})

// Projects
showBtn.addEventListener('click', ()=> {
  modal.classList.add("active");
})

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});




// Functions
function renderHeroSection(mode) {
  heroImage.src = Data.Personal[mode].imgSrc;
  heroImage.alt = Data.Personal[mode].imgAlt;
  heroTitle.innerHTML = Data.Personal[mode].Title;
  heroDescription.innerHTML = Data.Personal[mode].Description;
  heroIntersts.innerHTML = Data.Personal[mode].Intrests;
}

function renderProjects() {
  const count = Number(
    getComputedStyle(projectsGrid)
      .getPropertyValue("--project-preview-count")
  );

  projectsGrid.innerHTML = generateProjects(Data.Projects, count);
}

function generateProjects(projects, count) {
  count ??= projects.length;
  return projects
    .slice(0, count)
    .map(project => `
      <div class="project-card" data-type="${project.type}">
        <img src="${project.image}" alt="${project.alt}" class="project-image" />
        <div class="project-body">
          <span class="project-tag">${project.tag}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      </div>
    `)
    .join("");
}