// --- Global YouTube Player Variables ---
let player;
const videoIds = [
  'IOy7DVkG-og', // The Best Programming Projects? - Code Jam Project Showcase #5
  'aPiBYK-Eh_s', // Niche eCommerce Website Development | Project Showcase
  'Jee_g5uKQ5w', // 🔥 3D Portfolio Website | Interactive & Futuristic Web Design Showcase
  'MGnPO5K0O0A', // Maksym Marko – WordPress Developer | Website Project Showcase
  'KfiSCrXvVAw'  // Modern E-Commerce Website Built with Next.js - Full Project Showcase
];
let currentVideoIndex = 0;

/**
 * MANDATORY GLOBAL FUNCTION: Called by the YouTube IFrame API when it is ready.
 */
window.onYouTubeIframeAPIReady = function () {
  // Only attempt to initialize the player if the container element exists (i.e., on the projects page)
  if (document.getElementById('youtube-player')) {
    initializeYouTubePlayer();
  }
}

function initializeYouTubePlayer() {
  console.log("Attempting to initialize YouTube Player...");
  player = new YT.Player('youtube-player', {
    videoId: videoIds[currentVideoIndex],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log("YouTube Player is ready.");
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const nextBtn = document.getElementById('next-btn');

  if (playBtn) playBtn.addEventListener('click', playVideo);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseVideo);
  if (nextBtn) nextBtn.addEventListener('click', loadNextVideo);

  updateVideoInfo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    loadNextVideo();
  } else if (event.data == YT.PlayerState.PLAYING) {
    updateVideoInfo();
  }
}

function playVideo() {
  if (player && player.playVideo) player.playVideo();
}

function pauseVideo() {
  if (player && player.pauseVideo) player.pauseVideo();
}

function updateVideoInfo() {
  const videoInfoElement = document.getElementById('current-video-info');
  if (!videoInfoElement) return;

  setTimeout(() => {
    if (player && player.getVideoData) {
      const data = player.getVideoData();
      if (data && data.title) {
        videoInfoElement.textContent = `Now Playing: ${data.title}`;
      } else {
        videoInfoElement.textContent = `Video Loaded (ID: ${videoIds[currentVideoIndex]})`;
      }
    }
  }, 500);
}

function loadNextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoIds.length;
  const nextVideoId = videoIds[currentVideoIndex];

  const videoInfoElement = document.getElementById('current-video-info');
  if (videoInfoElement) videoInfoElement.textContent = `Loading next video...`;

  if (player && player.loadVideoById) {
    player.loadVideoById(nextVideoId);
  }
}


