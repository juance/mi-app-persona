/**
 * Servicio para análisis predictivo de datos financieros
 */

import { getTransactions } from './transactionService';
import { getFromLocalStorage, saveToLocalStorage } from './offlineStorage';

// Constantes
const PREDICTION_CACHE_KEY = 'financial_predictions';
const PREDICTION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Predecir gastos futuros basados en patrones históricos
 * @param {number} months - Número de meses a predecir
 * @returns {Promise<Array>} - Predicciones de gastos
 */
export const predictExpenses = async (months = 3) => {
  try {
    // Verificar si hay predicciones en caché
    const cachedPredictions = getFromLocalStorage(PREDICTION_CACHE_KEY);
    if (
      cachedPredictions &&
      cachedPredictions.expenses &&
      cachedPredictions.timestamp &&
      Date.now() - cachedPredictions.timestamp < PREDICTION_CACHE_DURATION
    ) {
      return cachedPredictions.expenses;
    }

    // Obtener transacciones
    const transactions = await getTransactions();
    
    // Filtrar solo gastos
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) {
      return [];
    }
    
    // Agrupar gastos por mes
    const expensesByMonth = groupTransactionsByMonth(expenses);
    
    // Calcular promedios por categoría
    const categoryAverages = calculateCategoryAverages(expenses);
    
    // Calcular tendencias
    const trends = calculateTrends(expensesByMonth);
    
    // Generar predicciones
    const predictions = generatePredictions(categoryAverages, trends, months);
    
    // Guardar predicciones en caché
    const predictionsCache = getFromLocalStorage(PREDICTION_CACHE_KEY) || {};
    predictionsCache.expenses = predictions;
    predictionsCache.timestamp = Date.now();
    saveToLocalStorage(PREDICTION_CACHE_KEY, predictionsCache);
    
    return predictions;
  } catch (error) {
    console.error('Error al predecir gastos:', error);
    return [];
  }
};

/**
 * Predecir ingresos futuros basados en patrones históricos
 * @param {number} months - Número de meses a predecir
 * @returns {Promise<Array>} - Predicciones de ingresos
 */
export const predictIncome = async (months = 3) => {
  try {
    // Verificar si hay predicciones en caché
    const cachedPredictions = getFromLocalStorage(PREDICTION_CACHE_KEY);
    if (
      cachedPredictions &&
      cachedPredictions.income &&
      cachedPredictions.timestamp &&
      Date.now() - cachedPredictions.timestamp < PREDICTION_CACHE_DURATION
    ) {
      return cachedPredictions.income;
    }

    // Obtener transacciones
    const transactions = await getTransactions();
    
    // Filtrar solo ingresos
    const incomes = transactions.filter(t => t.type === 'income');
    
    if (incomes.length === 0) {
      return [];
    }
    
    // Agrupar ingresos por mes
    const incomesByMonth = groupTransactionsByMonth(incomes);
    
    // Calcular promedios por categoría
    const categoryAverages = calculateCategoryAverages(incomes);
    
    // Calcular tendencias
    const trends = calculateTrends(incomesByMonth);
    
    // Generar predicciones
    const predictions = generatePredictions(categoryAverages, trends, months);
    
    // Guardar predicciones en caché
    const predictionsCache = getFromLocalStorage(PREDICTION_CACHE_KEY) || {};
    predictionsCache.income = predictions;
    predictionsCache.timestamp = Date.now();
    saveToLocalStorage(PREDICTION_CACHE_KEY, predictionsCache);
    
    return predictions;
  } catch (error) {
    console.error('Error al predecir ingresos:', error);
    return [];
  }
};

/**
 * Predecir balance futuro basado en predicciones de ingresos y gastos
 * @param {number} months - Número de meses a predecir
 * @returns {Promise<Array>} - Predicciones de balance
 */
