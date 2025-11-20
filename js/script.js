function injectNavbar() {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  navContainer.innerHTML = `
        <header class="site-header">
            <nav class="navbar">
                <div class="nav-logo">
                    <!-- Logo on the left -->
                    <a href="index.html">LJ</a>
                </div>

                <!-- Center navigation links (desktop) -->
                <ul class="nav-links">
                    <li><a href="index.html" data-page="home">Home</a></li>
                    <li><a href="journal.html" data-page="journal">Journal</a></li>
                    <li><a href="project.html" data-page="project">Project</a></li>
                    <li><a href="about.html" data-page="about">About</a></li>
                </ul>

                <!-- Right side: theme toggle + mobile menu button -->
                <div class="nav-right">
                    <button class="nav-theme-toggle" type="button" aria-label="Toggle theme">
                        <span class="theme-icon"></span>
                    </button>

                    <button class="nav-toggle" type="button" aria-label="Toggle navigation menu">
                        <span class="nav-toggle-bar"></span>
                    </button>
                </div>
            </nav>

            <!-- Full-screen overlay menu for mobile -->
            <div class="nav-overlay">
                <div class="nav-overlay-inner">
                    <ul class="nav-overlay-links">
                        <li><a href="index.html" data-page="home">Home</a></li>
                        <li><a href="journal.html" data-page="journal">Journal</a></li>
                        <li><a href="project.html" data-page="project">Project</a></li>
                        <li><a href="about.html" data-page="about">About</a></li>
                    </ul>
                </div>
            </div>
        </header>
    `;
}

function getCurrentPageKey() {
  const path = window.location.pathname.split("/").pop() || "index.html";

  if (path === "" || path === "index.html") return "home";
  const base = path.replace(".html", "");
  return base || "home";
}

function setActiveNavLink() {
  const currentPage = getCurrentPageKey();
  const links = document.querySelectorAll(
    ".nav-links a[data-page], .nav-overlay-links a[data-page]"
  );

  links.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

const THEME_STORAGE_KEY = "lj_preferred_theme";

function applyTheme(theme) {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function initTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
    return;
  }

  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(prefersDark ? "dark" : "light");
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
}

function openMobileMenu() {
  document.body.classList.add("nav-open");
}

function closeMobileMenu() {
  document.body.classList.remove("nav-open");
}

function toggleMobileMenu() {
  document.body.classList.toggle("nav-open");
}

function handleResizeCloseMenu() {
  if (window.innerWidth > 720 && document.body.classList.contains("nav-open")) {
    closeMobileMenu();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectNavbar();

  initTheme();

  setActiveNavLink();

  initLiveDateTime();

  injectFooter();

  const themeToggleBtn = document.querySelector(".nav-theme-toggle");
  const navToggleBtn = document.querySelector(".nav-toggle");
  const overlay = document.querySelector(".nav-overlay");
  const overlayLinks = document.querySelectorAll(".nav-overlay-links a");

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      toggleTheme();
    });
  }

  if (navToggleBtn) {
    navToggleBtn.addEventListener("click", () => {
      toggleMobileMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeMobileMenu();
      }
    });
  }

  overlayLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  window.addEventListener("resize", handleResizeCloseMenu);
});

