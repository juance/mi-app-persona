import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiX, FiSettings, FiCreditCard, FiDollarSign } from 'react-icons/fi';
import CategoryManager from './CategoryManager';
import PlatformManager from './PlatformManager';

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
  position: relative;
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

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  transition: all var(--transition-speed);
  background-color: ${props => props.checked
    ? props.type === 'income'
      ? 'rgba(16, 185, 129, 0.1)'
      : 'rgba(239, 68, 68, 0.1)'
    : 'transparent'
  };
  border: 1px solid ${props => props.checked
    ? props.type === 'income'
      ? 'var(--secondary-color)'
      : 'var(--danger-color)'
    : 'rgba(0, 0, 0, 0.1)'
  };
  color: ${props => props.checked
    ? props.type === 'income'
      ? 'var(--secondary-color)'
      : 'var(--danger-color)'
    : 'var(--text-medium)'
  };
  font-weight: ${props => props.checked ? '500' : 'normal'};

  &:hover {
    background-color: ${props => props.type === 'income'
      ? 'rgba(16, 185, 129, 0.05)'
      : 'rgba(239, 68, 68, 0.05)'
    };
  }
`;

const RadioInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid ${props => props.value === 'income'
    ? 'var(--secondary-color)'
    : 'var(--danger-color)'
  };
  border-radius: 50%;
  margin: 0;
  display: grid;
  place-content: center;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.1s ease-in-out;
    background-color: ${props => props.value === 'income'
      ? 'var(--secondary-color)'
      : 'var(--danger-color)'
    };
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
  }

  &:checked::before {
    transform: translate(-50%, -50%) scale(1);
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

const ManageCategoriesButton = styled.button`
  position: absolute;
  right: 0;
  top: 6px;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-dark);
    background-color: rgba(99, 102, 241, 0.1);
  }
