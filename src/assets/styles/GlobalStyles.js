import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #6366f1;
    --primary-light: #818cf8;
    --primary-dark: #4f46e5;
    --secondary-color: #10b981;
    --secondary-light: #34d399;
    --secondary-dark: #059669;
    --accent-color: #f59e0b;
    --accent-light: #fbbf24;
    --accent-dark: #d97706;
    --danger-color: #ef4444;
    --danger-light: #f87171;
    --danger-dark: #dc2626;
    --text-dark: #1f2937;
    --text-medium: #4b5563;
    --text-light: #9ca3af;
    --bg-light: #f9fafb;
    --bg-medium: #f3f4f6;
    --bg-dark: #1f2937;
    --card-bg: #ffffff;
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --border-radius: 12px;
    --transition-speed: 0.3s;
  }

  .dark-mode {
    --primary-color: #818cf8;
    --primary-light: #a5b4fc;
    --primary-dark: #6366f1;
    --secondary-color: #34d399;
    --secondary-light: #6ee7b7;
    --secondary-dark: #10b981;
    --accent-color: #fbbf24;
    --accent-light: #fcd34d;
    --accent-dark: #f59e0b;
    --danger-color: #f87171;
    --danger-light: #fca5a5;
    --danger-dark: #ef4444;
    --text-dark: #f9fafb;
    --text-medium: #e5e7eb;
    --text-light: #9ca3af;
    --bg-light: #1f2937;
    --bg-medium: #111827;
    --bg-dark: #0f172a;
    --card-bg: #1e1e1e;
    --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-light);
    color: var(--text-dark);
    line-height: 1.6;
    transition: background-color var(--transition-speed), color var(--transition-speed);
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    transition: color var(--transition-speed);
  }

  a:hover {
    color: var(--primary-dark);
  }

  button {
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-medium);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
  }

  /* Animaciones */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default GlobalStyles;
