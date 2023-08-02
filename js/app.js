const global = {
  currentPage: window.location.pathname,
};

const toggleDarkModeEl = document.querySelector(".btn-toggle");
const bodyEl = document.querySelector("body");
const inputEl = document.querySelector(`input[type= 'text']`);
const selectEl = document.querySelector("select");
const allCountryEl = document.querySelector("#all-country");
const target = document.querySelector("#regions");
const moonIcon = document.querySelector("i");

let resultsByRegion = [];
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
async function displayAllCountry() {
  persistDarkMode();
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
    <a href="detail.html?name=${result.name.common}">
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
async function displayDetailedPage() {
  persistDarkMode();
  let name = window.location.search.split("=")[1];
  name = name.split("%20").join(" ");

  let result;
  let currencyCode;
  let allLanguage = [];

  // Displaying the countries details depending on country code is or country name
  if (name.length === 3) {
    [result] = await fetchData(`/alpha/${name}`);
  } else {
    [result] = await fetchData(`/name/${name}`);
  }
  let { languages } = result;
  let { currencies } = result;
  let {
    name: { nativeName },
  } = result;
  console.log(nativeName);
  let localName = [];
  // getting the currency

  for (const key of Object.keys(currencies)) {
    currencyCode = currencies[key];
  }
  // getting the language of the country

  for (const key of Object.keys(languages)) {
    allLanguage.push(languages[key]);
  }
  for (const key of Object.keys(nativeName)) {
    localName.push(nativeName[key]);
  }

  const div = document.createElement("div");
  div.classList.add("detailed__grid");
  div.innerHTML = `

  <div class="img-wrapper">
  ${
    result.flags.png
      ? ` <img src=${result.flags.png} alt="${result.flags.alt}" />`
      : ` <img src="../images/no-image-icon-6.png" alt="" />`
  }
  </div>
  <div class="main-details">
    <h2>${result.name.common}</h2>
    <p>
      <span class="bold">Native Name:</span>
      <span class="value">${localName
        .map((name) => `${name.common}`)
        .join(", ")}</span>
    </p>
    <p>
      <span class="bold">Population:</span>
      <span class="value">${result.population}</span>
    </p>
    <p>
      <span class="bold">Region:</span>
      <span class="value">${result.region}</span>
    </p>
    <p>
      <span class="bold">Sub Region:</span>
      <span class="value">${result.subregion}</span>
    </p>
    <p>
      <span class="bold">Capital:</span>
      <span class="value">${result.capital}</span>
    </p>
  </div>
  <div class="additional-info">
    <p>
      <span class="bold">Top Level Domain:</span>
      <span class="value">${
        result.tld ? result.tld[0] : `Not in the database`
      }</span>
    </p>
    <p>
      <span class="bold">Currencies:</span>
      <span class="value">${currencyCode.name}</span>
    </p>
    <p>
      <span class="bold">Language:</span>
      <span class="value">${allLanguage.join(", ")}</span>
    </p>
  </div>
  <div class="borders">
    <span class="bold">Border Countries: </span>
   ${
     result.borders
       ? result.borders
           .map(
             (border) => `<a href="detail.html?isoCode=${border}">${border}</a>`
           )
           .join("")
       : `<p>No Neighboring Country</p>`
   }
  </div>
    `;
  document.querySelector("#content").appendChild(div);
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
