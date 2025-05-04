import React from 'react';
import styled from 'styled-components';
import TaskItem from './TaskItem';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`;

const TaskList = ({ tasks, onToggleComplete, onEditTask, onDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <ListContainer>
        <EmptyMessage>
          No hay tareas. ¡Crea una nueva!
        </EmptyMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onEdit={onEditTask} 
          onDelete={onDeleteTask} 
        />
      ))}
    </ListContainer>
  );
};

export default TaskList;
