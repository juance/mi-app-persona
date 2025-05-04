import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiRefreshCw, FiFilter, FiDownload } from 'react-icons/fi';
import { getAuditLogs } from '../../services/auditService';
import { exportToCSV } from '../../services/exportService';
import LoadingSpinner from '../common/LoadingSpinner';
import AnimatedButton from '../common/AnimatedButton';
import { showError } from '../common/Notification';

// Estilos
const AuditContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const AuditHeader = styled.div`
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

const AuditTitle = styled.h2`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
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
    color: var(--text-medium);
  }
  
  select, input {
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }
`;

const AuditTable = styled.div`
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    
    th {
      font-weight: 600;
      color: var(--text-dark);
      background-color: rgba(0, 0, 0, 0.02);
    }
    
    tr:hover td {
      background-color: rgba(var(--primary-color-rgb), 0.05);
    }
  }
`;

const ActionBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  
  ${props => {
    if (props.action === 'INSERT') {
      return `
        background-color: rgba(var(--success-color-rgb), 0.1);
        color: var(--success-color);
      `;
    } else if (props.action === 'UPDATE') {
      return `
        background-color: rgba(var(--primary-color-rgb), 0.1);
        color: var(--primary-color);
      `;
    } else if (props.action === 'DELETE') {
      return `
        background-color: rgba(var(--danger-color-rgb), 0.1);
        color: var(--danger-color);
      `;
    }
  }}
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const PaginationInfo = styled.div`
  font-size: 0.9rem;
  color: var(--text-medium);
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
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
 * Componente para mostrar los registros de auditoría
 * @returns {JSX.Element} - Componente de registros de auditoría
 */
const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    table: '',
    action: '',
    startDate: '',
    endDate: '',
  });
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    total: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Cargar registros de auditoría
  const loadAuditLogs = async () => {
    try {
      setLoading(true);
      
      const data = await getAuditLogs({
        limit: pagination.limit,
        offset: pagination.offset,
        table: filters.table || null,
        action: filters.action || null,
        startDate: filters.startDate || null,
        endDate: filters.endDate || null,
      });
      
      setLogs(data);
      setPagination(prev => ({
        ...prev,
        total: data.length >= prev.limit ? prev.total + data.length : prev.offset + data.length,
      }));
    } catch (error) {
      console.error('Error al cargar registros de auditoría:', error);
      showError('Error al cargar registros de auditoría');
    } finally {
      setLoading(false);
    }
  };
  
  // Cargar registros al montar el componente y cuando cambian los filtros o la paginación
  useEffect(() => {
    loadAuditLogs();
  }, [pagination.offset, pagination.limit, filters]);
  
  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Manejar cambio de página
  const handlePageChange = (direction) => {
    if (direction === 'prev' && pagination.offset > 0) {
      setPagination(prev => ({
        ...prev,
        offset: Math.max(0, prev.offset - prev.limit),
      }));
    } else if (direction === 'next' && logs.length === pagination.limit) {
      setPagination(prev => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  };
  
  // Manejar cambio de filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    setPagination(prev => ({
      ...prev,
      offset: 0,
    }));
  };
  
  // Exportar registros
  const handleExport = () => {
    try {
      const formattedLogs = logs.map(log => ({
        ID: log.id,
        Acción: log.action,
        Tabla: log.table_name,
        'ID de Registro': log.record_id,
        'Fecha de Creación': formatDate(log.created_at),
        'Agente de Usuario': log.user_agent,
      }));
      
      exportToCSV(formattedLogs, 'registros-auditoria');
    } catch (error) {
      console.error('Error al exportar registros:', error);
      showError('Error al exportar registros');
    }
  };
  
  return (
    <AuditContainer>
      <AuditHeader>
        <AuditTitle>Registros de Auditoría</AuditTitle>
        <ButtonGroup>
          <AnimatedButton
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filtros
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            onClick={loadAuditLogs}
            disabled={loading}
          >
            <FiRefreshCw /> Actualizar
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            onClick={handleExport}
            disabled={loading || logs.length === 0}
          >
            <FiDownload /> Exportar
          </AnimatedButton>
        </ButtonGroup>
      </AuditHeader>
      
      {showFilters && (
        <FiltersContainer>
          <FilterGroup>
            <label htmlFor="table">Tabla</label>
            <select
              id="table"
              name="table"
              value={filters.table}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="transactions">Transacciones</option>
              <option value="tasks">Tareas</option>
              <option value="investments">Inversiones</option>
              <option value="financial_goals">Metas Financieras</option>
              <option value="events">Eventos</option>
            </select>
          </FilterGroup>
          
          <FilterGroup>
            <label htmlFor="action">Acción</label>
            <select
              id="action"
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="INSERT">Inserción</option>
              <option value="UPDATE">Actualización</option>
              <option value="DELETE">Eliminación</option>
            </select>
          </FilterGroup>
          
          <FilterGroup>
            <label htmlFor="startDate">Fecha de inicio</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </FilterGroup>
          
          <FilterGroup>
            <label htmlFor="endDate">Fecha de fin</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </FilterGroup>
        </FiltersContainer>
      )}
      
      {loading ? (
        <LoadingSpinner text="Cargando registros de auditoría..." />
      ) : (
        <>
          {logs.length > 0 ? (
            <>
              <AuditTable>
                <table>
                  <thead>
                    <tr>
                      <th>Acción</th>
                      <th>Tabla</th>
                      <th>ID de Registro</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          <ActionBadge action={log.action}>
                            {log.action === 'INSERT' ? 'Inserción' : 
                             log.action === 'UPDATE' ? 'Actualización' : 
                             log.action === 'DELETE' ? 'Eliminación' : log.action}
                          </ActionBadge>
                        </td>
                        <td>{log.table_name}</td>
                        <td>{log.record_id || '-'}</td>
                        <td>{formatDate(log.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AuditTable>
              
              <Pagination>
                <PaginationInfo>
                  Mostrando {pagination.offset + 1} - {Math.min(pagination.offset + logs.length, pagination.total)} de {pagination.total} registros
                </PaginationInfo>
                <PaginationButtons>
                  <AnimatedButton
                    variant="outline"
                    onClick={() => handlePageChange('prev')}
                    disabled={pagination.offset === 0}
                  >
                    Anterior
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    onClick={() => handlePageChange('next')}
                    disabled={logs.length < pagination.limit}
                  >
                    Siguiente
                  </AnimatedButton>
                </PaginationButtons>
              </Pagination>
            </>
          ) : (
            <EmptyState>
              <p>No se encontraron registros de auditoría</p>
              <p>Intenta cambiar los filtros o realizar algunas acciones en la aplicación</p>
            </EmptyState>
          )}
        </>
      )}
    </AuditContainer>
  );
};

export default AuditLogs;
