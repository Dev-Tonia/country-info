const toggleDarkModeEl = document.querySelector("body");

toggleDarkModeEl.addEventListener("click", function () {
  const moonIcon = document.querySelector("i");

  toggleDarkModeEl.classList.toggle("dark-mode");

  if (moonIcon.classList.contains("bi-moon")) {
    moonIcon.classList.remove("bi-moon");
    moonIcon.classList.add("bi-moon-fill");
  } else {
    moonIcon.classList.add("bi-moon");
    moonIcon.classList.remove("bi-moon-fill");
  }
});

// Route
function init() {}
