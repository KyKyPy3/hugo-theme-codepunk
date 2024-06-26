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
  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  setSyntaxDark(chosenThemeIsDark);

  var theme = chosenThemeIsDark ? 'noborder_dark' : 'light';
  var giscuss = document.querySelector('script[src="https://giscus.app/client.js"]');
  if (giscuss) {
    giscuss.setAttribute('data-theme', theme);
  }
}

function getStyleSheet(file_name) {
  for (var i = 0; i < document.styleSheets.length; i++) {
    var sheet = document.styleSheets[i];
    if (sheet.href.includes(file_name)) {
      return sheet;
    }
  }
}

function setSyntaxDark(isDark) {
  sheet_light = getStyleSheet("syntax_light")
  sheet_dark = getStyleSheet("syntax_dark")

  sheet_light.disabled = isDark ? true : false
  sheet_dark.disabled = isDark ? false : true
}

// Switch the theme.
function switchTheme(e) {
  if (chosenThemeIsDark) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }

  detectOSColorTheme();
  window.location.reload();
}

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());
} else {
  localStorage.removeItem("theme");
}
detectOSColorTheme();