import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiSave, FiLoader } from 'react-icons/fi';

const Container = styled.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`;

const CategoryList = styled.div`
  margin-bottom: 20px;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all var(--transition-speed);

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }
`;

const CategoryName = styled.div`
  font-weight: 500;
  color: var(--text-dark);
`;

const CategoryValue = styled.div`
  color: var(--text-medium);
  font-size: 0.9rem;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    color: ${props => props.color || 'var(--primary-color)'};
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const AddForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Button = styled.button`
  background-color: ${props => props.variant === 'primary' ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : 'var(--text-medium)'};
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'};
  padding: ${props => props.variant === 'primary' ? '12px 20px' : '12px 16px'};
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: ${props => props.variant === 'primary' ? 'var(--primary-dark)' : 'rgba(0, 0, 0, 0.05)'};
    transform: ${props => props.variant === 'primary' ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.variant === 'primary' ? '0 4px 8px rgba(99, 102, 241, 0.2)' : 'none'};
  }
`;

const SaveButton = styled(Button)`
  margin-top: 20px;
`;

const LoadingSpinner = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatusMessage = styled.div`
  margin-top: 12px;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  background-color: ${props => props.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.type === 'success' ? 'var(--secondary-color)' : 'var(--danger-color)'};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditForm = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const EditInput = styled(Input)`
  margin: 0;
`;

const NoCategories = styled.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 20px 0;
`;

const CategoryManager = ({ categories, onSaveCategories }) => {
  const [customCategories, setCustomCategories] = useState(categories || []);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryValue, setNewCategoryValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editName, setEditName] = useState('');
  const [editValue, setEditValue] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    setCustomCategories(categories || []);
  }, [categories]);

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!newCategoryName.trim() || !newCategoryValue.trim()) {
      return;
    }

    const newCategory = {
      name: newCategoryName.trim(),
      value: newCategoryValue.trim()
    };

    setCustomCategories([...customCategories, newCategory]);
    setNewCategoryName('');
    setNewCategoryValue('');
    setHasChanges(true);
  };

  const handleEditCategory = (index) => {
    setEditingIndex(index);
    setEditName(customCategories[index].name);
    setEditValue(customCategories[index].value);
  };

  const handleSaveEdit = () => {
    if (!editName.trim() || !editValue.trim()) {
      return;
    }

    const updatedCategories = [...customCategories];
    updatedCategories[editingIndex] = {
      name: editName.trim(),
      value: editValue.trim()
    };

    setCustomCategories(updatedCategories);
    setEditingIndex(-1);
    setHasChanges(true);
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
  };

  const handleDeleteCategory = (index) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      const updatedCategories = customCategories.filter((_, i) => i !== index);
      setCustomCategories(updatedCategories);
      setHasChanges(true);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      setStatusMessage(null);

      // Llamar a la función asíncrona para guardar categorías
      const success = await onSaveCategories(customCategories);

      if (success) {
        setHasChanges(false);
        setStatusMessage({
          type: 'success',
          text: 'Categorías guardadas correctamente. Se han sincronizado con la nube.'
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: 'No se pudieron guardar las categorías en la nube, pero se guardaron localmente.'
        });
      }
    } catch (error) {
      console.error('Error al guardar categorías:', error);
      setStatusMessage({
        type: 'error',
        text: 'Error al guardar categorías: ' + (error.message || 'Error desconocido')
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container>
      <Title>Gestionar Categorías</Title>

      <AddForm onSubmit={handleAddCategory}>
        <Input
          type="text"
          placeholder="Nombre de categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Valor (ej: travel)"
          value={newCategoryValue}
          onChange={(e) => setNewCategoryValue(e.target.value)}
          required
        />
        <Button type="submit" variant="primary">
          <FiPlus /> Agregar
        </Button>
      </AddForm>

      <CategoryList>
        {customCategories.length > 0 ? (
          customCategories.map((category, index) => (
            <CategoryItem key={index}>
              {editingIndex === index ? (
                <EditForm>
                  <EditInput
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                  <EditInput
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    required
                  />
                  <ActionButton onClick={handleSaveEdit} color="var(--secondary-color)">
                    <FiCheck />
                  </ActionButton>
                  <ActionButton onClick={handleCancelEdit} color="var(--danger-color)">
                    <FiX />
                  </ActionButton>
                </EditForm>
              ) : (
                <>
                  <div>
                    <CategoryName>{category.name}</CategoryName>
                    <CategoryValue>Valor: {category.value}</CategoryValue>
                  </div>
                  <CategoryActions>
                    <ActionButton onClick={() => handleEditCategory(index)} color="var(--primary-color)">
                      <FiEdit2 />
                    </ActionButton>
                    <ActionButton onClick={() => handleDeleteCategory(index)} color="var(--danger-color)">
                      <FiTrash2 />
                    </ActionButton>
                  </CategoryActions>
                </>
              )}
            </CategoryItem>
          ))
        ) : (
          <NoCategories>No hay categorías personalizadas. Agrega una nueva.</NoCategories>
        )}
      </CategoryList>

      {hasChanges && (
        <SaveButton
          onClick={handleSaveChanges}
          variant="primary"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <LoadingSpinner><FiLoader /></LoadingSpinner> Guardando...
            </>
          ) : (
            <>
              <FiSave /> Guardar Cambios
            </>
          )}
        </SaveButton>
      )}

      {statusMessage && (
        <StatusMessage type={statusMessage.type}>
          {statusMessage.type === 'success' ? <FiCheck /> : <FiX />}
          {statusMessage.text}
        </StatusMessage>
      )}
    </Container>
  );
};

export default CategoryManager;
