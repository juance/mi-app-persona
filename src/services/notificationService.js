/**
 * Servicio para gestionar las notificaciones push
 */

// Verificar si el navegador soporta notificaciones
const isNotificationSupported = () => {
  return 'Notification' in window;
};

// Verificar si el servicio de trabajadores está disponible
const isServiceWorkerSupported = () => {
  return 'serviceWorker' in navigator;
};

/**
 * Solicitar permiso para mostrar notificaciones
 * @returns {Promise<string>} - Estado del permiso ('granted', 'denied', 'default')
 */
export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    console.warn('Las notificaciones no son soportadas en este navegador');
    return 'not-supported';
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error al solicitar permiso para notificaciones:', error);
    return 'error';
  }
};

/**
 * Verificar el estado actual del permiso de notificaciones
 * @returns {string} - Estado del permiso ('granted', 'denied', 'default', 'not-supported')
 */
export const getNotificationPermissionStatus = () => {
  if (!isNotificationSupported()) {
    return 'not-supported';
  }
  
  return Notification.permission;
};

/**
 * Registrar el service worker para notificaciones push
 * @returns {Promise<ServiceWorkerRegistration|null>} - Registro del service worker
 */
export const registerServiceWorker = async () => {
  if (!isServiceWorkerSupported()) {
    console.warn('Service Worker no es soportado en este navegador');
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    console.log('Service Worker registrado con éxito:', registration);
    return registration;
  } catch (error) {
    console.error('Error al registrar el Service Worker:', error);
    return null;
  }
};

/**
 * Mostrar una notificación local (no push)
 * @param {string} title - Título de la notificación
 * @param {Object} options - Opciones de la notificación
 * @param {string} options.body - Cuerpo de la notificación
 * @param {string} options.icon - URL del icono
 * @param {string} options.tag - Etiqueta para agrupar notificaciones
 * @param {Object} options.data - Datos adicionales
 * @param {Array} options.actions - Acciones disponibles
 * @returns {Promise<Notification|null>} - Objeto de notificación
 */
export const showLocalNotification = async (title, options = {}) => {
  if (getNotificationPermissionStatus() !== 'granted') {
    console.warn('No se tiene permiso para mostrar notificaciones');
    return null;
  }
  
  try {
    // Si hay un service worker activo, usar el service worker para mostrar la notificación
    if (isServiceWorkerSupported() && navigator.serviceWorker.controller) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, options);
      return true;
    } else {
      // Si no hay service worker, mostrar una notificación normal
      const notification = new Notification(title, options);
      return notification;
    }
  } catch (error) {
    console.error('Error al mostrar notificación:', error);
    return null;
  }
};

/**
 * Programar una notificación para una fecha futura
 * @param {string} title - Título de la notificación
 * @param {Object} options - Opciones de la notificación
 * @param {Date} scheduledTime - Fecha y hora programada
 * @returns {Promise<Object|null>} - Información de la notificación programada
 */
export const scheduleNotification = async (title, options = {}, scheduledTime) => {
  if (getNotificationPermissionStatus() !== 'granted') {
    console.warn('No se tiene permiso para mostrar notificaciones');
    return null;
  }
  
  try {
    // Calcular el tiempo de espera en milisegundos
    const now = new Date();
    const delay = scheduledTime.getTime() - now.getTime();
    
    if (delay <= 0) {
      console.warn('La fecha programada ya ha pasado');
      return null;
    }
    
    // Guardar la notificación programada en localStorage
    const notificationId = `notification_${Date.now()}`;
    const scheduledNotification = {
      id: notificationId,
      title,
      options,
      scheduledTime: scheduledTime.toISOString(),
    };
    
    // Obtener notificaciones programadas existentes
    const scheduledNotifications = getScheduledNotifications();
    scheduledNotifications.push(scheduledNotification);
    
    // Guardar en localStorage
    localStorage.setItem('scheduledNotifications', JSON.stringify(scheduledNotifications));
    
    // Programar la notificación con setTimeout
    setTimeout(() => {
      showLocalNotification(title, options);
      removeScheduledNotification(notificationId);
    }, delay);
    
    return scheduledNotification;
  } catch (error) {
    console.error('Error al programar notificación:', error);
    return null;
  }
};

/**
 * Obtener todas las notificaciones programadas
 * @returns {Array} - Lista de notificaciones programadas
 */
export const getScheduledNotifications = () => {
  try {
    const scheduledNotifications = localStorage.getItem('scheduledNotifications');
    return scheduledNotifications ? JSON.parse(scheduledNotifications) : [];
  } catch (error) {
    console.error('Error al obtener notificaciones programadas:', error);
    return [];
  }
};

/**
 * Eliminar una notificación programada
 * @param {string} notificationId - ID de la notificación
 * @returns {boolean} - true si se eliminó correctamente
 */
export const removeScheduledNotification = (notificationId) => {
  try {
    const scheduledNotifications = getScheduledNotifications();
    const updatedNotifications = scheduledNotifications.filter(
      notification => notification.id !== notificationId
    );
    
    localStorage.setItem('scheduledNotifications', JSON.stringify(updatedNotifications));
    return true;
  } catch (error) {
    console.error('Error al eliminar notificación programada:', error);
    return false;
  }
};

/**
 * Verificar y mostrar notificaciones programadas pendientes
 * (Llamar a esta función al iniciar la aplicación)
 */
export const checkScheduledNotifications = () => {
  try {
    const scheduledNotifications = getScheduledNotifications();
    const now = new Date();
    
    scheduledNotifications.forEach(notification => {
      const scheduledTime = new Date(notification.scheduledTime);
      const delay = scheduledTime.getTime() - now.getTime();
      
      if (delay <= 0) {
        // La notificación ya debería haberse mostrado, mostrarla ahora
        showLocalNotification(notification.title, notification.options);
        removeScheduledNotification(notification.id);
      } else {
        // Reprogramar la notificación
        setTimeout(() => {
          showLocalNotification(notification.title, notification.options);
          removeScheduledNotification(notification.id);
        }, delay);
      }
    });
  } catch (error) {
    console.error('Error al verificar notificaciones programadas:', error);
  }
};
