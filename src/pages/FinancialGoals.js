import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import GoalChart from '../components/FinancialGoals/GoalChart';
import GoalFilters from '../components/FinancialGoals/GoalFilters';
import GoalForm from '../components/FinancialGoals/GoalForm';
import GoalList from '../components/FinancialGoals/GoalList';
import CategoryManager from '../components/FinancialGoals/CategoryManager';
import { showInfo } from '../components/common/Notification';
import { getFinancialGoals, saveFinancialGoals, addFinancialGoal, updateFinancialGoal, deleteFinancialGoal } from '../services/simpleStorage';
import { getFinancialGoalsCategories, saveFinancialGoalsCategories } from '../services/categoryService';

const FinancialGoalsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FinancialGoalsHeader = styled.div`
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

const GoalsSection = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const GoalsHeader = styled.div`
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

const AddGoalButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '+';
    font-size: 1.2rem;
    font-weight: 600;
  }

  &:hover {
    background-color: var(--secondary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(16, 185, 129, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const FinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    progress: 'all',
    sortBy: 'name'
  });
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [categories, setCategories] = useState([]);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState(null);

  // Cargar metas financieras desde el almacenamiento local
  useEffect(() => {
    const loadGoals = () => {
      try {
        setLoading(true);
        // Obtener metas financieras del almacenamiento local
        const savedGoals = getFinancialGoals();
        console.log('Metas financieras cargadas desde el almacenamiento local:', savedGoals);
        setGoals(savedGoals || []);
      } catch (error) {
        console.error('Error al cargar metas financieras:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();

    // Escuchar eventos de sincronización
    const handleDataSynced = useCallback((event) => {
      const { detail } = event;
      if (detail.success && detail.stores && detail.stores.includes('financial_goals')) {
        const now = Date.now();
        // Evitar actualizaciones múltiples en un corto período de tiempo
        if (!lastSyncTimestamp || now - lastSyncTimestamp > 2000) {
          console.log('Datos de metas financieras sincronizados, recargando...');
          const syncedData = getFinancialGoals();
          if (syncedData && syncedData.length > 0) {
            setGoals(syncedData);
            // Actualizar el timestamp de última sincronización
            setLastSyncTimestamp(now);
          }
        }
      }
    }, [lastSyncTimestamp]);

    window.addEventListener('data-synced', handleDataSynced);

    // Limpiar suscripciones al desmontar
    return () => {
      window.removeEventListener('data-synced', handleDataSynced);
    };
  }, [lastSyncTimestamp]);

  // Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const savedCategories = await getFinancialGoalsCategories();
        console.log('Categorías cargadas:', savedCategories);
        setCategories(savedCategories || []);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    loadCategories();
  }, []);

  // Aplicar filtros y ordenamiento cuando cambian los filtros o las metas
  useEffect(() => {
    let result = [...goals];

    // Filtrar por categoría
    if (filters.category !== 'all') {
      result = result.filter(goal => goal.category === filters.category);
    }

    // Filtrar por progreso
    if (filters.progress !== 'all') {
      result = result.filter(goal => {
        const progress = Math.round((goal.current_amount / goal.target_amount) * 100);

        switch (filters.progress) {
          case 'less25':
            return progress < 25;
          case '25to50':
            return progress >= 25 && progress < 50;
          case '50to75':
            return progress >= 50 && progress < 75;
          case 'more75':
            return progress >= 75 && progress < 100;
          case 'completed':
            return progress >= 100;
          default:
            return true;
        }
      });
    }

    // Ordenar
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'deadline':
          // Si no hay fecha límite, colocar al final
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        case 'progress':
          const progressA = (a.current_amount / a.target_amount) * 100;
          const progressB = (b.current_amount / b.target_amount) * 100;
          return progressB - progressA; // Mayor progreso primero
        case 'amount':
          return b.target_amount - a.target_amount; // Mayor monto primero
        default:
          return 0;
      }
    });

    setFilteredGoals(result);
  }, [goals, filters]);

  const handleAddGoal = (newGoal) => {
    try {
      // Agregar la meta al almacenamiento local
      const savedGoal = addFinancialGoal(newGoal);

      if (savedGoal) {
        console.log('Meta financiera agregada correctamente:', savedGoal);
        // Actualizar el estado
        setGoals(prev => [...prev, savedGoal]);
        setShowForm(false);
      } else {
        console.error('No se pudo agregar la meta financiera');
        alert('No se pudo agregar la meta financiera. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al agregar meta financiera:', error);
      alert('Error al agregar meta financiera. Por favor, intenta de nuevo.');
    }
  };

  const handleUpdateGoal = (goalId) => {
    const amount = prompt('Ingresa el monto a agregar:');

    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      try {
        // Encontrar la meta actual
        const currentGoal = goals.find(goal => goal.id === goalId);

        if (!currentGoal) {
          console.error('No se encontró la meta financiera');
          return;
        }

        // Calcular el nuevo monto
        const newAmount = currentGoal.current_amount + parseFloat(amount);

        // Actualizar la meta en el almacenamiento local
        const updatedGoal = updateFinancialGoal(goalId, {
          ...currentGoal,
          current_amount: newAmount
        });

        if (updatedGoal) {
          console.log('Meta financiera actualizada correctamente:', updatedGoal);
          // Actualizar el estado
          setGoals(prev => prev.map(goal => {
            if (goal.id === goalId) {
              return {
                ...goal,
                current_amount: newAmount
              };
            }
            return goal;
          }));
        } else {
          console.error('No se pudo actualizar la meta financiera');
          alert('No se pudo actualizar la meta financiera. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al actualizar meta financiera:', error);
        alert('Error al actualizar meta financiera. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleDeleteGoal = (goalId) => {
    const goalToDelete = goals.find(goal => goal.id === goalId);

    if (window.confirm(`¿Estás seguro de que deseas eliminar "${goalToDelete?.name || 'esta meta'}"?`)) {
      try {
        // Eliminar la meta del almacenamiento local
        const success = deleteFinancialGoal(goalId);

        if (success) {
          console.log('Meta financiera eliminada correctamente');
          // Actualizar el estado
          setGoals(prev => prev.filter(goal => goal.id !== goalId));
        } else {
          console.error('No se pudo eliminar la meta financiera');
          alert('No se pudo eliminar la meta financiera. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al eliminar meta financiera:', error);
        alert('Error al eliminar meta financiera. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleSaveCategories = async (updatedCategories) => {
    try {
      // Guardar categorías en el almacenamiento local y en Supabase
      const success = await saveFinancialGoalsCategories(updatedCategories);

      if (success) {
        console.log('Categorías guardadas correctamente:', updatedCategories);
        // Actualizar el estado
        setCategories(updatedCategories);
        return true;
      } else {
        console.error('No se pudieron guardar las categorías');
        return false;
      }
    } catch (error) {
      console.error('Error al guardar categorías:', error);
      return false;
    }
  };

  return (
    <FinancialGoalsContainer>
      <FinancialGoalsHeader>
        <h1>Metas Financieras</h1>
        <p>Establece y realiza seguimiento de tus objetivos financieros</p>
      </FinancialGoalsHeader>

      {/* Gráfico de resumen */}
      <GoalChart goals={goals} />

      {/* Sección de metas */}
      <GoalsSection>
        <GoalsHeader>
          <SectionTitle>Objetivos Financieros</SectionTitle>
          <div style={{ display: 'flex', gap: '12px' }}>
            <AddGoalButton
              onClick={() => {
                setShowCategoryManager(!showCategoryManager);
                setShowForm(false);
              }}
              style={{
                backgroundColor: showCategoryManager ? 'var(--primary-color)' : 'var(--text-medium)',
                boxShadow: showCategoryManager ? '0 4px 6px rgba(99, 102, 241, 0.2)' : 'none'
              }}
            >
              {showCategoryManager ? 'Cerrar Categorías' : 'Gestionar Categorías'}
            </AddGoalButton>
            <AddGoalButton
              onClick={() => {
                setShowForm(!showForm);
                setShowCategoryManager(false);
              }}
            >
              {showForm ? 'Cancelar' : 'Nuevo Objetivo'}
            </AddGoalButton>
          </div>
        </GoalsHeader>

        {/* Gestor de categorías */}
        {showCategoryManager && (
          <CategoryManager
            categories={categories}
            onSaveCategories={handleSaveCategories}
          />
        )}

        {/* Formulario para agregar nuevas metas */}
        {showForm && (
          <GoalForm onSubmit={handleAddGoal} onCancel={() => setShowForm(false)} />
        )}

        {/* Filtros */}
        <GoalFilters filters={filters} onFilterChange={setFilters} />

        {/* Lista de metas */}
        <GoalList
          goals={filteredGoals}
          onUpdateGoal={handleUpdateGoal}
          onDeleteGoal={handleDeleteGoal}
        />
      </GoalsSection>
    </FinancialGoalsContainer>
  );
};

export default FinancialGoals;
