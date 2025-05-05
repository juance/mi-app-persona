import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiRefreshCw } from 'react-icons/fi';
import { convertCurrency, formatCurrency, getExchangeRate } from '../../services/currencyService';

const ConverterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const ConvertedAmount = styled.span`
  font-size: 0.9rem;
  color: var(--text-medium);
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ExchangeRateTooltip = styled.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  background-color: var(--card-bg);
  padding: 4px 8px;
  border-radius: var(--border-radius);
  font-size: 0.8rem;
  color: var(--text-medium);
  box-shadow: var(--card-shadow);
  z-index: 10;
  white-space: nowrap;
`;

const RefreshIcon = styled(FiRefreshCw)`
  font-size: 0.9rem;
  animation: ${props => props.isLoading ? 'spin 1s linear infinite' : 'none'};
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * Componente para mostrar un monto convertido a otra moneda
 * @param {Object} props - Propiedades del componente
 * @param {number} props.amount - Monto a convertir
 * @param {string} props.fromCurrency - Moneda de origen
 * @param {string} props.toCurrency - Moneda de destino
 * @returns {JSX.Element} - Componente de conversión de moneda
 */
const CurrencyConverter = ({ amount, fromCurrency, toCurrency }) => {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  
  useEffect(() => {
    const fetchConvertedAmount = async () => {
      try {
        setIsLoading(true);
        
        // Obtener tasa de cambio
        const rate = await getExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rate);
        
        // Convertir monto
        const converted = await convertCurrency(amount, fromCurrency, toCurrency);
        setConvertedAmount(converted);
      } catch (error) {
        console.error('Error al convertir moneda:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConvertedAmount();
  }, [amount, fromCurrency, toCurrency]);
  
  const handleRefresh = async (e) => {
    e.stopPropagation();
    
    try {
      setIsLoading(true);
      
      // Forzar actualización de tasas (no usar caché)
      localStorage.removeItem('exchange_rates');
      
      // Obtener tasa de cambio
      const rate = await getExchangeRate(fromCurrency, toCurrency);
      setExchangeRate(rate);
      
      // Convertir monto
      const converted = await convertCurrency(amount, fromCurrency, toCurrency);
      setConvertedAmount(converted);
    } catch (error) {
      console.error('Error al actualizar tasa de cambio:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (fromCurrency === toCurrency) {
    return null;
  }
  
  return (
    <ConverterContainer>
      <ConvertedAmount 
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {isLoading ? (
          <RefreshIcon isLoading={true} />
        ) : (
          <>
            ({formatCurrency(convertedAmount, toCurrency)})
            <RefreshIcon 
              onClick={handleRefresh} 
              style={{ marginLeft: '4px', cursor: 'pointer' }}
            />
          </>
        )}
      </ConvertedAmount>
      
      {showTooltip && exchangeRate && (
        <ExchangeRateTooltip>
          1 {fromCurrency} = {exchangeRate.toFixed(2)} {toCurrency}
        </ExchangeRateTooltip>
      )}
    </ConverterContainer>
  );
};

export default CurrencyConverter;