export const predictBalance = async (months = 3) => {
  try {
    // Verificar si hay predicciones en caché
    const cachedPredictions = getFromLocalStorage(PREDICTION_CACHE_KEY);
    if (
      cachedPredictions &&
      cachedPredictions.balance &&
      cachedPredictions.timestamp &&
      Date.now() - cachedPredictions.timestamp < PREDICTION_CACHE_DURATION
    ) {
      return cachedPredictions.balance;
    }

    // Obtener predicciones de ingresos y gastos
    const incomePredictions = await predictIncome(months);
    const expensePredictions = await predictExpenses(months);
    
    // Calcular balance para cada mes
    const balancePredictions = [];
    
    for (let i = 0; i < months; i++) {
      const monthIncome = incomePredictions.find(p => p.monthIndex === i) || { total: 0 };
      const monthExpense = expensePredictions.find(p => p.monthIndex === i) || { total: 0 };
      
      balancePredictions.push({
        monthIndex: i,
        month: getMonthName(i),
        income: monthIncome.total,
        expense: monthExpense.total,
        balance: monthIncome.total - monthExpense.total,
        categories: {
          income: monthIncome.categories || {},
          expense: monthExpense.categories || {}
        }
      });
    }
    
    // Guardar predicciones en caché
    const predictionsCache = getFromLocalStorage(PREDICTION_CACHE_KEY) || {};
    predictionsCache.balance = balancePredictions;
    predictionsCache.timestamp = Date.now();
    saveToLocalStorage(PREDICTION_CACHE_KEY, predictionsCache);
    
    return balancePredictions;
  } catch (error) {
    console.error('Error al predecir balance:', error);
    return [];
  }
};

/**
 * Agrupar transacciones por mes
 * @param {Array} transactions - Lista de transacciones
 * @returns {Object} - Transacciones agrupadas por mes
 */
const groupTransactionsByMonth = (transactions) => {
  const grouped = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    
    grouped[monthKey].push(transaction);
  });
  
  return grouped;
};

/**
 * Calcular promedios por categoría
 * @param {Array} transactions - Lista de transacciones
 * @returns {Object} - Promedios por categoría
 */
const calculateCategoryAverages = (transactions) => {
  const categories = {};
  const categoryCounts = {};
  
  transactions.forEach(transaction => {
    const category = transaction.category || 'Sin categoría';
    
    if (!categories[category]) {
      categories[category] = 0;
      categoryCounts[category] = 0;
    }
    
    categories[category] += transaction.amount;
    categoryCounts[category]++;
  });
  
  // Calcular promedios
  const averages = {};
  
  Object.keys(categories).forEach(category => {
    averages[category] = categories[category] / categoryCounts[category];
  });
  
  return averages;
};

/**
 * Calcular tendencias basadas en datos históricos
 * @param {Object} transactionsByMonth - Transacciones agrupadas por mes
 * @returns {Object} - Tendencias por categoría
 */
const calculateTrends = (transactionsByMonth) => {
  const months = Object.keys(transactionsByMonth).sort();
  
  if (months.length < 2) {
    return { overall: 0, categories: {} };
  }
  
  // Calcular totales por mes
  const monthlyTotals = months.map(month => {
    const transactions = transactionsByMonth[month];
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Calcular totales por categoría
    const categoryTotals = {};
    transactions.forEach(t => {
      const category = t.category || 'Sin categoría';
      categoryTotals[category] = (categoryTotals[category] || 0) + t.amount;
    });
    
    return {
      month,
      total,
      categoryTotals
    };
  });
  
  // Calcular tendencia general
  const firstMonth = monthlyTotals[0];
  const lastMonth = monthlyTotals[monthlyTotals.length - 1];
  const monthCount = monthlyTotals.length;
  
  // Si solo hay datos de un mes, no hay tendencia
  if (monthCount <= 1) {
    return { overall: 0, categories: {} };
  }
  
  // Calcular tendencia como porcentaje de cambio mensual promedio
  const overallChange = lastMonth.total - firstMonth.total;
  const overallTrend = overallChange / (monthCount - 1) / (firstMonth.total || 1);
  
  // Calcular tendencias por categoría
  const categoryTrends = {};
  
  // Obtener todas las categorías únicas
  const allCategories = new Set();
  monthlyTotals.forEach(month => {
    Object.keys(month.categoryTotals).forEach(category => {
      allCategories.add(category);
    });
  });
  
  // Calcular tendencia para cada categoría
  allCategories.forEach(category => {
    const firstMonthWithCategory = monthlyTotals.find(m => m.categoryTotals[category]);
    const lastMonthWithCategory = [...monthlyTotals].reverse().find(m => m.categoryTotals[category]);
    
    if (firstMonthWithCategory && lastMonthWithCategory) {
      const firstValue = firstMonthWithCategory.categoryTotals[category] || 0;
      const lastValue = lastMonthWithCategory.categoryTotals[category] || 0;
      
      // Calcular índices de los meses
      const firstIndex = monthlyTotals.indexOf(firstMonthWithCategory);
      const lastIndex = monthlyTotals.indexOf(lastMonthWithCategory);
      const monthDiff = lastIndex - firstIndex;
      
      if (monthDiff > 0) {
        const change = lastValue - firstValue;
        const trend = change / monthDiff / (firstValue || 1);
        categoryTrends[category] = trend;
      } else {
        categoryTrends[category] = 0;
      }
    } else {
      categoryTrends[category] = 0;
    }
  });
  
  return {
    overall: overallTrend,
    categories: categoryTrends
  };
};

