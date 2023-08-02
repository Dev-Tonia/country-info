
<<<<<<< HEAD
const toggleDarkModeEl = document.querySelector(".btn-toggle");
const bodyEl = document.querySelector("body");
const inputEl = document.querySelector(`input[type= 'text']`);
const selectEl = document.querySelector("select");
const allCountryEl = document.querySelector("#all-country");
const target = document.querySelector("#regions");

let resultsByRegion = [];
let darkMode;

// function toggleLightAndDarkMode() {
//   let isDarkMode = false;

//   isDarkMode = bodyEl.classList.toggle("dark-mode");
//   localStorage.setItem("darkMode", isDarkMode);

//   if (isDarkMode) {
//     moonIcon.classList.remove("bi-moon");
//     moonIcon.classList.add("bi-moon-fill");
//   } else {
//     moonIcon.classList.add("bi-moon");
//     moonIcon.classList.remove("bi-moon-fill");
//   }
// }

async function filterByRegion() {
  let region;

  region = target.value;

  if (region === "filter by regions") {
    return;
  }
  resultsByRegion = await fetchData(`/region/${region}`);
  allCountryEl.innerHTML = "";
  displayAllCountry();
  // target.selectedIndex = 0;
}

function searchCountry(e) {
  const allCountryNameEl = document.querySelectorAll(".card-body h2");
  let text = e.target.value.toLowerCase();
  allCountryNameEl.forEach((country) => {
    let item = country.textContent.toLowerCase();
    if (item.includes(text)) {
      // item.style.display = "flex";
      country.closest(".card").style.display = "block";
    } else {
      country.closest(".card").style.display = "none";
    }
  });
}
// function persistDarkMode() {
//   darkMode = localStorage.getItem("darkMode");
//   console.log("detail page::", darkMode);
//   if (darkMode === "true") {
//     bodyEl.classList.add("dark-mode");
//     moonIcon.classList.remove("bi-moon");
//     moonIcon.classList.add("bi-moon-fill");
//   } else {
//     moonIcon.classList.add("bi-moon");
//     moonIcon.classList.remove("bi-moon-fill");
//   }
// }
async function displayAllCountry() {
  // persistDarkMode();
  let results = [];

  let data = await fetchData("all");
  if (resultsByRegion.length === 0) {
    results = data;
  } else {
    results = resultsByRegion;
  }
  results.sort(function (a, b) {
    if (a.name.common.toLowerCase() < b.name.common.toLowerCase()) {
      return -1;
    }
    if (a.name.common.toLowerCase() > b.name.common.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="detail.html?name=${result.name.common}" onClick ="goToDetailedPage(${result.name.common})">
    <div class="card-header">
      <img src="${result.flags.png}" alt="${result.flags.alt}" />
    </div>
    <div class="card-body">
      <h2>${result.name.common}</h2>
      <p>
        <span class="bold">Population:</span>
        <span class="value">${result.population}</span>
      </p>
      <p>
        <span class="bold">Region:</span>
        <span class="value">${result.region}</span>
      </p>
      <p>
        <span class="bold">Capital:</span>
        <span class="value">${result.capital}</span>
      </p>
    </div>
  </a>
    `;
    allCountryEl.appendChild(div);
  });
}

// Goto detailed page
function goToDetailedPage(countryName) {
  // localStorage.setItem("name", countryName);
  window.location.href = "detail.html";
}
// Fetch data from the local json
async function fetchData(endpoint) {
  showSpinner();
  const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);

  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
// Route
<<<<<<< HEAD
async function init() {
  inputEl.addEventListener("input", searchCountry);
  target.addEventListener("change", filterByRegion);
  displayAllCountry();

  // toggleDarkModeEl.addEventListener("click", toggleLightAndDarkMode);
}
init();

// document.addEventListener("DOMContentLoaded", );
// export default  persistDarkMode ;
=======
// async function init() {
//   // switch (global.currentPage) {
//   //   case "/":
//   //   case "/index.html":
//   //     displayAllCountry();
//   //     inputEl.addEventListener("input", searchCountry);
//   //     target.addEventListener("change", filterByRegion);

//   //     break;
//   //   case `/detail.html`:
//   //     displayDetailedPage();
//   //     break;
//   // }
//   if (window.location.href = 'single.html' === "/" || global.currentPage === "/index.html") {
//     displayAllCountry();
//     inputEl.addEventListener("input", searchCountry);
//     target.addEventListener("change", filterByRegion);
//   } else if (window.location.href = 'single.html' === `/detail.html`) {
//     displayDetailedPage();
//   }
//   toggleDarkModeEl.addEventListener("click", toggleLightAndDarkMode);
// }
// init();
async function init() {
  displayAllCountry();
  inputEl.addEventListener("input", searchCountry);
  target.addEventListener("change", filterByRegion);

  toggleDarkModeEl.addEventListener("click", toggleLightAndDarkMode);
}

document.addEventListener("DOMContentLoaded", init);
>>>>>>> ce58e2a2dc35b1f6caa6987ef888ffbb8e45d85b
=======
>>>>>>> eda14fd9b4db78890f8673f8ee92e152362cd633
