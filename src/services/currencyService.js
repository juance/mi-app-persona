/**
 * Servicio para manejar conversiones de moneda
 */

import axios from 'axios';

// Clave para almacenar las tasas de cambio en localStorage
const EXCHANGE_RATES_KEY = 'exchange_rates';
// Tiempo de expiración de las tasas de cambio (1 hora en milisegundos)
const EXCHANGE_RATES_EXPIRY = 60 * 60 * 1000;

// API para obtener tasas de cambio
// Usamos exchangerate-api.com como ejemplo, pero hay muchas alternativas
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

/**
 * Obtiene las tasas de cambio actuales
 * @returns {Promise<Object>} - Tasas de cambio
 */
export const getExchangeRates = async () => {
  try {
    // Verificar si hay tasas de cambio en caché y si no han expirado
    const cachedRates = localStorage.getItem(EXCHANGE_RATES_KEY);
    
    if (cachedRates) {
      const { rates, timestamp } = JSON.parse(cachedRates);
      const now = Date.now();
      
      // Si las tasas no han expirado, devolverlas
      if (now - timestamp < EXCHANGE_RATES_EXPIRY) {
        console.log('Usando tasas de cambio en caché');
        return rates;
      }
    }
    
    // Si no hay tasas en caché o han expirado, obtenerlas de la API
    console.log('Obteniendo tasas de cambio de la API');
    
    try {
      const response = await axios.get(API_URL);
      const rates = response.data.rates;
      
      // Guardar en caché con timestamp
      localStorage.setItem(EXCHANGE_RATES_KEY, JSON.stringify({
        rates,
        timestamp: Date.now()
      }));
      
      return rates;
    } catch (apiError) {
      console.error('Error al obtener tasas de cambio de la API:', apiError);
      
      // Si hay un error con la API, usar tasas de respaldo
      return getFallbackRates();
    }
  } catch (error) {
    console.error('Error en getExchangeRates:', error);
    return getFallbackRates();
  }
};

/**
 * Obtiene tasas de cambio de respaldo (valores fijos)
 * @returns {Object} - Tasas de cambio de respaldo
 */
export const getFallbackRates = () => {
  // Tasas de cambio de respaldo (valores aproximados)
  return {
    USD: 1,
    ARS: 900, // 1 USD = 900 ARS (aproximado)
    EUR: 0.92,
    BRL: 5.5,
    CLP: 950,
    MXN: 17.5
  };
};

/**
 * Convierte un monto de una moneda a otra
 * @param {number} amount - Monto a convertir
 * @param {string} fromCurrency - Moneda de origen
 * @param {string} toCurrency - Moneda de destino
 * @param {Object} rates - Tasas de cambio (opcional)
 * @returns {Promise<number>} - Monto convertido
 */
export const convertCurrency = async (amount, fromCurrency, toCurrency, rates = null) => {
  try {
    // Si las monedas son iguales, devolver el mismo monto
    if (fromCurrency === toCurrency) {
      return amount;
    }
    
    // Si no se proporcionaron tasas, obtenerlas
    const exchangeRates = rates || await getExchangeRates();
    
    // Convertir a USD primero (moneda base)
    const amountInUSD = fromCurrency === 'USD' 
      ? amount 
      : amount / exchangeRates[fromCurrency];
    
    // Luego convertir de USD a la moneda de destino
    const convertedAmount = toCurrency === 'USD'
      ? amountInUSD
      : amountInUSD * exchangeRates[toCurrency];
    
    return convertedAmount;
  } catch (error) {
    console.error('Error en convertCurrency:', error);
    
    // En caso de error, usar tasas de respaldo
    const fallbackRates = getFallbackRates();
    
    // Convertir usando tasas de respaldo
    const amountInUSD = fromCurrency === 'USD'
      ? amount
      : amount / fallbackRates[fromCurrency];
    
    const convertedAmount = toCurrency === 'USD'
      ? amountInUSD
      : amountInUSD * fallbackRates[toCurrency];
    
    return convertedAmount;
  }
};

/**
 * Formatea un monto en la moneda especificada
 * @param {number} amount - Monto a formatear
 * @param {string} currency - Código de moneda (ARS, USD, etc.)
 * @returns {string} - Monto formateado
 */
export const formatCurrency = (amount, currency = 'ARS') => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Obtiene el símbolo de una moneda
 * @param {string} currency - Código de moneda (ARS, USD, etc.)
 * @returns {string} - Símbolo de la moneda
 */
export const getCurrencySymbol = (currency = 'ARS') => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(0).replace(/[0-9.,]/g, '').trim();
};

/**
 * Obtiene la tasa de cambio entre dos monedas
 * @param {string} fromCurrency - Moneda de origen
 * @param {string} toCurrency - Moneda de destino
 * @returns {Promise<number>} - Tasa de cambio
 */
export const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    // Si las monedas son iguales, la tasa es 1
    if (fromCurrency === toCurrency) {
      return 1;
    }
    
    const rates = await getExchangeRates();
    
    // Convertir a USD primero (moneda base)
    const fromRate = fromCurrency === 'USD' ? 1 : rates[fromCurrency];
    const toRate = toCurrency === 'USD' ? 1 : rates[toCurrency];
    
    // Calcular tasa de cambio
    return toRate / fromRate;
  } catch (error) {
    console.error('Error en getExchangeRate:', error);
    
    // En caso de error, usar tasas de respaldo
    const fallbackRates = getFallbackRates();
    
    const fromRate = fromCurrency === 'USD' ? 1 : fallbackRates[fromCurrency];
    const toRate = toCurrency === 'USD' ? 1 : fallbackRates[toCurrency];
    
    return toRate / fromRate;
  }
};
