import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiTrendingUp, FiRefreshCw, FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  predictExpenses,
  predictIncome,
  predictBalance,
  predictCashFlow,
  detectRecurringPatterns
} from '../../services/predictiveAnalysisService';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';
import { showError } from '../common/Notification';

// Estilos
const PredictiveContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 24px;
  margin-bottom: 32px;
  color: #ffffff;
`;

const PredictiveHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--bg-medium);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const PredictiveTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--primary-color);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--bg-medium);

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  color: ${props => props.active ? 'var(--primary-color)' : '#cccccc'};
  font-weight: ${props => props.active ? '600' : '400'};
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--primary-color);
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  position: relative;
  margin-top: 24px;
  margin-bottom: 32px;
`;

const PredictionCard = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid ${props => props.color || 'var(--primary-color)'};
`;

const PredictionTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${props => props.color || 'var(--primary-color)'};
  }
`;

const PredictionContent = styled.div`
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #cccccc;
  line-height: 1.5;
`;

const PredictionValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.color || 'var(--primary-color)'};
  margin: 8px 0;
`;

const PredictionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #cccccc;

  h4 {
    margin-bottom: 16px;
    color: #ffffff;
  }

  p {
    margin-bottom: 24px;
  }
`;

// Opciones para los gráficos
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
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#cccccc'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#cccccc'
      }
    }
  },
};

/**
 * Componente para mostrar análisis predictivo
 * @returns {JSX.Element} - Componente de análisis predictivo
 */
const PredictiveAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('cashflow');
  const [predictions, setPredictions] = useState({
    expenses: [],
    income: [],
    balance: [],
    cashFlow: { currentBalance: 0, predictions: [] },
    patterns: []
  });
  const [hasData, setHasData] = useState(false);

  // Cargar predicciones
  useEffect(() => {
    const loadPredictions = async () => {
      try {
        setLoading(true);

        // Cargar todas las predicciones en paralelo
        const [expenses, income, balance, cashFlow, patterns] = await Promise.all([
          predictExpenses(6),
          predictIncome(6),
          predictBalance(6),
          predictCashFlow(6),
          detectRecurringPatterns()
        ]);

        setPredictions({
          expenses,
          income,
          balance,
          cashFlow,
          patterns
        });

        // Verificar si hay suficientes datos para mostrar predicciones
        setHasData(
          expenses.length > 0 ||
          income.length > 0 ||
          balance.length > 0 ||
          cashFlow.predictions.length > 0 ||
          patterns.length > 0
        );
      } catch (error) {
        console.error('Error al cargar predicciones:', error);
        showError('Error al cargar predicciones financieras');
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };

    loadPredictions();
  }, []);

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  // Preparar datos para el gráfico de flujo de caja
  const cashFlowChartData = {
    labels: predictions.cashFlow.predictions.map(p => p.month),
    datasets: [
      {
        label: 'Balance Final',
        data: predictions.cashFlow.predictions.map(p => p.endingBalance),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Ingresos',
        data: predictions.cashFlow.predictions.map(p => p.income),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderDash: [5, 5],
        tension: 0.4,
      },
      {
        label: 'Gastos',
        data: predictions.cashFlow.predictions.map(p => p.expense),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  // Preparar datos para el gráfico de ingresos y gastos
  const incomeExpenseChartData = {
    labels: predictions.balance.map(p => p.month),
    datasets: [
      {
        label: 'Ingresos Previstos',
        data: predictions.balance.map(p => p.income),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Gastos Previstos',
        data: predictions.balance.map(p => p.expense),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Renderizar contenido según la pestaña activa
  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner text="Calculando predicciones..." />;
    }

    if (!hasData) {
      return (
        <EmptyState>
          <h4>No hay suficientes datos para generar predicciones</h4>
          <p>Agrega más transacciones para obtener predicciones financieras precisas.</p>
          <AnimatedButton onClick={() => window.location.href = '/finances'}>
            Ir a Finanzas
          </AnimatedButton>
        </EmptyState>
      );
    }

    switch (activeTab) {
      case 'cashflow':
        return (
          <>
            <PredictionCard color="var(--primary-color)">
              <PredictionTitle color="var(--primary-color)">
                <FiInfo /> Predicción de Flujo de Caja
              </PredictionTitle>
              <PredictionContent>
                Basado en tus patrones de ingresos y gastos, así es como podría evolucionar tu balance en los próximos meses.
              </PredictionContent>
            </PredictionCard>

            <ChartContainer>
              <Line data={cashFlowChartData} options={chartOptions} />
            </ChartContainer>

            <PredictionGrid>
              {predictions.cashFlow.predictions.map((prediction, index) => (
                <PredictionCard
                  key={index}
                  color={prediction.balance >= 0 ? "var(--success-color)" : "var(--danger-color)"}
                >
                  <PredictionTitle>
                    {prediction.month}
                  </PredictionTitle>
                  <PredictionContent>
                    Balance proyectado al final del mes
                  </PredictionContent>
                  <PredictionValue color={prediction.balance >= 0 ? "var(--success-color)" : "var(--danger-color)"}>
                    {formatCurrency(prediction.endingBalance)}
                  </PredictionValue>
                  <PredictionContent>
                    <strong>Ingresos:</strong> {formatCurrency(prediction.income)}<br />
                    <strong>Gastos:</strong> {formatCurrency(prediction.expense)}<br />
                    <strong>Flujo neto:</strong> {formatCurrency(prediction.balance)}
                  </PredictionContent>
                </PredictionCard>
              ))}
            </PredictionGrid>
          </>
        );

      case 'income-expense':
        return (
          <>
            <PredictionCard color="var(--primary-color)">
              <PredictionTitle color="var(--primary-color)">
                <FiInfo /> Predicción de Ingresos y Gastos
              </PredictionTitle>
              <PredictionContent>
                Proyección de tus ingresos y gastos para los próximos meses, basada en tus patrones históricos.
              </PredictionContent>
            </PredictionCard>

            <ChartContainer>
              <Line data={incomeExpenseChartData} options={chartOptions} />
            </ChartContainer>

            <PredictionGrid>
              {predictions.balance.map((prediction, index) => (
                <PredictionCard
                  key={index}
                  color={prediction.balance >= 0 ? "var(--success-color)" : "var(--danger-color)"}
                >
                  <PredictionTitle>
                    {prediction.month}
                  </PredictionTitle>
                  <PredictionContent>
                    Balance proyectado para el mes
                  </PredictionContent>
                  <PredictionValue color={prediction.balance >= 0 ? "var(--success-color)" : "var(--danger-color)"}>
                    {formatCurrency(prediction.balance)}
                  </PredictionValue>
                  <PredictionContent>
                    <strong>Ingresos:</strong> {formatCurrency(prediction.income)}<br />
                    <strong>Gastos:</strong> {formatCurrency(prediction.expense)}
                  </PredictionContent>
                </PredictionCard>
              ))}
            </PredictionGrid>
          </>
        );

      case 'patterns':
        return (
          <>
            <PredictionCard color="var(--info-color)">
              <PredictionTitle color="var(--info-color)">
                <FiInfo /> Patrones Recurrentes Detectados
              </PredictionTitle>
              <PredictionContent>
                Hemos identificado estos patrones recurrentes en tus transacciones que podrían ser pagos o ingresos periódicos.
              </PredictionContent>
            </PredictionCard>

            {predictions.patterns.length > 0 ? (
              <PredictionGrid>
                {predictions.patterns.map((pattern, index) => (
                  <PredictionCard
                    key={index}
                    color={pattern.avgAmount > 0 ? "var(--success-color)" : "var(--danger-color)"}
                  >
                    <PredictionTitle>
                      {pattern.title}
                    </PredictionTitle>
                    <PredictionContent>
                      <strong>Categoría:</strong> {pattern.category}<br />
                      <strong>Frecuencia:</strong> {pattern.frequency}<br />
                      <strong>Monto promedio:</strong> {formatCurrency(pattern.avgAmount)}<br />
                      <strong>Ocurrencias:</strong> {pattern.occurrences} veces<br />
                      {pattern.nextDate && (
                        <>
                          <strong>Próxima fecha estimada:</strong> {new Date(pattern.nextDate).toLocaleDateString('es-ES')}
                        </>
                      )}
                    </PredictionContent>
                  </PredictionCard>
                ))}
              </PredictionGrid>
            ) : (
              <EmptyState>
                <h4>No se detectaron patrones recurrentes</h4>
                <p>Necesitamos más transacciones para identificar patrones confiables.</p>
              </EmptyState>
            )}
          </>
        );

      default:
        return <div>Selecciona una pestaña para ver las predicciones</div>;
    }
  };

  return (
    <PredictiveContainer>
      <PredictiveHeader>
        <PredictiveTitle>
          <FiTrendingUp /> Análisis Predictivo
        </PredictiveTitle>
        <AnimatedButton
          variant="outline"
          onClick={() => window.location.reload()}
          disabled={loading}
        >
          <FiRefreshCw /> Actualizar
        </AnimatedButton>
      </PredictiveHeader>

      <TabsContainer>
        <Tab
          active={activeTab === 'cashflow'}
          onClick={() => setActiveTab('cashflow')}
        >
          Flujo de Caja
        </Tab>
        <Tab
          active={activeTab === 'income-expense'}
          onClick={() => setActiveTab('income-expense')}
        >
          Ingresos y Gastos
        </Tab>
        <Tab
          active={activeTab === 'patterns'}
          onClick={() => setActiveTab('patterns')}
        >
          Patrones Recurrentes
        </Tab>
      </TabsContainer>

      {renderContent()}
    </PredictiveContainer>
  );
};

export default PredictiveAnalytics;
