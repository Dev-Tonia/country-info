// import showSpinner from "./app";
// Fetch data from the local json
async function fetchData(endpoint) {
  //   showSpinner();
  const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);

  const data = await response.json();
  //   hideSpinner();
  return data;
}

// let countryName = localStorage.getItem("name");
// console.log(countryName);

// import persistDarkMode from "./app.js";

async function displayDetailedPage() {
  //   persistDarkMode();
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
  // getting the languages of the country

  for (const key of Object.keys(languages)) {
    allLanguage.push(languages[key]);
  }
  // get all th possible name of the country
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
               (border) =>
                 `<a href="detail.html?isoCode=${border}">${border}</a>`
             )
             .join("")
         : `<p>No Neighboring Country</p>`
     }
    </div>
      `;
  document.querySelector("#content").appendChild(div);
  //   window.location.href = "detail.html";
}
displayDetailedPage();
