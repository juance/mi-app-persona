import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import InvestmentSummary from '../components/Investments/InvestmentSummary';
import InvestmentList from '../components/Investments/InvestmentList';
import InvestmentForm from '../components/Investments/InvestmentForm';
import InvestmentFilters from '../components/Investments/InvestmentFilters';
import StockTracker from '../components/Investments/StockTracker';
import FinancialNews from '../components/Investments/FinancialNews';
import ChatBot from '../components/ChatBot/ChatBot';
import AnimatedButton from '../components/common/AnimatedButton';
import { getInvestments, saveInvestments, addInvestment, updateInvestment, deleteInvestment } from '../services/simpleStorage';

const InvestmentsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const InvestmentsHeader = styled.div`
  margin-bottom: 36px;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-dark);
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
    color: var(--text-medium);
    font-size: 1.1rem;
  }
`;

const InvestmentsSection = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const InvestmentsHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h2`
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

const AddInvestmentButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    currency: 'all',
    performance: 'all',
    sort: 'name_asc'
  });
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar inversiones desde el almacenamiento local
  useEffect(() => {
    const loadInvestments = () => {
      try {
        setLoading(true);
        // Obtener inversiones del almacenamiento local
        const savedInvestments = getInvestments();
        console.log('Inversiones cargadas desde el almacenamiento local:', savedInvestments);
        setInvestments(savedInvestments || []);
      } catch (error) {
        console.error('Error al cargar inversiones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInvestments();
  }, []);

  // Aplicar filtros y ordenamiento cuando cambian los filtros o las inversiones
  useEffect(() => {
    let result = [...investments];

    // Filtrar por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(investment =>
        investment.name.toLowerCase().includes(searchTerm) ||
        investment.symbol.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por tipo
    if (filters.type !== 'all') {
      result = result.filter(investment => investment.type === filters.type);
    }

    // Filtrar por moneda
    if (filters.currency !== 'all') {
      result = result.filter(investment =>
        (investment.currency || 'ARS') === filters.currency
      );
    }

    // Filtrar por rendimiento
    if (filters.performance !== 'all') {
      result = result.filter(investment => {
        const profitLoss = investment.current_price - investment.purchase_price;
        return filters.performance === 'positive' ? profitLoss >= 0 : profitLoss < 0;
      });
    }

    // Ordenar
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'value_desc':
          return (b.current_price * b.quantity) - (a.current_price * a.quantity);
        case 'value_asc':
          return (a.current_price * a.quantity) - (b.current_price * b.quantity);
        case 'performance_desc': {
          const perfA = ((a.current_price - a.purchase_price) / a.purchase_price) * 100;
          const perfB = ((b.current_price - b.purchase_price) / b.purchase_price) * 100;
          return perfB - perfA;
        }
        case 'performance_asc': {
          const perfA = ((a.current_price - a.purchase_price) / a.purchase_price) * 100;
          const perfB = ((b.current_price - b.purchase_price) / b.purchase_price) * 100;
          return perfA - perfB;
        }
        case 'date_desc':
          return new Date(b.purchase_date) - new Date(a.purchase_date);
        case 'date_asc':
          return new Date(a.purchase_date) - new Date(b.purchase_date);
        case 'name_asc':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredInvestments(result);
  }, [investments, filters]);

  const handleAddInvestment = (newInvestment) => {
    try {
      // Si estamos editando, actualizar la inversión existente
      if (editingInvestment) {
        // Actualizar la inversión en el almacenamiento local
        const updatedInvestment = updateInvestment(newInvestment.id, newInvestment);

        if (updatedInvestment) {
          console.log('Inversión actualizada correctamente:', updatedInvestment);
          // Actualizar el estado
          setInvestments(prev => prev.map(investment =>
            investment.id === newInvestment.id ? newInvestment : investment
          ));
          setEditingInvestment(null);
        } else {
          console.error('No se pudo actualizar la inversión');
          alert('No se pudo actualizar la inversión. Por favor, intenta de nuevo.');
        }
      } else {
        // Si es una nueva inversión, agregarla a la lista
        // Generar un ID si no tiene
        const investmentWithId = {
          ...newInvestment,
          id: newInvestment.id || `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        // Agregar la inversión al almacenamiento local
        const savedInvestment = addInvestment(investmentWithId);

        if (savedInvestment) {
          console.log('Inversión agregada correctamente:', savedInvestment);
          // Actualizar el estado
          setInvestments(prev => [...prev, savedInvestment]);
        } else {
          console.error('No se pudo agregar la inversión');
          alert('No se pudo agregar la inversión. Por favor, intenta de nuevo.');
        }
      }

      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar la inversión:', error);
      alert('Error al guardar la inversión. Por favor, intenta de nuevo.');
    }
  };

  const handleEditInvestment = (investment) => {
    setEditingInvestment(investment);
    setShowForm(true);
  };

  const handleDeleteInvestment = (investmentId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta inversión?')) {
      try {
        // Eliminar la inversión del almacenamiento local
        const success = deleteInvestment(investmentId);

        if (success) {
          console.log('Inversión eliminada correctamente');
          // Actualizar el estado
          setInvestments(prev => prev.filter(investment => investment.id !== investmentId));
        } else {
          console.error('No se pudo eliminar la inversión');
          alert('No se pudo eliminar la inversión. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al eliminar la inversión:', error);
        alert('Error al eliminar la inversión. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingInvestment(null);
  };

  return (
    <InvestmentsContainer>
      <InvestmentsHeader>
        <h1>Inversiones</h1>
        <p>Gestiona tu cartera de inversiones</p>
      </InvestmentsHeader>

      {/* Resumen de inversiones */}
      <InvestmentSummary
        investments={investments}
        exchangeRate={1.1} // Tasa de cambio EUR a USD
      />

      {/* Sección de inversiones */}
      <InvestmentsSection>
        <InvestmentsHeaderActions>
          <SectionTitle>Mi Cartera</SectionTitle>
          <AnimatedButton
            variant={showForm ? "outline" : "primary"}
            onClick={() => {
              setEditingInvestment(null);
              setShowForm(!showForm);
            }}
          >
            <FiPlus />
            {showForm ? 'Cancelar' : 'Nueva Inversión'}
          </AnimatedButton>
        </InvestmentsHeaderActions>

        {/* Formulario para agregar/editar inversiones */}
        {showForm && (
          <InvestmentForm
            investment={editingInvestment}
            onSubmit={handleAddInvestment}
            onCancel={handleCancelForm}
          />
        )}

        {/* Filtros */}
        <InvestmentFilters filters={filters} onFilterChange={setFilters} />

        {/* Lista de inversiones */}
        <InvestmentList
          investments={filteredInvestments}
          onEditInvestment={handleEditInvestment}
          onDeleteInvestment={handleDeleteInvestment}
        />
      </InvestmentsSection>

      {/* Seguimiento de acciones */}
      <StockTracker />

      {/* Noticias financieras */}
      <FinancialNews />

      {/* Chatbot de consejos financieros */}
      <ChatBot investments={investments} />
    </InvestmentsContainer>
  );
};

export default Investments;
