/**
 * Servicio para integración con APIs externas
 */

// API Key para Alpha Vantage (servicio de datos financieros)
const ALPHA_VANTAGE_API_KEY = 'demo'; // Reemplazar con tu API key real

// API Key para OpenWeatherMap (servicio de clima)
const OPENWEATHER_API_KEY = 'demo'; // Reemplazar con tu API key real

// API Key para NewsAPI (servicio de noticias)
const NEWS_API_KEY = 'demo'; // Reemplazar con tu API key real

/**
 * Obtiene datos de cotización de una acción
 * @param {string} symbol - Símbolo de la acción (ej. AAPL, MSFT)
 * @returns {Promise<Object>} - Datos de la acción
 */
export const getStockQuote = async (symbol) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos de la acción: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Verificar si hay un error en la respuesta
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // Verificar si se excedió el límite de la API
    if (data.Note && data.Note.includes('API call frequency')) {
      throw new Error('Se ha excedido el límite de llamadas a la API. Por favor, intenta más tarde.');
    }
    
    return data['Global Quote'] || {};
  } catch (error) {
    console.error('Error en getStockQuote:', error);
    throw error;
  }
};

/**
 * Obtiene datos históricos de una acción
 * @param {string} symbol - Símbolo de la acción (ej. AAPL, MSFT)
 * @param {string} interval - Intervalo de tiempo (1min, 5min, 15min, 30min, 60min, daily, weekly, monthly)
 * @returns {Promise<Object>} - Datos históricos de la acción
 */
export const getStockHistory = async (symbol, interval = 'daily') => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos históricos: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Verificar si hay un error en la respuesta
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // Verificar si se excedió el límite de la API
    if (data.Note && data.Note.includes('API call frequency')) {
      throw new Error('Se ha excedido el límite de llamadas a la API. Por favor, intenta más tarde.');
    }
    
    return data;
  } catch (error) {
    console.error('Error en getStockHistory:', error);
    throw error;
  }
};

/**
 * Obtiene datos del clima para una ubicación
 * @param {string} city - Nombre de la ciudad
 * @param {string} country - Código del país (ej. AR, US)
 * @returns {Promise<Object>} - Datos del clima
 */
export const getWeather = async (city, country) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=es&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos del clima: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error en getWeather:', error);
    throw error;
  }
};

/**
 * Obtiene noticias financieras
 * @param {string} query - Término de búsqueda
 * @param {number} pageSize - Número de resultados por página
 * @returns {Promise<Object>} - Noticias financieras
 */
export const getFinancialNews = async (query = 'finance', pageSize = 5) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=es&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al obtener noticias: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.articles || [];
  } catch (error) {
    console.error('Error en getFinancialNews:', error);
    throw error;
  }
};

/**
 * Obtiene la tasa de cambio entre dos monedas
 * @param {string} fromCurrency - Moneda de origen (ej. USD, EUR)
 * @param {string} toCurrency - Moneda de destino (ej. ARS, USD)
 * @returns {Promise<Object>} - Tasa de cambio
 */
export const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al obtener tasa de cambio: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Verificar si hay un error en la respuesta
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // Verificar si se excedió el límite de la API
    if (data.Note && data.Note.includes('API call frequency')) {
      throw new Error('Se ha excedido el límite de llamadas a la API. Por favor, intenta más tarde.');
    }
    
    return data['Realtime Currency Exchange Rate'] || {};
  } catch (error) {
    console.error('Error en getExchangeRate:', error);
    throw error;
  }
};

/**
 * Obtiene datos de criptomonedas
 * @param {string} symbol - Símbolo de la criptomoneda (ej. BTC, ETH)
 * @param {string} market - Moneda de mercado (ej. USD, EUR)
 * @returns {Promise<Object>} - Datos de la criptomoneda
 */
export const getCryptoData = async (symbol, market = 'USD') => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${symbol}&market=${market}&interval=5min&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos de criptomoneda: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Verificar si hay un error en la respuesta
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // Verificar si se excedió el límite de la API
    if (data.Note && data.Note.includes('API call frequency')) {
      throw new Error('Se ha excedido el límite de llamadas a la API. Por favor, intenta más tarde.');
    }
    
    return data;
  } catch (error) {
    console.error('Error en getCryptoData:', error);
    throw error;
  }
};

/**
 * Obtiene datos económicos globales
 * @param {string} indicator - Indicador económico (ej. GDP, INFLATION)
 * @returns {Promise<Object>} - Datos económicos
 */
export const getEconomicData = async (indicator) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=${indicator}&interval=annual&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos económicos: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Verificar si hay un error en la respuesta
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    // Verificar si se excedió el límite de la API
    if (data.Note && data.Note.includes('API call frequency')) {
      throw new Error('Se ha excedió el límite de llamadas a la API. Por favor, intenta más tarde.');
    }
    
    return data;
  } catch (error) {
    console.error('Error en getEconomicData:', error);
    throw error;
  }
};
