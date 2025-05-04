import React, { useState } from 'react';
import styled from 'styled-components';
import { FiArrowUp, FiArrowDown, FiDollarSign, FiCreditCard, FiPocket } from 'react-icons/fi';

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SummarySection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.2rem;
`;

const SummaryCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    switch (props.type) {
      case 'income': return 'rgba(16, 185, 129, 0.1)';
      case 'expense': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(99, 102, 241, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'income': return 'var(--secondary-color)';
      case 'expense': return 'var(--danger-color)';
      default: return 'var(--primary-color)';
    }
  }};
  font-size: 1.2rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-medium);
`;

const Amount = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${props => {
    switch (props.type) {
      case 'income': return 'var(--secondary-color)';
      case 'expense': return 'var(--danger-color)';
      default: return 'var(--primary-color)';
    }
  }};
`;

const SecondaryAmount = styled.div`
  font-size: 1rem;
  color: var(--text-light);
`;

const formatCurrency = (amount, currency = 'ARS') => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency
  }).format(amount);
};

const FinancialSummary = ({ transactions, exchangeRate = 1.1 }) => {
  const [activeTab, setActiveTab] = useState('total');

  // Calcular totales
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Convertir a dólares
  const balanceUSD = balance * exchangeRate;
  const incomeUSD = income * exchangeRate;
  const expenseUSD = expense * exchangeRate;

  // Calcular totales por plataforma
  const cashTransactions = transactions.filter(t =>
    t.platform?.toLowerCase().includes('efectivo') ||
    !t.platform // Si no tiene plataforma, asumimos que es efectivo
  );

  const digitalTransactions = transactions.filter(t =>
    t.platform &&
    !t.platform.toLowerCase().includes('efectivo')
  );

  // Calcular totales para efectivo
  const cashIncome = cashTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const cashExpense = cashTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const cashBalance = cashIncome - cashExpense;

  // Calcular totales para billeteras virtuales
  const digitalIncome = digitalTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const digitalExpense = digitalTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const digitalBalance = digitalIncome - digitalExpense;

  // Determinar qué datos mostrar según la pestaña activa
  let currentBalance, currentIncome, currentExpense, currentBalanceUSD, currentIncomeUSD, currentExpenseUSD;

  switch (activeTab) {
    case 'cash':
      currentBalance = cashBalance;
      currentIncome = cashIncome;
      currentExpense = cashExpense;
      currentBalanceUSD = cashBalance * exchangeRate;
      currentIncomeUSD = cashIncome * exchangeRate;
      currentExpenseUSD = cashExpense * exchangeRate;
      break;
    case 'digital':
      currentBalance = digitalBalance;
      currentIncome = digitalIncome;
      currentExpense = digitalExpense;
      currentBalanceUSD = digitalBalance * exchangeRate;
      currentIncomeUSD = digitalIncome * exchangeRate;
      currentExpenseUSD = digitalExpense * exchangeRate;
      break;
    default: // 'total'
      currentBalance = balance;
      currentIncome = income;
      currentExpense = expense;
      currentBalanceUSD = balanceUSD;
      currentIncomeUSD = incomeUSD;
      currentExpenseUSD = expenseUSD;
  }

  // Estilos para las pestañas
  const TabsContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `;

  const Tab = styled.button`
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: ${props => props.active ? '600' : '400'};
    color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-medium)'};
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
      transition: background-color var(--transition-speed);
    }

    &:hover {
      color: var(--primary-color);
    }
  `;

  return (
    <div>
      <TabsContainer>
        <Tab
          active={activeTab === 'total'}
          onClick={() => setActiveTab('total')}
        >
          <FiDollarSign />
          Total
        </Tab>
        <Tab
          active={activeTab === 'cash'}
          onClick={() => setActiveTab('cash')}
        >
          <FiPocket />
          Efectivo
        </Tab>
        <Tab
          active={activeTab === 'digital'}
          onClick={() => setActiveTab('digital')}
        >
          <FiCreditCard />
          Billeteras Virtuales
        </Tab>
      </TabsContainer>

      <SummaryContainer>
        <SummaryCard>
          <CardHeader>
            <IconContainer type="balance">
              <FiDollarSign />
            </IconContainer>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <Amount type="balance">{formatCurrency(currentBalance)}</Amount>
          <SecondaryAmount>{formatCurrency(currentBalanceUSD, 'USD')}</SecondaryAmount>
        </SummaryCard>

        <SummaryCard>
          <CardHeader>
            <IconContainer type="income">
              <FiArrowUp />
            </IconContainer>
            <CardTitle>Ingresos</CardTitle>
          </CardHeader>
          <Amount type="income">{formatCurrency(currentIncome)}</Amount>
          <SecondaryAmount>{formatCurrency(currentIncomeUSD, 'USD')}</SecondaryAmount>
        </SummaryCard>

        <SummaryCard>
          <CardHeader>
            <IconContainer type="expense">
              <FiArrowDown />
            </IconContainer>
            <CardTitle>Gastos</CardTitle>
          </CardHeader>
          <Amount type="expense">{formatCurrency(currentExpense)}</Amount>
          <SecondaryAmount>{formatCurrency(currentExpenseUSD, 'USD')}</SecondaryAmount>
        </SummaryCard>
      </SummaryContainer>
    </div>
  );
};

export default FinancialSummary;
