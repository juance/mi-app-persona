import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear contexto
export const AccessibilityContext = createContext();

// Valores predeterminados
const defaultSettings = {
  fontSize: 'medium', // small, medium, large
  highContrast: false,
  reducedMotion: false,
  keyboardNavigation: true,
  screenReader: false,
};

/**
 * Proveedor de contexto de accesibilidad
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element} - Proveedor de contexto
 */
export const AccessibilityProvider = ({ children }) => {
  // Estado para las configuraciones de accesibilidad
  const [settings, setSettings] = useState(() => {
    // Cargar configuraciones guardadas o usar valores predeterminados
    const savedSettings = localStorage.getItem('accessibility_settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  // Guardar configuraciones en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
    
    // Aplicar configuraciones al documento
    applyAccessibilitySettings(settings);
  }, [settings]);
  
  // Aplicar configuraciones de accesibilidad al documento
  const applyAccessibilitySettings = (settings) => {
    // Tamaño de fuente
    document.documentElement.style.setProperty(
      '--font-size-base',
      settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px'
    );
    
    // Alto contraste
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Reducir movimiento
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    // Navegación por teclado
    if (settings.keyboardNavigation) {
      document.documentElement.classList.add('keyboard-navigation');
    } else {
      document.documentElement.classList.remove('keyboard-navigation');
    }
    
    // Lector de pantalla
    if (settings.screenReader) {
      document.documentElement.setAttribute('role', 'application');
      document.documentElement.classList.add('screen-reader');
    } else {
      document.documentElement.removeAttribute('role');
      document.documentElement.classList.remove('screen-reader');
    }
  };
  
  // Actualizar una configuración específica
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  // Restablecer configuraciones a valores predeterminados
  const resetSettings = () => {
    setSettings(defaultSettings);
  };
  
  // Valor del contexto
  const contextValue = {
    settings,
    updateSetting,
    resetSettings,
  };
  
  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

/**
 * Hook para usar el contexto de accesibilidad
 * @returns {Object} - Contexto de accesibilidad
 */
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  
  if (!context) {
    throw new Error('useAccessibility debe usarse dentro de un AccessibilityProvider');
  }
  
  return context;
};
