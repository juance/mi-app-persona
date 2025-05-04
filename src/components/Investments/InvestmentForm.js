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
  name: '',
  symbol: '',
  type: 'stock',
  quantity: '',
  purchase_price: '',
  current_price: '',
  platform: '',
  currency: 'ARS',
  purchase_date: new Date().toISOString().split('T')[0]
};

const InvestmentForm = ({ investment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const isEditMode = !!investment?.id;

  useEffect(() => {
    if (investment) {
      setFormData({
        name: investment.name || '',
        symbol: investment.symbol || '',
        type: investment.type || 'stock',
        quantity: investment.quantity || '',
        purchase_price: investment.purchase_price || '',
        current_price: investment.current_price || '',
        platform: investment.platform || '',
        currency: investment.currency || 'ARS',
        purchase_date: investment.purchase_date || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData(initialFormState);
    }
  }, [investment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!formData.name.trim()) {
      setError('Por favor ingresa un nombre para la inversión.');
      return;
    }

    if (!formData.symbol.trim()) {
      setError('Por favor ingresa un símbolo para la inversión.');
      return;
    }

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      setError('Por favor ingresa una cantidad válida.');
      return;
    }

    if (!formData.purchase_price || parseFloat(formData.purchase_price) <= 0) {
      setError('Por favor ingresa un precio de compra válido.');
      return;
    }

    if (!formData.current_price || parseFloat(formData.current_price) <= 0) {
      setError('Por favor ingresa un precio actual válido.');
      return;
    }

    // Enviar datos
    onSubmit({
      ...formData,
      id: investment?.id || Date.now(),
      quantity: parseFloat(formData.quantity),
      purchase_price: parseFloat(formData.purchase_price),
      current_price: parseFloat(formData.current_price)
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
        <FormTitle>
          {isEditMode ? 'Editar Inversión' : 'Registrar Nueva Inversión'}
        </FormTitle>
        <CloseButton onClick={onCancel}>
          <FiX />
        </CloseButton>
      </FormHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="name" required>Nombre</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Apple Inc."
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="symbol" required>Símbolo</Label>
            <Input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="Ej: AAPL"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="type" required>Tipo</Label>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="stock">Acción</option>
              <option value="etf">ETF</option>
              <option value="crypto">Criptomoneda</option>
              <option value="bond">Bono</option>
              <option value="fund">Fondo de inversión</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="quantity" required>Cantidad</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0.00000001"
              step="any"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="currency" required>Moneda</Label>
            <Select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <option value="ARS">Pesos Argentinos (ARS)</option>
              <option value="USD">Dólares (USD)</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="purchase_price" required>Precio de compra ({formData.currency})</Label>
            <Input
              type="number"
              id="purchase_price"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="current_price" required>Precio actual ({formData.currency})</Label>
            <Input
              type="number"
              id="current_price"
              name="current_price"
              value={formData.current_price}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="platform">Plataforma</Label>
            <Input
              type="text"
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="Ej: IOL, PPI, Binance"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="purchase_date" required>Fecha de compra</Label>
            <Input
              type="date"
              id="purchase_date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormGrid>

        <ButtonGroup>
          <SubmitButton type="submit">
            {isEditMode ? 'Guardar Cambios' : 'Registrar Inversión'}
          </SubmitButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default InvestmentForm;
