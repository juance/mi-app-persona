import React, { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FiArrowUp, FiArrowDown, FiEdit2, FiTrash2, FiDollarSign, FiCreditCard, FiCheck } from 'react-icons/fi';
import SwipeableCard from '../common/SwipeableCard';

const TransactionContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-hover);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.type === 'income'
    ? 'rgba(16, 185, 129, 0.1)'
    : 'rgba(239, 68, 68, 0.1)'
  };
  color: ${props => props.type === 'income'
    ? 'var(--secondary-color)'
    : 'var(--danger-color)'
  };
  font-size: 1.2rem;
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`;

const TransactionCategory = styled.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-top: 4px;
`;

const TransactionPlatform = styled.span`
  font-size: 0.85rem;
  color: ${props => props.type === 'cash' ? 'var(--accent-color)' : 'var(--primary-color)'};
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TransactionDate = styled.span`
  font-size: 0.85rem;
  color: var(--text-light);
  margin-top: 4px;
`;

const TransactionAmount = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.type === 'income'
    ? 'var(--secondary-color)'
    : 'var(--danger-color)'
  };
`;

const TransactionActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    margin-left: auto;
  }
`;

const TransactionAmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    color: ${props => props.color || 'var(--primary-color)'};
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

// Estilos para las acciones de deslizamiento
const SwipeAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  height: 100%;
  width: 80px;
  color: white;
`;

const DeleteAction = styled(SwipeAction)`
  background-color: var(--danger-color);
`;

const EditAction = styled(SwipeAction)`
  background-color: var(--primary-color);
`;

const formatCurrency = (amount, currency = 'ARS') => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

const getCategoryName = (category) => {
  // Intentar obtener categorías personalizadas del localStorage
  let expenseCategories = [];
  let incomeCategories = [];

  try {
    const savedExpenseCategories = localStorage.getItem('expenseCategories');
    const savedIncomeCategories = localStorage.getItem('incomeCategories');

    if (savedExpenseCategories) {
      expenseCategories = JSON.parse(savedExpenseCategories);
    }

    if (savedIncomeCategories) {
      incomeCategories = JSON.parse(savedIncomeCategories);
    }
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }

  // Buscar en las categorías personalizadas
  const allCategories = [...expenseCategories, ...incomeCategories];
  const foundCategory = allCategories.find(cat => cat.id === category);

  if (foundCategory) {
    return foundCategory.name;
  }

  // Categorías por defecto si no se encuentra
  const defaultCategories = {
    food: 'Alimentación',
    transport: 'Transporte',
    housing: 'Vivienda',
    entertainment: 'Entretenimiento',
    utilities: 'Servicios',
    health: 'Salud',
    education: 'Educación',
    shopping: 'Compras',
    salary: 'Salario',
    investment: 'Inversión',
    gift: 'Regalo',
    other: 'Otro'
  };

  return defaultCategories[category] || category;
};

// Función para extraer información de la plataforma
const getPlatformInfo = (platformString) => {
  if (!platformString) {
    return { type: 'virtual', name: '' };
  }

  // Verificar si la plataforma tiene el formato "tipo:nombre"
  if (platformString.includes(':')) {
    const [type, name] = platformString.split(':');
    return { type, name };
  }

  // Si no tiene el formato, intentar determinar el tipo
  try {
    // Intentar obtener plataformas guardadas
    const savedCashPlatforms = localStorage.getItem('cashPlatforms');

    if (savedCashPlatforms) {
      const cashPlatforms = JSON.parse(savedCashPlatforms);
      if (cashPlatforms.includes(platformString)) {
        return { type: 'cash', name: platformString };
      }
    }

    // Plataformas de efectivo por defecto
    const defaultCashPlatforms = ['Efectivo', 'Caja chica', 'Caja fuerte'];
    if (defaultCashPlatforms.includes(platformString)) {
      return { type: 'cash', name: platformString };
    }

    return { type: 'virtual', name: platformString };
  } catch (error) {
    console.error('Error al determinar tipo de plataforma:', error);
    return { type: 'virtual', name: platformString };
  }
};

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const { id, title, amount, type, category, platform, date, currency = 'ARS' } = transaction;
  const { type: platformType, name: platformName } = getPlatformInfo(platform);

  // Memorizar los manejadores de eventos para evitar re-renderizados innecesarios
  const handleEdit = useCallback(() => {
    onEdit(transaction);
  }, [transaction, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  // Memorizar el formato de la fecha y el monto para evitar cálculos repetidos
  const formattedDate = useMemo(() => formatDate(date), [date]);
  const formattedAmount = useMemo(() => formatCurrency(amount, currency), [amount, currency]);
  const categoryName = useMemo(() => getCategoryName(category), [category]);

  // Detectar si estamos en un dispositivo móvil
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  // Si estamos en un dispositivo móvil, usar SwipeableCard
  if (isMobile) {
    return (
      <SwipeableCard
        leftAction={<EditAction><FiEdit2 /></EditAction>}
        rightAction={<DeleteAction><FiTrash2 /></DeleteAction>}
        onSwipeLeft={handleDelete}
        onSwipeRight={handleEdit}
        onTap={handleEdit}
      >
        <TransactionInfo>
          <IconContainer type={type}>
            {type === 'income' ? <FiArrowUp /> : <FiArrowDown />}
          </IconContainer>

          <TransactionDetails>
            <TransactionTitle>{title}</TransactionTitle>
            <TransactionCategory>{categoryName}</TransactionCategory>
            {platform && (
              <TransactionPlatform type={platformType}>
                {platformType === 'cash' ? <FiDollarSign /> : <FiCreditCard />}
                {platformName}
              </TransactionPlatform>
            )}
            <TransactionDate>{formattedDate}</TransactionDate>
          </TransactionDetails>

          <TransactionAmount type={type} style={{ marginLeft: 'auto' }}>
            {type === 'income' ? '+' : '-'} {formattedAmount}
          </TransactionAmount>
        </TransactionInfo>
      </SwipeableCard>
    );
  }

  // En dispositivos de escritorio, usar el diseño original
  return (
    <TransactionContainer>
      <TransactionInfo>
        <IconContainer type={type}>
          {type === 'income' ? <FiArrowUp /> : <FiArrowDown />}
        </IconContainer>

        <TransactionDetails>
          <TransactionTitle>{title}</TransactionTitle>
          <TransactionCategory>{categoryName}</TransactionCategory>
          {platform && (
            <TransactionPlatform type={platformType}>
              {platformType === 'cash' ? <FiDollarSign /> : <FiCreditCard />}
              {platformName}
            </TransactionPlatform>
          )}
          <TransactionDate>{formattedDate}</TransactionDate>
        </TransactionDetails>
      </TransactionInfo>

      <TransactionAmountContainer>
        <TransactionAmount type={type}>
          {type === 'income' ? '+' : '-'} {formattedAmount}
        </TransactionAmount>

        <TransactionActions>
          <ActionButton onClick={handleEdit} color="var(--primary-color)" aria-label="Editar">
            <FiEdit2 />
          </ActionButton>
          <ActionButton onClick={handleDelete} color="var(--danger-color)" aria-label="Eliminar">
            <FiTrash2 />
          </ActionButton>
        </TransactionActions>
      </TransactionAmountContainer>
    </TransactionContainer>
  );
};

// Exportar componente memorizado para evitar re-renderizados innecesarios
export default memo(TransactionItem);
