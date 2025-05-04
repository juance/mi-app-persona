import React from 'react';
import styled from 'styled-components';
import GoalCard from './GoalCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoGoalsMessage = styled.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
  grid-column: 1 / -1;
`;

const GoalList = ({ goals, onUpdateGoal, onDeleteGoal }) => {
  if (!goals || goals.length === 0) {
    return (
      <ListContainer>
        <NoGoalsMessage>
          No hay objetivos financieros. ¡Crea uno nuevo!
        </NoGoalsMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {goals.map(goal => (
        <GoalCard 
          key={goal.id} 
          goal={goal} 
          onUpdate={onUpdateGoal} 
          onDelete={onDeleteGoal} 
        />
      ))}
    </ListContainer>
  );
};

export default GoalList;
