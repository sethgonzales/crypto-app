import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './crypto-service.js';


// Business Logic

async function getCryptoData(cryptocurrency) {
  const response = await CryptoService.getCryptoData(cryptocurrency);
  if (response.main) {
    printCrypto(response, cryptocurrency);
  } else {
    printError(response, cryptocurrency);
  }
}

function printCrypto(response, cryptocurrency) {
  document.querySelector('#showResponse').innerHTML = 
  <h2>`The something in ${info} is ${response.main.datapoint}.`</h2>
  
  
  ; 
}

function printError(error, cryptocurrency) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the data for ${info}: 
  ${error}.`;
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