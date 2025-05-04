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

const initialFormState = {
  title: '',
  description: '',
  due_date: '',
  priority: 'medium',
  category: 'personal'
};

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const isEditMode = !!task?.id;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date || '',
        priority: task.priority || 'medium',
        category: task.category || 'personal'
      });
    } else {
      setFormData(initialFormState);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!formData.title.trim()) {
      setError('Por favor ingresa un título para la tarea.');
      return;
    }

    // Enviar datos
    onSubmit({
      ...formData,
      id: task?.id || Date.now(),
      completed: task?.completed || false
    });

    // Resetear formulario si no estamos en modo edición
    if (!isEditMode) {
      setFormData(initialFormState);
    }

    setError('');
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>{isEditMode ? 'Editar Tarea' : 'Crear Nueva Tarea'}</FormTitle>
        <CloseButton onClick={onCancel}>
          <FiX />
        </CloseButton>
      </FormHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title" required>Título</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="¿Qué necesitas hacer?"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Añade detalles sobre esta tarea..."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="due_date">Fecha límite</Label>
          <Input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priority" required>Prioridad</Label>
          <Select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </Select>
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
          </Select>
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit">
            {isEditMode ? 'Guardar Cambios' : 'Crear Tarea'}
          </SubmitButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default TaskForm;
