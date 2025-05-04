import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import MobileNavbar from './MobileNavbar';
import KeyboardNavigation from './KeyboardNavigation';
import AccessibilityHelp from './AccessibilityHelp';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 24px;
  background-color: var(--bg-light);
  transition: background-color var(--transition-speed);

  @media (max-width: 768px) {
    padding: 16px;
    padding-bottom: 76px; /* Espacio para la navegación móvil */
  }
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <Main role="main" aria-label="Contenido principal">{children}</Main>
      <MobileNavbar />
      <KeyboardNavigation />
      <AccessibilityHelp />
    </LayoutContainer>
  );
};

export default Layout;
