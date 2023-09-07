export default class CryptoService {  
  static async getCryptoData(cryptocurrency) { 
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptocurrency}?localization=true&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`);
      const jsonifiedResponse = await response.json(); 
      if (!response.ok) { 
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}