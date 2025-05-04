import React from 'react';
import styled from 'styled-components';
import { FiFilter, FiSearch } from 'react-icons/fi';

const FiltersContainer = styled.div`
  background-color: var(--bg-medium);
  padding: 16px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
  color: var(--text-medium);
  font-weight: 500;
  font-size: 0.95rem;
`;

const FiltersIcon = styled(FiFilter)`
  font-size: 1.1rem;
`;

const FiltersContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  flex: 2;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  font-size: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: var(--text-light);
  }
`;

const FilterGroup = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const TaskFilters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <FiltersContainer>
      <FiltersHeader>
        <FiltersIcon />
        Filtrar tareas
      </FiltersHeader>

      <FiltersContent>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Buscar tareas..."
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
          />
        </SearchContainer>

        <FilterGroup>
          <FilterSelect
            name="status"
            value={filters.status || 'all'}
            onChange={handleChange}
          >
            <option value="all">Todas las tareas</option>
            <option value="active">Pendientes</option>
            <option value="completed">Completadas</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterSelect
            name="priority"
            value={filters.priority || 'all'}
            onChange={handleChange}
          >
            <option value="all">Todas las prioridades</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterSelect
            name="category"
            value={filters.category || 'all'}
            onChange={handleChange}
          >
            <option value="all">Todas las categorías</option>
            <option value="personal">Personal</option>
            <option value="familia">Familia</option>
            <option value="duchene">Duchene</option>
            <option value="lavadero">Lavadero</option>
            <option value="vapea">Vapea Conmigo</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterSelect
            name="sort"
            value={filters.sort || 'date_desc'}
            onChange={handleChange}
          >
            <option value="date_desc">Más recientes primero</option>
            <option value="date_asc">Más antiguas primero</option>
            <option value="priority_desc">Mayor prioridad primero</option>
            <option value="priority_asc">Menor prioridad primero</option>
            <option value="name_asc">Nombre (A-Z)</option>
            <option value="name_desc">Nombre (Z-A)</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContent>
    </FiltersContainer>
  );
};

export default TaskFilters;
