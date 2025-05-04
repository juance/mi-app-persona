import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import TaskFilters from '../components/Tasks/TaskFilters';
import { getTasks, saveTasks, addTask, updateTask, deleteTask, toggleTaskComplete } from '../services/simpleStorage';

const TasksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TasksHeader = styled.div`
  margin-bottom: 36px;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 12px;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
    }
  }

  p {
    color: var(--text-medium);
    font-size: 1.1rem;
  }
`;

const TasksSection = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const TasksHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h2`
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

const AddTaskButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const TaskStats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const StatCard = styled.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color || 'var(--primary-color)'};
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-medium);
  font-weight: 500;
`;

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    sort: 'date_desc'
  });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar tareas desde el almacenamiento local
  useEffect(() => {
    const loadTasks = () => {
      try {
        setLoading(true);
        // Obtener tareas del almacenamiento local
        const savedTasks = getTasks();
        console.log('Tareas cargadas desde el almacenamiento local:', savedTasks);
        setTasks(savedTasks || []);
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Aplicar filtros y ordenamiento cuando cambian los filtros o las tareas
  useEffect(() => {
    let result = [...tasks];

    // Filtrar por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }

    // Filtrar por estado
    if (filters.status !== 'all') {
      result = result.filter(task =>
        (filters.status === 'completed' && task.completed) ||
        (filters.status === 'active' && !task.completed)
      );
    }

    // Filtrar por prioridad
    if (filters.priority !== 'all') {
      result = result.filter(task => task.priority === filters.priority);
    }

    // Filtrar por categoría
    if (filters.category !== 'all') {
      result = result.filter(task => task.category === filters.category);
    }

    // Ordenar
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'date_asc':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'date_desc':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'priority_desc':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'priority_asc':
          const priorityOrderAsc = { high: 3, medium: 2, low: 1 };
          return priorityOrderAsc[a.priority] - priorityOrderAsc[b.priority];
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredTasks(result);
  }, [tasks, filters]);

  const handleAddTask = (newTask) => {
    try {
      // Si estamos editando, actualizar la tarea existente
      if (editingTask) {
        // Mantener la fecha de creación original
        const taskToUpdate = {
          ...newTask,
          created_at: editingTask.created_at
        };

        // Actualizar la tarea en el almacenamiento local
        const updatedTask = updateTask(newTask.id, taskToUpdate);

        if (updatedTask) {
          console.log('Tarea actualizada correctamente:', updatedTask);
          // Actualizar el estado
          setTasks(prev => prev.map(task =>
            task.id === newTask.id ? taskToUpdate : task
          ));
          setEditingTask(null);
        } else {
          console.error('No se pudo actualizar la tarea');
          alert('No se pudo actualizar la tarea. Por favor, intenta de nuevo.');
        }
      } else {
        // Si es una nueva tarea, agregarla a la lista
        const taskWithDate = {
          ...newTask,
          created_at: new Date().toISOString().split('T')[0]
        };

        // Agregar la tarea al almacenamiento local
        const savedTask = addTask(taskWithDate);

        if (savedTask) {
          console.log('Tarea agregada correctamente:', savedTask);
          // Actualizar el estado
          setTasks(prev => [...prev, savedTask]);
        } else {
          console.error('No se pudo agregar la tarea');
          alert('No se pudo agregar la tarea. Por favor, intenta de nuevo.');
        }
      }

      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
      alert('Error al guardar la tarea. Por favor, intenta de nuevo.');
    }
  };

  const handleToggleComplete = (taskId) => {
    try {
      // Cambiar el estado de la tarea en el almacenamiento local
      const updatedTask = toggleTaskComplete(taskId);

      if (updatedTask) {
        console.log('Estado de tarea actualizado correctamente:', updatedTask);
        // Actualizar el estado
        setTasks(prev => prev.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
      } else {
        console.error('No se pudo actualizar el estado de la tarea');
      }
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        // Eliminar la tarea del almacenamiento local
        const success = deleteTask(taskId);

        if (success) {
          console.log('Tarea eliminada correctamente');
          // Actualizar el estado
          setTasks(prev => prev.filter(task => task.id !== taskId));
        } else {
          console.error('No se pudo eliminar la tarea');
          alert('No se pudo eliminar la tarea. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        alert('Error al eliminar la tarea. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Calcular estadísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;

  return (
    <TasksContainer>
      <TasksHeader>
        <h1>Tareas</h1>
        <p>Gestiona tus tareas y pendientes</p>
      </TasksHeader>

      {/* Estadísticas */}
      <TaskStats>
        <StatCard>
          <StatValue>{totalTasks}</StatValue>
          <StatLabel>Total de tareas</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="var(--secondary-color)">{completedTasks}</StatValue>
          <StatLabel>Completadas</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="var(--accent-color)">{pendingTasks}</StatValue>
          <StatLabel>Pendientes</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue color="var(--danger-color)">{highPriorityTasks}</StatValue>
          <StatLabel>Alta prioridad</StatLabel>
        </StatCard>
      </TaskStats>

      {/* Sección de tareas */}
      <TasksSection>
        <TasksHeaderActions>
          <SectionTitle>Mis Tareas</SectionTitle>
          <AddTaskButton onClick={() => {
            setEditingTask(null);
            setShowForm(!showForm);
          }}>
            <FiPlus />
            {showForm ? 'Cancelar' : 'Nueva Tarea'}
          </AddTaskButton>
        </TasksHeaderActions>

        {/* Formulario para agregar/editar tareas */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleAddTask}
            onCancel={handleCancelForm}
          />
        )}

        {/* Filtros */}
        <TaskFilters filters={filters} onFilterChange={setFilters} />

        {/* Lista de tareas */}
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={handleToggleComplete}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </TasksSection>
    </TasksContainer>
  );
};

export default Tasks;
