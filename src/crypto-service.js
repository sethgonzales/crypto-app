export default class CryptoService {  
  static async getCryptoData(cryptocurrency) { //call this method, make it async 
    try { //wrap our code in a try...catch block to handle errors as async will not be able to resolve or reject errors.
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptocurrency}?localization=true&tickers=true&market_data=true`); //fetch the api and gather response
      const jsonifiedResponse = await response.json(); //parse the response into json lang. await to make sure each thing is done in order.
      if (!response.ok) { //if the response is not okay...
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`; //create an error message from the text from the jsonified api data 
        throw new Error(errorMessage); //throw to an error function
      }
      return jsonifiedResponse;//if everything is OK, provide the returned response from the api data
    } catch(error) { //catch error and return error message
      return error;
    }
  }
}