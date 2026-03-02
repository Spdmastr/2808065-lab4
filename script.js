//const searchBtn = document.getElementById("search-btn");
const countryInput = document.getElementById("country-input");
const countryInfo = document.getElementById("country-info");
const bordersContainer = document.getElementById("bordering-countries");
const spinner = document.getElementById("loading-spinner");
async function searchCountry(countryName) {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;
    try {
        // Show loading spinner
        showLoading();
        // Fetch country data
        const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Country not found");
    }

    const result = await response.json();
    const country = result[0];
    //console.log(result);
        // Update DOM
        document.getElementById('country-info').innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
`;
        // Fetch bordering countries
    if (country.borders) {
      getBorders(country.borders);
    } else {
      bordersContainer.innerHTML = "<p>No bordering countries.</p>";
    }
        // Update bordering countries section
    } catch (error) {
        console.error(error.message);
    } finally {
        hideLoading();
    }
}
async function getBorders(borderCodes) {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`);
        if (!response.ok){
            throw new Error("Can't load bordering countries.");
        }
        const bordersData = await response.json();

    bordersContainer.innerHTML = "<h3>Bordering Countries:</h3>";

    bordersData.forEach((border) => {
      bordersContainer.innerHTML += `
        <li class="border-country">
          <img src="${border.flags.png}" alt="Flag of ${border.name.common}" width="80">
          <p>${border.name.common}</p>
        </li>
      `;
    });

    }catch (error) {
        bordersContainer.innerHTML = `<p>${error.message}</p>`;
    }
}
// Event listeners
//earchBtn.addEventListener("Click", handleSearch);
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
function showLoading() {
  spinner.style.display = "block";
  countryInfo.innerHTML = "";
  bordersContainer.innerHTML = "";
}

function hideLoading() {
  spinner.style.display = "none";
}

// function showError(message) {
//   //countryInfo.innerHTML = `<p style="color:red;">${message}</p>`;
//   bordersContainer.innerHTML = "";
// }