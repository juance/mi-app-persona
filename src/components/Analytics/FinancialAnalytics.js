import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, PolarArea } from 'react-chartjs-2';
import { FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { getTransactions } from '../../services/transactionService';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';
import { showError } from '../common/Notification';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Estilos
const AnalyticsContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 24px;
  margin-bottom: 32px;
  color: #ffffff;
`;

const AnalyticsHeader = styled.div`
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

const AnalyticsTitle = styled.h2`
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

const ChartTypeSelector = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 8px;
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  position: relative;
  margin-top: 24px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.9rem;
    color: #b0b0b0;
  }

  select, input {
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: #2a2a2a;
    color: #ffffff;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }

    option {
      background-color: #2a2a2a;
      color: #ffffff;
    }
  }
`;

const InsightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const InsightCard = styled.div`
  background-color: #2a2a2a;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  border-left: 4px solid ${props => props.color || 'var(--primary-color)'};

  h3 {
    margin: 0 0 8px 0;
    font-size: 1rem;
    color: #ffffff;
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.color || 'var(--primary-color)'};
  }

  small {
    display: block;
    margin-top: 8px;
    font-size: 0.8rem;
    color: #b0b0b0;
  }
`;

// Opciones de gráficos
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

/**
 * Componente de análisis financiero
 * @returns {JSX.Element} - Componente de análisis financiero
 */
const FinancialAnalytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('line');
  const [timeFrame, setTimeFrame] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Cargar transacciones
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error al cargar las transacciones:', error);
        showError('Error al cargar los datos para el análisis');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Filtrar transacciones
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Filtrar por categoría
    if (categoryFilter !== 'all') {
      result = result.filter(transaction => transaction.category === categoryFilter);
    }

    // Filtrar por fecha de inicio
    if (startDate) {
      result = result.filter(transaction => transaction.date >= startDate);
    }

    // Filtrar por fecha de fin
    if (endDate) {
      result = result.filter(transaction => transaction.date <= endDate);
    }

    return result;
  }, [transactions, categoryFilter, startDate, endDate]);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    transactions.forEach(transaction => {
      if (transaction.category) {
        uniqueCategories.add(transaction.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [transactions]);

  // Preparar datos para gráficos
  const chartData = useMemo(() => {
    // Agrupar transacciones por período
    const groupedData = {};

    // Determinar el formato de fecha según el período
    const getDateKey = (date) => {
      const dateObj = new Date(date);
      switch (timeFrame) {
        case 'day':
          return date;
        case 'week':
          const weekStart = new Date(dateObj);
          weekStart.setDate(dateObj.getDate() - dateObj.getDay());
          return weekStart.toISOString().split('T')[0];
        case 'month':
          return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
        case 'year':
          return `${dateObj.getFullYear()}`;
        default:
          return date;
      }
    };

    // Agrupar transacciones por período y tipo
    filteredTransactions.forEach(transaction => {
      const dateKey = getDateKey(transaction.date);
      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        groupedData[dateKey].income += transaction.amount;
      } else if (transaction.type === 'expense') {
        groupedData[dateKey].expense += transaction.amount;
      }
    });

    // Ordenar las fechas
    const sortedDates = Object.keys(groupedData).sort();

    // Preparar datos para el gráfico
    const labels = sortedDates.map(date => {
      if (timeFrame === 'month') {
        const [year, month] = date.split('-');
        return `${month}/${year}`;
      }
      return date;
    });

    const incomeData = sortedDates.map(date => groupedData[date].income);
    const expenseData = sortedDates.map(date => groupedData[date].expense);
    const balanceData = sortedDates.map(date => groupedData[date].income - groupedData[date].expense);

    // Datos para gráficos de categorías
    const categoryData = {};
    filteredTransactions.forEach(transaction => {
      if (!transaction.category) return;

      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        categoryData[transaction.category].income += transaction.amount;
      } else if (transaction.type === 'expense') {
        categoryData[transaction.category].expense += transaction.amount;
      }
    });

    const categoryLabels = Object.keys(categoryData);
    const categoryIncomeData = categoryLabels.map(category => categoryData[category].income);
    const categoryExpenseData = categoryLabels.map(category => categoryData[category].expense);

    // Colores para los gráficos
    const incomeColor = 'rgba(75, 192, 192, 0.6)';
    const expenseColor = 'rgba(255, 99, 132, 0.6)';
    const balanceColor = 'rgba(153, 102, 255, 0.6)';

    // Generar colores aleatorios para categorías
    const generateColors = (count) => {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const hue = (i * 137) % 360; // Distribución uniforme de colores
        colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
      }
      return colors;
    };

    const categoryColors = generateColors(categoryLabels.length);

    return {
      timeSeries: {
        labels,
        datasets: [
          {
            label: 'Ingresos',
            data: incomeData,
            borderColor: incomeColor,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: chartType === 'area',
            tension: 0.4,
          },
          {
            label: 'Gastos',
            data: expenseData,
            borderColor: expenseColor,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: chartType === 'area',
            tension: 0.4,
          },
          {
            label: 'Balance',
            data: balanceData,
            borderColor: balanceColor,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: chartType === 'area',
            tension: 0.4,
          },
        ],
      },
      categoryIncome: {
        labels: categoryLabels,
        datasets: [
          {
            label: 'Ingresos por categoría',
            data: categoryIncomeData,
            backgroundColor: categoryColors,
            borderColor: categoryColors.map(color => color.replace('0.7', '1')),
            borderWidth: 1,
          },
        ],
      },
      categoryExpense: {
        labels: categoryLabels,
        datasets: [
          {
            label: 'Gastos por categoría',
            data: categoryExpenseData,
            backgroundColor: categoryColors,
            borderColor: categoryColors.map(color => color.replace('0.7', '1')),
            borderWidth: 1,
          },
        ],
      },
    };
  }, [filteredTransactions, timeFrame]);

  // Calcular estadísticas
  const statistics = useMemo(() => {
    if (filteredTransactions.length === 0) {
      return {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        averageIncome: 0,
        averageExpense: 0,
        largestIncome: 0,
        largestExpense: 0,
      };
    }

    const incomeTransactions = filteredTransactions.filter(t => t.type === 'income');
    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');

    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      averageIncome: incomeTransactions.length > 0 ? totalIncome / incomeTransactions.length : 0,
      averageExpense: expenseTransactions.length > 0 ? totalExpense / expenseTransactions.length : 0,
      largestIncome: incomeTransactions.length > 0 ? Math.max(...incomeTransactions.map(t => t.amount)) : 0,
      largestExpense: expenseTransactions.length > 0 ? Math.max(...expenseTransactions.map(t => t.amount)) : 0,
    };
  }, [filteredTransactions]);

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  // Renderizar gráfico según el tipo seleccionado
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData.timeSeries} options={chartOptions} />;
      case 'bar':
        return <Bar data={chartData.timeSeries} options={chartOptions} />;
      case 'area':
        return <Line data={chartData.timeSeries} options={chartOptions} />;
      case 'pie-income':
        return <Pie data={chartData.categoryIncome} options={{ ...chartOptions, aspectRatio: 1 }} />;
      case 'pie-expense':
        return <Pie data={chartData.categoryExpense} options={{ ...chartOptions, aspectRatio: 1 }} />;
      case 'doughnut-income':
        return <Doughnut data={chartData.categoryIncome} options={{ ...chartOptions, aspectRatio: 1 }} />;
      case 'doughnut-expense':
        return <Doughnut data={chartData.categoryExpense} options={{ ...chartOptions, aspectRatio: 1 }} />;
      case 'polar-income':
        return <PolarArea data={chartData.categoryIncome} options={{ ...chartOptions, aspectRatio: 1 }} />;
      case 'polar-expense':
        return <PolarArea data={chartData.categoryExpense} options={{ ...chartOptions, aspectRatio: 1 }} />;
      default:
        return <Line data={chartData.timeSeries} options={chartOptions} />;
    }
  };

  return (
    <AnalyticsContainer>
      <AnalyticsHeader>
        <AnalyticsTitle>Análisis Financiero</AnalyticsTitle>
        <ChartTypeSelector>
          <AnimatedButton
            variant={chartType === 'line' ? 'primary' : 'outline'}
            onClick={() => setChartType('line')}
            title="Gráfico de línea"
          >
            <FiTrendingUp />
          </AnimatedButton>
          <AnimatedButton
            variant={chartType === 'bar' ? 'primary' : 'outline'}
            onClick={() => setChartType('bar')}
            title="Gráfico de barras"
          >
            <FiBarChart2 />
          </AnimatedButton>
          <AnimatedButton
            variant={chartType === 'area' ? 'primary' : 'outline'}
            onClick={() => setChartType('area')}
            title="Gráfico de área"
          >
            <FiTrendingUp />
          </AnimatedButton>
          <AnimatedButton
            variant={chartType === 'pie-income' ? 'primary' : 'outline'}
            onClick={() => setChartType('pie-income')}
            title="Gráfico circular de ingresos"
          >
            <FiPieChart />
          </AnimatedButton>
          <AnimatedButton
            variant={chartType === 'pie-expense' ? 'primary' : 'outline'}
            onClick={() => setChartType('pie-expense')}
            title="Gráfico circular de gastos"
          >
            <FiPieChart />
          </AnimatedButton>
        </ChartTypeSelector>
      </AnalyticsHeader>

      <FiltersContainer>
        <FilterGroup>
          <label htmlFor="timeFrame">Período</label>
          <select
            id="timeFrame"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value="day">Diario</option>
            <option value="week">Semanal</option>
            <option value="month">Mensual</option>
            <option value="year">Anual</option>
          </select>
        </FilterGroup>

        <FilterGroup>
          <label htmlFor="categoryFilter">Categoría</label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </FilterGroup>

        <FilterGroup>
          <label htmlFor="startDate">Fecha de inicio</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <label htmlFor="endDate">Fecha de fin</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FilterGroup>
      </FiltersContainer>

      {loading ? (
        <LoadingSpinner text="Cargando datos para análisis..." />
      ) : (
        <>
          <ChartContainer>
            {renderChart()}
          </ChartContainer>

          <InsightsContainer>
            <InsightCard color="var(--success-color)">
              <h3>Ingresos totales</h3>
              <p>{formatCurrency(statistics.totalIncome)}</p>
              <small>Durante el período seleccionado</small>
            </InsightCard>

            <InsightCard color="var(--danger-color)">
              <h3>Gastos totales</h3>
              <p>{formatCurrency(statistics.totalExpense)}</p>
              <small>Durante el período seleccionado</small>
            </InsightCard>

            <InsightCard color={statistics.balance >= 0 ? "var(--success-color)" : "var(--danger-color)"}>
              <h3>Balance</h3>
              <p>{formatCurrency(statistics.balance)}</p>
              <small>Ingresos - Gastos</small>
            </InsightCard>

            <InsightCard color="var(--primary-color)">
              <h3>Ingreso promedio</h3>
              <p>{formatCurrency(statistics.averageIncome)}</p>
              <small>Por transacción</small>
            </InsightCard>

            <InsightCard color="var(--secondary-color)">
              <h3>Gasto promedio</h3>
              <p>{formatCurrency(statistics.averageExpense)}</p>
              <small>Por transacción</small>
            </InsightCard>

            <InsightCard color="var(--success-color-dark)">
              <h3>Mayor ingreso</h3>
              <p>{formatCurrency(statistics.largestIncome)}</p>
              <small>Transacción más grande</small>
            </InsightCard>

            <InsightCard color="var(--danger-color-dark)">
              <h3>Mayor gasto</h3>
              <p>{formatCurrency(statistics.largestExpense)}</p>
              <small>Transacción más grande</small>
            </InsightCard>
          </InsightsContainer>
        </>
      )}
    </AnalyticsContainer>
  );
};

export default FinancialAnalytics;
