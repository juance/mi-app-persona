import React from 'react';
import styled from 'styled-components';
import { FiClock, FiMapPin, FiEdit2, FiTrash2 } from 'react-icons/fi';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const EventsTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
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

const EventItem = styled.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  border-left: 4px solid ${props => {
    switch (props.category) {
      case 'personal': return 'var(--primary-color)';
      case 'familia': return 'var(--secondary-color)';
      case 'duchene': return 'var(--accent-color)';
      case 'lavadero': return 'var(--danger-color)';
      case 'vapea': return 'var(--primary-dark)';
      default: return 'var(--text-light)';
    }
  }};

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-hover);
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const EventTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`;

const EventActions = styled.div`
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

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EventDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-medium);
  font-size: 0.9rem;
`;

const EventDescription = styled.p`
  margin: 12px 0 0;
  color: var(--text-medium);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const CategoryBadge = styled.span`
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.category) {
      case 'personal': return 'rgba(99, 102, 241, 0.1)';
      case 'familia': return 'rgba(16, 185, 129, 0.1)';
      case 'duchene': return 'rgba(245, 158, 11, 0.1)';
      case 'lavadero': return 'rgba(239, 68, 68, 0.1)';
      case 'vapea': return 'rgba(168, 85, 247, 0.1)';
      default: return 'rgba(156, 163, 175, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.category) {
      case 'personal': return 'var(--primary-color)';
      case 'familia': return 'var(--secondary-color)';
      case 'duchene': return 'var(--accent-color)';
      case 'lavadero': return 'var(--danger-color)';
      case 'vapea': return 'var(--primary-dark)';
      default: return 'var(--text-medium)';
    }
  }};
`;

const formatTime = (timeString) => {
  if (!timeString) return '';

  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};

const getCategoryName = (category) => {
  switch (category) {
    case 'personal': return 'Personal';
    case 'familia': return 'Familia';
    case 'duchene': return 'Duchene';
    case 'lavadero': return 'Lavadero';
    case 'vapea': return 'Vapea Conmigo';
    default: return 'Otro';
  }
};

const EventList = ({ events, selectedDate, onEditEvent, onDeleteEvent }) => {
  // Filtrar eventos para la fecha seleccionada
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === selectedDate.getDate() &&
           eventDate.getMonth() === selectedDate.getMonth() &&
           eventDate.getFullYear() === selectedDate.getFullYear();
  });

  // Formatear fecha
  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <ListContainer>
      <EventsTitle>Eventos para {formatDate(selectedDate)}</EventsTitle>

      {filteredEvents.length === 0 ? (
        <EmptyMessage>
          No hay eventos para esta fecha. ¡Agrega uno nuevo!
        </EmptyMessage>
      ) : (
        filteredEvents.map(event => (
          <EventItem key={event.id} category={event.category}>
            <EventHeader>
              <EventTitle>{event.title}</EventTitle>
              <EventActions>
                <ActionButton onClick={() => onEditEvent(event)} color="var(--primary-color)">
                  <FiEdit2 />
                </ActionButton>
                <ActionButton onClick={() => onDeleteEvent(event.id)} color="var(--danger-color)">
                  <FiTrash2 />
                </ActionButton>
              </EventActions>
            </EventHeader>

            <EventDetails>
              {(event.start_time || event.end_time) && (
                <EventDetail>
                  <FiClock />
                  {event.start_time && formatTime(event.start_time)}
                  {event.end_time && ` - ${formatTime(event.end_time)}`}
                </EventDetail>
              )}

              {event.location && (
                <EventDetail>
                  <FiMapPin />
                  {event.location}
                </EventDetail>
              )}

              <EventDetail>
                <CategoryBadge category={event.category}>
                  {getCategoryName(event.category)}
                </CategoryBadge>
              </EventDetail>
            </EventDetails>

            {event.description && (
              <EventDescription>{event.description}</EventDescription>
            )}
          </EventItem>
        ))
      )}
    </ListContainer>
  );
};

export default EventList;
