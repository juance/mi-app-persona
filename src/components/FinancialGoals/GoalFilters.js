import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  background-color: var(--bg-medium);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  flex: 1;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-medium);
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all var(--transition-speed);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  
  &:hover {
    border-color: var(--primary-light);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const GoalFilters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        <Label htmlFor="categoryFilter">Filtrar por categoría:</Label>
        <Select
          id="categoryFilter"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="all">Todas las categorías</option>
          <option value="savings">Ahorros</option>
          <option value="investment">Inversión</option>
          <option value="purchase">Compra</option>
          <option value="travel">Viaje</option>
          <option value="education">Educación</option>
          <option value="home">Hogar</option>
          <option value="other">Otro</option>
        </Select>
      </FilterGroup>
      
      <FilterGroup>
        <Label htmlFor="progressFilter">Filtrar por progreso:</Label>
        <Select
          id="progressFilter"
          name="progress"
          value={filters.progress}
          onChange={handleChange}
        >
          <option value="all">Todos</option>
          <option value="less25">Menos del 25%</option>
          <option value="25to50">25% - 50%</option>
          <option value="50to75">50% - 75%</option>
          <option value="more75">Más del 75%</option>
          <option value="completed">Completados</option>
        </Select>
      </FilterGroup>
      
      <FilterGroup>
        <Label htmlFor="sortBy">Ordenar por:</Label>
        <Select
          id="sortBy"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
        >
          <option value="name">Nombre</option>
          <option value="deadline">Fecha límite</option>
          <option value="progress">Progreso</option>
          <option value="amount">Monto objetivo</option>
        </Select>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default GoalFilters;
