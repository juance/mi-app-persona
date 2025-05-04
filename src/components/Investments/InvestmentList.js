import React from 'react';
import styled from 'styled-components';
import InvestmentItem from './InvestmentItem';

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

const InvestmentList = ({ investments, onEditInvestment, onDeleteInvestment }) => {
  if (!investments || investments.length === 0) {
    return (
      <ListContainer>
        <EmptyMessage>
          No hay inversiones. ¡Registra una nueva!
        </EmptyMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {investments.map(investment => (
        <InvestmentItem 
          key={investment.id} 
          investment={investment} 
          onEdit={onEditInvestment} 
          onDelete={onDeleteInvestment} 
        />
      ))}
    </ListContainer>
  );
};

export default InvestmentList;
