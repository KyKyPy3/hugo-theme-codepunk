/**
 * Theming.
 *
 * Supports the preferred color scheme of the operation system as well as
 * the theme choice of the user.
 *
 */
const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme === "dark";
const chosenThemeIsLight = chosenTheme === "light";

// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
  let isDark = false;

  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    isDark = true;
  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
    isDark = false;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    isDark = true;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    isDark = false;
  }

  setSyntaxDark(isDark);
  updateThemeIcons(isDark);

  var theme = isDark ? "noborder_dark" : "light";
  var giscuss = document.querySelector(
    'script[src="https://giscus.app/client.js"]',
  );
  if (giscuss) {
    giscuss.setAttribute("data-theme", theme);
  }
}

function updateThemeIcons(isDark) {
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    }
  }
}

function getStyleSheet(file_name) {
  for (var i = 0; i < document.styleSheets.length; i++) {
    var sheet = document.styleSheets[i];
    if (sheet.href && sheet.href.includes(file_name)) {
      return sheet;
    }
  }
  return null;
}

function setSyntaxDark(isDark) {
  const sheet_light = getStyleSheet("syntax_light");
  const sheet_dark = getStyleSheet("syntax_dark");

  if (sheet_light) sheet_light.disabled = isDark;
  if (sheet_dark) sheet_dark.disabled = !isDark;
}

// Switch the theme without page reload
function switchTheme(e) {
  e.preventDefault();

  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);

  const isDark = newTheme === "dark";
  setSyntaxDark(isDark);
  updateThemeIcons(isDark);
}

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => detectOSColorTheme());
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => detectOSColorTheme());
} else {
  localStorage.removeItem("theme");
}
detectOSColorTheme();
