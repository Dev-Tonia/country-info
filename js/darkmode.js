const toggleDarkModeEl = document.querySelector(".btn-toggle");
const moonIcon = document.querySelector("i");
const bodyEl = document.querySelector("body");
let darkMode;

function toggleLightAndDarkMode() {
  let isDarkMode = false;

  isDarkMode = bodyEl.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  if (isDarkMode) {
    moonIcon.classList.remove("bi-moon");
    moonIcon.classList.add("bi-moon-fill");
  } else {
    moonIcon.classList.add("bi-moon");
    moonIcon.classList.remove("bi-moon-fill");
  }
}

function persistDarkMode() {
  darkMode = localStorage.getItem("darkMode");
  console.log("detail page::", darkMode);
  if (darkMode === "true") {
    bodyEl.classList.add("dark-mode");
    moonIcon.classList.remove("bi-moon");
    moonIcon.classList.add("bi-moon-fill");
  } else {
    moonIcon.classList.add("bi-moon");
    moonIcon.classList.remove("bi-moon-fill");
  }
}
toggleDarkModeEl.addEventListener("click", toggleLightAndDarkMode);
persistDarkMode();
