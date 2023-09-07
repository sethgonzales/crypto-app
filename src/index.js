import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './crypto-service.js';


// Business Logic

async function getCryptoData(cryptocurrency) {
  const response = await CryptoService.getCryptoData(cryptocurrency);
  if (response) {
    printCrypto(response);
  } else {
    printError(response);
  }
}


// UI Logic
function hideResults() {
  document.getElementById("return-container").setAttribute("class", "hidden");
} 

function printCrypto(response) {
  document.getElementById("return-container").removeAttribute("class");
  document.querySelector('#show-name').innerHTML =
    `<h2><img src=${response.image.small}> ${response.name} </h2>`;


  document.querySelector('#show-price').innerHTML =
    `<h4>Current USD Value: $${response.market_data.current_price.usd.toLocaleString('en-US')} </h4>`;

  document.querySelector('#price-change').innerHTML =
    `<p>Daily Price Change: ${response.market_data.price_change_24h}</p>
    <p>${response.market_data.price_change_percentage_24h.toFixed(2)}% change</p>
    <p>${response.market_data.price_change_percentage_7d.toFixed(2)}% weekly change</p>`;


  let date = new Date(response.last_updated).toDateString(); //auth date to date formatting
  document.querySelector('#show-auth').innerHTML =
    `<p>Last Updated: ${date}</p>`;



  //show currency value in all countries
  const currPrice = Object.keys(response.market_data.current_price); //turn object into an array holding key-value pairs
  for (let i = 0; i < currPrice.length; i++) { //for each item in the array...
    let priceKey = currPrice[i]; //The Key at each index
    const price = response.market_data.current_price[priceKey].toLocaleString('en-US'); //the value at each key written in us number notation
    document.querySelector('.country-header').innerText =
      `Prices around the world: `;
    document.querySelector('#show-country-price').innerHTML +=
      `<p>${priceKey}: $${price}</p>`; //show the key, value pair
  }
}


function printError(error) {
  document.querySelector('#return-container').innerHTML =
    `<h2>There was an error accessing data. ${error}.</h2>`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const cryptocurrency = document.querySelector('#crypto').value;
  document.querySelector('#crypto').value = null;
  getCryptoData(cryptocurrency);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission, hideResults);
});