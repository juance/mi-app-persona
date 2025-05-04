import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHelpCircle, FiX, FiKey, FiEye, FiType, FiActivity } from 'react-icons/fi';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useNavigate } from 'react-router-dom';

// Estilos
const HelpButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: var(--primary-dark);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.5);
  }

  svg {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    bottom: 80px; /* Evitar superposición con la navegación móvil */
  }
`;

const HelpPanel = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 16px;

  @media (max-width: 768px) {
    width: calc(100% - 48px);
    bottom: 80px; /* Evitar superposición con la navegación móvil */
  }
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PanelTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.3);
  }
`;

const HelpSection = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HelpText = styled.p`
  margin: 0 0 8px 0;
  font-size: 0.9rem;
  color: var(--text-medium);
  line-height: 1.5;
`;

const ShortcutList = styled.ul`
  margin: 0;
  padding: 0 0 0 16px;
  list-style-type: none;
`;

const ShortcutItem = styled.li`
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: var(--text-medium);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShortcutKey = styled.kbd`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  color: #333;
  display: inline-block;
  font-size: 0.85rem;
  font-family: monospace;
  line-height: 1;
  padding: 2px 4px;
`;

const SettingsLink = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  text-decoration: underline;

  &:hover {
    color: var(--primary-dark);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.3);
  }
`;

/**
 * Componente de ayuda para la accesibilidad
 * @returns {JSX.Element} - Componente de ayuda para la accesibilidad
 */
const AccessibilityHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useAccessibility();
  const navigate = useNavigate();

  // Ir a la página de configuración de accesibilidad
  const goToAccessibilitySettings = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen ? (
        <HelpButton
          onClick={() => setIsOpen(true)}
          aria-label="Ayuda de accesibilidad"
          title="Ayuda de accesibilidad"
        >
          <FiHelpCircle />
        </HelpButton>
      ) : (
        <HelpPanel>
          <PanelHeader>
            <PanelTitle>
              <FiHelpCircle /> Ayuda de accesibilidad
            </PanelTitle>
            <CloseButton
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar panel de ayuda"
            >
              <FiX />
            </CloseButton>
          </PanelHeader>

          <HelpSection>
            <SectionTitle>
              <FiKey /> Atajos de teclado
            </SectionTitle>
            <HelpText>
              Puedes navegar por la aplicación usando los siguientes atajos de teclado:
            </HelpText>
            <ShortcutList>
              <ShortcutItem>
                <ShortcutKey>Alt + H</ShortcutKey> Ir a la página de inicio
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + T</ShortcutKey> Ir a la página de tareas
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + F</ShortcutKey> Ir a la página de finanzas
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + I</ShortcutKey> Ir a la página de inversiones
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + G</ShortcutKey> Ir a la página de metas financieras
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + C</ShortcutKey> Ir a la página de calendario
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + A</ShortcutKey> Ir a la página de análisis
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + P</ShortcutKey> Ir a la página de perfil
              </ShortcutItem>
              <ShortcutItem>
                <ShortcutKey>Alt + /</ShortcutKey> Mostrar ayuda de atajos de teclado
              </ShortcutItem>
            </ShortcutList>
          </HelpSection>

          <HelpSection>
            <SectionTitle>
              <FiEye /> Opciones de visualización
            </SectionTitle>
            <HelpText>
              Puedes personalizar la apariencia de la aplicación para mejorar la legibilidad:
            </HelpText>
            <ShortcutList>
              <ShortcutItem>
                <strong>Alto contraste:</strong> {settings.highContrast ? 'Activado' : 'Desactivado'}
              </ShortcutItem>
              <ShortcutItem>
                <strong>Tamaño de fuente:</strong> {
                  settings.fontSize === 'small' ? 'Pequeño' :
                  settings.fontSize === 'large' ? 'Grande' : 'Mediano'
                }
              </ShortcutItem>
              <ShortcutItem>
                <strong>Reducir movimiento:</strong> {settings.reducedMotion ? 'Activado' : 'Desactivado'}
              </ShortcutItem>
            </ShortcutList>
          </HelpSection>

          <HelpSection>
            <HelpText>
              Puedes cambiar estas configuraciones en la{' '}
              <SettingsLink onClick={goToAccessibilitySettings}>
                página de perfil
              </SettingsLink>.
            </HelpText>
          </HelpSection>
        </HelpPanel>
      )}
    </>
  );
};

export default AccessibilityHelp;
