import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSend, FiRefreshCw } from 'react-icons/fi';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-light);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: var(--text-light);
  }
`;

const SendButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  cursor: pointer;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const RefreshButton = styled.button`
  background-color: var(--bg-medium);
  color: var(--text-medium);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--bg-dark);
    color: var(--text-dark);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(180deg);
  }
`;

const ChatInput = ({ onSendMessage, onRefreshPrices, isRefreshing }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <InputContainer>
      <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
        <StyledInput
          type="text"
          placeholder="Pregunta sobre inversiones o finanzas..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton type="submit" disabled={!message.trim()}>
          <FiSend />
        </SendButton>
      </form>
      <RefreshButton 
        onClick={onRefreshPrices} 
        disabled={isRefreshing}
        title="Actualizar precios"
      >
        <FiRefreshCw style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
      </RefreshButton>
    </InputContainer>
  );
};

export default ChatInput;
