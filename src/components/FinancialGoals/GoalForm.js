import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-medium);
  font-size: 0.95rem;

  &::after {
    content: ' *';
    color: var(--danger-color);
    display: ${props => props.required ? 'inline' : 'none'};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  width: 100%;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
  }
`;

const initialFormState = {
  name: '',
  target_amount: '',
  current_amount: '0',
  category: 'savings',
  deadline: ''
};

const GoalForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!formData.name.trim()) {
      setError('Por favor ingresa un nombre para el objetivo.');
      return;
    }

    if (!formData.target_amount || parseFloat(formData.target_amount) <= 0) {
      setError('Por favor ingresa un monto objetivo válido.');
      return;
    }

    if (parseFloat(formData.current_amount) > parseFloat(formData.target_amount)) {
      setError('El monto actual no puede ser mayor que el monto objetivo.');
      return;
    }

    // Enviar datos
    onSubmit({
      ...formData,
      target_amount: parseFloat(formData.target_amount),
      current_amount: parseFloat(formData.current_amount || 0)
    });

    // Resetear formulario
    setFormData(initialFormState);
    setError('');
  };

  return (
    <FormContainer>
      <FormTitle>Crear Nuevo Objetivo Financiero</FormTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name" required>Nombre del objetivo</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="target_amount" required>Monto objetivo (ARS)</Label>
          <Input
            type="number"
            id="target_amount"
            name="target_amount"
            min="1"
            step="0.01"
            value={formData.target_amount}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="current_amount">Monto actual (ARS)</Label>
          <Input
            type="number"
            id="current_amount"
            name="current_amount"
            min="0"
            step="0.01"
            value={formData.current_amount}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category" required>Categoría</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="savings">Ahorros</option>
            <option value="investment">Inversión</option>
            <option value="purchase">Compra</option>
            <option value="travel">Viaje</option>
            <option value="education">Educación</option>
            <option value="home">Hogar</option>
            <option value="other">Otro</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="deadline">Fecha límite</Label>
          <Input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton type="submit">Guardar Objetivo</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default GoalForm;
