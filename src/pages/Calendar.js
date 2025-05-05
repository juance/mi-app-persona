import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import EventList from '../components/Calendar/EventList';
import EventForm from '../components/Calendar/EventForm';
import { showInfo } from '../components/common/Notification';
import { getEvents, saveEvents, addEvent, updateEvent, deleteEvent } from '../services/simpleStorage';

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

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar eventos desde el almacenamiento local
  useEffect(() => {
    const loadEvents = () => {
      try {
        setLoading(true);
        // Obtener eventos del almacenamiento local
        const savedEvents = getEvents();
        console.log('Eventos cargados desde el almacenamiento local:', savedEvents);
        setEvents(savedEvents || []);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

    // Escuchar eventos de sincronización
    const handleDataSynced = (event) => {
      const { detail } = event;
      if (detail.success && detail.stores && detail.stores.includes('events')) {
        console.log('Datos de eventos sincronizados, recargando...');
        // Recargar eventos desde el almacenamiento local
        const syncedData = getEvents();
        if (syncedData && syncedData.length > 0) {
          console.log('Eventos actualizados desde sincronización:', syncedData.length);
          setEvents(syncedData);
          showInfo('Eventos actualizados');
        }
      }
    };

    window.addEventListener('data-synced', handleDataSynced);

    // Limpiar suscripciones al desmontar
    return () => {
      window.removeEventListener('data-synced', handleDataSynced);
    };
  }, []);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = (newEvent) => {
    try {
      // Si estamos editando, actualizar el evento existente
      if (editingEvent) {
        // Actualizar el evento en el almacenamiento local
        const updatedEvent = updateEvent(newEvent.id, newEvent);

        if (updatedEvent) {
          console.log('Evento actualizado correctamente:', updatedEvent);
          // Actualizar el estado
          setEvents(prev => prev.map(event =>
            event.id === newEvent.id ? updatedEvent : event
          ));
          setEditingEvent(null);
          showInfo('Evento actualizado correctamente');
        } else {
          console.error('No se pudo actualizar el evento');
          alert('No se pudo actualizar el evento. Por favor, intenta de nuevo.');
        }
      } else {
        // Si es un nuevo evento, agregarlo a la lista
        // Generar un ID si no tiene
        const eventWithId = {
          ...newEvent,
          id: newEvent.id || `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        // Agregar el evento al almacenamiento local
        const savedEvent = addEvent(eventWithId);

        if (savedEvent) {
          console.log('Evento agregado correctamente:', savedEvent);
          // Actualizar el estado
          setEvents(prev => [...prev, savedEvent]);
          showInfo('Evento creado correctamente');
        } else {
          console.error('No se pudo agregar el evento');
          alert('No se pudo agregar el evento. Por favor, intenta de nuevo.');
        }
      }

      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      alert('Error al guardar el evento. Por favor, intenta de nuevo.');
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        // Eliminar el evento del almacenamiento local
        const success = deleteEvent(eventId);

        if (success) {
          console.log('Evento eliminado correctamente');
          // Actualizar el estado
          setEvents(prev => prev.filter(event => event.id !== eventId));
          showInfo('Evento eliminado correctamente');
        } else {
          console.error('No se pudo eliminar el evento');
          alert('No se pudo eliminar el evento. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        alert('Error al eliminar el evento. Por favor, intenta de nuevo.');
      }
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
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Cargando eventos...</p>
          </div>
        ) : (
          <EventList
            events={events}
            selectedDate={selectedDate}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </EventsSection>
    </CalendarContainer>
  );
};

export default Calendar;
