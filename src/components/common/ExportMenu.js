import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiDownload, FiFileText, FiDatabase, FiX } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { exportToCSV, exportToJSON, exportToExcel } from '../../services/exportService';
import AnimatedButton from './AnimatedButton';

// Contenedor del menú
const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Botón de exportar
const ExportButton = styled(AnimatedButton)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Menú desplegable
const DropdownMenu = styled(animated.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 100;
  min-width: 200px;
  overflow: hidden;
`;

// Título del menú
const MenuTitle = styled.div`
  font-weight: 600;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Opción del menú
const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--border-radius);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
  }
  
  svg {
    color: var(--primary-color);
  }
`;

// Botón para cerrar el menú
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

/**
 * Componente de menú de exportación
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.data - Datos a exportar
 * @param {string} props.filename - Nombre del archivo
 * @returns {JSX.Element} - Componente de menú de exportación
 */
const ExportMenu = ({ data, filename = 'export' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Animación del menú
  const menuAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 300, friction: 20 }
  });
  
  // Manejador para abrir/cerrar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Manejador para cerrar el menú al hacer clic fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  
  // Agregar/eliminar el event listener al montar/desmontar el componente
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Manejadores para exportar en diferentes formatos
  const handleExportCSV = () => {
    exportToCSV(data, filename);
    setIsOpen(false);
  };
  
  const handleExportJSON = () => {
    exportToJSON(data, filename);
    setIsOpen(false);
  };
  
  const handleExportExcel = () => {
    exportToExcel(data, `${filename}.xlsx`);
    setIsOpen(false);
  };
  
  return (
    <MenuContainer ref={menuRef}>
      <ExportButton 
        variant="outline" 
        onClick={toggleMenu}
      >
        <FiDownload />
        Exportar
      </ExportButton>
      
      {isOpen && (
        <DropdownMenu style={menuAnimation}>
          <MenuTitle>
            Exportar datos
            <CloseButton onClick={() => setIsOpen(false)}>
              <FiX />
            </CloseButton>
          </MenuTitle>
          
          <MenuItem onClick={handleExportCSV}>
            <FiFileText />
            Exportar como CSV
          </MenuItem>
          
          <MenuItem onClick={handleExportJSON}>
            <FiDatabase />
            Exportar como JSON
          </MenuItem>
          
          <MenuItem onClick={handleExportExcel}>
            <FiFileText />
            Exportar como Excel
          </MenuItem>
        </DropdownMenu>
      )}
    </MenuContainer>
  );
};

export default ExportMenu;
