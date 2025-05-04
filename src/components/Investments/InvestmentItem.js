import React from 'react';
import styled from 'styled-components';
import { FiTrendingUp, FiTrendingDown, FiEdit2, FiTrash2 } from 'react-icons/fi';

const InvestmentContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }
`;

const InvestmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const InvestmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const InvestmentSymbol = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.type === 'stock'
    ? 'rgba(99, 102, 241, 0.1)'
    : props.type === 'crypto'
      ? 'rgba(245, 158, 11, 0.1)'
      : 'rgba(16, 185, 129, 0.1)'
  };
  color: ${props => props.type === 'stock'
    ? 'var(--primary-color)'
    : props.type === 'crypto'
      ? 'var(--accent-color)'
      : 'var(--secondary-color)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
`;

const InvestmentDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const InvestmentName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
`;

const InvestmentType = styled.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-top: 4px;
`;

const InvestmentPlatform = styled.span`
  font-size: 0.85rem;
  color: var(--accent-color);
  margin-top: 4px;
`;

const InvestmentActions = styled.div`
  display: flex;
  gap: 8px;
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

const InvestmentBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const InvestmentStat = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-bottom: 4px;
`;

const StatValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`;

const PerformanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PerformanceValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.isPositive
    ? 'var(--secondary-color)'
    : 'var(--danger-color)'
  };
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PerformanceIcon = styled.span`
  font-size: 1.2rem;
`;

const formatCurrency = (amount, currency = 'ARS') => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency
  }).format(amount);
};

const formatPercentage = (value) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

const getInvestmentTypeText = (type) => {
  switch (type) {
    case 'stock': return 'Acción';
    case 'crypto': return 'Criptomoneda';
    case 'etf': return 'ETF';
    case 'bond': return 'Bono';
    case 'fund': return 'Fondo de inversión';
    default: return type;
  }
};

const InvestmentItem = ({ investment, onEdit, onDelete }) => {
  const {
    id,
    name,
    symbol,
    type,
    quantity,
    purchase_price,
    current_price,
    platform,
    currency = 'ARS',
    purchase_date
  } = investment;

  // Calcular valores
  const totalInvested = purchase_price * quantity;
  const currentValue = current_price * quantity;
  const profitLoss = currentValue - totalInvested;
  const profitLossPercentage = (profitLoss / totalInvested) * 100;
  const isPositive = profitLoss >= 0;

  // Formatear fecha de compra
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <InvestmentContainer>
      <InvestmentHeader>
        <InvestmentInfo>
          <InvestmentSymbol type={type}>
            {symbol.substring(0, 2).toUpperCase()}
          </InvestmentSymbol>
          <InvestmentDetails>
            <InvestmentName>{name}</InvestmentName>
            <InvestmentType>{getInvestmentTypeText(type)} • {symbol.toUpperCase()}</InvestmentType>
            {platform && <InvestmentPlatform>{platform}</InvestmentPlatform>}
          </InvestmentDetails>
        </InvestmentInfo>

        <InvestmentActions>
          <ActionButton onClick={() => onEdit(investment)} color="var(--primary-color)">
            <FiEdit2 />
          </ActionButton>
          <ActionButton onClick={() => onDelete(id)} color="var(--danger-color)">
            <FiTrash2 />
          </ActionButton>
        </InvestmentActions>
      </InvestmentHeader>

      <InvestmentBody>
        <InvestmentStat>
          <StatLabel>Cantidad</StatLabel>
          <StatValue>{quantity}</StatValue>
        </InvestmentStat>

        <InvestmentStat>
          <StatLabel>Precio de compra ({currency})</StatLabel>
          <StatValue>{formatCurrency(purchase_price, currency)}</StatValue>
        </InvestmentStat>

        <InvestmentStat>
          <StatLabel>Precio actual ({currency})</StatLabel>
          <StatValue>{formatCurrency(current_price, currency)}</StatValue>
        </InvestmentStat>

        <InvestmentStat>
          <StatLabel>Inversión total ({currency})</StatLabel>
          <StatValue>{formatCurrency(totalInvested, currency)}</StatValue>
        </InvestmentStat>

        <InvestmentStat>
          <StatLabel>Valor actual ({currency})</StatLabel>
          <StatValue>{formatCurrency(currentValue, currency)}</StatValue>
        </InvestmentStat>

        <InvestmentStat>
          <StatLabel>Rendimiento ({currency})</StatLabel>
          <PerformanceContainer>
            <PerformanceValue isPositive={isPositive}>
              <PerformanceIcon>
                {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
              </PerformanceIcon>
              {formatCurrency(profitLoss, currency)}
            </PerformanceValue>
            <PerformanceValue isPositive={isPositive}>
              ({formatPercentage(profitLossPercentage)})
            </PerformanceValue>
          </PerformanceContainer>
        </InvestmentStat>
      </InvestmentBody>

      <div>
        <StatLabel>Fecha de compra: {formatDate(purchase_date)}</StatLabel>
      </div>
    </InvestmentContainer>
  );
};

export default InvestmentItem;
