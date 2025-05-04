import React from 'react';
import styled from 'styled-components';
import { FiCheck, FiClock, FiFlag, FiTrash2, FiEdit2, FiTag } from 'react-icons/fi';

const TaskContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  border-left: 4px solid ${props => {
    switch (props.priority) {
      case 'high': return 'var(--danger-color)';
      case 'medium': return 'var(--accent-color)';
      case 'low': return 'var(--secondary-color)';
      default: return 'var(--primary-color)';
    }
  }};

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-hover);
  }

  opacity: ${props => props.completed ? 0.7 : 1};
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const TaskTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TaskActions = styled.div`
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

const TaskDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
`;

const TaskDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-medium);
`;

const TaskDescription = styled.p`
  margin: 8px 0 0;
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.5;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const PriorityBadge = styled.span`
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.priority) {
      case 'high': return 'rgba(239, 68, 68, 0.1)';
      case 'medium': return 'rgba(245, 158, 11, 0.1)';
      case 'low': return 'rgba(16, 185, 129, 0.1)';
      default: return 'rgba(99, 102, 241, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.priority) {
      case 'high': return 'var(--danger-color)';
      case 'medium': return 'var(--accent-color)';
      case 'low': return 'var(--secondary-color)';
      default: return 'var(--primary-color)';
    }
  }};
`;

const CategoryBadge = styled.span`
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.category) {
      case 'personal': return 'rgba(99, 102, 241, 0.1)';
      case 'familia': return 'rgba(16, 185, 129, 0.1)';
      case 'duchene': return 'rgba(245, 158, 11, 0.1)';
      case 'lavadero': return 'rgba(239, 68, 68, 0.1)';
      case 'vapea': return 'rgba(168, 85, 247, 0.1)';
      default: return 'rgba(99, 102, 241, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.category) {
      case 'personal': return 'var(--primary-color)';
      case 'familia': return 'var(--secondary-color)';
      case 'duchene': return 'var(--accent-color)';
      case 'lavadero': return 'var(--danger-color)';
      case 'vapea': return 'var(--primary-dark)';
      default: return 'var(--primary-color)';
    }
  }};
`;

const formatDate = (dateString) => {
  if (!dateString) return 'Sin fecha';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const { id, title, description, completed, due_date, priority, category } = task;

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'personal': return 'Personal';
      case 'familia': return 'Familia';
      case 'duchene': return 'Duchene';
      case 'lavadero': return 'Lavadero';
      case 'vapea': return 'Vapea Conmigo';
      default: return 'Personal';
    }
  };

  return (
    <TaskContainer priority={priority} completed={completed}>
      <TaskHeader>
        <TaskTitle completed={completed}>
          {title}
        </TaskTitle>
        <TaskActions>
          <ActionButton
            onClick={() => onToggleComplete(id)}
            color={completed ? 'var(--text-light)' : 'var(--secondary-color)'}
          >
            <FiCheck />
          </ActionButton>
          <ActionButton onClick={() => onEdit(task)} color="var(--primary-color)">
            <FiEdit2 />
          </ActionButton>
          <ActionButton onClick={() => onDelete(id)} color="var(--danger-color)">
            <FiTrash2 />
          </ActionButton>
        </TaskActions>
      </TaskHeader>

      {description && (
        <TaskDescription completed={completed}>{description}</TaskDescription>
      )}

      <TaskDetails>
        {due_date && (
          <TaskDetail>
            <FiClock />
            {formatDate(due_date)}
          </TaskDetail>
        )}
        <TaskDetail>
          <FiFlag />
          <PriorityBadge priority={priority}>
            {getPriorityText(priority)}
          </PriorityBadge>
        </TaskDetail>
        <TaskDetail>
          <FiTag />
          <CategoryBadge category={category || 'personal'}>
            {getCategoryText(category || 'personal')}
          </CategoryBadge>
        </TaskDetail>
      </TaskDetails>
    </TaskContainer>
  );
};

export default TaskItem;