/**
 * Generar predicciones basadas en promedios y tendencias
 * @param {Object} categoryAverages - Promedios por categoría
 * @param {Object} trends - Tendencias calculadas
 * @param {number} months - Número de meses a predecir
 * @returns {Array} - Predicciones
 */
const generatePredictions = (categoryAverages, trends, months) => {
  const predictions = [];
  
  for (let i = 0; i < months; i++) {
    const monthPrediction = {
      monthIndex: i,
      month: getMonthName(i),
      total: 0,
      categories: {}
    };
    
    // Predecir valores por categoría
    Object.keys(categoryAverages).forEach(category => {
      const average = categoryAverages[category];
      const trend = trends.categories[category] || 0;
      
      // Aplicar tendencia al promedio
      const predictedValue = average * (1 + trend * (i + 1));
      
      monthPrediction.categories[category] = predictedValue;
      monthPrediction.total += predictedValue;
    });
    
    predictions.push(monthPrediction);
  }
  
  return predictions;
};

/**
 * Obtener nombre del mes basado en el índice relativo al mes actual
 * @param {number} monthIndex - Índice del mes (0 = mes actual, 1 = próximo mes, etc.)
 * @returns {string} - Nombre del mes
 */
const getMonthName = (monthIndex) => {
  const date = new Date();
  date.setMonth(date.getMonth() + monthIndex);
  
  return date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
};

/**
 * Identificar categorías con mayor crecimiento o decrecimiento
 * @returns {Promise<Object>} - Categorías con mayor variación
 */
export const identifyTrendingCategories = async () => {
  try {
    // Obtener transacciones
    const transactions = await getTransactions();
    
    if (transactions.length === 0) {
      return { increasing: [], decreasing: [] };
    }
    
    // Separar por tipo
    const expenses = transactions.filter(t => t.type === 'expense');
    const incomes = transactions.filter(t => t.type === 'income');
    
    // Calcular tendencias
    const expenseTrends = calculateTrends(groupTransactionsByMonth(expenses));
    const incomeTrends = calculateTrends(groupTransactionsByMonth(incomes));
    
    // Identificar categorías con mayor crecimiento en gastos
    const expenseCategories = Object.keys(expenseTrends.categories);
    const increasingExpenses = expenseCategories
      .filter(category => expenseTrends.categories[category] > 0.05) // 5% de crecimiento
      .map(category => ({
        category,
        trend: expenseTrends.categories[category],
        type: 'expense'
      }))
      .sort((a, b) => b.trend - a.trend)
      .slice(0, 3);
    
    // Identificar categorías con mayor decrecimiento en gastos
    const decreasingExpenses = expenseCategories
      .filter(category => expenseTrends.categories[category] < -0.05) // 5% de decrecimiento
      .map(category => ({
        category,
        trend: expenseTrends.categories[category],
        type: 'expense'
      }))
      .sort((a, b) => a.trend - b.trend)
      .slice(0, 3);
    
    // Identificar categorías con mayor crecimiento en ingresos
    const incomeCategories = Object.keys(incomeTrends.categories);
    const increasingIncomes = incomeCategories
      .filter(category => incomeTrends.categories[category] > 0.05)
      .map(category => ({
        category,
        trend: incomeTrends.categories[category],
        type: 'income'
      }))
      .sort((a, b) => b.trend - a.trend)
      .slice(0, 3);
    
    // Identificar categorías con mayor decrecimiento en ingresos
    const decreasingIncomes = incomeCategories
      .filter(category => incomeTrends.categories[category] < -0.05)
      .map(category => ({
        category,
        trend: incomeTrends.categories[category],
        type: 'income'
      }))
      .sort((a, b) => a.trend - b.trend)
      .slice(0, 3);
    
    return {
      increasing: [...increasingIncomes, ...increasingExpenses],
      decreasing: [...decreasingIncomes, ...decreasingExpenses]
    };
  } catch (error) {
    console.error('Error al identificar categorías con tendencia:', error);
    return { increasing: [], decreasing: [] };
  }
};

