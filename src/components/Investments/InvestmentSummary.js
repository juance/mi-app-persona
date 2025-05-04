import React from 'react';
import styled from 'styled-components';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart } from 'react-icons/fi';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
      case 'invested': return 'rgba(99, 102, 241, 0.1)';
      case 'current': return 'rgba(16, 185, 129, 0.1)';
      case 'profit': return props.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(245, 158, 11, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'invested': return 'var(--primary-color)';
      case 'current': return 'var(--secondary-color)';
      case 'profit': return props.isPositive ? 'var(--secondary-color)' : 'var(--danger-color)';
      default: return 'var(--accent-color)';
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
      case 'invested': return 'var(--primary-color)';
      case 'current': return 'var(--secondary-color)';
      case 'profit': return props.isPositive ? 'var(--secondary-color)' : 'var(--danger-color)';
      default: return 'var(--accent-color)';
    }
  }};
`;

const SecondaryAmount = styled.div`
  font-size: 1rem;
  color: var(--text-light);
`;

const ChartContainer = styled.div`
  grid-column: span 4;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }

  @media (max-width: 1024px) {
    grid-column: span 2;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
`;

const ChartWrapper = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
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

const InvestmentSummary = ({ investments, exchangeRate = 1.1 }) => {
  // Separar inversiones por moneda
  const arsInvestments = investments.filter(inv => (inv.currency || 'ARS') === 'ARS');
  const usdInvestments = investments.filter(inv => (inv.currency || 'ARS') === 'USD');

  // Calcular valores para inversiones en ARS
  const totalInvestedARS = arsInvestments.reduce((sum, inv) => sum + (inv.purchase_price * inv.quantity), 0);
  const currentValueARS = arsInvestments.reduce((sum, inv) => sum + (inv.current_price * inv.quantity), 0);
  const profitLossARS = currentValueARS - totalInvestedARS;
  const profitLossPercentageARS = totalInvestedARS > 0 ? (profitLossARS / totalInvestedARS) * 100 : 0;

  // Calcular valores para inversiones en USD
  const totalInvestedUSD = usdInvestments.reduce((sum, inv) => sum + (inv.purchase_price * inv.quantity), 0);
  const currentValueUSD = usdInvestments.reduce((sum, inv) => sum + (inv.current_price * inv.quantity), 0);
  const profitLossUSD = currentValueUSD - totalInvestedUSD;
  const profitLossPercentageUSD = totalInvestedUSD > 0 ? (profitLossUSD / totalInvestedUSD) * 100 : 0;

  // Valores totales (solo para el porcentaje de rendimiento global)
  const totalInvested = totalInvestedARS + (totalInvestedUSD * exchangeRate);
  const currentValue = currentValueARS + (currentValueUSD * exchangeRate);
  const profitLoss = currentValue - totalInvested;
  const profitLossPercentage = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;
  const isPositive = profitLoss >= 0;

  // Preparar datos para el gráfico
  const getInvestmentsByTypeAndCurrency = () => {
    const typeMap = {};

    // Procesar inversiones en ARS
    arsInvestments.forEach(inv => {
      const value = inv.current_price * inv.quantity;
      const key = `${inv.type}_ARS`;
      if (typeMap[key]) {
        typeMap[key] += value;
      } else {
        typeMap[key] = value;
      }
    });

    // Procesar inversiones en USD
    usdInvestments.forEach(inv => {
      const value = inv.current_price * inv.quantity;
      const key = `${inv.type}_USD`;
      if (typeMap[key]) {
        typeMap[key] += value;
      } else {
        typeMap[key] = value;
      }
    });

    return typeMap;
  };

  const investmentsByTypeAndCurrency = getInvestmentsByTypeAndCurrency();

  const getTypeAndCurrencyLabel = (key) => {
    const [type, currency] = key.split('_');
    let typeLabel = '';

    switch (type) {
      case 'stock': typeLabel = 'Acciones'; break;
      case 'crypto': typeLabel = 'Criptomonedas'; break;
      case 'etf': typeLabel = 'ETFs'; break;
      case 'bond': typeLabel = 'Bonos'; break;
      case 'fund': typeLabel = 'Fondos'; break;
      default: typeLabel = type;
    }

    return `${typeLabel} (${currency})`;
  };

  // Colores para ARS y USD
  const getBackgroundColor = (key) => {
    const [type, currency] = key.split('_');
    const baseColors = {
      'stock': currency === 'ARS' ? 'rgba(99, 102, 241, 0.7)' : 'rgba(99, 102, 241, 0.4)',
      'crypto': currency === 'ARS' ? 'rgba(245, 158, 11, 0.7)' : 'rgba(245, 158, 11, 0.4)',
      'etf': currency === 'ARS' ? 'rgba(16, 185, 129, 0.7)' : 'rgba(16, 185, 129, 0.4)',
      'bond': currency === 'ARS' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(239, 68, 68, 0.4)',
      'fund': currency === 'ARS' ? 'rgba(168, 85, 247, 0.7)' : 'rgba(168, 85, 247, 0.4)',
    };

    return baseColors[type] || (currency === 'ARS' ? 'rgba(99, 102, 241, 0.7)' : 'rgba(99, 102, 241, 0.4)');
  };

  const getBorderColor = (key) => {
    const [type, currency] = key.split('_');
    const baseColors = {
      'stock': 'rgba(99, 102, 241, 1)',
      'crypto': 'rgba(245, 158, 11, 1)',
      'etf': 'rgba(16, 185, 129, 1)',
      'bond': 'rgba(239, 68, 68, 1)',
      'fund': 'rgba(168, 85, 247, 1)',
    };

    return baseColors[type] || 'rgba(99, 102, 241, 1)';
  };

  const chartData = {
    labels: Object.keys(investmentsByTypeAndCurrency).map(key => getTypeAndCurrencyLabel(key)),
    datasets: [
      {
        data: Object.values(investmentsByTypeAndCurrency),
        backgroundColor: Object.keys(investmentsByTypeAndCurrency).map(key => getBackgroundColor(key)),
        borderColor: Object.keys(investmentsByTypeAndCurrency).map(key => getBorderColor(key)),
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Poppins'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const key = Object.keys(investmentsByTypeAndCurrency)[context.dataIndex];
            const [, currency] = key.split('_');

            // Calcular el porcentaje del total según la moneda
            let totalValue = currency === 'ARS' ? currentValueARS : currentValueUSD;
            const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;

            return `${context.label}: ${formatCurrency(value, currency)} (${formatPercentage(percentage)})`;
          }
        }
      }
    }
  };

  return (
    <>
      <SummaryContainer>
        <SummaryCard>
          <CardHeader>
            <IconContainer type="invested">
              <FiDollarSign />
            </IconContainer>
            <CardTitle>Total Invertido (ARS)</CardTitle>
          </CardHeader>
          <Amount type="invested">{formatCurrency(totalInvestedARS, 'ARS')}</Amount>
          <SecondaryAmount>{arsInvestments.length} inversiones en pesos</SecondaryAmount>
        </SummaryCard>

        <SummaryCard>
          <CardHeader>
            <IconContainer type="invested">
              <FiDollarSign />
            </IconContainer>
            <CardTitle>Total Invertido (USD)</CardTitle>
          </CardHeader>
          <Amount type="invested">{formatCurrency(totalInvestedUSD, 'USD')}</Amount>
          <SecondaryAmount>{usdInvestments.length} inversiones en dólares</SecondaryAmount>
        </SummaryCard>

        <SummaryCard>
          <CardHeader>
            <IconContainer type="current">
              <FiDollarSign />
            </IconContainer>
            <CardTitle>Valor Actual (ARS)</CardTitle>
          </CardHeader>
          <Amount type="current">{formatCurrency(currentValueARS, 'ARS')}</Amount>
          <SecondaryAmount>
            {profitLossARS >= 0 ? '+' : ''}{formatCurrency(profitLossARS, 'ARS')} ({formatPercentage(profitLossPercentageARS)})
          </SecondaryAmount>
        </SummaryCard>

        <SummaryCard>
          <CardHeader>
            <IconContainer type="current">
              <FiDollarSign />
            </IconContainer>
            <CardTitle>Valor Actual (USD)</CardTitle>
          </CardHeader>
          <Amount type="current">{formatCurrency(currentValueUSD, 'USD')}</Amount>
          <SecondaryAmount>
            {profitLossUSD >= 0 ? '+' : ''}{formatCurrency(profitLossUSD, 'USD')} ({formatPercentage(profitLossPercentageUSD)})
          </SecondaryAmount>
        </SummaryCard>
      </SummaryContainer>

      <SummaryContainer>
        <SummaryCard>
          <CardHeader>
            <IconContainer type="profit" isPositive={profitLossARS >= 0}>
              {profitLossARS >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            </IconContainer>
            <CardTitle>Rendimiento (ARS)</CardTitle>
          </CardHeader>
          <Amount type="profit" isPositive={profitLossARS >= 0}>
            {profitLossARS >= 0 ? '+' : ''}{formatPercentage(profitLossPercentageARS)}
          </Amount>
          <SecondaryAmount>
            {profitLossARS >= 0 ? '+' : ''}{formatCurrency(profitLossARS, 'ARS')}
          </SecondaryAmount>
        </SummaryCard>

        <SummaryCard>
          <CardHeader>
            <IconContainer type="profit" isPositive={profitLossUSD >= 0}>
              {profitLossUSD >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            </IconContainer>
            <CardTitle>Rendimiento (USD)</CardTitle>
          </CardHeader>
          <Amount type="profit" isPositive={profitLossUSD >= 0}>
            {profitLossUSD >= 0 ? '+' : ''}{formatPercentage(profitLossPercentageUSD)}
          </Amount>
          <SecondaryAmount>
            {profitLossUSD >= 0 ? '+' : ''}{formatCurrency(profitLossUSD, 'USD')}
          </SecondaryAmount>
        </SummaryCard>

        <SummaryCard>
          <CardHeader>
            <IconContainer type="profit" isPositive={isPositive}>
              {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
            </IconContainer>
            <CardTitle>Rendimiento Global</CardTitle>
          </CardHeader>
          <Amount type="profit" isPositive={isPositive}>
            {isPositive ? '+' : ''}{formatPercentage(profitLossPercentage)}
          </Amount>
          <SecondaryAmount>
            {investments.length} inversiones totales
          </SecondaryAmount>
        </SummaryCard>
      </SummaryContainer>

      {investments.length > 0 && (
        <ChartContainer>
          <ChartHeader>
            <IconContainer type="distribution">
              <FiPieChart />
            </IconContainer>
            <ChartTitle>Distribución de Inversiones</ChartTitle>
          </ChartHeader>

          <ChartWrapper>
            <Pie data={chartData} options={chartOptions} />
          </ChartWrapper>
        </ChartContainer>
      )}
    </>
  );
};

export default InvestmentSummary;
