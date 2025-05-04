import { createGlobalStyle } from 'styled-components';

const AccessibilityStyles = createGlobalStyle`
  /* Estilos base para accesibilidad */
  :root {
    --font-size-base: 16px;
  }
  
  html {
    font-size: var(--font-size-base);
  }
  
  /* Alto contraste */
  html.high-contrast {
    --text-dark: #000000;
    --text-medium: #222222;
    --text-light: #444444;
    --bg-light: #ffffff;
    --card-bg: #ffffff;
    --primary-color: #0000cc;
    --primary-dark: #000099;
    --secondary-color: #cc0000;
    --success-color: #006600;
    --danger-color: #cc0000;
    --warning-color: #cc6600;
    --info-color: #0066cc;
    
    /* Asegurar contraste suficiente */
    --primary-color-rgb: 0, 0, 204;
    --secondary-color-rgb: 204, 0, 0;
    --success-color-rgb: 0, 102, 0;
    --danger-color-rgb: 204, 0, 0;
    --warning-color-rgb: 204, 102, 0;
    --info-color-rgb: 0, 102, 204;
    
    /* Bordes más visibles */
    --border-radius: 4px;
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    
    /* Aumentar contraste de elementos interactivos */
    a, button, [role="button"] {
      text-decoration: underline;
      outline: 2px solid transparent;
      
      &:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
    }
    
    /* Mejorar visibilidad de formularios */
    input, select, textarea {
      border: 2px solid #000000;
      
      &:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
    }
  }
  
  /* Reducir movimiento */
  html.reduced-motion * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    transition: none !important;
    animation: none !important;
  }
  
  /* Navegación por teclado */
  html.keyboard-navigation {
    /* Hacer visible el foco del teclado */
    *:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    
    /* Mejorar visibilidad de elementos interactivos */
    a, button, [role="button"], [tabindex="0"] {
      &:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(var(--primary-color-rgb), 0.3);
      }
    }
  }
  
  /* Lector de pantalla */
  html.screen-reader {
    /* Ocultar elementos visuales que no son relevantes para lectores de pantalla */
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Asegurar que los elementos interactivos tienen roles ARIA adecuados */
    [role="button"], button {
      cursor: pointer;
    }
    
    /* Mejorar la navegación por encabezados */
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1em;
      margin-bottom: 0.5em;
    }
  }
  
  /* Estilos para diferentes tamaños de fuente */
  @media (max-width: 768px) {
    html {
      font-size: calc(var(--font-size-base) - 1px);
    }
  }
  
  /* Soporte para prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
      transition: none !important;
      animation: none !important;
    }
  }
  
  /* Soporte para prefers-color-scheme */
  @media (prefers-color-scheme: dark) {
    html.high-contrast {
      --text-dark: #ffffff;
      --text-medium: #dddddd;
      --text-light: #bbbbbb;
      --bg-light: #121212;
      --card-bg: #1e1e1e;
      --primary-color: #6699ff;
      --primary-dark: #3366cc;
      --secondary-color: #ff6666;
      --success-color: #66cc66;
      --danger-color: #ff6666;
      --warning-color: #ffcc66;
      --info-color: #66ccff;
      
      /* Asegurar contraste suficiente */
      --primary-color-rgb: 102, 153, 255;
      --secondary-color-rgb: 255, 102, 102;
      --success-color-rgb: 102, 204, 102;
      --danger-color-rgb: 255, 102, 102;
      --warning-color-rgb: 255, 204, 102;
      --info-color-rgb: 102, 204, 255;
    }
  }
`

export default AccessibilityStyles;
