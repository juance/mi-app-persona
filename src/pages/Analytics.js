import React, { useState } from 'react';
import styled from 'styled-components';
import { FiBarChart2, FiTrendingUp, FiMessageSquare, FiDollarSign } from 'react-icons/fi';
import FinancialAnalytics from '../components/Analytics/FinancialAnalytics';
import PredictiveAnalytics from '../components/Analytics/PredictiveAnalytics';
import PersonalizedRecommendations from '../components/Analytics/PersonalizedRecommendations';
import ExchangeRateHistory from '../components/Analytics/ExchangeRateHistory';

const AnalyticsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #121212;
  color: #ffffff;
  padding: 24px;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const AnalyticsHeader = styled.div`
  margin-bottom: 36px;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 12px;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
    }
  }

  p {
    color: #b0b0b0;
    font-size: 1.1rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 8px;
  }
`;

const TabItem = styled.button`
  padding: 12px 24px;
  border: none;
  background: none;
  font-size: 1.1rem;
  color: ${props => props.$active ? 'var(--primary-color)' : '#b0b0b0'};
  font-weight: ${props => props.$active ? '600' : '400'};
  border-bottom: 3px solid ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: var(--primary-color);
  }

  svg {
    font-size: 1.2rem;
  }
`;

/**
 * Página de análisis
 * @returns {JSX.Element} - Página de análisis
 */
const Analytics = () => {
  const [activeTab, setActiveTab] = useState('financial');

  // Renderizar contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'financial':
        return <FinancialAnalytics />;
      case 'predictive':
        return <PredictiveAnalytics />;
      case 'recommendations':
        return <PersonalizedRecommendations />;
      case 'exchange':
        return <ExchangeRateHistory />;
      default:
        return <FinancialAnalytics />;
    }
  };

  return (
    <AnalyticsContainer>
      <AnalyticsHeader>
        <h1>Análisis</h1>
        <p>Visualiza, analiza y recibe recomendaciones personalizadas basadas en tus datos financieros</p>
      </AnalyticsHeader>

      <TabsContainer>
        <TabItem
          $active={activeTab === 'financial'}
          onClick={() => setActiveTab('financial')}
        >
          <FiBarChart2 /> Análisis Histórico
        </TabItem>
        <TabItem
          $active={activeTab === 'predictive'}
          onClick={() => setActiveTab('predictive')}
        >
          <FiTrendingUp /> Predicciones
        </TabItem>
        <TabItem
          $active={activeTab === 'recommendations'}
          onClick={() => setActiveTab('recommendations')}
        >
          <FiMessageSquare /> Recomendaciones
        </TabItem>
        <TabItem
          $active={activeTab === 'exchange'}
          onClick={() => setActiveTab('exchange')}
        >
          <FiDollarSign /> Tasas de Cambio
        </TabItem>
      </TabsContainer>

      {renderContent()}
    </AnalyticsContainer>
  );
};

export default Analytics;
