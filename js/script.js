const sunIcon = '☀️';
const moonIcon = '🌙';

const navHTML = `
  <nav>
    <a href="index.html">Home</a>
    <a href="journal.html">Journal</a>
    <a href="projects.html">Projects</a>
    <a href="about.html">About</a>
    <button id="theme-btn" title="Toggle dark/light mode">${moonIcon}</button>
  </nav>
`;
const navContainer = document.getElementById('nav-container');
if (navContainer) navContainer.innerHTML = navHTML;

const currentPage = location.pathname.split('/').pop();
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

function getStoredTheme() {
    return localStorage.getItem('theme') === 'dark';
}
function setStoredTheme(isDark) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
function applyTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    if (themeBtn) themeBtn.innerHTML = isDark ? sunIcon : moonIcon;
    if (themeBtn) themeBtn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
}
const themeBtn = document.getElementById('theme-btn');
const initialTheme = getStoredTheme();
applyTheme(initialTheme);

if (themeBtn) {
    themeBtn.addEventListener('click', function () {
        const newTheme = !getStoredTheme();
        setStoredTheme(newTheme);
        applyTheme(newTheme);
    });
}

const collapsibleBtn = document.querySelector('.collapsible');
if (collapsibleBtn) {
    collapsibleBtn.addEventListener('click', function () {
        const content = collapsibleBtn.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
}

const lab2Journals = [
    {
        title: "How did you approach mobile-first design?",
        content: "I started by designing the layout for mobile size screens first, ensuring that all text, navigation, and content were readable and well spaced on a mobile device. Once the mobile version looked clean, I used CSS media queries to gradually enhance the layout for tablets and desktops."
    },
    {
        title: "What was the most useful HTML or CSS concept you applied this week?",
        content: "The most useful concept was Flexbox and media queries, which made it easy to align navigation links and structure content sections responsively. Also shared CSS is very useful because all CSS can handle in single file."
    },
    {
        title: "What part of HTML or CSS did you find most challenging or confusing?",
        content: "Most challenging part of CSS is to handle alignment and spacing for all elements. Otherwise for HTML it is looking easier."
    }
];

const lab3Journals = [
    {
        title: "Which DOM selection methods did you use, and why did you choose them?",
        content: "I used several DOM selection methods, including getElementById() and querySelectorAll(). getElementById() was used when I needed to target specific elements like the navigation container (nav-container), the journal form (journal-form), and buttons such as the theme toggle (theme-btn), because it directly selects a unique element and is efficient. and querySelectorAll() was used to apply logic to multiple elements, like highlighting the active navigation link, since it allows selecting multiple items using CSS selectors and iterating through them easily."
    },
    {
        title: "What was the most challenging part about linking JavaScript with your HTML?",
        content: "The most challenging part was ensuring that the JavaScript file loaded correctly on all pages and that elements existed in the DOM before running certain functions. Since the same script is reused across multiple pages, I had to use conditional checks (like if (navContainer) { ... }) to prevent errors on pages where specific elements weren’t present. Managing event listeners for dynamic elements such as collapsible sections and theme buttons also required careful handling."
    },
    {
        title: "How did you test and debug your JavaScript code?",
        content: "I tested the code by opening each page in the browser and checking whether the navigation loaded automatically, the theme toggle worked, and form validation behaved correctly. I used the browser’s Developer Tools Console to monitor for any JavaScript errors, used console.log() statements for debugging logic, and refreshed pages after each update to confirm that DOM manipulations were happening correctly. This helped me identify missing element IDs or syntax issues quickly."
    }
];

function createSubCard({ title, content }, idx, labKey) {
    return `
    <div class="sub-card" id="${labKey}-sub-card-${idx}">
      <div class="sub-card-header" tabindex="0">
        <span>${title}</span>
        <span class="toggle-icon">+</span>
      </div>
      <div class="sub-card-content" id="${labKey}-sub-card-content-${idx}">
        <div>${content}</div>
      </div>
    </div>
  `;
}

function createLabCard(cardTitle, dataArr, labKey) {
    return `
    <div class="lab-card" id="${labKey}-main-card">
      <div class="card-header" tabindex="0">
        <span>${cardTitle}</span>
        <span class="toggle-icon">+</span>
      </div>
      <div class="card-content" id="${labKey}-main-content">
        ${dataArr.map((j, i) => createSubCard(j, i, labKey)).join("")}
      </div>
    </div>
  `;
}

function renderJournalCards() {
    const container = document.getElementById('lab2-card-container');
    if (!container) return;
    container.innerHTML =
        createLabCard("Lab-2: FRONTEND FUNDAMENTALS", lab2Journals, "lab2") +
        createLabCard("Lab-3: JAVASCRIPT & DOM MANIPULATION", lab3Journals, "lab3");

    ["lab2", "lab3"].forEach(labKey => {
        const mainHeader = document.querySelector(`#${labKey}-main-card .card-header`);
        const mainContent = document.getElementById(`${labKey}-main-content`);
        const mainToggleIcon = mainHeader.querySelector('.toggle-icon');
        mainHeader.addEventListener('click', () => {
            mainContent.classList.toggle('open');
            mainToggleIcon.textContent = mainContent.classList.contains('open') ? "−" : "+";
        });
        mainHeader.addEventListener('keydown', e => {
            if (e.key === "Enter" || e.key === " ") mainHeader.click();
        });

        (labKey === "lab2" ? lab2Journals : lab3Journals).forEach((_, idx) => {
            const subHeader = document.querySelector(`#${labKey}-sub-card-${idx} .sub-card-header`);
            const subContent = document.getElementById(`${labKey}-sub-card-content-${idx}`);
            const subToggleIcon = subHeader.querySelector('.toggle-icon');
            subHeader.addEventListener('click', () => {
                subContent.classList.toggle('open');
                subToggleIcon.textContent = subContent.classList.contains('open') ? "−" : "+";
            });
            subHeader.addEventListener('keydown', e => {
                if (e.key === "Enter" || e.key === " ") subHeader.click();
            });
        });
    });
}

if (window.location.pathname.endsWith("journal.html")) {
    renderJournalCards();
}
function typeAndErase(msg, elId, typeSpeed = 90, eraseSpeed = 40, pause = 1200) {
    const el = document.getElementById(elId);
    let i = 0;
    let writing = true;

    function typeWriter() {
        if (writing && i <= msg.length) {
            el.textContent = msg.slice(0, i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else if (writing) {
            writing = false;
            setTimeout(typeWriter, pause);
        } else if (!writing && i >= 0) {
            el.textContent = msg.slice(0, i);
            i--;
            setTimeout(typeWriter, eraseSpeed);
        } else {
            writing = true;
            setTimeout(typeWriter, pause);
        }
    }
    typeWriter();
}

if (window.location.pathname.endsWith("index.html")) {
    typeAndErase("Welcome to Jay's Learning Journal", "animated-message");
}
function updateFooterDate() {
    const footerEl = document.getElementById("footer-date");
    if (footerEl) {
        footerEl.textContent = "Current date & time: " + new Date().toLocaleString();
    }
}
updateFooterDate();
setInterval(updateFooterDate, 1000);
function renderProjectSummary() {
    const summaryContainer = document.getElementById('projects-summary');
    if (!summaryContainer) return;
    summaryContainer.innerHTML = `
    <div class="lab-card" id="project-summary-card">
      <div class="card-header" tabindex="0">
        <span>Learning Journal PWA Project — Overview</span>
      </div>
      <div class="card-content open" id="project-summary-content">
        <div>
          This Learning Journal Progressive Web App (PWA) brings together the essential tools and concepts for modern web app development. Starting with the basics of GitHub, VS Code, and project setup, you’ll build a personal journal site using HTML, CSS, and JavaScript to create a clean and interactive user experience. Your journal is enhanced further with API connections, backend data storage with Python and JSON, and a Flask-powered server that lets you manage your entries and test your app live. By the end, you’ll complete your journey with a fully offline-ready PWA, integrating manifest files and service workers for reliability, and connecting to both browser and third-party APIs for richer features. This project is a showcase of combining frontend and backend technologies, version control, testing workflows, and delivering a complete web application ready for user interaction and future expansion.
        </div>
      </div>
    </div>
  `;
}

if (window.location.pathname.endsWith("projects.html")) {
    renderProjectSummary();
}

