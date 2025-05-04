import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSave, FiSettings } from 'react-icons/fi';
import { getUserPreferences, updateUserPreferences } from '../../services/profileService';

const PreferencesContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 24px;
`;

const PreferencesHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const PreferencesTitle = styled.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

const SwitchLabel = styled.span`
  font-size: 0.95rem;
  color: var(--text-dark);
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-medium);
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
  
  input:checked + span {
    background-color: var(--primary-color);
  }
  
  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: var(--success-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const PreferencesForm = () => {
  const [preferences, setPreferences] = useState({
    currency: 'ARS',
    language: 'es',
    notifications_enabled: true,
    email_notifications: true,
    default_view: 'dashboard'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true);
        const userPreferences = await getUserPreferences();
        
        if (Object.keys(userPreferences).length > 0) {
          setPreferences(prev => ({
            ...prev,
            ...userPreferences
          }));
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
        setError('Error al cargar las preferencias');
      } finally {
        setLoading(false);
      }
    };
    
    loadPreferences();
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      await updateUserPreferences(preferences);
      
      setSuccess('Preferencias actualizadas correctamente');
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('Error al guardar las preferencias');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <PreferencesContainer>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Cargando preferencias...
        </div>
      </PreferencesContainer>
    );
  }
  
  return (
    <PreferencesContainer>
      <PreferencesHeader>
        <PreferencesTitle>Preferencias</PreferencesTitle>
      </PreferencesHeader>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="currency">Moneda predeterminada</Label>
          <Select
            id="currency"
            name="currency"
            value={preferences.currency}
            onChange={handleChange}
          >
            <option value="ARS">Peso Argentino (ARS)</option>
            <option value="USD">Dólar Estadounidense (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="language">Idioma</Label>
          <Select
            id="language"
            name="language"
            value={preferences.language}
            onChange={handleChange}
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="default_view">Vista predeterminada</Label>
          <Select
            id="default_view"
            name="default_view"
            value={preferences.default_view}
            onChange={handleChange}
          >
            <option value="dashboard">Dashboard</option>
            <option value="finances">Finanzas</option>
            <option value="tasks">Tareas</option>
            <option value="investments">Inversiones</option>
            <option value="calendar">Calendario</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label>Notificaciones</Label>
          
          <SwitchContainer>
            <SwitchLabel>Notificaciones en la aplicación</SwitchLabel>
            <Switch>
              <input
                type="checkbox"
                name="notifications_enabled"
                checked={preferences.notifications_enabled}
                onChange={handleChange}
              />
              <span></span>
            </Switch>
          </SwitchContainer>
          
          <SwitchContainer>
            <SwitchLabel>Notificaciones por email</SwitchLabel>
            <Switch>
              <input
                type="checkbox"
                name="email_notifications"
                checked={preferences.email_notifications}
                onChange={handleChange}
              />
              <span></span>
            </Switch>
          </SwitchContainer>
        </FormGroup>
        
        <SubmitButton type="submit" disabled={saving}>
          {saving ? 'Guardando...' : (
            <>
              <FiSave /> Guardar Preferencias
            </>
          )}
        </SubmitButton>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </form>
    </PreferencesContainer>
  );
};

export default PreferencesForm;
