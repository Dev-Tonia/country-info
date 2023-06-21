const global = {
  currentPage: window.location.pathname,
  isDarkMode: false,
};
console.log(window.location.pathname);
const toggleDarkModeEl = document.querySelector(".btn-toggle");
const bodyEl = document.querySelector("body");

toggleDarkModeEl.addEventListener("click", function () {
  const moonIcon = document.querySelector("i");
  global.isDarkMode = bodyEl.classList.toggle("dark-mode");

  if (global.isDarkMode) {
    moonIcon.classList.remove("bi-moon");
    moonIcon.classList.add("bi-moon-fill");
  } else {
    moonIcon.classList.add("bi-moon");
    moonIcon.classList.remove("bi-moon-fill");
  }
});

async function displayAllCountry() {
  const results = await fetchData("all");
  console.log(results);
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
    document.querySelector("#all-country").appendChild(div);
  });
}

// Fetch data from the local json
async function fetchData(endpoint) {
  //   showSpinner();
  const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);

  const data = await response.json();
  //   hideSpinner();
  return data;
}

// function showSpinner() {
//   document.querySelector(".spinner").classList.add("show");
// }
// function hideSpinner() {
//   document.querySelector(".spinner").classList.remove("show");
// }
// Route
async function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayAllCountry();
      break;
    case `/detail.html`:
      //   detailedPage();
      break;
  }
}
init();