function initLiveDateTime() {
  const dateEl = document.getElementById("live-date");
  const timeEl = document.getElementById("live-time");

  if (!dateEl || !timeEl) return;

  const updateDateTime = () => {
    const now = new Date();

    const dateString = now.toLocaleDateString(undefined, {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const timeString = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    dateEl.textContent = dateString;
    timeEl.textContent = timeString;
  };

  updateDateTime();
  setInterval(updateDateTime, 1000);
}

if (document.querySelector("#journal-form")) {
  const form = document.getElementById("journal-form");
  const addQA = document.getElementById("add-qa");
  const saveEntry = document.getElementById("save-entry");
  const qaContainer = document.getElementById("qa-container");
  const entriesContainer = document.getElementById("entries-container");

  const STORAGE_KEY = "journal_entries";

  addQA.addEventListener("click", () => {
    const qa = document.createElement("div");
    qa.classList.add("qa-pair");
    qa.innerHTML = `
            <div class="form-group">
                <label>Question</label>
                <input type="text" class="qa-question" placeholder="Enter question">
            </div>

            <div class="form-group">
                <label>Answer</label>
                <textarea class="qa-answer" rows="3" placeholder="Enter answer"></textarea>
            </div>
        `;
    qaContainer.appendChild(qa);
  });

  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    entriesContainer.innerHTML = "";

    entries.forEach((entry, index) => {
      const card = document.createElement("div");
      card.classList.add("journal-entry-card", "glass-card");

      // Build Q/A list
      let qaHTML = "";
      entry.qa.forEach((item, i) => {
        qaHTML += `
                    <div class="qa-block">
                        <p><strong>Q-${i + 1}:</strong> ${item.q}</p>
                        <p><strong>A-${i + 1}:</strong> ${item.a}</p>
                    </div>
                `;
      });

      card.innerHTML = `
                <h3>${entry.title}</h3>
                <span class="pill">${entry.date}</span>

                <div class="collapsible-content" style="display:none; margin-top:0.6rem;">
                    ${qaHTML}
                </div>

                <div class="card-actions">
                    <button class="btn ghost-btn small-btn collapse-btn">Expand</button>
                    <button class="btn primary-btn small-btn delete-btn">Delete</button>
                </div>
            `;

      const collapsible = card.querySelector(".collapsible-content");
      const collapseBtn = card.querySelector(".collapse-btn");
      collapseBtn.addEventListener("click", () => {
        const isOpen = collapsible.style.display === "block";
        collapsible.style.display = isOpen ? "none" : "block";
        collapseBtn.textContent = isOpen ? "Expand" : "Collapse";
      });

      card.querySelector(".delete-btn").addEventListener("click", () => {
        entries.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        loadEntries();
      });

      entriesContainer.appendChild(card);
    });
  }

  saveEntry.addEventListener("click", () => {
    const title = document.getElementById("journal-title").value.trim();
    const date = document.getElementById("journal-date").value;
    const questions = Array.from(document.querySelectorAll(".qa-question"));
    const answers = Array.from(document.querySelectorAll(".qa-answer"));

    if (!title || !date) {
      alert("Please enter Title and Date.");
      return;
    }

    const qaPairs = questions.map((q, i) => ({
      q: q.value.trim(),
      a: answers[i].value.trim()
    })).filter(pair => pair.q !== "" || pair.a !== "");

    if (qaPairs.length === 0) {
      alert("Add at least one Question & Answer.");
      return;
    }

    const newEntry = {
      title,
      date,
      qa: qaPairs
    };

    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    entries.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

    form.reset();
    qaContainer.innerHTML = `
            <div class="qa-pair">
                <div class="form-group">
                    <label>Question</label>
                    <input type="text" class="qa-question" placeholder="Enter question">
                </div>
                <div class="form-group">
                    <label>Answer</label>
                    <textarea class="qa-answer" rows="3" placeholder="Enter answer"></textarea>
                </div>
            </div>
        `;

    loadEntries();
  });

  function preloadSamples() {
    if (localStorage.getItem("samples_loaded")) return;

    const samples = [
      {
        title: "Lab-2",
        date: "19/10/2025",
        qa: [
          {
            q: "How did you approach mobile-first design?",
            a: "I started by designing the layout for mobile size screens first, ensuring that all text, navigation, and content were readable and well spaced on a mobile device. Once the mobile version looked clean, I used CSS media queries to gradually enhance the layout for tablets and desktops."
          },
          {
            q: "Most useful HTML/CSS concept?",
            a: "The most useful concept was Flexbox and media queries, which made it easy to align navigation links and structure content sections responsively. Also shared CSS is very useful because all CSS can handle in single file."
          },
          {
            q: "Most challenging part?",
            a: "Most challenging part of CSS is to handle alignment and spacing for all elements. Otherwise for HTML it is looking easier."
          }
        ]
      },
      {
        title: "Lab-3",
        date: "21/10/2025",
        qa: [
          {
            q: "Which DOM selection methods did you use?",
            a: "I used several DOM selection methods, including getElementById() and querySelectorAll(). getElementById() was used when I needed to target specific elements like the navigation container (nav-container), the journal form (journal-form), and buttons such as the theme toggle (theme-btn), because it directly selects a unique element and is efficient. and querySelectorAll() was used to apply logic to multiple elements, like highlighting the active navigation link, since it allows selecting multiple items using CSS selectors and iterating through them easily."
          },
          {
            q: "Most challenging part of linking JS?",
            a: "The most challenging part was ensuring that the JavaScript file loaded correctly on all pages and that elements existed in the DOM before running certain functions. Since the same script is reused across multiple pages, I had to use conditional checks (like if (navContainer) { ... }) to prevent errors on pages where specific elements weren’t present. Managing event listeners for dynamic elements such as collapsible sections and theme buttons also required careful handling."
          },
          {
            q: "How did you test/debug JS?",
            a: "I tested the code by opening each page in the browser and checking whether the navigation loaded automatically, the theme toggle worked, and form validation behaved correctly. I used the browser’s Developer Tools Console to monitor for any JavaScript errors, used console.log() statements for debugging logic, and refreshed pages after each update to confirm that DOM manipulations were happening correctly."
          }
        ]
      }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
    localStorage.setItem("samples_loaded", "true");
  }

  preloadSamples();
  loadEntries();
}

let ytPlayer = null;
let pendingVideoId = null;

function extractYouTubeId(url) {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (parsed.searchParams.get("v")) {
        return parsed.searchParams.get("v");
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2];
      }
    }

    return null;
  } catch (e) {
    return null;
  }
}

