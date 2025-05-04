import { supabase } from './supabase';

/**
 * Obtiene los registros de auditoría del usuario actual
 * @param {Object} options - Opciones de consulta
 * @param {number} options.limit - Límite de registros a obtener
 * @param {number} options.offset - Desplazamiento para paginación
 * @param {string} options.table - Filtrar por tabla
 * @param {string} options.action - Filtrar por acción (INSERT, UPDATE, DELETE)
 * @param {string} options.startDate - Fecha de inicio (formato YYYY-MM-DD)
 * @param {string} options.endDate - Fecha de fin (formato YYYY-MM-DD)
 * @returns {Promise<Array>} - Registros de auditoría
 */
export const getAuditLogs = async (options = {}) => {
  try {
    const {
      limit = 50,
      offset = 0,
      table = null,
      action = null,
      startDate = null,
      endDate = null,
    } = options;
    
    let query = supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);
    
    // Aplicar filtros si se proporcionan
    if (table) {
      query = query.eq('table_name', table);
    }
    
    if (action) {
      query = query.eq('action', action.toUpperCase());
    }
    
    if (startDate) {
      query = query.gte('created_at', `${startDate}T00:00:00`);
    }
    
    if (endDate) {
      query = query.lte('created_at', `${endDate}T23:59:59`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener registros de auditoría:', error);
    throw error;
  }
};

/**
 * Obtiene un resumen de actividad del usuario
 * @param {number} days - Número de días para el resumen
 * @returns {Promise<Object>} - Resumen de actividad
 */
export const getActivitySummary = async (days = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const { data, error } = await supabase
      .from('audit_logs')
      .select('action, table_name, created_at')
      .gte('created_at', startDate.toISOString());
    
    if (error) {
      throw error;
    }
    
    // Agrupar por acción
    const actionSummary = data.reduce((acc, log) => {
      const action = log.action;
      acc[action] = (acc[action] || 0) + 1;
      return acc;
    }, {});
    
    // Agrupar por tabla
    const tableSummary = data.reduce((acc, log) => {
      const table = log.table_name;
      acc[table] = (acc[table] || 0) + 1;
      return acc;
    }, {});
    
    // Agrupar por día
    const dailyActivity = data.reduce((acc, log) => {
      const date = new Date(log.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total: data.length,
      actionSummary,
      tableSummary,
      dailyActivity,
    };
  } catch (error) {
    console.error('Error al obtener resumen de actividad:', error);
    throw error;
  }
};

/**
 * Registra una acción manual en el registro de auditoría
 * @param {string} action - Acción realizada
 * @param {string} tableName - Nombre de la tabla
 * @param {string} recordId - ID del registro
 * @param {Object} oldData - Datos antiguos
 * @param {Object} newData - Datos nuevos
 * @returns {Promise<Object>} - Registro de auditoría creado
 */
export const logAction = async (action, tableName, recordId = null, oldData = null, newData = null) => {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        action: action.toUpperCase(),
        table_name: tableName,
        record_id: recordId,
        old_data: oldData,
        new_data: newData,
        ip_address: null, // No podemos obtener la IP del cliente desde el navegador
        user_agent: navigator.userAgent,
      });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error al registrar acción:', error);
    throw error;
  }
};
