import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import EventList from '../components/Calendar/EventList';
import EventForm from '../components/Calendar/EventForm';

const CalendarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CalendarHeader = styled.div`
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

const EventsSection = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const EventsHeaderActions = styled.div`
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

const AddEventButton = styled.button`
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

// Lista vacía de eventos
const sampleEvents = [];

const Calendar = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (newEvent) => {
    // Si estamos editando, actualizar el evento existente
    if (editingEvent) {
      setEvents(prev => prev.map(event =>
        event.id === newEvent.id ? newEvent : event
      ));
      setEditingEvent(null);
    } else {
      // Si es un nuevo evento, agregarlo a la lista
      setEvents(prev => [...prev, newEvent]);
    }

    setShowForm(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <h1>Calendario</h1>
        <p>Organiza tus eventos y citas</p>
      </CalendarHeader>

      {/* Calendario */}
      <CalendarGrid
        events={events}
        onSelectDate={handleSelectDate}
      />

      {/* Sección de eventos */}
      <EventsSection>
        <EventsHeaderActions>
          <SectionTitle>Eventos</SectionTitle>
          <AddEventButton onClick={() => {
            setEditingEvent(null);
            setShowForm(!showForm);
          }}>
            <FiPlus />
            {showForm ? 'Cancelar' : 'Nuevo Evento'}
          </AddEventButton>
        </EventsHeaderActions>

        {/* Formulario para agregar/editar eventos */}
        {showForm && (
          <EventForm
            event={editingEvent}
            selectedDate={selectedDate}
            onSubmit={handleAddEvent}
            onCancel={handleCancelForm}
          />
        )}

        {/* Lista de eventos */}
        <EventList
          events={events}
          selectedDate={selectedDate}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </EventsSection>
    </CalendarContainer>
  );
};

export default Calendar;
