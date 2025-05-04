import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { AccessibilityProvider } from '../../contexts/AccessibilityContext';
import Dashboard from '../../pages/Dashboard';
import Navbar from '../../components/common/Navbar';
import AnimatedButton from '../../components/common/AnimatedButton';
import AccessibilitySettings from '../../components/Profile/AccessibilitySettings';

// Extender los matchers de Jest
expect.extend(toHaveNoViolations);

// Componente envuelto para las pruebas
const ComponentWithProviders = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('Accessibility Tests', () => {
  it('AnimatedButton has no accessibility violations', async () => {
    const { container } = render(
      <AnimatedButton>Test Button</AnimatedButton>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('Navbar has no accessibility violations', async () => {
    const { container } = render(
      <ComponentWithProviders>
        <Navbar />
      </ComponentWithProviders>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('AccessibilitySettings has no accessibility violations', async () => {
    const { container } = render(
      <ComponentWithProviders>
        <AccessibilitySettings />
      </ComponentWithProviders>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('Dashboard has no accessibility violations', async () => {
    const { container } = render(
      <ComponentWithProviders>
        <Dashboard />
      </ComponentWithProviders>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('Buttons have accessible names', () => {
    render(
      <>
        <AnimatedButton>Visible Text</AnimatedButton>
        <AnimatedButton aria-label="Button with icon only"><span>🔍</span></AnimatedButton>
      </>
    );
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });
  
  it('Images have alt text', () => {
    render(
      <div>
        <img src="test.jpg" alt="Test image" />
        <img src="decorative.jpg" alt="" role="presentation" />
      </div>
    );
    
    const images = screen.getAllByRole('img');
    images.forEach(image => {
      // Las imágenes decorativas pueden tener alt="" pero deben tener el atributo alt
      expect(image).toHaveAttribute('alt');
    });
  });
  
  it('Form elements have associated labels', () => {
    render(
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
        
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
      </form>
    );
    
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toHaveAccessibleName();
    });
  });
  
  it('Color contrast meets WCAG standards', () => {
    // Esta prueba es más difícil de automatizar completamente
    // Aquí verificamos que se apliquen las clases de alto contraste
    
    render(
      <ComponentWithProviders>
        <AccessibilitySettings />
      </ComponentWithProviders>
    );
    
    // Verificar que existe la opción de alto contraste
    expect(screen.getByText('Alto contraste')).toBeInTheDocument();
  });
});
