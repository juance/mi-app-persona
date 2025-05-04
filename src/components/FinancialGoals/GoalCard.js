import React from 'react';
import styled from 'styled-components';
import { FiDollarSign, FiTarget, FiTrendingUp, FiShoppingBag, FiMapPin, FiBook, FiHome } from 'react-icons/fi';

const Card = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const IconContainer = styled.div`
  font-size: 1.5rem;
  margin-right: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  transition: all var(--transition-speed);
  color: var(--primary-color);

  ${Card}:hover & {
    transform: scale(1.1);
    background-color: rgba(99, 102, 241, 0.15);
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  line-height: 1.4;
`;

const Amounts = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: var(--bg-light);
  padding: 16px;
  border-radius: var(--border-radius);
`;

const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AmountLabel = styled.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-bottom: 4px;
  font-weight: 500;
`;

const AmountValue = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.type === 'current' ? 'var(--primary-color)' : 'var(--secondary-color)'};
`;

const ProgressContainer = styled.div`
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  height: 12px;
  background-color: var(--bg-medium);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 6px;
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%
    );
    background-size: 20px 20px;
    animation: progress-animation 1s linear infinite;
  }

  @keyframes progress-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 0;
    }
  }
`;

const ProgressText = styled.div`
  text-align: right;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-medium);
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const Deadline = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  padding: 10px 14px;
  border-radius: var(--border-radius);
  border-left: 3px solid var(--accent-color);
`;

const DeadlineLabel = styled.span`
  font-size: 0.8rem;
  color: var(--text-medium);
  margin-bottom: 4px;
  font-weight: 500;
`;

const DeadlineValue = styled.span`
  font-size: 0.95rem;
  color: var(--text-dark);
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const UpdateButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '↑';
    font-weight: bold;
  }

  &:hover {
    background-color: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
  }
`;

const DeleteButton = styled.button`
  background-color: var(--danger-color);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);

  &:hover {
    background-color: var(--danger-dark);
    transform: rotate(90deg);
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
  }
`;

const getCategoryIcon = (category) => {
  switch (category) {
    case 'savings':
      return <FiDollarSign />;
    case 'investment':
      return <FiTrendingUp />;
    case 'purchase':
      return <FiShoppingBag />;
    case 'travel':
      return <FiMapPin />;
    case 'education':
      return <FiBook />;
    case 'home':
      return <FiHome />;
    default:
      return <FiTarget />;
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Sin fecha límite';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

const GoalCard = ({ goal, onUpdate, onDelete }) => {
  const progress = Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100));

  return (
    <Card>
      <Header>
        <IconContainer>
          {getCategoryIcon(goal.category)}
        </IconContainer>
        <Title>{goal.name}</Title>
      </Header>

      <Amounts>
        <AmountContainer>
          <AmountLabel>Actual:</AmountLabel>
          <AmountValue type="current">{formatCurrency(goal.current_amount)}</AmountValue>
        </AmountContainer>
        <AmountContainer>
          <AmountLabel>Objetivo:</AmountLabel>
          <AmountValue type="target">{formatCurrency(goal.target_amount)}</AmountValue>
        </AmountContainer>
      </Amounts>

      <ProgressContainer>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <ProgressText>{progress}%</ProgressText>
      </ProgressContainer>

      <Footer>
        <Deadline>
          <DeadlineLabel>Fecha límite:</DeadlineLabel>
          <DeadlineValue>{formatDate(goal.deadline)}</DeadlineValue>
        </Deadline>

        <Actions>
          <UpdateButton onClick={() => onUpdate(goal.id)}>
            Actualizar
          </UpdateButton>
          <DeleteButton onClick={() => onDelete(goal.id)}>
            🗑️
          </DeleteButton>
        </Actions>
      </Footer>
    </Card>
  );
};

export default GoalCard;
