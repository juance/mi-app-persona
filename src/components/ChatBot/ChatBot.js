import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import FinancialAdvice from './FinancialAdvice';
import { updateAllPrices, savePriceUpdates } from '../../services/priceService';

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: ${props => props.isOpen ? '0' : '0'};
  right: 20px;
  width: 360px;
  max-width: calc(100vw - 40px);
  height: ${props => props.isOpen ? '500px' : '60px'};
  background-color: var(--bg-light);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    right: 10px;
    width: calc(100vw - 20px);
    height: ${props => props.isOpen ? '400px' : '60px'};
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;

  svg {
    font-size: 1.2rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

// Botón para acciones en el encabezado (no utilizado actualmente, pero disponible para futuras funcionalidades)
// const HeaderButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   font-size: 1.2rem;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 4px;
//   border-radius: 50%;
//   transition: all var(--transition-speed);
//
//   &:hover {
//     background-color: rgba(255, 255, 255, 0.2);
//   }
// `;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin: 20px 0;
  color: var(--text-medium);
  font-size: 0.9rem;

  h3 {
    margin-bottom: 8px;
    color: var(--text-dark);
  }

  p {
    margin-bottom: 16px;
  }
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const QuestionButton = styled.button`
  background-color: var(--bg-medium);
  border: none;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  text-align: left;
  font-size: 0.9rem;
  color: var(--text-dark);
  cursor: pointer;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--bg-dark);
  }
`;

const ChatBot = ({ investments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll al final de los mensajes cuando se añade uno nuevo
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Mensaje de bienvenida al abrir el chat por primera vez
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        content: "Hola, soy tu asistente financiero. Puedo ayudarte con consejos sobre inversiones, finanzas personales y responder tus preguntas sobre términos financieros. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date().toISOString(),
        isUser: false
      };

      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Función para enviar un mensaje
  const handleSendMessage = (content) => {
    // Añadir el mensaje del usuario
    const userMessage = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString(),
      isUser: true
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Simular un pequeño delay antes de la respuesta del bot
    setTimeout(() => {
      // Generar respuesta del bot
      const botResponse = {
        id: Date.now() + 1,
        content: FinancialAdvice.generateResponse(content, investments),
        timestamp: new Date().toISOString(),
        isUser: false
      };

      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);
  };

  // Función para actualizar los precios de las inversiones
  const handleRefreshPrices = async () => {
    if (!investments || investments.length === 0 || isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    try {
      // Añadir mensaje del sistema
      const systemMessage = {
        id: Date.now(),
        content: "Actualizando precios de tus inversiones...",
        timestamp: new Date().toISOString(),
        isUser: false
      };

      setMessages(prevMessages => [...prevMessages, systemMessage]);

      // Actualizar precios
      const updatedInvestments = await updateAllPrices(investments);

      // Guardar precios actualizados
      await savePriceUpdates(updatedInvestments);

      // Calcular cambios
      const changes = updatedInvestments.map(inv => {
        const originalInv = investments.find(i => i.id === inv.id);
        if (!originalInv) return null;

        const priceDiff = inv.current_price - originalInv.current_price;
        const percentChange = (priceDiff / originalInv.current_price) * 100;

        return {
          name: inv.name,
          symbol: inv.symbol,
          oldPrice: originalInv.current_price,
          newPrice: inv.current_price,
          priceDiff,
          percentChange,
          currency: inv.currency || 'ARS'
        };
      }).filter(Boolean);

      // Generar mensaje de resumen
      let summaryContent = "Precios actualizados:\\n\\n";

      if (changes.length === 0) {
        summaryContent += "No se encontraron cambios en los precios.";
      } else {
        changes.forEach(change => {
          const direction = change.priceDiff >= 0 ? '↑' : '↓';
          const formattedPrice = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: change.currency
          }).format(change.newPrice);

          const formattedPercent = new Intl.NumberFormat('es-AR', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(Math.abs(change.percentChange) / 100);

          summaryContent += `${change.name} (${change.symbol}): ${formattedPrice} ${direction} ${formattedPercent}\\n`;
        });
      }

      // Añadir mensaje de resumen
      const summaryMessage = {
        id: Date.now() + 1,
        content: summaryContent,
        timestamp: new Date().toISOString(),
        isUser: false
      };

      setMessages(prevMessages => [...prevMessages, summaryMessage]);

    } catch (error) {
      console.error('Error refreshing prices:', error);

      // Añadir mensaje de error
      const errorMessage = {
        id: Date.now() + 1,
        content: "Lo siento, hubo un error al actualizar los precios. Por favor, intenta de nuevo más tarde.",
        timestamp: new Date().toISOString(),
        isUser: false
      };

      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Preguntas sugeridas
  const suggestedQuestions = [
    "¿Qué es un ETF?",
    "¿Cómo diversificar mi cartera?",
    "¿Qué opinas de mis inversiones actuales?",
    "Dame un consejo sobre inversiones",
    "¿Qué es el interés compuesto?"
  ];

  return (
    <ChatBotContainer isOpen={isOpen}>
      <ChatHeader onClick={() => setIsOpen(!isOpen)}>
        <HeaderTitle>
          <FiMessageSquare />
          Asistente Financiero
        </HeaderTitle>
        <HeaderActions>
          {isOpen ? <FiChevronDown /> : <FiChevronUp />}
        </HeaderActions>
      </ChatHeader>

      {isOpen && (
        <>
          <ChatBody>
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                message={message}
                isUser={message.isUser}
              />
            ))}

            {messages.length === 0 && (
              <WelcomeMessage>
                <h3>Bienvenido al Asistente Financiero</h3>
                <p>Puedo ayudarte con consejos sobre inversiones, finanzas personales y responder tus preguntas sobre términos financieros.</p>

                <SuggestedQuestions>
                  {suggestedQuestions.map((question, index) => (
                    <QuestionButton
                      key={index}
                      onClick={() => handleSendMessage(question)}
                    >
                      {question}
                    </QuestionButton>
                  ))}
                </SuggestedQuestions>
              </WelcomeMessage>
            )}

            <div ref={messagesEndRef} />
          </ChatBody>

          <ChatInput
            onSendMessage={handleSendMessage}
            onRefreshPrices={handleRefreshPrices}
            isRefreshing={isRefreshing}
          />
        </>
      )}
    </ChatBotContainer>
  );
};

export default ChatBot;
