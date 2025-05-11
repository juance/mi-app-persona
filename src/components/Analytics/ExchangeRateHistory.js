import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiRefreshCw, FiDollarSign, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import { getRatesHistory, getExchangeRates } from '../../services/currencyService';
import AnimatedButton from '../common/AnimatedButton';

const HistoryContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 24px;
  margin-bottom: 32px;
  color: #ffffff;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const HistoryTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-left: 16px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const CurrencySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #2a2a2a;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CurrencyOption = styled.div`
  padding: 6px 12px;
  border-radius: var(--border-radius);
  cursor: pointer;
  background-color: ${props => props.selected ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.selected ? '#ffffff' : '#b0b0b0'};
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  position: relative;
  margin-top: 24px;
`;

const CurrentRateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  background-color: #2a2a2a;
  padding: 16px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CurrencyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
`;

const RateValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const LastUpdated = styled.div`
  font-size: 0.9rem;
  color: #b0b0b0;
  text-align: center;
  margin-top: 8px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  z-index: 10;
`;

const SpinningIcon = styled(FiRefreshCw)`
  font-size: 2rem;
  color: var(--primary-color);
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NoDataMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #b0b0b0;
  text-align: center;
  
  p {
    margin-top: 16px;
    max-width: 400px;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  color: ${props => props.$active ? 'var(--primary-color)' : '#cccccc'};
  font-weight: ${props => props.$active ? '600' : '400'};
  border-bottom: 2px solid ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--primary-color);
  }
`;

/**
 * Componente para mostrar el historial de tasas de cambio
 * @returns {JSX.Element} - Componente de historial de tasas de cambio
 */
const ExchangeRateHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('ARS');
  const [currentRate, setCurrentRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Cargar historial al montar el componente
  useEffect(() => {
    loadHistory();
  }, []);
  
  // Cargar historial cuando cambia la moneda
  useEffect(() => {
    if (history.length > 0) {
      calculateCurrentRate();
    }
  }, [baseCurrency, targetCurrency, history]);
  
  // Cargar historial de tasas de cambio
  const loadHistory = () => {
    const ratesHistory = getRatesHistory();
    setHistory(ratesHistory);
    
    if (ratesHistory.length > 0) {
      setLastUpdated(new Date(ratesHistory[0].timestamp));
    }
  };
  
  // Calcular tasa de cambio actual
  const calculateCurrentRate = () => {
    if (history.length === 0) return;
    
    const latestRates = history[0].rates;
    
    // Si las monedas son iguales, la tasa es 1
    if (baseCurrency === targetCurrency) {
      setCurrentRate(1);
      return;
    }
    
    // Convertir a través de USD (moneda base)
    const baseRate = baseCurrency === 'USD' ? 1 : latestRates[baseCurrency];
    const targetRate = targetCurrency === 'USD' ? 1 : latestRates[targetCurrency];
    
    // Calcular tasa de cambio
    setCurrentRate(targetRate / baseRate);
  };
  
  // Actualizar tasas de cambio
  const handleRefresh = async () => {
    try {
      setLoading(true);
      
      // Forzar actualización de tasas (no usar caché)
      localStorage.removeItem('exchange_rates');
      
      // Obtener nuevas tasas
      await getExchangeRates();
      
      // Recargar historial
      loadHistory();
      
      // Calcular nueva tasa
      calculateCurrentRate();
    } catch (error) {
      console.error('Error al actualizar tasas de cambio:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Intercambiar monedas
  const handleSwapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };
  
  // Preparar datos para el gráfico
  const chartData = {
    labels: history.map(entry => {
      const date = new Date(entry.timestamp);
      return date.toLocaleDateString('es-AR');
    }).reverse(),
    datasets: [
      {
        label: `${baseCurrency} a ${targetCurrency}`,
        data: history.map(entry => {
          const rates = entry.rates;
          const baseRate = baseCurrency === 'USD' ? 1 : rates[baseCurrency];
          const targetRate = targetCurrency === 'USD' ? 1 : rates[targetCurrency];
          return targetRate / baseRate;
        }).reverse(),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  };
  
  // Opciones del gráfico
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#b0b0b0'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#b0b0b0'
        }
      }
    },
  };
  
  // Formatear fecha
  const formatDate = (date) => {
    if (!date) return '';
    
    return date.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <HistoryContainer>
      <HistoryHeader>
        <HistoryTitle>Historial de Tasas de Cambio</HistoryTitle>
        <ControlsContainer>
          <CurrencySelector>
            <CurrencyOption 
              selected={baseCurrency === 'USD'} 
              onClick={() => setBaseCurrency('USD')}
            >
              USD
            </CurrencyOption>
            <CurrencyOption 
              selected={baseCurrency === 'ARS'} 
              onClick={() => setBaseCurrency('ARS')}
            >
              ARS
            </CurrencyOption>
          </CurrencySelector>
          
          <FiArrowRight size={20} />
          
          <CurrencySelector>
            <CurrencyOption 
              selected={targetCurrency === 'USD'} 
              onClick={() => setTargetCurrency('USD')}
            >
              USD
            </CurrencyOption>
            <CurrencyOption 
              selected={targetCurrency === 'ARS'} 
              onClick={() => setTargetCurrency('ARS')}
            >
              ARS
            </CurrencyOption>
          </CurrencySelector>
          
          <AnimatedButton
            variant="primary"
            onClick={handleSwapCurrencies}
            title="Intercambiar monedas"
            aria-label="Intercambiar monedas"
          >
            <FiRefreshCw />
          </AnimatedButton>
          
          <AnimatedButton
            variant="outline"
            onClick={handleRefresh}
            title="Actualizar tasas"
            aria-label="Actualizar tasas de cambio"
          >
            <FiRefreshCw />
          </AnimatedButton>
        </ControlsContainer>
      </HistoryHeader>
      
      {currentRate && (
        <CurrentRateContainer>
          <CurrencyBox>
            <FiDollarSign />
            <span>1 {baseCurrency}</span>
          </CurrencyBox>
          
          <FiArrowRight size={20} />
          
          <CurrencyBox>
            <FiDollarSign />
            <RateValue>{currentRate.toFixed(2)} {targetCurrency}</RateValue>
          </CurrencyBox>
        </CurrentRateContainer>
      )}
      
      {lastUpdated && (
        <LastUpdated>
          <FiCalendar style={{ marginRight: '4px' }} />
          Última actualización: {formatDate(lastUpdated)}
        </LastUpdated>
      )}
      
      <ChartContainer>
        {loading && (
          <LoadingOverlay>
            <SpinningIcon />
          </LoadingOverlay>
        )}
        
        {history.length > 1 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <NoDataMessage>
            <FiDollarSign size={40} />
            <p>
              No hay suficientes datos para mostrar el historial. 
              Actualiza las tasas de cambio varias veces para generar un historial.
            </p>
            <AnimatedButton
              variant="primary"
              onClick={handleRefresh}
              style={{ marginTop: '16px' }}
            >
              Actualizar Tasas
            </AnimatedButton>
          </NoDataMessage>
        )}
      </ChartContainer>
    </HistoryContainer>
  );
};

export default ExchangeRateHistory;
