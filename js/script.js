// Minimal JS for hamburger menu, smooth scroll, and featured work sync
// === THEME TOGGLE ===
// --- Theme logic ---
// (Note: The following DOMContentLoaded wrapper is redundant and commented for clarity)
// document.addEventListener('DOMContentLoaded', function () {
function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function saveTheme(theme) {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  function updateToggleUI(theme) {
    themeToggle.setAttribute('aria-checked', theme === 'dark');
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  let currentTheme = getPreferredTheme();
  updateToggleUI(currentTheme);
  themeToggle.addEventListener('click', function () {
    currentTheme = (document.documentElement.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
    saveTheme(currentTheme);
    updateToggleUI(currentTheme);
  });
  themeToggle.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      themeToggle.click();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
  // Hamburger menu toggle
  const navToggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('nav__links--open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth < 900) {
          navToggle.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('nav__links--open');
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});