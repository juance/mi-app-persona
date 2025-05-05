/**
 * Servicio para manejar conversiones de moneda
 */

import axios from 'axios';

// Clave para almacenar las tasas de cambio en localStorage
const EXCHANGE_RATES_KEY = 'exchange_rates';
// Clave para almacenar el historial de tasas de cambio
const EXCHANGE_RATES_HISTORY_KEY = 'exchange_rates_history';
// Tiempo de expiración de las tasas de cambio (1 hora en milisegundos)
const EXCHANGE_RATES_EXPIRY = 60 * 60 * 1000;
// Número máximo de entradas en el historial
const MAX_HISTORY_ENTRIES = 30;

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

      const timestamp = Date.now();

      // Guardar en caché con timestamp
      localStorage.setItem(EXCHANGE_RATES_KEY, JSON.stringify({
        rates,
        timestamp
      }));

      // Guardar en el historial
      saveToRatesHistory(rates, timestamp);

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
 * Guarda las tasas de cambio en el historial
 * @param {Object} rates - Tasas de cambio
 * @param {number} timestamp - Marca de tiempo
 */
const saveToRatesHistory = (rates, timestamp) => {
  try {
    // Obtener historial actual
    const historyJson = localStorage.getItem(EXCHANGE_RATES_HISTORY_KEY);
    const history = historyJson ? JSON.parse(historyJson) : [];

    // Crear nueva entrada
    const entry = {
      rates: {
        USD: rates.USD || 1,
        ARS: rates.ARS || 900,
        EUR: rates.EUR || 0.92,
        BRL: rates.BRL || 5.5,
        CLP: rates.CLP || 950,
        MXN: rates.MXN || 17.5
      },
      timestamp
    };

    // Agregar al principio del historial
    history.unshift(entry);

    // Limitar el tamaño del historial
    const limitedHistory = history.slice(0, MAX_HISTORY_ENTRIES);

    // Guardar historial actualizado
    localStorage.setItem(EXCHANGE_RATES_HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Error al guardar en el historial de tasas de cambio:', error);
  }
};

/**
 * Obtiene el historial de tasas de cambio
 * @returns {Array} - Historial de tasas de cambio
 */
export const getRatesHistory = () => {
  try {
    const historyJson = localStorage.getItem(EXCHANGE_RATES_HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Error al obtener historial de tasas de cambio:', error);
    return [];
  }
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
