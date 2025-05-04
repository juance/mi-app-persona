import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiX, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';

const ManagerContainer = styled.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ManagerTitle = styled.h3`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.1rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--text-dark);
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const PlatformTypeContainer = styled.div`
  margin-bottom: 24px;
`;

const PlatformTypeTitle = styled.h4`
  margin: 0 0 12px 0;
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.type === 'cash'
      ? 'var(--accent-color)'
      : 'var(--primary-color)'};
  }
`;

const PlatformList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PlatformItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  margin-bottom: 8px;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--bg-medium);
  }
`;

const PlatformName = styled.span`
  color: var(--text-dark);
  font-size: 0.95rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.1);
  }
`;

const AddPlatformForm = styled.form`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const AddButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--primary-dark);
  }

  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`;

const SaveButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
  margin-top: 16px;
  width: 100%;

  &:hover {
    background-color: var(--secondary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
  }
`;

// Plataformas predeterminadas
const defaultPlatforms = {
  cash: ['Efectivo', 'Caja chica', 'Caja fuerte'],
  virtual: ['Mercado Pago', 'Banco Nación', 'Banco Galicia', 'Ualá', 'Brubank', 'Naranja X', 'Prex']
};

const PlatformManager = ({ onClose, onPlatformsChange }) => {
  const [platforms, setPlatforms] = useState({
    cash: [],
    virtual: []
  });

  const [newPlatform, setNewPlatform] = useState('');
  const [platformType, setPlatformType] = useState('virtual');

  // Cargar plataformas guardadas o usar las predeterminadas
  useEffect(() => {
    try {
      const savedCashPlatforms = localStorage.getItem('cashPlatforms');
      const savedVirtualPlatforms = localStorage.getItem('virtualPlatforms');

      const cashPlatforms = savedCashPlatforms ? JSON.parse(savedCashPlatforms) : defaultPlatforms.cash;
      const virtualPlatforms = savedVirtualPlatforms ? JSON.parse(savedVirtualPlatforms) : defaultPlatforms.virtual;

      setPlatforms({
        cash: cashPlatforms,
        virtual: virtualPlatforms
      });
    } catch (error) {
      console.error('Error al cargar plataformas:', error);
      setPlatforms(defaultPlatforms);
    }
  }, []);

  // Función para guardar plataformas manualmente
  const savePlatforms = () => {
    try {
      localStorage.setItem('cashPlatforms', JSON.stringify(platforms.cash));
      localStorage.setItem('virtualPlatforms', JSON.stringify(platforms.virtual));

      if (onPlatformsChange) {
        onPlatformsChange(platforms);
      }

      alert('Plataformas guardadas correctamente');
    } catch (error) {
      console.error('Error al guardar plataformas:', error);
      alert('Error al guardar plataformas');
    }
  };

  const handleAddPlatform = (e) => {
    e.preventDefault();

    if (!newPlatform.trim()) return;

    setPlatforms(prev => ({
      ...prev,
      [platformType]: [...prev[platformType], newPlatform.trim()]
    }));

    setNewPlatform('');
  };

  const handleDeletePlatform = (type, index) => {
    setPlatforms(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleReset = () => {
    setPlatforms(defaultPlatforms);
  };

  return (
    <ManagerContainer>
      <ManagerHeader>
        <ManagerTitle>Gestionar Plataformas</ManagerTitle>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
      </ManagerHeader>

      <PlatformTypeContainer>
        <PlatformTypeTitle type="cash">Efectivo</PlatformTypeTitle>
        <PlatformList>
          {platforms.cash.map((platform, index) => (
            <PlatformItem key={index}>
              <PlatformName>{platform}</PlatformName>
              <DeleteButton onClick={() => handleDeletePlatform('cash', index)}>
                <FiTrash2 />
              </DeleteButton>
            </PlatformItem>
          ))}
        </PlatformList>
      </PlatformTypeContainer>

      <PlatformTypeContainer>
        <PlatformTypeTitle type="virtual">Billeteras Virtuales</PlatformTypeTitle>
        <PlatformList>
          {platforms.virtual.map((platform, index) => (
            <PlatformItem key={index}>
              <PlatformName>{platform}</PlatformName>
              <DeleteButton onClick={() => handleDeletePlatform('virtual', index)}>
                <FiTrash2 />
              </DeleteButton>
            </PlatformItem>
          ))}
        </PlatformList>
      </PlatformTypeContainer>

      <AddPlatformForm onSubmit={handleAddPlatform}>
        <Select
          value={platformType}
          onChange={(e) => setPlatformType(e.target.value)}
        >
          <option value="cash">Efectivo</option>
          <option value="virtual">Billetera Virtual</option>
        </Select>
        <Input
          type="text"
          placeholder="Nombre de la plataforma"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
        />
        <AddButton type="submit" disabled={!newPlatform.trim()}>
          <FiPlus />
          Agregar
        </AddButton>
      </AddPlatformForm>

      <SaveButton onClick={savePlatforms}>
        <FiSave />
        Guardar Cambios
      </SaveButton>

      <div style={{ marginTop: '16px', textAlign: 'right' }}>
        <button
          onClick={handleReset}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-medium)',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Restaurar valores predeterminados
        </button>
      </div>
    </ManagerContainer>
  );
};

export default PlatformManager;
