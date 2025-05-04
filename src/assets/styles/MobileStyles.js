import { createGlobalStyle } from 'styled-components';

const MobileStyles = createGlobalStyle`
  @media (max-width: 768px) {
    /* Ajustes generales para móviles */
    body {
      font-size: 14px;
    }

    /* Ajustes para el navbar */
    nav {
      padding: 0 16px;
      height: 60px;
    }

    /* Ajustes para el contenido principal */
    main {
      padding: 16px;
    }

    /* Ajustes para los encabezados */
    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.4rem;
    }

    h3 {
      font-size: 1.2rem;
    }

    /* Ajustes para las tarjetas */
    div[class*="Card"] {
      padding: 16px;
    }

    /* Ajustes para los botones */
    button {
      padding: 8px 16px;
      font-size: 0.9rem;
    }

    /* Ajustes para los formularios */
    input, select, textarea {
      padding: 10px 12px;
      font-size: 0.9rem;
    }

    /* Ajustes para el calendario */
    div[class*="DayCell"] {
      padding: 4px;
    }

    /* Navegación móvil fija en la parte inferior */
    .mobile-nav {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--card-bg);
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      z-index: 100;
      height: 60px;
      padding: 0;
      justify-content: space-around;
      align-items: center;
    }

    .mobile-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      color: var(--text-medium);
      text-decoration: none;
      font-size: 0.7rem;
      padding: 8px 0;
      transition: all var(--transition-speed);
    }

    .mobile-nav-item.active {
      color: var(--primary-color);
    }

    .mobile-nav-icon {
      font-size: 1.3rem;
      margin-bottom: 4px;
    }

    /* Ajustar el padding inferior del contenido principal para dar espacio a la navegación móvil */
    main {
      padding-bottom: 76px;
    }

    /* Mejoras para la experiencia móvil */

    /* Ajustes para el dashboard */
    div[class*="DashboardGrid"] {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }

    /* Ajustes para las tablas */
    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
      font-size: 0.85rem;
    }

    th, td {
      padding: 8px 12px !important;
    }

    /* Ajustes para los formularios */
    form {
      max-width: 100% !important;
    }

    /* Ajustes para los modales */
    div[class*="Modal"] {
      width: 90% !important;
      max-width: 90% !important;
      padding: 16px !important;
    }

    /* Ajustes para los gráficos */
    div[class*="Chart"] {
      height: 200px !important;
    }

    /* Ajustes para las tarjetas de resumen */
    div[class*="Summary"] {
      flex-direction: column !important;
    }

    div[class*="SummaryCard"] {
      width: 100% !important;
      margin-bottom: 16px !important;
    }

    /* Ajustes para los filtros */
    div[class*="Filters"] {
      flex-direction: column !important;
      align-items: stretch !important;
    }

    div[class*="Filters"] > * {
      margin-bottom: 8px !important;
      width: 100% !important;
    }

    /* Ajustes para la autenticación */
    div[class*="AuthContainer"] {
      padding: 16px !important;
    }

    /* Ajustes para el perfil */
    div[class*="ProfileContainer"],
    div[class*="PreferencesContainer"] {
      padding: 16px !important;
    }

    /* Ajustes para los botones flotantes */
    button[class*="FloatingButton"] {
      right: 16px !important;
      bottom: 76px !important;
    }

    /* Ajustes para las notificaciones */
    div[class*="Notification"] {
      width: 90% !important;
      max-width: 90% !important;
      right: 5% !important;
    }
  }
`;

export default MobileStyles;