/**
 * Detectar patrones de gasto recurrentes
 * @returns {Promise<Array>} - Patrones detectados
 */
export const detectRecurringPatterns = async () => {
  try {
    // Obtener transacciones
    const transactions = await getTransactions();
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length < 5) {
      return [];
    }
    
    // Agrupar por título y categoría
    const groups = {};
    
    expenses.forEach(expense => {
      const key = `${expense.title.toLowerCase()}_${expense.category || 'sin_categoria'}`;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      
      groups[key].push(expense);
    });
    
    // Filtrar grupos con al menos 2 transacciones
    const recurringGroups = Object.keys(groups)
      .filter(key => groups[key].length >= 2)
      .map(key => {
        const transactions = groups[key];
        const title = transactions[0].title;
        const category = transactions[0].category;
        
        // Ordenar por fecha
        transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Calcular intervalos entre transacciones
        const intervals = [];
        for (let i = 1; i < transactions.length; i++) {
          const prevDate = new Date(transactions[i - 1].date);
          const currDate = new Date(transactions[i].date);
          const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
          intervals.push(diffDays);
        }
        
        // Calcular intervalo promedio
        const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
        
        // Calcular desviación estándar
        const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
        const stdDev = Math.sqrt(variance);
        
        // Determinar si es recurrente (desviación estándar baja)
        const isRecurring = stdDev < avgInterval * 0.3; // 30% de variación máxima
        
        // Calcular monto promedio
        const avgAmount = transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length;
        
        // Determinar frecuencia
        let frequency = 'irregular';
        if (isRecurring) {
          if (avgInterval >= 25 && avgInterval <= 35) {
            frequency = 'mensual';
          } else if (avgInterval >= 6 && avgInterval <= 8) {
            frequency = 'semanal';
          } else if (avgInterval >= 13 && avgInterval <= 16) {
            frequency = 'quincenal';
          } else if (avgInterval >= 85 && avgInterval <= 95) {
            frequency = 'trimestral';
          }
        }
        
        // Predecir próxima fecha
        let nextDate = null;
        if (isRecurring) {
          const lastDate = new Date(transactions[transactions.length - 1].date);
          nextDate = new Date(lastDate);
          nextDate.setDate(lastDate.getDate() + Math.round(avgInterval));
        }
        
        return {
          title,
          category,
          frequency,
          isRecurring,
          avgAmount,
          avgInterval: Math.round(avgInterval),
          occurrences: transactions.length,
          lastDate: transactions[transactions.length - 1].date,
          nextDate: nextDate ? nextDate.toISOString().split('T')[0] : null,
          confidence: isRecurring ? (1 - stdDev / avgInterval) : 0
        };
      })
      .filter(group => group.isRecurring)
      .sort((a, b) => b.confidence - a.confidence);
    
    return recurringGroups;
  } catch (error) {
    console.error('Error al detectar patrones recurrentes:', error);
    return [];
  }
};

/**
 * Generar recomendaciones de ahorro basadas en patrones de gasto
 * @returns {Promise<Array>} - Recomendaciones de ahorro
 */
