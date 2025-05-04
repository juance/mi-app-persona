import { useMemo } from 'react';

/**
 * Hook personalizado para filtrar y ordenar datos
 * @param {Array} data - Datos a filtrar
 * @param {Object} filters - Filtros a aplicar
 * @param {Object} sortConfig - Configuración de ordenamiento
 * @returns {Array} - Datos filtrados y ordenados
 */
const useFilteredData = (data, filters, sortConfig) => {
  return useMemo(() => {
    // Si no hay datos, devolver array vacío
    if (!data || data.length === 0) {
      return [];
    }
    
    // Aplicar filtros
    let filteredData = [...data];
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        // Ignorar filtros vacíos
        if (value === undefined || value === null || value === '' || value === 'all') {
          return;
        }
        
        // Filtrar por fecha de inicio
        if (key === 'startDate') {
          filteredData = filteredData.filter(item => 
            item.date && new Date(item.date) >= new Date(value)
          );
          return;
        }
        
        // Filtrar por fecha de fin
        if (key === 'endDate') {
          filteredData = filteredData.filter(item => 
            item.date && new Date(item.date) <= new Date(value)
          );
          return;
        }
        
        // Filtrar por texto (búsqueda)
        if (key === 'searchText') {
          const searchLower = value.toLowerCase();
          filteredData = filteredData.filter(item => 
            (item.title && item.title.toLowerCase().includes(searchLower)) ||
            (item.description && item.description.toLowerCase().includes(searchLower)) ||
            (item.category && item.category.toLowerCase().includes(searchLower))
          );
          return;
        }
        
        // Filtrar por valor booleano
        if (typeof value === 'boolean') {
          filteredData = filteredData.filter(item => item[key] === value);
          return;
        }
        
        // Filtrar por valor numérico (rango)
        if (typeof value === 'object' && (value.min !== undefined || value.max !== undefined)) {
          filteredData = filteredData.filter(item => {
            const itemValue = parseFloat(item[key]);
            if (isNaN(itemValue)) return false;
            
            if (value.min !== undefined && value.max !== undefined) {
              return itemValue >= value.min && itemValue <= value.max;
            } else if (value.min !== undefined) {
              return itemValue >= value.min;
            } else if (value.max !== undefined) {
              return itemValue <= value.max;
            }
            
            return true;
          });
          return;
        }
        
        // Filtrar por array de valores
        if (Array.isArray(value)) {
          filteredData = filteredData.filter(item => value.includes(item[key]));
          return;
        }
        
        // Filtro estándar por igualdad
        filteredData = filteredData.filter(item => item[key] === value);
      });
    }
    
    // Aplicar ordenamiento
    if (sortConfig && sortConfig.key) {
      filteredData.sort((a, b) => {
        // Obtener valores a comparar
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Manejar fechas
        if (sortConfig.key === 'date' || sortConfig.key === 'created_at' || sortConfig.key === 'updated_at') {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        }
        
        // Manejar strings
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        // Manejar números y otros valores
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [data, filters, sortConfig]);
};

export default useFilteredData;