`;

const initialFormState = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'other',
  platformType: 'virtual', // 'cash' o 'virtual'
  platform: '',
  currency: 'ARS', // 'ARS' o 'USD'
  date: new Date().toISOString().split('T')[0]
};

const TransactionForm = ({ transaction, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showPlatformManager, setShowPlatformManager] = useState(false);
  const [customCategories, setCustomCategories] = useState({
    expense: [
      { id: 'food', name: 'Alimentación' },
      { id: 'transport', name: 'Transporte' },
      { id: 'housing', name: 'Vivienda' },
      { id: 'entertainment', name: 'Entretenimiento' },
      { id: 'utilities', name: 'Servicios' },
      { id: 'health', name: 'Salud' },
      { id: 'education', name: 'Educación' },
      { id: 'shopping', name: 'Compras' },
      { id: 'other', name: 'Otro' }
    ],
    income: [
      { id: 'salary', name: 'Salario' },
      { id: 'investment', name: 'Inversión' },
      { id: 'gift', name: 'Regalo' },
      { id: 'other', name: 'Otro' }
    ]
  });
  const [platforms, setPlatforms] = useState({
    cash: [],
    virtual: []
  });
  const isEditMode = !!transaction?.id;

  // Cargar categorías personalizadas guardadas
  useEffect(() => {
    const savedExpenseCategories = localStorage.getItem('expenseCategories');
    const savedIncomeCategories = localStorage.getItem('incomeCategories');

    if (savedExpenseCategories && savedIncomeCategories) {
      setCustomCategories({
        expense: JSON.parse(savedExpenseCategories),
        income: JSON.parse(savedIncomeCategories)
      });
    }
  }, []);

  // Cargar plataformas guardadas
  useEffect(() => {
    const savedCashPlatforms = localStorage.getItem('cashPlatforms');
    const savedVirtualPlatforms = localStorage.getItem('virtualPlatforms');

    const defaultPlatforms = {
      cash: ['Efectivo', 'Caja chica', 'Caja fuerte'],
      virtual: ['Mercado Pago', 'Banco Nación', 'Banco Galicia', 'Ualá', 'Brubank', 'Naranja X', 'Prex']
    };

    setPlatforms({
      cash: savedCashPlatforms ? JSON.parse(savedCashPlatforms) : defaultPlatforms.cash,
      virtual: savedVirtualPlatforms ? JSON.parse(savedVirtualPlatforms) : defaultPlatforms.virtual
    });
  }, []);

  useEffect(() => {
    if (transaction) {
      // Determinar el tipo de plataforma basado en la plataforma existente
      let platformType = 'virtual';
      if (transaction.platform) {
        // Verificar si la plataforma está en la lista de efectivo
        const isCashPlatform = platforms.cash.includes(transaction.platform);
        platformType = isCashPlatform ? 'cash' : 'virtual';
      }

      setFormData({
        title: transaction.title || '',
        amount: transaction.amount || '',
        type: transaction.type || 'expense',
        category: transaction.category || 'other',
        platformType: platformType,
        platform: transaction.platform || '',
        currency: transaction.currency || 'ARS',
        date: transaction.date || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData(initialFormState);
    }
  }, [transaction, platforms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (!formData.title.trim()) {
      setError('Por favor ingresa un título para la transacción.');
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Por favor ingresa un monto válido.');
      return;
    }

    // Enviar datos
    onSubmit({
      ...formData,
      id: transaction?.id, // Solo incluir el ID si estamos editando
      amount: parseFloat(formData.amount)
      // No necesitamos mapear platformType a platform_type, lo haremos en el servicio
    });

    // Resetear formulario si no estamos en modo edición
    if (!isEditMode) {
      setFormData(initialFormState);
    }

    setError('');
  };

  const handleCategoriesChange = (newCategories) => {
    setCustomCategories(newCategories);
  };

  const handlePlatformsChange = (newPlatforms) => {
    setPlatforms(newPlatforms);
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>
          {isEditMode ? 'Editar Transacción' : 'Registrar Nueva Transacción'}
        </FormTitle>
        <CloseButton onClick={onCancel}>
          <FiX />
        </CloseButton>
      </FormHeader>

      {showCategoryManager && (
        <CategoryManager
          onClose={() => setShowCategoryManager(false)}
          onCategoriesChange={handleCategoriesChange}
        />
      )}

      {showPlatformManager && (
        <PlatformManager
          onClose={() => setShowPlatformManager(false)}
          onPlatformsChange={handlePlatformsChange}
        />
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="type" required>Tipo de transacción</Label>
          <RadioGroup>
            <RadioLabel type="expense" checked={formData.type === 'expense'}>
              <RadioInput
                type="radio"
                id="type-expense"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleChange}
              />
              Gasto
            </RadioLabel>

            <RadioLabel type="income" checked={formData.type === 'income'}>
              <RadioInput
                type="radio"
                id="type-income"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
              />
              Ingreso
            </RadioLabel>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title" required>Descripción</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej: Compra de comestibles"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="currency" required>Moneda</Label>
          <RadioGroup>
            <RadioLabel type="currency" checked={formData.currency === 'ARS'}>
              <RadioInput
                type="radio"
                id="currency-ars"
                name="currency"
                value="ARS"
                checked={formData.currency === 'ARS'}
                onChange={handleChange}
              />
              Pesos (ARS)
            </RadioLabel>

            <RadioLabel type="currency" checked={formData.currency === 'USD'}>
              <RadioInput
                type="radio"
                id="currency-usd"
                name="currency"
                value="USD"
                checked={formData.currency === 'USD'}
                onChange={handleChange}
              />
              Dólares (USD)
            </RadioLabel>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="amount" required>Monto ({formData.currency})</Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category" required>Categoría</Label>
          <ManageCategoriesButton
            type="button"
            onClick={() => setShowCategoryManager(true)}
            title="Gestionar categorías"
          >
            <FiSettings />
          </ManageCategoriesButton>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {formData.type === 'expense' ? (
              customCategories.expense.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            ) : (
              customCategories.income.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            )}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="platformType" required>Tipo de plataforma</Label>
          <RadioGroup>
            <RadioLabel type="cash" checked={formData.platformType === 'cash'}>
              <RadioInput
                type="radio"
                id="platformType-cash"
                name="platformType"
                value="cash"
                checked={formData.platformType === 'cash'}
                onChange={handleChange}
              />
              <FiDollarSign style={{ marginRight: '4px' }} />
              Efectivo
            </RadioLabel>

            <RadioLabel type="virtual" checked={formData.platformType === 'virtual'}>
              <RadioInput
                type="radio"
                id="platformType-virtual"
                name="platformType"
                value="virtual"
                checked={formData.platformType === 'virtual'}
                onChange={handleChange}
              />
              <FiCreditCard style={{ marginRight: '4px' }} />
              Billeteras Virtuales
            </RadioLabel>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="platform" required>Plataforma</Label>
          <ManageCategoriesButton
            type="button"
            onClick={() => setShowPlatformManager(true)}
            title="Gestionar plataformas"
          >
            <FiSettings />
          </ManageCategoriesButton>
          <Select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar plataforma</option>
            {formData.platformType === 'cash' ? (
              platforms.cash.map((platform, index) => (
                <option key={index} value={platform}>{platform}</option>
              ))
            ) : (
              platforms.virtual.map((platform, index) => (
                <option key={index} value={platform}>{platform}</option>
              ))
            )}
          </Select>
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

        <ButtonGroup>
          <SubmitButton type="submit">
            {isEditMode ? 'Guardar Cambios' : 'Registrar Transacción'}
          </SubmitButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default TransactionForm;
