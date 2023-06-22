const global = {
  currentPage: window.location.pathname,
  isDarkMode: false,
};

const toggleDarkModeEl = document.querySelector(".btn-toggle");
const bodyEl = document.querySelector("body");
const inputEl = document.querySelector(`input[type= 'text']`);
const selectEl = document.querySelector("select");
const allCountryEl = document.querySelector("#all-country");
let region;

let target = document.querySelector("#regions");
let results = [];
let resultsByRegion = [];
function toggleLightAndDarkMode() {
  const moonIcon = document.querySelector("i");
  global.isDarkMode = bodyEl.classList.toggle("dark-mode");

  if (global.isDarkMode) {
    moonIcon.classList.remove("bi-moon");
    moonIcon.classList.add("bi-moon-fill");
  } else {
    moonIcon.classList.add("bi-moon");
    moonIcon.classList.remove("bi-moon-fill");
  }
}

try {
  target.addEventListener("change", async function () {
    region = target.value;

    if (region === "filter by regions") {
      return;
    }
    resultsByRegion = await fetchData(`/region/${region}`);
    allCountryEl.innerHTML = "";
    displayAllCountry();
    // target.selectedIndex = 0;
  });
} catch (error) {}

try {
  inputEl.addEventListener("input", function (e) {
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
  });
} catch (error) {
  // console.log(error.message);
}
async function displayAllCountry() {
  // console.log(await getResult());
  let data = await fetchData("all");
  if (resultsByRegion.length === 0) {
    results = data;
  } else {
    results = resultsByRegion;
  }
  console.log(results);
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
  let name = window.location.search.split("=")[1];
  name = name.split("%20").join(" ");
  console.log(name);
  let result;

  if (name.length === 3) {
    [result] = await fetchData(`/alpha/${name}`);
  } else {
    [result] = await fetchData(`/name/${name}`);
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
      <span class="value">${result.name.common}</span>
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
      <span class="value">${result.tld[0]}</span>
    </p>
    <p>
      <span class="bold">Currencies:</span>
      <span class="value">Euro</span>
    </p>
    <p>
      <span class="bold">Language:</span>
      <span class="value">kkkk</span>
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
async function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayAllCountry();
      break;
    case `/detail.html`:
      //   detailedPage();
      displayDetailedPage();
      break;
  }

  toggleDarkModeEl.addEventListener("click", toggleLightAndDarkMode);
}
init();
