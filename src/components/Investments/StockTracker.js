import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiRefreshCw, FiPlus, FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { getStockQuote } from '../../services/externalServices';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';
import { showSuccess, showError } from '../common/Notification';

// Estilos
const TrackerContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const TrackerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const TrackerTitle = styled.h2`
  margin: 0;
  color: var(--text-dark);
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

const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const StockCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StockSymbol = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
`;

const StockPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
`;

const StockChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.positive ? 'var(--success-color)' : 'var(--danger-color)'};
  margin-bottom: 16px;
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--text-medium);
`;

const StockInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);
  
  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.08);
  }
`;

const AddStockForm = styled.form`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StockInput = styled.input`
  padding: 8px 12px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px;
  color: var(--text-medium);
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`;

/**
 * Componente de seguimiento de acciones
 * @returns {JSX.Element} - Componente de seguimiento de acciones
 */
const StockTracker = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  // Cargar símbolos guardados
  useEffect(() => {
    const savedStocks = localStorage.getItem('trackedStocks');
    if (savedStocks) {
      setStocks(JSON.parse(savedStocks));
    }
  }, []);
  
  // Guardar símbolos
  useEffect(() => {
    if (stocks.length > 0) {
      localStorage.setItem('trackedStocks', JSON.stringify(stocks));
    }
  }, [stocks]);
  
  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Formatear porcentaje
  const formatPercent = (percent) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(percent / 100);
  };
  
  // Agregar símbolo
  const handleAddStock = async (e) => {
    e.preventDefault();
    
    if (!newSymbol.trim()) {
      return;
    }
    
    // Verificar si el símbolo ya está en la lista
    if (stocks.some(stock => stock.symbol === newSymbol.toUpperCase())) {
      showError(`El símbolo ${newSymbol.toUpperCase()} ya está en la lista`);
      return;
    }
    
    try {
      setLoading(true);
      const data = await getStockQuote(newSymbol);
      
      if (!data || Object.keys(data).length === 0) {
        showError(`No se encontraron datos para el símbolo ${newSymbol}`);
        return;
      }
      
      const newStock = {
        symbol: data['01. symbol'] || newSymbol.toUpperCase(),
        price: parseFloat(data['05. price']) || 0,
        change: parseFloat(data['09. change']) || 0,
        changePercent: parseFloat(data['10. change percent'].replace('%', '')) || 0,
        volume: parseInt(data['06. volume']) || 0,
        lastUpdated: data['07. latest trading day'] || new Date().toISOString().split('T')[0],
      };
      
      setStocks(prev => [...prev, newStock]);
      setNewSymbol('');
      showSuccess(`Símbolo ${newStock.symbol} agregado correctamente`);
    } catch (error) {
      console.error('Error al agregar símbolo:', error);
      showError(`Error al agregar símbolo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Eliminar símbolo
  const handleDeleteStock = (symbol) => {
    setStocks(prev => prev.filter(stock => stock.symbol !== symbol));
    showSuccess(`Símbolo ${symbol} eliminado correctamente`);
  };
  
  // Actualizar datos
  const handleRefresh = async () => {
    if (stocks.length === 0) {
      return;
    }
    
    try {
      setRefreshing(true);
      
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          try {
            const data = await getStockQuote(stock.symbol);
            
            if (!data || Object.keys(data).length === 0) {
              return stock;
            }
            
            return {
              symbol: data['01. symbol'] || stock.symbol,
              price: parseFloat(data['05. price']) || stock.price,
              change: parseFloat(data['09. change']) || stock.change,
              changePercent: parseFloat(data['10. change percent'].replace('%', '')) || stock.changePercent,
              volume: parseInt(data['06. volume']) || stock.volume,
              lastUpdated: data['07. latest trading day'] || new Date().toISOString().split('T')[0],
            };
          } catch (error) {
            console.error(`Error al actualizar ${stock.symbol}:`, error);
            return stock;
          }
        })
      );
      
      setStocks(updatedStocks);
      showSuccess('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      showError(`Error al actualizar datos: ${error.message}`);
    } finally {
      setRefreshing(false);
    }
  };
  
  return (
    <TrackerContainer>
      <TrackerHeader>
        <TrackerTitle>Seguimiento de Acciones</TrackerTitle>
        <AnimatedButton
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing || stocks.length === 0}
        >
          <FiRefreshCw /> Actualizar
        </AnimatedButton>
      </TrackerHeader>
      
      <AddStockForm onSubmit={handleAddStock}>
        <StockInput
          type="text"
          placeholder="Símbolo (ej. AAPL, MSFT)"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
          disabled={loading}
        />
        <AnimatedButton
          type="submit"
          disabled={loading || !newSymbol.trim()}
        >
          <FiPlus /> Agregar
        </AnimatedButton>
      </AddStockForm>
      
      {loading ? (
        <LoadingSpinner text="Cargando datos..." />
      ) : (
        <>
          {stocks.length > 0 ? (
            <StockGrid>
              {stocks.map((stock) => (
                <StockCard key={stock.symbol}>
                  <DeleteButton onClick={() => handleDeleteStock(stock.symbol)}>
                    <FiTrash2 />
                  </DeleteButton>
                  <StockSymbol>{stock.symbol}</StockSymbol>
                  <StockPrice>{formatPrice(stock.price)}</StockPrice>
                  <StockChange positive={stock.change >= 0}>
                    {stock.change >= 0 ? <FiArrowUp /> : <FiArrowDown />}
                    {formatPrice(Math.abs(stock.change))} ({formatPercent(stock.changePercent)})
                  </StockChange>
                  <StockInfo>
                    <StockInfoItem>
                      <span>Volumen:</span>
                      <span>{stock.volume.toLocaleString()}</span>
                    </StockInfoItem>
                    <StockInfoItem>
                      <span>Última actualización:</span>
                      <span>{stock.lastUpdated}</span>
                    </StockInfoItem>
                  </StockInfo>
                </StockCard>
              ))}
            </StockGrid>
          ) : (
            <EmptyState>
              <p>No hay acciones en seguimiento</p>
              <p>Agrega símbolos para comenzar a seguir sus cotizaciones</p>
            </EmptyState>
          )}
        </>
      )}
    </TrackerContainer>
  );
};

export default StockTracker;
