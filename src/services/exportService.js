/**
 * Exporta datos a un archivo CSV
 * @param {Array} data - Datos a exportar
 * @param {string} filename - Nombre del archivo
 */
export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    return;
  }

  // Obtener las cabeceras del CSV
  const headers = Object.keys(data[0]);
  
  // Crear el contenido del CSV
  const csvContent = [
    // Cabeceras
    headers.join(','),
    // Filas de datos
    ...data.map(row => 
      headers.map(header => {
        // Manejar valores especiales
        const value = row[header];
        
        // Si el valor es null o undefined, devolver una cadena vacía
        if (value === null || value === undefined) {
          return '';
        }
        
        // Si el valor es un objeto o array, convertirlo a JSON
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        
        // Si el valor es una cadena, escapar las comillas
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        
        // Para otros tipos de datos, devolver el valor como cadena
        return String(value);
      }).join(',')
    )
  ].join('\\n');
  
  // Crear un blob con el contenido del CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Crear un enlace para descargar el archivo
  const link = document.createElement('a');
  
  // Crear una URL para el blob
  const url = URL.createObjectURL(blob);
  
  // Configurar el enlace
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  // Agregar el enlace al documento
  document.body.appendChild(link);
  
  // Hacer clic en el enlace para descargar el archivo
  link.click();
  
  // Eliminar el enlace
  document.body.removeChild(link);
};

/**
 * Exporta datos a un archivo JSON
 * @param {Array} data - Datos a exportar
 * @param {string} filename - Nombre del archivo
 */
export const exportToJSON = (data, filename) => {
  if (!data) {
    return;
  }
  
  // Crear un blob con el contenido del JSON
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  
  // Crear un enlace para descargar el archivo
  const link = document.createElement('a');
  
  // Crear una URL para el blob
  const url = URL.createObjectURL(blob);
  
  // Configurar el enlace
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  // Agregar el enlace al documento
  document.body.appendChild(link);
  
  // Hacer clic en el enlace para descargar el archivo
  link.click();
  
  // Eliminar el enlace
  document.body.removeChild(link);
};

/**
 * Exporta datos a un archivo Excel
 * @param {Array} data - Datos a exportar
 * @param {string} filename - Nombre del archivo
 */
export const exportToExcel = (data, filename) => {
  // Para exportar a Excel, primero exportamos a CSV
  // y luego cambiamos la extensión a .xlsx
  exportToCSV(data, filename.replace(/\.xlsx$/, ''));
};
