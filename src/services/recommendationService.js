/**
 * Servicio para generar recomendaciones personalizadas
 */

import { getTransactions } from './transactionService';
import { getTasks } from './taskService';
import { getEvents } from './calendarService';
import { getFinancialGoals } from './financialGoalService';
import { getFromLocalStorage, saveToLocalStorage } from './offlineStorage';
import { 
  detectRecurringPatterns, 
  identifyTrendingCategories,
  generateSavingRecommendations,
  predictCashFlow
} from './predictiveAnalysisService';

// Constantes
const RECOMMENDATIONS_CACHE_KEY = 'personalized_recommendations';
const RECOMMENDATIONS_CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 horas

/**
 * Generar recomendaciones financieras personalizadas
 * @returns {Promise<Array>} - Lista de recomendaciones
 */
export const generateFinancialRecommendations = async () => {
  try {
    // Verificar si hay recomendaciones en caché
    const cachedRecommendations = getFromLocalStorage(RECOMMENDATIONS_CACHE_KEY);
    if (
      cachedRecommendations &&
      cachedRecommendations.financial &&
      cachedRecommendations.timestamp &&
      Date.now() - cachedRecommendations.timestamp < RECOMMENDATIONS_CACHE_DURATION
    ) {
      return cachedRecommendations.financial;
    }

    // Obtener datos necesarios
    const transactions = await getTransactions();
    const financialGoals = await getFinancialGoals();
    const recurringPatterns = await detectRecurringPatterns();
    const trendingCategories = await identifyTrendingCategories();
    const savingRecommendations = await generateSavingRecommendations();
    const cashFlow = await predictCashFlow(3);
    
    const recommendations = [];
    
    // Recomendaciones basadas en tendencias de categorías
    if (trendingCategories.increasing.length > 0) {
      trendingCategories.increasing.forEach(category => {
        if (category.type === 'expense') {
          recommendations.push({
            id: `trend_expense_${category.category}`,
            type: 'warning',
            category: 'trends',
            title: `Aumento en gastos de ${category.category}`,
            description: `Tus gastos en ${category.category} están aumentando. Considera revisar estos gastos para mantenerlos bajo control.`,
            actionText: 'Ver detalles',
            actionLink: '/analytics',
            priority: 'medium'
          });
        } else {
          recommendations.push({
            id: `trend_income_${category.category}`,
            type: 'success',
            category: 'trends',
            title: `Aumento en ingresos de ${category.category}`,
            description: `Tus ingresos en ${category.category} están aumentando. ¡Buen trabajo!`,
            actionText: 'Ver detalles',
            actionLink: '/analytics',
            priority: 'low'
          });
        }
      });
    }
    
    if (trendingCategories.decreasing.length > 0) {
      trendingCategories.decreasing.forEach(category => {
        if (category.type === 'income') {
          recommendations.push({
            id: `trend_income_decrease_${category.category}`,
            type: 'warning',
            category: 'trends',
            title: `Disminución en ingresos de ${category.category}`,
            description: `Tus ingresos en ${category.category} están disminuyendo. Considera buscar alternativas para compensar esta reducción.`,
            actionText: 'Ver detalles',
            actionLink: '/analytics',
            priority: 'high'
          });
        } else {
          recommendations.push({
            id: `trend_expense_decrease_${category.category}`,
            type: 'success',
            category: 'trends',
            title: `Disminución en gastos de ${category.category}`,
            description: `Tus gastos en ${category.category} están disminuyendo. ¡Sigue así!`,
            actionText: 'Ver detalles',
            actionLink: '/analytics',
            priority: 'low'
          });
        }
      });
    }
    
    // Recomendaciones basadas en patrones recurrentes
    if (recurringPatterns.length > 0) {
      const subscriptions = recurringPatterns.filter(p => 
        p.frequency === 'mensual' && 
        p.avgAmount < 2000 && 
        p.confidence > 0.7
      );
      
      if (subscriptions.length > 0) {
        const totalSubscriptions = subscriptions.reduce((sum, s) => sum + s.avgAmount, 0);
        
        recommendations.push({
          id: 'recurring_subscriptions',
          type: 'info',
          category: 'patterns',
          title: 'Revisión de suscripciones',
          description: `Tienes ${subscriptions.length} posibles suscripciones que suman ${totalSubscriptions.toFixed(2)} pesos mensuales. Revisa si todas son necesarias.`,
          actionText: 'Ver detalles',
          actionLink: '/finances',
          priority: 'medium',
          data: subscriptions
        });
      }
      
      // Identificar pagos recurrentes importantes
      const importantPayments = recurringPatterns.filter(p => 
        p.avgAmount > 2000 && 
        p.confidence > 0.6
      );
      
      if (importantPayments.length > 0) {
        importantPayments.forEach(payment => {
          if (payment.nextDate) {
            const nextDate = new Date(payment.nextDate);
            const today = new Date();
            const daysUntilPayment = Math.round((nextDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilPayment <= 7 && daysUntilPayment >= 0) {
              recommendations.push({
                id: `upcoming_payment_${payment.title}`,
                type: 'warning',
                category: 'upcoming',
                title: `Pago próximo: ${payment.title}`,
                description: `Tienes un pago de aproximadamente ${payment.avgAmount.toFixed(2)} pesos programado para el ${new Date(payment.nextDate).toLocaleDateString('es-ES')} (en ${daysUntilPayment} días).`,
                actionText: 'Preparar pago',
                actionLink: '/finances',
                priority: 'high',
                data: payment
              });
            }
          }
        });
      }
    }
    
    // Recomendaciones basadas en metas financieras
    if (financialGoals.length > 0) {
      financialGoals.forEach(goal => {
        const targetDate = new Date(goal.target_date);
        const today = new Date();
        const daysRemaining = Math.round((targetDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysRemaining > 0) {
          const progress = goal.current_amount / goal.target_amount;
          const expectedProgress = (1 - daysRemaining / (Math.round((targetDate - new Date(goal.created_at)) / (1000 * 60 * 60 * 24))));
          
          if (progress < expectedProgress * 0.8) {
            // Progreso significativamente menor al esperado
            recommendations.push({
              id: `goal_behind_${goal.id}`,
              type: 'danger',
              category: 'goals',
              title: `Meta atrasada: ${goal.title}`,
              description: `Estás atrasado en tu meta "${goal.title}". Para alcanzarla a tiempo, necesitas aumentar tus aportes.`,
              actionText: 'Ver meta',
              actionLink: '/financial-goals',
              priority: 'high',
              data: goal
            });
          } else if (progress < expectedProgress) {
            // Progreso ligeramente menor al esperado
            recommendations.push({
              id: `goal_slightly_behind_${goal.id}`,
              type: 'warning',
              category: 'goals',
              title: `Meta ligeramente atrasada: ${goal.title}`,
              description: `Estás un poco atrasado en tu meta "${goal.title}". Considera aumentar tus aportes para alcanzarla a tiempo.`,
              actionText: 'Ver meta',
              actionLink: '/financial-goals',
              priority: 'medium',
              data: goal
            });
          } else if (progress > expectedProgress * 1.2) {
            // Progreso mayor al esperado
            recommendations.push({
              id: `goal_ahead_${goal.id}`,
              type: 'success',
              category: 'goals',
              title: `¡Buen progreso en tu meta: ${goal.title}!`,
              description: `Estás adelantado en tu meta "${goal.title}". ¡Sigue así!`,
              actionText: 'Ver meta',
              actionLink: '/financial-goals',
              priority: 'low',
              data: goal
            });
          }
          
          // Meta próxima a vencer
          if (daysRemaining <= 30) {
            recommendations.push({
              id: `goal_ending_soon_${goal.id}`,
              type: progress >= 0.9 ? 'success' : 'warning',
              category: 'goals',
              title: `Meta próxima a vencer: ${goal.title}`,
              description: `Tu meta "${goal.title}" vence en ${daysRemaining} días y has completado el ${(progress * 100).toFixed(0)}%.`,
              actionText: 'Ver meta',
              actionLink: '/financial-goals',
              priority: daysRemaining <= 7 ? 'high' : 'medium',
              data: goal
            });
          }
        }
      });
    }
    
    // Recomendaciones basadas en ahorro
    if (savingRecommendations.length > 0) {
      savingRecommendations.forEach((recommendation, index) => {
        if (recommendation.type === 'high_expense_category') {
          recommendations.push({
            id: `saving_high_expense_${recommendation.category}`,
            type: 'info',
            category: 'saving',
            title: `Oportunidad de ahorro en ${recommendation.category}`,
            description: recommendation.message,
            actionText: 'Ver detalles',
            actionLink: '/finances',
            priority: 'medium',
            data: recommendation
          });
        } else if (recommendation.type === 'small_frequent_expenses') {
          recommendations.push({
            id: 'saving_small_expenses',
            type: 'info',
            category: 'saving',
            title: 'Gastos pequeños pero frecuentes',
            description: recommendation.message,
            actionText: 'Ver detalles',
            actionLink: '/finances',
            priority: 'medium',
            data: recommendation
          });
        } else if (recommendation.type === 'subscriptions') {
          recommendations.push({
            id: 'saving_subscriptions',
            type: 'info',
            category: 'saving',
            title: 'Revisa tus suscripciones',
            description: recommendation.message,
            actionText: 'Ver detalles',
            actionLink: '/finances',
            priority: 'medium',
            data: recommendation
          });
        }
      });
    }
    
    // Recomendaciones basadas en flujo de caja
    if (cashFlow.predictions.length > 0) {
      const lastMonth = cashFlow.predictions[cashFlow.predictions.length - 1];
      
      if (lastMonth.endingBalance < 0) {
        // Predicción de balance negativo
        recommendations.push({
          id: 'cashflow_negative',
          type: 'danger',
          category: 'cashflow',
          title: 'Posible balance negativo',
          description: `Según nuestras predicciones, podrías tener un balance negativo de ${lastMonth.endingBalance.toFixed(2)} pesos en los próximos meses. Considera reducir gastos o aumentar ingresos.`,
          actionText: 'Ver predicciones',
          actionLink: '/analytics',
          priority: 'high',
          data: cashFlow
        });
      } else if (lastMonth.endingBalance < cashFlow.currentBalance * 0.5) {
        // Predicción de reducción significativa del balance
        recommendations.push({
          id: 'cashflow_decreasing',
          type: 'warning',
          category: 'cashflow',
          title: 'Reducción de balance',
          description: `Según nuestras predicciones, tu balance podría reducirse significativamente en los próximos meses. Considera revisar tus gastos.`,
          actionText: 'Ver predicciones',
          actionLink: '/analytics',
          priority: 'medium',
          data: cashFlow
        });
      } else if (lastMonth.endingBalance > cashFlow.currentBalance * 1.5) {
        // Predicción de aumento significativo del balance
        recommendations.push({
          id: 'cashflow_increasing',
          type: 'success',
          category: 'cashflow',
          title: 'Aumento de balance',
          description: `Según nuestras predicciones, tu balance podría aumentar significativamente en los próximos meses. ¡Buen trabajo!`,
          actionText: 'Ver predicciones',
          actionLink: '/analytics',
          priority: 'low',
          data: cashFlow
        });
      }
    }
    
    // Ordenar recomendaciones por prioridad
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const sortedRecommendations = recommendations.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    // Guardar recomendaciones en caché
    const recommendationsCache = getFromLocalStorage(RECOMMENDATIONS_CACHE_KEY) || {};
    recommendationsCache.financial = sortedRecommendations;
    recommendationsCache.timestamp = Date.now();
    saveToLocalStorage(RECOMMENDATIONS_CACHE_KEY, recommendationsCache);
    
    return sortedRecommendations;
  } catch (error) {
    console.error('Error al generar recomendaciones financieras:', error);
    return [];
  }
};

/**
 * Generar recomendaciones de productividad personalizadas
 * @returns {Promise<Array>} - Lista de recomendaciones
 */
export const generateProductivityRecommendations = async () => {
  try {
    // Verificar si hay recomendaciones en caché
    const cachedRecommendations = getFromLocalStorage(RECOMMENDATIONS_CACHE_KEY);
    if (
      cachedRecommendations &&
      cachedRecommendations.productivity &&
      cachedRecommendations.timestamp &&
      Date.now() - cachedRecommendations.timestamp < RECOMMENDATIONS_CACHE_DURATION
    ) {
      return cachedRecommendations.productivity;
    }

    // Obtener datos necesarios
    const tasks = await getTasks();
    const events = await getEvents();
    
    const recommendations = [];
    
    // Recomendaciones basadas en tareas pendientes
    const pendingTasks = tasks.filter(task => task.status !== 'completed');
    const overdueTasks = pendingTasks.filter(task => {
      if (!task.due_date) return false;
      return new Date(task.due_date) < new Date();
    });
    
    if (overdueTasks.length > 0) {
      recommendations.push({
        id: 'overdue_tasks',
        type: 'danger',
        category: 'tasks',
        title: 'Tareas vencidas',
        description: `Tienes ${overdueTasks.length} tareas vencidas. Considera priorizarlas o ajustar sus fechas de vencimiento.`,
        actionText: 'Ver tareas',
        actionLink: '/tasks',
        priority: 'high',
        data: overdueTasks
      });
    }
    
    // Tareas próximas a vencer
    const soonDueTasks = pendingTasks.filter(task => {
      if (!task.due_date) return false;
      const dueDate = new Date(task.due_date);
      const today = new Date();
      const daysUntilDue = Math.round((dueDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilDue >= 0 && daysUntilDue <= 3;
    });
    
    if (soonDueTasks.length > 0) {
      recommendations.push({
        id: 'soon_due_tasks',
        type: 'warning',
        category: 'tasks',
        title: 'Tareas próximas a vencer',
        description: `Tienes ${soonDueTasks.length} tareas que vencen en los próximos 3 días.`,
        actionText: 'Ver tareas',
        actionLink: '/tasks',
        priority: 'medium',
        data: soonDueTasks
      });
    }
    
    // Recomendaciones basadas en eventos próximos
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.start_date);
      const today = new Date();
      const daysUntilEvent = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilEvent >= 0 && daysUntilEvent <= 3;
    });
    
    if (upcomingEvents.length > 0) {
      recommendations.push({
        id: 'upcoming_events',
        type: 'info',
        category: 'events',
        title: 'Eventos próximos',
        description: `Tienes ${upcomingEvents.length} eventos programados para los próximos 3 días.`,
        actionText: 'Ver calendario',
        actionLink: '/calendar',
        priority: 'medium',
        data: upcomingEvents
      });
    }
    
    // Detectar días con muchos eventos
    const eventsByDay = {};
    events.forEach(event => {
      const dateKey = event.start_date.split('T')[0];
      if (!eventsByDay[dateKey]) {
        eventsByDay[dateKey] = [];
      }
      eventsByDay[dateKey].push(event);
    });
    
    Object.keys(eventsByDay).forEach(dateKey => {
      const eventsForDay = eventsByDay[dateKey];
      if (eventsForDay.length >= 4) {
        const eventDate = new Date(dateKey);
        const today = new Date();
        const daysUntilEvent = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilEvent >= 0 && daysUntilEvent <= 7) {
          recommendations.push({
            id: `busy_day_${dateKey}`,
            type: 'warning',
            category: 'events',
            title: 'Día con muchos eventos',
            description: `Tienes ${eventsForDay.length} eventos programados para el ${eventDate.toLocaleDateString('es-ES')}. Considera reorganizar tu agenda si es posible.`,
            actionText: 'Ver calendario',
            actionLink: '/calendar',
            priority: daysUntilEvent <= 2 ? 'high' : 'medium',
            data: eventsForDay
          });
        }
      }
    });
    
    // Detectar categorías de tareas con muchas pendientes
    const tasksByCategory = {};
    pendingTasks.forEach(task => {
      const category = task.category || 'Sin categoría';
      if (!tasksByCategory[category]) {
        tasksByCategory[category] = [];
      }
      tasksByCategory[category].push(task);
    });
    
    Object.keys(tasksByCategory).forEach(category => {
      const tasksInCategory = tasksByCategory[category];
      if (tasksInCategory.length >= 5) {
        recommendations.push({
          id: `many_tasks_${category}`,
          type: 'info',
          category: 'tasks',
          title: `Muchas tareas en ${category}`,
          description: `Tienes ${tasksInCategory.length} tareas pendientes en la categoría ${category}. Considera priorizarlas o dividirlas en subtareas.`,
          actionText: 'Ver tareas',
          actionLink: '/tasks',
          priority: 'medium',
          data: tasksInCategory
        });
      }
    });
    
    // Ordenar recomendaciones por prioridad
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const sortedRecommendations = recommendations.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    // Guardar recomendaciones en caché
    const recommendationsCache = getFromLocalStorage(RECOMMENDATIONS_CACHE_KEY) || {};
    recommendationsCache.productivity = sortedRecommendations;
    recommendationsCache.timestamp = Date.now();
    saveToLocalStorage(RECOMMENDATIONS_CACHE_KEY, recommendationsCache);
    
    return sortedRecommendations;
  } catch (error) {
    console.error('Error al generar recomendaciones de productividad:', error);
    return [];
  }
};