export const generateSavingRecommendations = async () => {
  try {
    // Obtener transacciones
    const transactions = await getTransactions();
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) {
      return [];
    }
    
    // Calcular gasto total y por categoría
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    // Agrupar por categoría
    const categoryExpenses = {};
    expenses.forEach(expense => {
      const category = expense.category || 'Sin categoría';
      
      if (!categoryExpenses[category]) {
        categoryExpenses[category] = 0;
      }
      
      categoryExpenses[category] += expense.amount;
    });
    
    // Calcular porcentajes por categoría
    const categoryPercentages = {};
    Object.keys(categoryExpenses).forEach(category => {
      categoryPercentages[category] = categoryExpenses[category] / totalExpense;
    });
    
    // Identificar categorías con alto porcentaje de gasto
    const highExpenseCategories = Object.keys(categoryPercentages)
      .filter(category => categoryPercentages[category] > 0.15) // Más del 15% del gasto total
      .map(category => ({
        category,
        percentage: categoryPercentages[category],
        amount: categoryExpenses[category]
      }))
      .sort((a, b) => b.percentage - a.percentage);
    
    // Generar recomendaciones
    const recommendations = [];
    
    // Recomendaciones por categoría de alto gasto
    highExpenseCategories.forEach(categoryData => {
      const { category, percentage, amount } = categoryData;
      
      // Calcular ahorro potencial (reducción del 10%)
      const potentialSaving = amount * 0.1;
      
      recommendations.push({
        type: 'high_expense_category',
        category,
        percentage: percentage,
        currentAmount: amount,
        potentialSaving,
        message: `Tus gastos en ${category} representan el ${(percentage * 100).toFixed(1)}% de tus gastos totales. Reduciendo un 10% podrías ahorrar ${potentialSaving.toFixed(2)} pesos.`
      });
    });
    
    // Detectar gastos pequeños pero frecuentes
    const smallExpenses = expenses.filter(t => t.amount < 500); // Gastos menores a 500 pesos
    
    if (smallExpenses.length > expenses.length * 0.3) { // Si más del 30% son gastos pequeños
      const totalSmallExpense = smallExpenses.reduce((sum, t) => sum + t.amount, 0);
      const potentialSaving = totalSmallExpense * 0.2; // 20% de ahorro potencial
      
      recommendations.push({
        type: 'small_frequent_expenses',
        count: smallExpenses.length,
        totalAmount: totalSmallExpense,
        potentialSaving,
        message: `Tienes ${smallExpenses.length} gastos pequeños que suman ${totalSmallExpense.toFixed(2)} pesos. Reduciendo estos gastos podrías ahorrar hasta ${potentialSaving.toFixed(2)} pesos.`
      });
    }
    
    // Detectar patrones recurrentes para posibles suscripciones
    const recurringPatterns = await detectRecurringPatterns();
    const subscriptions = recurringPatterns.filter(p => 
      p.frequency === 'mensual' && 
      p.avgAmount < 2000 && // Monto típico de suscripciones
      p.confidence > 0.7 // Alta confianza
    );
    
    if (subscriptions.length > 0) {
      const totalSubscriptions = subscriptions.reduce((sum, s) => sum + s.avgAmount, 0);
      
      recommendations.push({
        type: 'subscriptions',
        count: subscriptions.length,
        totalAmount: totalSubscriptions,
        subscriptions,
        message: `Tienes ${subscriptions.length} posibles suscripciones que suman ${totalSubscriptions.toFixed(2)} pesos mensuales. Revisa si todas son necesarias.`
      });
    }
    
    return recommendations;
  } catch (error) {
    console.error('Error al generar recomendaciones de ahorro:', error);
    return [];
  }
};

/**
 * Predecir flujo de caja para los próximos meses
 * @param {number} months - Número de meses a predecir
 * @returns {Promise<Object>} - Predicción de flujo de caja
 */
export const predictCashFlow = async (months = 3) => {
  try {
    // Obtener balance actual
    const transactions = await getTransactions();
    const currentBalance = transactions.reduce((balance, t) => {
      return balance + (t.type === 'income' ? t.amount : -t.amount);
    }, 0);
    
    // Obtener predicciones de balance
    const balancePredictions = await predictBalance(months);
    
    // Calcular flujo de caja acumulativo
    let runningBalance = currentBalance;
    const cashFlow = balancePredictions.map(prediction => {
      runningBalance += prediction.balance;
      
      return {
        ...prediction,
        startingBalance: runningBalance - prediction.balance,
        endingBalance: runningBalance,
        cashFlow: prediction.balance
      };
    });
    
    return {
      currentBalance,
      predictions: cashFlow
    };
  } catch (error) {
    console.error('Error al predecir flujo de caja:', error);
    return {
      currentBalance: 0,
      predictions: []
    };
  }
};