window.onYouTubeIframeAPIReady = function () {
  if (pendingVideoId) {
    createOrLoadPlayer(pendingVideoId);
    pendingVideoId = null;
  }
};

function createOrLoadPlayer(videoId) {
  const container = document.getElementById("youtube-player");
  const wrapper = document.querySelector(".video-frame-wrapper");
  if (!container) return;


  if (!window.YT || !YT.Player) {
    pendingVideoId = videoId;
    return;
  }

  if (ytPlayer) {
    ytPlayer.loadVideoById(videoId);
    if (wrapper) wrapper.classList.add("active");
    return;
  }

  ytPlayer = new YT.Player("youtube-player", {
    videoId: videoId,
    playerVars: {
      rel: 0,
      modestbranding: 1
    },
    events: {
      onReady: function () {
        const controls = document.getElementById("video-controls");
        if (controls) controls.hidden = false;
        if (wrapper) wrapper.classList.add("active");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const urlInput = document.getElementById("youtube-url-input");
  const loadBtn = document.getElementById("load-video-btn");
  const playBtn = document.getElementById("play-video-btn");
  const pauseBtn = document.getElementById("pause-video-btn");

  if (!urlInput || !loadBtn) return;

  loadBtn.addEventListener("click", function () {
    const url = urlInput.value.trim();
    const videoId = extractYouTubeId(url);

    if (!videoId) {
      alert("Please paste a valid YouTube link.");
      return;
    }

    createOrLoadPlayer(videoId);
  });

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (ytPlayer && ytPlayer.playVideo) {
        ytPlayer.playVideo();
      }
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", function () {
      if (ytPlayer && ytPlayer.pauseVideo) {
        ytPlayer.pauseVideo();
      }
    });
  }
});

function injectFooter() {
  const footerHTML = `
        <footer class="site-footer">
            <div class="footer-inner">
                <p class="footer-title gradient-text">Jay Rajendrakumar Patel</p>
                <p class="footer-sub">Ahmedabad, Gujarat, India</p>
                <p class="footer-copy">© ${new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </footer>
    `;

  document.body.insertAdjacentHTML("beforeend", footerHTML);
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("install-btn");
  if (installBtn) installBtn.style.display = "inline-flex";

  installBtn.addEventListener("click", async () => {
    installBtn.style.display = "none";
    deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;
    console.log("Install:", choice);
    deferredPrompt = null;
  });
});
