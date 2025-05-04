import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configuración global para las notificaciones
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Función para mostrar una notificación de éxito
export const showSuccess = (message) => {
  toast.success(message, toastConfig);
};

// Función para mostrar una notificación de error
export const showError = (message) => {
  toast.error(message, toastConfig);
};

// Función para mostrar una notificación de información
export const showInfo = (message) => {
  toast.info(message, toastConfig);
};

// Función para mostrar una notificación de advertencia
export const showWarning = (message) => {
  toast.warning(message, toastConfig);
};

// Componente contenedor para las notificaciones
const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Notification;
