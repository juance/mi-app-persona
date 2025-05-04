import React from 'react';
import styled from 'styled-components';
import { FiEye, FiType, FiActivity, FiKey, FiRefreshCw } from 'react-icons/fi';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import AnimatedButton from '../common/AnimatedButton';

// Estilos
const AccessibilityContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const AccessibilityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const AccessibilityTitle = styled.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-left: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SettingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--primary-color);
    font-size: 1.5rem;
  }
`;

const SettingTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`;

const SettingDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-medium);
`;

const SettingControl = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  label {
    font-size: 0.9rem;
    color: var(--text-medium);
  }

  select {
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    font-size: 0.9rem;
    flex: 1;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: var(--primary-color);
    }

    &:checked + span:before {
      transform: translateX(24px);
    }

    &:focus + span {
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
`;

const ResetButton = styled(AnimatedButton)`
  margin-top: 16px;
`;

/**
 * Componente para configurar la accesibilidad
 * @returns {JSX.Element} - Componente de configuración de accesibilidad
 */
const AccessibilitySettings = () => {
  const { settings, updateSetting, resetSettings } = useAccessibility();

  return (
    <AccessibilityContainer>
      <AccessibilityHeader>
        <AccessibilityTitle>Configuración de Accesibilidad</AccessibilityTitle>
        <ResetButton
          variant="outline"
          onClick={resetSettings}
        >
          <FiRefreshCw /> Restablecer valores predeterminados
        </ResetButton>
      </AccessibilityHeader>

      <SettingsGrid>
        <SettingCard>
          <SettingHeader>
            <FiType />
            <div>
              <SettingTitle>Tamaño de fuente</SettingTitle>
              <SettingDescription>Ajusta el tamaño del texto en toda la aplicación</SettingDescription>
            </div>
          </SettingHeader>
          <SettingControl>
            <label htmlFor="fontSize">Tamaño:</label>
            <select
              id="fontSize"
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value)}
            >
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
            </select>
          </SettingControl>
        </SettingCard>

        <SettingCard>
          <SettingHeader>
            <FiEye />
            <div>
              <SettingTitle>Alto contraste</SettingTitle>
              <SettingDescription>Mejora la visibilidad con colores de alto contraste</SettingDescription>
            </div>
          </SettingHeader>
          <SettingControl>
            <span>Desactivado</span>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => updateSetting('highContrast', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
            <span>Activado</span>
          </SettingControl>
        </SettingCard>

        <SettingCard>
          <SettingHeader>
            <FiActivity />
            <div>
              <SettingTitle>Reducir movimiento</SettingTitle>
              <SettingDescription>Minimiza animaciones y transiciones</SettingDescription>
            </div>
          </SettingHeader>
          <SettingControl>
            <span>Desactivado</span>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
            <span>Activado</span>
          </SettingControl>
        </SettingCard>

        <SettingCard>
          <SettingHeader>
            <FiKey />
            <div>
              <SettingTitle>Navegación por teclado</SettingTitle>
              <SettingDescription>Mejora la visibilidad del foco al navegar con teclado</SettingDescription>
            </div>
          </SettingHeader>
          <SettingControl>
            <span>Desactivado</span>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={settings.keyboardNavigation}
                onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
              />
              <span></span>
            </ToggleSwitch>
            <span>Activado</span>
          </SettingControl>
        </SettingCard>
      </SettingsGrid>
    </AccessibilityContainer>
  );
};

export default AccessibilitySettings;
