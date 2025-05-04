import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import useTheme from '../../hooks/useTheme';

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ChartContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
  transition: transform var(--transition-speed), box-shadow var(--transition-speed);
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }
`;

const ChartTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ChartOptions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  gap: 12px;
`;

const ChartTypeButton = styled.button`
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--bg-medium)'};
  color: ${props => props.active ? 'white' : 'var(--text-medium)'};
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: ${props => props.active ? '0 4px 8px rgba(99, 102, 241, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)'};

  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--bg-light)'};
    transform: translateY(-2px);
  }
`;

const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
  position: relative;
  padding: 10px;
`;

const GoalChart = ({ goals }) => {
  const [chartType, setChartType] = useState('bar');
  const { darkMode } = useTheme();
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (!goals || goals.length === 0) return;

    const labels = goals.map(goal => goal.name);
    const currentAmounts = goals.map(goal => goal.current_amount);
    const targetAmounts = goals.map(goal => goal.target_amount);
    const remainingAmounts = goals.map(goal => Math.max(0, goal.target_amount - goal.current_amount));

    // Colores para las barras/sectores
    const backgroundColors = [
      'rgba(99, 102, 241, 0.7)',
      'rgba(239, 68, 68, 0.7)',
      'rgba(245, 158, 11, 0.7)',
      'rgba(16, 185, 129, 0.7)',
      'rgba(59, 130, 246, 0.7)',
      'rgba(168, 85, 247, 0.7)',
      'rgba(236, 72, 153, 0.7)'
    ];

    if (chartType === 'bar') {
      setChartData({
        labels,
        datasets: [
          {
            label: 'Monto Actual',
            data: currentAmounts,
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1
          },
          {
            label: 'Monto Restante',
            data: remainingAmounts,
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1
          }
        ]
      });

      setChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: darkMode ? '#e5e7eb' : '#4b5563'
            },
            grid: {
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return new Intl.NumberFormat('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  maximumFractionDigits: 0
                }).format(value);
              },
              color: darkMode ? '#e5e7eb' : '#4b5563'
            },
            grid: {
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: darkMode ? '#e5e7eb' : '#4b5563'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' +
                  new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS'
                  }).format(context.raw);
              }
            }
          }
        }
      });
    } else {
      setChartData({
        labels,
        datasets: [{
          data: currentAmounts,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
          borderWidth: 1
        }]
      });

      setChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: darkMode ? '#e5e7eb' : '#4b5563'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const goal = goals[context.dataIndex];
                const percentage = Math.round((goal.current_amount / goal.target_amount) * 100);
                return context.label + ': ' +
                  new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: 'ARS'
                  }).format(context.raw) +
                  ` (${percentage}% del objetivo)`;
              }
            }
          }
        }
      });
    }
  }, [goals, chartType, darkMode]);

  if (!goals || goals.length === 0 || !chartData || !chartOptions) {
    return null;
  }

  return (
    <ChartContainer>
      <ChartTitle>Resumen de Metas Financieras</ChartTitle>

      <ChartOptions>
        <ChartTypeButton
          active={chartType === 'bar'}
          onClick={() => setChartType('bar')}
        >
          Barras
        </ChartTypeButton>
        <ChartTypeButton
          active={chartType === 'pie'}
          onClick={() => setChartType('pie')}
        >
          Circular
        </ChartTypeButton>
      </ChartOptions>

      <ChartWrapper>
        {chartType === 'bar' ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Pie data={chartData} options={chartOptions} />
        )}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default GoalChart;