// --- Main Application Logic (Runs after DOM is loaded) ---
document.addEventListener('DOMContentLoaded', () => {
  // 1. **CRITICAL FIX**: Define currentPage immediately inside DOMContentLoaded
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // Global Constants
  const USER_JOURNAL_KEY = 'userJournalCards';

  // --- Data Definitions ---

  const staticJournalData = [
    // ... (Static Lab 2 & 3 Data)
    {
      id: 'static-lab2',
      title: "Lab-2: HTML & CSS Fundamentals",
      entries: [
        {
          question: "How did you approach mobile-first design?",
          answer: "I started by designing the layout for mobile size screens first, ensuring that all text, navigation, and content were readable and well spaced on a mobile device. Once the mobile version looked clean, I used CSS media queries to gradually enhance the layout for tablets and desktops."
        },
        {
          question: "What was the most useful HTML or CSS concept you applied this week?",
          answer: "The most useful concept was Flexbox and media queries, which made it easy to align navigation links and structure content sections responsively. Also shared CSS is very useful because all CSS can handle in single file."
        },
        {
          question: "What part of HTML or CSS did you find most challenging or confusing?",
          answer: "Most challenging part of CSS is to handle alignment and spacing for all elements. Otherwise for HTML it is looking easier."
        }
      ]
    },
    {
      id: 'static-lab3',
      title: "Lab-3: JavaScript & DOM Manipulation",
      entries: [
        {
          question: "Which DOM selection methods did you use, and why did you choose them?",
          answer: "I used several DOM selection methods, including getElementById() and querySelectorAll(). getElementById() was used when I needed to target specific elements like the navigation container (nav-container), the journal form (journal-form), and buttons such as the theme toggle (theme-btn), because it directly selects a unique element and is efficient. and querySelectorAll() was used to apply logic to multiple elements, like highlighting the active navigation link, since it allows selecting multiple items using CSS selectors and iterating through them easily."
        },
        {
          question: "What was the most challenging part about linking JavaScript with your HTML?",
          answer: "The most challenging part was ensuring that the JavaScript file loaded correctly on all pages and that elements existed in the DOM before running certain functions. Since the same script is reused across multiple pages, I had to use conditional checks (like if (navContainer) { ... }) to prevent errors on pages where specific elements weren’t present. Managing event listeners for dynamic elements such as collapsible sections and theme buttons also required careful handling."
        },
        {
          question: "How did you test and debug your JavaScript code?",
          answer: "I tested the code by opening each page in the browser and checking whether the navigation loaded automatically, the theme toggle worked, and form validation behaved correctly. I used the browser’s Developer Tools Console to monitor for any JavaScript errors, used console.log() statements for debugging logic, and refreshed pages after each update to confirm that DOM manipulations were happening correctly."
        }
      ]
    }
  ];

  const projectData = [
    {
      title: "Responsive Learning Journal PWA",
      description: "A Progressive Web Application (PWA) built using HTML, CSS, and JavaScript. It features a responsive layout, theme switching (light/dark mode), dynamic navigation generation, real-time date/time updates, and utilizes Local Storage for persistent data management (the journal cards).",
      status: "In Progress",
      tags: ["HTML5", "CSS3", "JavaScript", "Local Storage"]
    },
    {
      title: "Simple Task Manager (Future Feature)",
      description: "A fast and accurate temperature conversion tool designed to easily switch between Celsius, Fahrenheit values.",
      status: "Planned",
      tags: ["JavaScript", "UI/UX", "Android"]
    },
    {
      title: "Temperature Converter",
      description: "A planned expansion to the PWA, this manager will allow users to add, delete, and mark tasks as complete. It will involve complex DOM manipulation and data structuring within Local Storage to handle task lists and status updates.",
      status: "Completed",
      tags: ["JavaScript", "UI/UX", "Data Structures", "Future"]
    }
  ];

  // Define all navigation items with their filenames - **UPDATED**
  const navItems = [
    { name: 'Home', file: 'index.html' },
    { name: 'Journal', file: 'journal.html' },
    { name: 'Projects', file: 'projects.html' },
    { name: 'Reflections', file: 'reflections.html' }, // <-- New Page
    { name: 'About', file: 'about.html' }
  ];

  // --- Local Storage Handlers (Journal) ---
  const loadUserCards = () => {
    try {
      const storedCards = localStorage.getItem(USER_JOURNAL_KEY);
      return storedCards ? JSON.parse(storedCards) : [];
    } catch (e) {
      console.error("Error loading user journal cards:", e);
      return [];
    }
  };

  const saveUserCards = (cards) => {
    try {
      localStorage.setItem(USER_JOURNAL_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error("Error saving user journal cards:", e);
    }
  };


  // --- Shared Utility Functions (Navbar, Theme, Footer) ---

  const navbarContainer = document.getElementById('navbar-container');

  // Generate List Items with 'active' class check
  const navLinksHTML = navItems.map(item => {
    const isActive = (item.file === currentPage);

    return `
            <li class="${isActive ? 'active' : ''}">
                <a href="${item.file}">${item.name}</a>
            </li>
        `;
  }).join('');

  // Generate Navbar HTML
  const navbarHTML = `
        <nav class="navbar">
            <div class="navbar-left">
                <div class="logo">
                    <img src='images/logo.svg' width='30px'>
                </div>
                
                <ul class="nav-links" id="nav-menu">
                    ${navLinksHTML}
                </ul>
            </div>
            
            <button class="theme-switch" aria-label="Toggle theme" id="desktop-theme-toggle">
                ☀️ 
            </button>
            
            <div class="navbar-right-mobile">
                <button class="theme-switch" aria-label="Toggle theme" id="mobile-theme-toggle">
                    ☀️
                </button>
                <button class="menu-button" aria-label="Toggle navigation" id="menu-toggle">
                    &#9776; 
                </button>
            </div>
        </nav>
    `;

  if (navbarContainer) {
    navbarContainer.innerHTML = navbarHTML;
  }

  // Mobile Menu Toggle Functionality
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Dark/Light Theme Switch Functionality
  const desktopThemeToggle = document.getElementById('desktop-theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const body = document.body;

  const themeSwitchHandler = () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    const icon = isDark ? '🌙' : '☀️';

    if (desktopThemeToggle) desktopThemeToggle.innerHTML = icon;
    if (mobileThemeToggle) mobileThemeToggle.innerHTML = icon;

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  if (desktopThemeToggle || mobileThemeToggle) {
    if (desktopThemeToggle) desktopThemeToggle.addEventListener('click', themeSwitchHandler);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', themeSwitchHandler);

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      body.classList.add('dark-theme');
      const icon = '🌙';
      if (desktopThemeToggle) desktopThemeToggle.innerHTML = icon;
      if (mobileThemeToggle) mobileThemeToggle.innerHTML = icon;
    }
  }

  // Live Date and Time Functionality
  const footerElement = document.getElementById('app-footer');

  function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    const formattedDate = now.toLocaleDateString(undefined, dateOptions);
    const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

    if (footerElement) {
      footerElement.innerHTML = `&copy; ${now.getFullYear()} Learning Journal PWA | ${formattedDate} | ${formattedTime}`;
    }
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  // --- PAGE SPECIFIC LOGIC BLOCKS ---

  // JOURNAL PAGE LOGIC
  if (currentPage === 'journal.html') {
    const journalArea = document.getElementById('journal-entries-area');
    const journalContentContainer = document.querySelector('.journal-content-container');

    const attachToggleListeners = () => {
      document.querySelectorAll('.collapsible-header').forEach(header => {
        header.onclick = null;
        header.addEventListener('click', () => {
          const content = header.nextElementSibling;
          const isActive = header.classList.toggle('active');

          document.querySelectorAll('.collapsible-content.show').forEach(openContent => {
            if (openContent !== content) {
              openContent.classList.remove('show');
              openContent.style.maxHeight = '0';
              openContent.previousElementSibling.classList.remove('active');
              openContent.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
          });

          if (isActive) {
            content.classList.add('show');
            content.style.maxHeight = content.scrollHeight + "px";
            header.setAttribute('aria-expanded', 'true');
          } else {
            content.classList.remove('show');
            content.style.maxHeight = '0';
            header.setAttribute('aria-expanded', 'false');
          }
        });
      });
      attachDeleteListeners();
    };

    const renderEntryFields = (entries = [{ question: '', answer: '' }]) => {
      const container = document.getElementById('form-entries-container');
      if (!container) return;

      container.innerHTML = entries.map((entry, index) => `
                <div class="form-entry-item" data-id="${index}">
                    <label for="q-${index}">Question:</label>
                    <input type="text" id="q-${index}" name="question" value="${entry.question}" required>
                    
                    <label for="a-${index}">Answer:</label>
                    <textarea id="a-${index}" name="answer" rows="3" required>${entry.answer}</textarea>
                    
                    ${index > 0 ? `<button type="button" class="remove-entry-btn">Remove Entry</button>` : ''}
                </div>
            `).join('');

      document.querySelectorAll('.remove-entry-btn').forEach(btn => {
        btn.onclick = null;
        btn.addEventListener('click', (e) => {
          e.target.closest('.form-entry-item').remove();
        });
      });
    };

    const renderJournalContent = () => {
      let userCards = loadUserCards();
      const allCards = staticJournalData.concat(userCards);

      let contentHTML = '';

      allCards.forEach((card) => {
        const isUserCard = !String(card.id).startsWith('static-');

        let labContent = card.entries.map((entry) => {
          return `
                        <div class="journal-card">
                            <button class="collapsible-header" aria-expanded="false">
                                <span>${entry.question}</span>
                                <span class="icon">&#9660;</span>
                            </button>
                            <div class="collapsible-content">
                                <p>${entry.answer}</p>
                            </div>
                        </div>
                    `;
        }).join('');

        const deleteButton = isUserCard ?
          `<button class="delete-card-btn" title="Delete Card">🗑️ Delete</button>` : '';

        contentHTML += `
                    <div class="lab-container" data-card-id="${card.id}">
                        <div class="lab-header-wrapper">
                            <h2>${card.title}</h2>
                            ${deleteButton}
                        </div>
                        ${labContent}
                    </div>
                `;
      });

      contentHTML += `<button id="add-card-btn" class="add-card-button">+ Add New Journal Entry</button>`;

      journalArea.innerHTML = contentHTML;
      attachToggleListeners();
      attachFormHandler();
    };

    const deleteUserCard = (cardId) => {
      let userCards = loadUserCards();
      const initialLength = userCards.length;

      userCards = userCards.filter(card => card.id !== cardId);

      if (userCards.length < initialLength) {
        saveUserCards(userCards);
        renderJournalContent();
      }
    };

    const attachDeleteListeners = () => {
      document.querySelectorAll('.delete-card-btn').forEach(button => {
        button.onclick = null;
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const cardId = button.closest('.lab-container').dataset.cardId;

          if (cardId) {
            // NOTE: Replacing confirm() with a basic UI message as per instructions
            if (window.confirm(`Are you sure you want to delete the card titled: "${button.closest('.lab-container').querySelector('h2').textContent}"?`)) {
              deleteUserCard(cardId);
            }
          }
        });
      });
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();

      const title = document.getElementById('main-title').value.trim();
      const entriesRaw = document.querySelectorAll('.form-entry-item');
      const entries = [];

      entriesRaw.forEach(item => {
        const question = item.querySelector('input[name="question"]').value.trim();
        const answer = item.querySelector('textarea[name="answer"]').value.trim();
        if (question && answer) {
          entries.push({ question, answer });
        }
      });

      if (title && entries.length > 0) {
        const newCard = {
          id: crypto.randomUUID(),
          title: title,
          entries: entries
        };

        let userCards = loadUserCards();
        userCards.push(newCard);
        saveUserCards(userCards);

        // Assuming the modal is removed via a class or ID
        document.getElementById('new-card-form-modal')?.remove();

        renderJournalContent();
      } else {
        console.error("Please ensure the main title and at least one Q&A entry are filled out.");
      }
    };

    const attachFormHandler = () => {
      const addCardBtn = document.getElementById('add-card-btn');

      if (addCardBtn) {
        addCardBtn.onclick = null;
        addCardBtn.addEventListener('click', () => {
          if (document.getElementById('new-card-form-modal')) return;

          journalContentContainer.insertAdjacentHTML('afterend', `
                        <div id="new-card-form-modal" class="modal-overlay">
                            <form id="new-card-form" class="card-form">
                                <h3>Add New Journal Card</h3>
                                <label for="main-title">Main Card Title (e.g., Lab-4, Week 5 Summary):</label>
                                <input type="text" id="main-title" required>
                                
                                <h4>Q&A Entries</h4>
                                <div id="form-entries-container">
                                    <!-- Entries inserted here -->
                                </div>
                                
                                <button type="button" id="add-entry-btn" class="add-card-button">+ Add Q&A Entry</button>
                                
                                <div class="form-actions">
                                    <button type="submit" class="submit-button">Submit Card</button>
                                    <button type="button" id="cancel-form-btn" class="cancel-button">Cancel</button>
                                </div>
                            </form>
                        </div>
                    `);

          renderEntryFields();

          const modal = document.getElementById('new-card-form-modal');
          const form = document.getElementById('new-card-form');
          const addEntryBtn = document.getElementById('add-entry-btn');
          const cancelBtn = document.getElementById('cancel-form-btn');

          addEntryBtn.addEventListener('click', () => {
            renderEntryFields([...document.querySelectorAll('.form-entry-item')].map(item => ({
              question: item.querySelector('input[name="question"]').value,
              answer: item.querySelector('textarea[name="answer"]').value
            })).concat([{ question: '', answer: '' }]));
          });

          cancelBtn.addEventListener('click', () => {
            modal.remove();
          });

          form.addEventListener('submit', handleFormSubmit);
        });
      }
    };

    renderJournalContent();
  }

  // PROJECTS PAGE LOGIC
  if (currentPage === 'projects.html') {
    const projectsArea = document.getElementById('projects-area');

    const renderProjectContent = () => {
      let projectsHTML = projectData.map(project => {
        const tagBadges = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');

        let statusClass = '';
        if (project.status === 'Completed') statusClass = 'status-complete';
        else if (project.status === 'In Progress') statusClass = 'status-progress';
        else statusClass = 'status-planned';

        return `
                    <div class="project-card">
                        <div class="project-header">
                            <h3>${project.title}</h3>
                            <span class="project-status ${statusClass}">${project.status}</span>
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tags">
                            ${tagBadges}
                        </div>
                    </div>
                `;
      }).join('');

      if (projectsArea) {
        projectsArea.innerHTML = projectsHTML;
      }
    };

    renderProjectContent();
  }

  // REFLECTIONS PAGE LOGIC
  if (currentPage === 'reflections.html') {
    const reflectionsList = document.getElementById('reflections-list');
    const loadingStatus = document.getElementById('loading-status');
    const exportBtn = document.getElementById('export-json-btn');

    const displayStatus = (message, isError = false) => {
      reflectionsList.innerHTML = `<div class="no-reflections-message">${isError ? 'Error: ' : ''}${message}</div>`;
    };

    const fetchReflections = async () => {
      loadingStatus.textContent = 'Fetching reflections...';
      try {
        // Fetch the reflections.json file from the same directory
        const response = await fetch('backend/reflections.json');

        if (!response.ok) {
          // Check if the file is not found (404) or empty/unreadable
          if (response.status === 404) {
            displayStatus("Reflections file not found. Ensure 'reflections.json' is in the root directory.");
            return;
          }
          // Attempt to read as text to debug non-JSON responses
          const text = await response.text();
          if (text.trim() === '[]' || text.trim() === '') {
            displayStatus("No reflections found. Use the Python script (save_entry.py) to add entries.");
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}. Response: ${text.substring(0, 50)}...`);
        }

        const reflections = await response.json();

        if (reflections.length === 0) {
          displayStatus("No reflections found. Use the Python script (save_entry.py) to add entries.");
          return;
        }

        reflections.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        reflectionsList.innerHTML = reflections.map(entry => {
          // Use UTC timestamp for robustness
          const date = new Date(entry.timestamp);
          const formattedDate = date.toLocaleString();
          return `
                        <div class="reflection-card">
                            <h4>${formattedDate}</h4>
                            <p>${entry.reflection}</p>
                        </div>
                    `;
        }).join('');

      } catch (error) {
        console.error("Failed to load reflections:", error);
        displayStatus(`Could not load reflections. Ensure 'reflections.json' is properly formatted JSON. Details: ${error.message}`, true);
      }
    };

    const exportReflections = () => {
      fetch('backend/reflections.json')
        .then(response => response.json())
        .then(data => {
          const jsonString = JSON.stringify(data, null, 2);
          const blob = new Blob([jsonString], { type: 'application/json' });
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'reflections_export.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error("Export failed:", error);
          const statusMessage = document.createElement('div');
          statusMessage.textContent = 'Export failed. Check console for details.';
          statusMessage.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #f44336; color: white; padding: 10px; border-radius: 5px; z-index: 1001;';
          document.body.appendChild(statusMessage);
          setTimeout(() => statusMessage.remove(), 3000);
        });
    };

    fetchReflections();
    if (exportBtn) {
      exportBtn.addEventListener('click', exportReflections);
    }
  }
});