// Light/dark theme: toggles a `dark` class on <html> and persists the choice.
const KEY = "masari_theme";

export function getTheme() {
  return localStorage.getItem(KEY) || "light";
}

export function applyTheme(theme) {
  const t = theme === "dark" ? "dark" : "light";
  localStorage.setItem(KEY, t);
  document.documentElement.classList.toggle("dark", t === "dark");
  return t;
}

export function toggleTheme() {
  return applyTheme(getTheme() === "dark" ? "light" : "dark");
}

applyTheme(getTheme());
