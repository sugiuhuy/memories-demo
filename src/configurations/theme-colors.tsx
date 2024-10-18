export default function ThemeColors(theme: "light" | "dark" | "auto") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const systemTheme = mediaQuery.matches ? "dark" : "light";

  // initial theme
  document.documentElement.className = theme === "auto" ? systemTheme : theme;

  // primary colors
  document.documentElement.style.setProperty("--bg-primary", theme === "light" ? "#fafafa" : "#0a0a0a");
  document.documentElement.style.setProperty("--bg-primary-active", theme === "light" ? "#e5e5e5" : "#262626");
  document.documentElement.style.setProperty("--bg-primary-hover", theme === "light" ? "#f1f1f1" : "#171717");
  document.documentElement.style.setProperty("--text-primary", theme === "light" ? "#0a0a0a" : "#fafafa");
  document.documentElement.style.setProperty("--text-primary-active", theme === "light" ? "#18181b" : "#e5e5e5");
  document.documentElement.style.setProperty("--text-primary-hover", theme === "light" ? "#27272a" : "#d4d4d4");
  document.documentElement.style.setProperty("--border-primary", theme === "light" ? "#e5e5e5" : "#171717");
  document.documentElement.style.setProperty("--shadow-primary", theme === "light" ? "#cdcccc" : "#171717");

  // secondary colors
  document.documentElement.style.setProperty("--bg-secondary", theme === "light" ? "#f1f1f1" : "#171717");
  document.documentElement.style.setProperty("--bg-secondary-active", theme === "light" ? "#d4d4d4" : "#404040");
  document.documentElement.style.setProperty("--bg-secondary-hover", theme === "light" ? "#e5e5e5" : "#262626");
  document.documentElement.style.setProperty("--text-secondary", theme === "light" ? "#27272a" : "#d4d4d4");
  document.documentElement.style.setProperty("--text-secondary-active", theme === "light" ? "#3f3f46" : "#a3a3a3");
  document.documentElement.style.setProperty("--text-secondary-hover", theme === "light" ? "#52525b" : "#737373");
  document.documentElement.style.setProperty("--border-secondary", theme === "light" ? "#d4d4d4" : "#262626");
  document.documentElement.style.setProperty("--shadow-secondary", theme === "light" ? "#afafaf" : "#262626");

  // extra colors
  document.documentElement.style.setProperty("--bg-transparent", theme === "light" ? "rgba(250,250,250,0.8)" : "rgba(10,10,10,0.8)");
  document.documentElement.style.setProperty("--scrollbar-track", theme === "light" ? "#e5e5e5" : "#171717");
  document.documentElement.style.setProperty("--scrollbar-thumb", theme === "light" ? "#a3a3a3" : "#262626");
  document.documentElement.style.setProperty("--scrollbar-thumb-hover", theme === "light" ? "#737373" : "#262626");
}
