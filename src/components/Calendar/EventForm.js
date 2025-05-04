import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

const FormContainer = styled.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FormTitle = styled.h3`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.1);
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  grid-column: ${props => props.fullWidth ? 'span 2' : 'span 1'};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
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

const Textarea = styled.textarea`
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
  min-height: 100px;
  resize: vertical;

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
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
  flex: 1;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
  }
`;

const CancelButton = styled.button`
  background-color: var(--bg-medium);
  color: var(--text-medium);
  border: none;
  padding: 12px 20px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: var(--bg-dark);
    color: var(--text-light);
  }
`;

const EventForm = ({ event, selectedDate, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    start_time: '',
    end_time: '',
    location: '',
    category: 'personal'
  });
  const [error, setError] = useState('');
  const isEditMode = !!event?.id;

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || (selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
        start_time: event.start_time || '',
        end_time: event.end_time || '',
        location: event.location || '',
        category: event.category || 'personal'
      });
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate.toISOString().split('T')[0]
      }));
    }
  }, [event, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!formData.title.trim()) {
      setError('Por favor ingresa un título para el evento.');
      return;
    }

    if (formData.start_time && formData.end_time && formData.start_time > formData.end_time) {
      setError('La hora de inicio debe ser anterior a la hora de fin.');
      return;
    }

    // Enviar datos
    onSubmit({
      ...formData,
      id: event?.id || Date.now()
    });

    setError('');
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>
          {isEditMode ? 'Editar Evento' : 'Crear Nuevo Evento'}
        </FormTitle>
        <CloseButton onClick={onCancel}>
          <FiX />
        </CloseButton>
      </FormHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup fullWidth>
            <Label htmlFor="title" required>Título</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Reunión de trabajo"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="date" required>Fecha</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
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
              <option value="personal">Personal</option>
              <option value="familia">Familia</option>
              <option value="duchene">Duchene</option>
              <option value="lavadero">Lavadero</option>
              <option value="vapea">Vapea Conmigo</option>
              <option value="other">Otro</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="start_time">Hora de inicio</Label>
            <Input
              type="time"
              id="start_time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="end_time">Hora de fin</Label>
            <Input
              type="time"
              id="end_time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup fullWidth>
            <Label htmlFor="location">Ubicación</Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ej: Oficina central"
            />
          </FormGroup>

          <FormGroup fullWidth>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Añade detalles sobre este evento..."
            />
          </FormGroup>
        </FormGrid>

        <ButtonGroup>
          <SubmitButton type="submit">
            {isEditMode ? 'Guardar Cambios' : 'Crear Evento'}
          </SubmitButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default EventForm;
