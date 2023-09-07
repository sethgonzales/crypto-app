import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './crypto-service.js';


// Business Logic

async function getCryptoData(cryptocurrency) {
  const response = await CryptoService.getCryptoData(cryptocurrency);
  if (response.main) {
    printCrypto(response);
  } else {
    printError(response);
  }
}

function printCrypto(response) {
  document.querySelector('#showResponse').innerHTML = 
  <h2>The something in ${response} is</h2>;
}

function printError(error) {
  document.querySelector('#showResponse').innerHTML = 
  <h2>There was an error accessing the data for ${error}.`</h2>;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const cryptocurrency = document.querySelector('#showResponse').value;
  document.querySelector('#showResponse').value = null;
  getCryptoData(cryptocurrency);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});