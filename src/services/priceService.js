// import { supabase } from './supabase';
// Comentado hasta que se implemente la integración con Supabase

// Función para obtener precios actualizados de acciones
export const getStockPrice = async (symbol) => {
  try {
    // En una implementación real, aquí se haría una llamada a una API de precios de acciones
    // Por ejemplo: Alpha Vantage, Yahoo Finance, etc.
    // Por ahora, simularemos una respuesta con un precio aleatorio

    // Simulación de delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generamos un precio base según el símbolo (para que sea consistente)
    const basePrice = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;

    // Añadimos una variación aleatoria de hasta ±5%
    const variation = (Math.random() * 10 - 5) / 100;
    const price = basePrice * (1 + variation);

    return {
      symbol,
      price: parseFloat(price.toFixed(2)),
      currency: symbol.includes('BTC') || symbol.includes('ETH') ? 'USD' : 'ARS',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
};

// Función para obtener precios actualizados de criptomonedas
export const getCryptoPrice = async (symbol) => {
  try {
    // En una implementación real, aquí se haría una llamada a una API de precios de criptomonedas
    // Por ejemplo: CoinGecko, Binance, etc.

    // Simulación de delay de red
    await new Promise(resolve => setTimeout(resolve, 700));

    // Precios base para criptomonedas comunes
    const basePrices = {
      'BTC': 35000,
      'ETH': 2200,
      'SOL': 120,
      'ADA': 0.5,
      'DOT': 7,
      'MATIC': 1.2,
      'XRP': 0.6,
      'DOGE': 0.08,
      'SHIB': 0.00001,
      'AVAX': 30
    };

    // Si no tenemos un precio base para este símbolo, generamos uno aleatorio
    const basePrice = basePrices[symbol] ||
      (symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100);

    // Añadimos una variación aleatoria de hasta ±8% (las criptos son más volátiles)
    const variation = (Math.random() * 16 - 8) / 100;
    const price = basePrice * (1 + variation);

    return {
      symbol,
      price: parseFloat(price.toFixed(symbol === 'SHIB' ? 8 : 2)),
      currency: 'USD',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return null;
  }
};

// Función para obtener precios actualizados de bonos
export const getBondPrice = async (symbol) => {
  try {
    // Simulación de delay de red
    await new Promise(resolve => setTimeout(resolve, 600));

    // Para bonos, el precio suele estar entre 0 y 1 (como porcentaje del valor nominal)
    const basePrice = (symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 30) / 100 + 0.7;

    // Añadimos una variación aleatoria de hasta ±2%
    const variation = (Math.random() * 4 - 2) / 100;
    const price = basePrice * (1 + variation);

    return {
      symbol,
      price: parseFloat(price.toFixed(3)),
      currency: symbol.includes('US') ? 'USD' : 'ARS',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching bond price:', error);
    return null;
  }
};

// Función para actualizar los precios de todas las inversiones
export const updateAllPrices = async (investments) => {
  try {
    const updatedInvestments = await Promise.all(
      investments.map(async (investment) => {
        let priceData;

        switch (investment.type) {
          case 'crypto':
            priceData = await getCryptoPrice(investment.symbol);
            break;
          case 'bond':
            priceData = await getBondPrice(investment.symbol);
            break;
          case 'stock':
          case 'etf':
          default:
            priceData = await getStockPrice(investment.symbol);
            break;
        }

        if (priceData) {
          return {
            ...investment,
            current_price: priceData.price
          };
        }

        return investment;
      })
    );

    return updatedInvestments;
  } catch (error) {
    console.error('Error updating all prices:', error);
    return investments;
  }
};

// Función para guardar los precios actualizados en la base de datos
export const savePriceUpdates = async (investments) => {
  try {
    // En una implementación real, aquí se guardarían los precios en Supabase
    // Por ahora, solo simularemos el guardado
    console.log('Saving updated prices to database:', investments);

    // Aquí iría el código para guardar en Supabase
    // Por ejemplo:
    /*
    const { data, error } = await supabase
      .from('investments')
      .upsert(
        investments.map(inv => ({
          id: inv.id,
          current_price: inv.current_price,
          updated_at: new Date()
        })),
        { onConflict: 'id' }
      );

    if (error) throw error;
    return data;
    */

    return investments;
  } catch (error) {
    console.error('Error saving price updates:', error);
    return investments;
  }
};

// Función para obtener el historial de precios de una inversión
export const getPriceHistory = async (symbol, type, days = 30) => {
  try {
    // En una implementación real, aquí se obtendría el historial de precios de una API
    // Por ahora, generaremos datos aleatorios

    const today = new Date();
    const priceHistory = [];

    // Determinamos un precio base según el tipo y símbolo
    let basePrice;
    if (type === 'crypto') {
      const cryptoPrices = {
        'BTC': 35000,
        'ETH': 2200,
        'SOL': 120,
        'ADA': 0.5,
        'DOT': 7,
        'MATIC': 1.2,
        'XRP': 0.6,
        'DOGE': 0.08,
        'SHIB': 0.00001,
        'AVAX': 30
      };
      basePrice = cryptoPrices[symbol] || 100;
    } else if (type === 'bond') {
      basePrice = 0.85;
    } else {
      // Acciones y ETFs
      basePrice = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
      if (basePrice < 100) basePrice += 100; // Aseguramos un precio mínimo
    }

    // Generamos datos históricos con tendencia
    let currentPrice = basePrice;
    const trend = Math.random() > 0.5 ? 1 : -1; // Tendencia alcista o bajista
    const volatility = type === 'crypto' ? 0.03 : 0.01; // Las criptos son más volátiles

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Añadimos una variación aleatoria con tendencia
      const dailyChange = (Math.random() * volatility * 2 - volatility) + (trend * volatility / 2);
      currentPrice = currentPrice * (1 + dailyChange);

      priceHistory.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(currentPrice.toFixed(2))
      });
    }

    return priceHistory;
  } catch (error) {
    console.error('Error fetching price history:', error);
    return [];
  }
};
