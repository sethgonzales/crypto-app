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
function printCrypto(response) {
  document.querySelector('#showName').innerHTML =
    `<h2><img src=${response.image.small}> ${response.name} </h2>`;


    document.querySelector('#showPrice').innerHTML =
    `<h2><img src=${response.image.small}> ${response.name} </h2>`;

  let date = new Date(response.market_data.ath_date.usd).toDateString(); //auth date to date formatting
  document.querySelector('#showAuth').innerHTML =
    `<p>Last Authorized: ${date}</p>`


  
  //show currency value in all countries
    const currPrice = Object.keys(response.market_data.current_price); //turn object into an array holding key-value pairs
  for (let i = 0; i < currPrice.length; i++) { //for each item in the array...
    let priceKey = currPrice[i]; //The Key at each index
    const price = response.market_data.current_price[priceValue].toLocaleString('en-US'); //the value at each key written in us number notation
    document.querySelector('#showCountryPrice').innerHTML +=
      `<p>${priceKey}: $${price}</p>`; //show the key, value pair
  }
}



  function printError(error) {
    document.querySelector('#showResponse').innerHTML =
      `<h2>There was an error accessing the data for ${error}.</h2>`;
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const cryptocurrency = document.querySelector('#crypto').value;
    document.querySelector('#crypto').value = null;
    getCryptoData(cryptocurrency);
  }

  window.addEventListener("load", function () {
    document.querySelector('form').addEventListener("submit", handleFormSubmission);
  });