/**
 * Obtener todas las recomendaciones personalizadas
 * @returns {Promise<Object>} - Todas las recomendaciones
 */
export const getAllRecommendations = async () => {
  try {
    const financial = await generateFinancialRecommendations();
    const productivity = await generateProductivityRecommendations();
    
    return {
      financial,
      productivity,
      all: [...financial, ...productivity].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
    };
  } catch (error) {
    console.error('Error al obtener todas las recomendaciones:', error);
    return {
      financial: [],
      productivity: [],
      all: []
    };
  }
};

/**
 * Marcar una recomendación como vista o ignorada
 * @param {string} recommendationId - ID de la recomendación
 * @param {string} status - Estado ('viewed', 'ignored', 'actioned')
 * @returns {boolean} - true si se actualizó correctamente
 */
export const updateRecommendationStatus = (recommendationId, status) => {
  try {
    const viewedRecommendations = getFromLocalStorage('viewed_recommendations') || {};
    
    viewedRecommendations[recommendationId] = {
      status,
      timestamp: Date.now()
    };
    
    saveToLocalStorage('viewed_recommendations', viewedRecommendations);
    return true;
  } catch (error) {
    console.error('Error al actualizar estado de recomendación:', error);
    return false;
  }
};

/**
 * Verificar si una recomendación ha sido vista o ignorada
 * @param {string} recommendationId - ID de la recomendación
 * @returns {Object|null} - Estado de la recomendación o null si no se ha visto
 */
export const getRecommendationStatus = (recommendationId) => {
  try {
    const viewedRecommendations = getFromLocalStorage('viewed_recommendations') || {};
    return viewedRecommendations[recommendationId] || null;
  } catch (error) {
    console.error('Error al obtener estado de recomendación:', error);
    return null;
  }
};
