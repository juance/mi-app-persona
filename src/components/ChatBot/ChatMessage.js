import React from 'react';
import styled from 'styled-components';
import { FiUser, FiMessageSquare } from 'react-icons/fi';

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  background-color: ${props => props.isUser ? 'var(--primary-color)' : 'var(--card-bg)'};
  color: ${props => props.isUser ? 'white' : 'var(--text-dark)'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    ${props => props.isUser 
      ? 'border-width: 8px 0 8px 8px; border-color: transparent transparent transparent var(--primary-color); right: -8px;' 
      : 'border-width: 8px 8px 8px 0; border-color: transparent var(--card-bg) transparent transparent; left: -8px;'
    }
    top: 12px;
  }
`;

const MessageContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;
  
  p {
    margin: 0 0 8px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: ${props => props.isUser ? 'white' : 'var(--primary-color)'};
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
  }
  
  code {
    background-color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }
  
  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  strong {
    font-weight: 600;
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.isUser ? 'var(--primary-light)' : 'var(--secondary-light)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.isUser ? '0 0 0 12px' : '0 12px 0 0'};
  color: white;
  font-size: 1.2rem;
`;

const Timestamp = styled.div`
  font-size: 0.7rem;
  color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-light)'};
  margin-top: 4px;
  text-align: ${props => props.isUser ? 'right' : 'left'};
`;

const ChatMessage = ({ message, isUser }) => {
  // Función para formatear la fecha
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Función para renderizar el contenido con formato
  const renderContent = (content) => {
    // Aquí podrías implementar un parser de markdown simple
    // Por ahora, solo dividimos por saltos de línea
    return content.split('\\n').map((line, index) => (
      <p key={index}>{line}</p>
    ));
  };
  
  return (
    <MessageContainer isUser={isUser}>
      <Avatar isUser={isUser}>
        {isUser ? <FiUser /> : <FiMessageSquare />}
      </Avatar>
      <div>
        <MessageBubble isUser={isUser}>
          <MessageContent isUser={isUser}>
            {renderContent(message.content)}
          </MessageContent>
        </MessageBubble>
        <Timestamp isUser={isUser}>
          {formatTime(message.timestamp)}
        </Timestamp>
      </div>
    </MessageContainer>
  );
};

export default ChatMessage;
