import { showLocalNotification, scheduleNotification } from './notificationService';
import { getTasks } from './taskService';
import { getEvents } from './calendarService';

/**
 * Programar recordatorios para tareas pendientes
 * @returns {Promise<Array>} - Lista de recordatorios programados
 */
export const scheduleTaskReminders = async () => {
  try {
    // Obtener todas las tareas
    const tasks = await getTasks();
    
    // Filtrar tareas pendientes con fecha de vencimiento
    const pendingTasks = tasks.filter(task => 
      task.status !== 'completed' && 
      task.due_date && 
      new Date(task.due_date) > new Date()
    );
    
    const reminders = [];
    
    // Programar recordatorios para cada tarea
    for (const task of pendingTasks) {
      const dueDate = new Date(task.due_date);
      
      // Programar recordatorio para 1 día antes
      const oneDayBefore = new Date(dueDate);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1);
      oneDayBefore.setHours(9, 0, 0, 0); // 9:00 AM
      
      if (oneDayBefore > new Date()) {
        const reminder = await scheduleNotification(
          'Recordatorio de tarea',
          {
            body: `La tarea "${task.title}" vence mañana.`,
            icon: '/logo192.png',
            tag: `task_${task.id}`,
            data: {
              type: 'task',
              taskId: task.id,
              url: '/tasks',
            },
            actions: [
              {
                action: 'view',
                title: 'Ver tarea',
              },
              {
                action: 'dismiss',
                title: 'Descartar',
              },
            ],
          },
          oneDayBefore
        );
        
        if (reminder) {
          reminders.push(reminder);
        }
      }
      
      // Programar recordatorio para el día de vencimiento
      const dayOf = new Date(dueDate);
      dayOf.setHours(9, 0, 0, 0); // 9:00 AM
      
      if (dayOf > new Date()) {
        const reminder = await scheduleNotification(
          'Tarea pendiente',
          {
            body: `La tarea "${task.title}" vence hoy.`,
            icon: '/logo192.png',
            tag: `task_${task.id}_due`,
            data: {
              type: 'task',
              taskId: task.id,
              url: '/tasks',
            },
            actions: [
              {
                action: 'view',
                title: 'Ver tarea',
              },
              {
                action: 'dismiss',
                title: 'Descartar',
              },
            ],
          },
          dayOf
        );
        
        if (reminder) {
          reminders.push(reminder);
        }
      }
    }
    
    return reminders;
  } catch (error) {
    console.error('Error al programar recordatorios de tareas:', error);
    return [];
  }
};

/**
 * Programar recordatorios para eventos del calendario
 * @returns {Promise<Array>} - Lista de recordatorios programados
 */
export const scheduleEventReminders = async () => {
  try {
    // Obtener todos los eventos
    const events = await getEvents();
    
    // Filtrar eventos futuros
    const futureEvents = events.filter(event => 
      new Date(event.start_date) > new Date()
    );
    
    const reminders = [];
    
    // Programar recordatorios para cada evento
    for (const event of futureEvents) {
      const startDate = new Date(event.start_date);
      
      // Programar recordatorio para 1 día antes
      const oneDayBefore = new Date(startDate);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1);
      oneDayBefore.setHours(18, 0, 0, 0); // 6:00 PM
      
      if (oneDayBefore > new Date()) {
        const reminder = await scheduleNotification(
          'Recordatorio de evento',
          {
            body: `El evento "${event.title}" comienza mañana a las ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
            icon: '/logo192.png',
            tag: `event_${event.id}`,
            data: {
              type: 'event',
              eventId: event.id,
              url: '/calendar',
            },
            actions: [
              {
                action: 'view',
                title: 'Ver evento',
              },
              {
                action: 'dismiss',
                title: 'Descartar',
              },
            ],
          },
          oneDayBefore
        );
        
        if (reminder) {
          reminders.push(reminder);
        }
      }
      
      // Programar recordatorio para 1 hora antes
      const oneHourBefore = new Date(startDate);
      oneHourBefore.setHours(oneHourBefore.getHours() - 1);
      
      if (oneHourBefore > new Date()) {
        const reminder = await scheduleNotification(
          'Evento próximo',
          {
            body: `El evento "${event.title}" comienza en 1 hora.`,
            icon: '/logo192.png',
            tag: `event_${event.id}_soon`,
            data: {
              type: 'event',
              eventId: event.id,
              url: '/calendar',
            },
            actions: [
              {
                action: 'view',
                title: 'Ver evento',
              },
              {
                action: 'dismiss',
                title: 'Descartar',
              },
            ],
          },
          oneHourBefore
        );
        
        if (reminder) {
          reminders.push(reminder);
        }
      }
    }
    
    return reminders;
  } catch (error) {
    console.error('Error al programar recordatorios de eventos:', error);
    return [];
  }
};

/**
 * Programar alertas para eventos financieros importantes
 * @returns {Promise<Array>} - Lista de alertas programadas
 */
export const scheduleFinancialAlerts = async () => {
  // Esta función se implementaría para alertas financieras específicas
  // como vencimientos de metas financieras, pagos programados, etc.
  return [];
};

/**
 * Programar todos los recordatorios y alertas
 * @returns {Promise<Object>} - Resumen de recordatorios programados
 */
export const scheduleAllReminders = async () => {
  try {
    const taskReminders = await scheduleTaskReminders();
    const eventReminders = await scheduleEventReminders();
    const financialAlerts = await scheduleFinancialAlerts();
    
    return {
      taskReminders,
      eventReminders,
      financialAlerts,
      total: taskReminders.length + eventReminders.length + financialAlerts.length,
    };
  } catch (error) {
    console.error('Error al programar recordatorios:', error);
    return {
      taskReminders: [],
      eventReminders: [],
      financialAlerts: [],
      total: 0,
    };
  }
};

/**
 * Mostrar una notificación de bienvenida
 * @param {string} username - Nombre del usuario
 */
export const showWelcomeNotification = async (username) => {
  try {
    await showLocalNotification(
      '¡Bienvenido a Mi App Personal!',
      {
        body: `Hola ${username}, gracias por activar las notificaciones. Ahora recibirás recordatorios importantes.`,
        icon: '/logo192.png',
        tag: 'welcome',
        data: {
          type: 'welcome',
          url: '/',
        },
      }
    );
  } catch (error) {
    console.error('Error al mostrar notificación de bienvenida:', error);
  }
};
