import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../../contexts/AccessibilityContext';

/**
 * Componente para habilitar la navegación por teclado
 * @returns {null} - No renderiza nada visible
 */
const KeyboardNavigation = () => {
  const navigate = useNavigate();
  const { settings } = useAccessibility();
  
  useEffect(() => {
    // Solo habilitar la navegación por teclado si está activada en la configuración
    if (!settings.keyboardNavigation) {
      return;
    }
    
    // Manejar atajos de teclado
    const handleKeyDown = (event) => {
      // Solo procesar si Alt está presionado
      if (!event.altKey) {
        return;
      }
      
      // Evitar conflictos con atajos del navegador
      if (event.ctrlKey || event.metaKey) {
        return;
      }
      
      let handled = true;
      
      switch (event.key) {
        case 'h': // Alt + H: Ir a la página de inicio
          navigate('/');
          break;
        case 't': // Alt + T: Ir a la página de tareas
          navigate('/tasks');
          break;
        case 'f': // Alt + F: Ir a la página de finanzas
          navigate('/finances');
          break;
        case 'i': // Alt + I: Ir a la página de inversiones
          navigate('/investments');
          break;
        case 'g': // Alt + G: Ir a la página de metas financieras
          navigate('/financial-goals');
          break;
        case 'c': // Alt + C: Ir a la página de calendario
          navigate('/calendar');
          break;
        case 'a': // Alt + A: Ir a la página de análisis
          navigate('/analytics');
          break;
        case 'p': // Alt + P: Ir a la página de perfil
          navigate('/profile');
          break;
        case '/': // Alt + /: Mostrar ayuda de atajos de teclado
          showKeyboardHelp();
          break;
        default:
          handled = false;
          break;
      }
      
      // Si se manejó el atajo, prevenir el comportamiento predeterminado
      if (handled) {
        event.preventDefault();
      }
    };
    
    // Mostrar ayuda de atajos de teclado
    const showKeyboardHelp = () => {
      const shortcuts = [
        { key: 'Alt + H', description: 'Ir a la página de inicio' },
        { key: 'Alt + T', description: 'Ir a la página de tareas' },
        { key: 'Alt + F', description: 'Ir a la página de finanzas' },
        { key: 'Alt + I', description: 'Ir a la página de inversiones' },
        { key: 'Alt + G', description: 'Ir a la página de metas financieras' },
        { key: 'Alt + C', description: 'Ir a la página de calendario' },
        { key: 'Alt + A', description: 'Ir a la página de análisis' },
        { key: 'Alt + P', description: 'Ir a la página de perfil' },
        { key: 'Alt + /', description: 'Mostrar esta ayuda' },
      ];
      
      // Crear el contenido del modal
      const helpContent = shortcuts.map(shortcut => 
        `${shortcut.key}: ${shortcut.description}`
      ).join('\\n');
      
      // Mostrar el modal
      alert('Atajos de teclado disponibles:\\n\\n' + helpContent);
    };
    
    // Agregar el event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Limpiar el event listener al desmontar
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, settings.keyboardNavigation]);
  
  // Este componente no renderiza nada visible
  return null;
};

export default KeyboardNavigation;
