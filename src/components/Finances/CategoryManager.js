import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiSave } from 'react-icons/fi';

const ManagerContainer = styled.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ManagerTitle = styled.h3`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
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
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.1);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-medium)'};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.$active ? 'var(--primary-color)' : 'transparent'};
    transition: background-color var(--transition-speed);
  }

  &:hover {
    color: var(--primary-color);
  }
`;

const CategoriesList = styled.div`
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryName = styled.div`
  font-weight: 500;
  color: var(--text-dark);
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

const AddCategoryForm = styled.form`
  display: flex;
  gap: 12px;
  margin-top: 16px;
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

const AddButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0 16px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
  }
`;

const SaveButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
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

const EditForm = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 4px;
`;

const CategoryManager = ({ onClose, onCategoriesChange }) => {
  const [activeTab, setActiveTab] = useState('expense');
  const [expenseCategories, setExpenseCategories] = useState([
    { id: 'food', name: 'Alimentación' },
    { id: 'transport', name: 'Transporte' },
    { id: 'housing', name: 'Vivienda' },
    { id: 'entertainment', name: 'Entretenimiento' },
    { id: 'utilities', name: 'Servicios' },
    { id: 'health', name: 'Salud' },
    { id: 'education', name: 'Educación' },
    { id: 'shopping', name: 'Compras' },
    { id: 'other', name: 'Otro' }
  ]);

  const [incomeCategories, setIncomeCategories] = useState([
    { id: 'salary', name: 'Salario' },
    { id: 'investment', name: 'Inversión' },
    { id: 'gift', name: 'Regalo' },
    { id: 'other', name: 'Otro' }
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState('');



  // Cargar categorías guardadas al iniciar
  useEffect(() => {
    const savedExpenseCategories = localStorage.getItem('expenseCategories');
    const savedIncomeCategories = localStorage.getItem('incomeCategories');

    if (savedExpenseCategories) {
      setExpenseCategories(JSON.parse(savedExpenseCategories));
    }

    if (savedIncomeCategories) {
      setIncomeCategories(JSON.parse(savedIncomeCategories));
    }
  }, []);

  // Función para guardar categorías manualmente
  const saveCategories = () => {
    try {
      localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
      localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));

      // Notificar al componente padre sobre el cambio de categorías
      onCategoriesChange({
        expense: expenseCategories,
        income: incomeCategories
      });

      alert('Categorías guardadas correctamente');
    } catch (error) {
      console.error('Error al guardar categorías:', error);
      alert('Error al guardar categorías');
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!newCategory.trim()) return;

    const newId = newCategory.toLowerCase().replace(/\s+/g, '_');

    if (activeTab === 'expense') {
      // Verificar si ya existe
      if (expenseCategories.some(cat => cat.id === newId || cat.name === newCategory)) {
        alert('Esta categoría ya existe');
        return;
      }

      setExpenseCategories([...expenseCategories, { id: newId, name: newCategory }]);
    } else {
      // Verificar si ya existe
      if (incomeCategories.some(cat => cat.id === newId || cat.name === newCategory)) {
        alert('Esta categoría ya existe');
        return;
      }

      setIncomeCategories([...incomeCategories, { id: newId, name: newCategory }]);
    }

    setNewCategory('');
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setEditValue(category.name);
  };

  const handleSaveEdit = (categoryId) => {
    if (!editValue.trim()) return;

    if (activeTab === 'expense') {
      // Verificar si ya existe (excepto la que estamos editando)
      if (expenseCategories.some(cat => cat.id !== categoryId && cat.name === editValue)) {
        alert('Ya existe una categoría con este nombre');
        return;
      }

      setExpenseCategories(expenseCategories.map(cat =>
        cat.id === categoryId ? { ...cat, name: editValue } : cat
      ));
    } else {
      // Verificar si ya existe (excepto la que estamos editando)
      if (incomeCategories.some(cat => cat.id !== categoryId && cat.name === editValue)) {
        alert('Ya existe una categoría con este nombre');
        return;
      }

      setIncomeCategories(incomeCategories.map(cat =>
        cat.id === categoryId ? { ...cat, name: editValue } : cat
      ));
    }

    setEditingCategory(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditValue('');
  };

  const handleDeleteCategory = (categoryId) => {
    // No permitir eliminar la categoría "Otro"
    if (categoryId === 'other') {
      alert('No se puede eliminar la categoría "Otro"');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      if (activeTab === 'expense') {
        setExpenseCategories(expenseCategories.filter(cat => cat.id !== categoryId));
      } else {
        setIncomeCategories(incomeCategories.filter(cat => cat.id !== categoryId));
      }
    }
  };

  const currentCategories = activeTab === 'expense' ? expenseCategories : incomeCategories;

  return (
    <ManagerContainer>
      <ManagerHeader>
        <ManagerTitle>Gestionar Categorías</ManagerTitle>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
      </ManagerHeader>

      <TabsContainer>
        <Tab
          $active={activeTab === 'expense'}
          onClick={() => setActiveTab('expense')}
        >
          Categorías de Gastos
        </Tab>
        <Tab
          $active={activeTab === 'income'}
          onClick={() => setActiveTab('income')}
        >
          Categorías de Ingresos
        </Tab>
      </TabsContainer>

      <CategoriesList>
        {currentCategories.map(category => (
          <CategoryItem key={category.id}>
            {editingCategory === category.id ? (
              <EditForm>
                <EditInput
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
                <EditActions>
                  <ActionButton
                    onClick={() => handleSaveEdit(category.id)}
                    color="var(--secondary-color)"
                  >
                    <FiCheck />
                  </ActionButton>
                  <ActionButton
                    onClick={handleCancelEdit}
                    color="var(--danger-color)"
                  >
                    <FiX />
                  </ActionButton>
                </EditActions>
              </EditForm>
            ) : (
              <>
                <CategoryName>{category.name}</CategoryName>
                <CategoryActions>
                  <ActionButton
                    onClick={() => handleEditCategory(category)}
                    color="var(--primary-color)"
                    disabled={category.id === 'other'}
                  >
                    <FiEdit2 />
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleDeleteCategory(category.id)}
                    color="var(--danger-color)"
                    disabled={category.id === 'other'}
                  >
                    <FiTrash2 />
                  </ActionButton>
                </CategoryActions>
              </>
            )}
          </CategoryItem>
        ))}
      </CategoriesList>

      <AddCategoryForm onSubmit={handleAddCategory}>
        <Input
          type="text"
          placeholder="Nueva categoría..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <AddButton type="submit">
          <FiPlus />
        </AddButton>
      </AddCategoryForm>

      <SaveButton onClick={saveCategories}>
        <FiSave />
        Guardar Cambios
      </SaveButton>
    </ManagerContainer>
  );
};

export default CategoryManager;
