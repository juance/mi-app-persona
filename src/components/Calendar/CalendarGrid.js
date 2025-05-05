import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CalendarContainer = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 16px;
  margin-bottom: 24px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MonthTitle = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-dark);
  min-width: 180px;
  text-align: center;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-color);
    background-color: rgba(99, 102, 241, 0.1);
  }
`;

const TodayButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  }
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    gap: 3px;
  }
`;

const Weekday = styled.div`
  text-align: center;
  font-weight: 600;
  color: var(--text-medium);
  padding: 6px 4px;
  font-size: 0.8rem;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;

  @media (max-width: 768px) {
    gap: 3px;
  }
`;

const DayCell = styled.div`
  aspect-ratio: 1;
  border-radius: var(--border-radius);
  padding: 6px 4px;
  cursor: pointer;
  position: relative;
  background-color: ${props => {
    if (props.isToday) return 'rgba(99, 102, 241, 0.1)';
    if (props.isSelected) return 'rgba(99, 102, 241, 0.2)';
    if (props.isCurrentMonth) return 'var(--bg-light)';
    return 'var(--bg-medium)';
  }};
  color: ${props => {
    if (props.isToday) return 'var(--primary-color)';
    if (!props.isCurrentMonth) return 'var(--text-light)';
    return 'var(--text-dark)';
  }};
  font-weight: ${props => props.isToday ? '600' : 'normal'};
  transition: all var(--transition-speed);

  &:hover {
    background-color: ${props => props.isToday
      ? 'rgba(99, 102, 241, 0.2)'
      : 'rgba(99, 102, 241, 0.1)'
    };
    transform: translateY(-1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 3px 2px;
  }
`;

const DayNumber = styled.div`
  font-size: 0.85rem;
  margin-bottom: 2px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 1px;
  }
`;

const EventIndicatorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  justify-content: center;
`;

const EventIndicator = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.category) {
      case 'personal': return 'var(--primary-color)';
      case 'familia': return 'var(--secondary-color)';
      case 'duchene': return 'var(--accent-color)';
      case 'lavadero': return 'var(--danger-color)';
      case 'vapea': return 'var(--primary-dark)';
      default: return 'var(--text-light)';
    }
  }};

  @media (max-width: 768px) {
    width: 3px;
    height: 3px;
  }
`;

const CalendarGrid = ({ events, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Obtener el primer día del mes actual
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // Obtener el último día del mes actual
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Obtener el día de la semana del primer día del mes (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
  const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Calcular el primer día que se mostrará en el calendario (puede ser del mes anterior)
  const firstDayToShow = new Date(firstDayOfMonth);
  firstDayToShow.setDate(firstDayToShow.getDate() - adjustedFirstDayOfWeek);

  // Generar los días para mostrar en el calendario (6 semanas)
  const daysToShow = [];
  const currentDay = new Date(firstDayToShow);

  for (let i = 0; i < 42; i++) {
    daysToShow.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Nombres de los días de la semana
  const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Nombres de los meses
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Navegar al mes anterior
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  // Navegar al mes siguiente
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Ir al mes actual
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
    onSelectDate(new Date());
  };

  // Verificar si una fecha es hoy
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Verificar si una fecha está seleccionada
  const isSelected = (date) => {
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  // Verificar si una fecha pertenece al mes actual
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Manejar clic en una celda de día
  const handleDayClick = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthNavigation>
          <NavButton onClick={goToPreviousMonth}>
            <FiChevronLeft />
          </NavButton>
          <MonthTitle>
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </MonthTitle>
          <NavButton onClick={goToNextMonth}>
            <FiChevronRight />
          </NavButton>
        </MonthNavigation>

        <TodayButton onClick={goToToday}>
          Hoy
        </TodayButton>
      </CalendarHeader>

      <WeekdaysRow>
        {weekdays.map(day => (
          <Weekday key={day}>{day}</Weekday>
        ))}
      </WeekdaysRow>

      <DaysGrid>
        {daysToShow.map((day, index) => {
          const dayEvents = getEventsForDate(day);

          return (
            <DayCell
              key={index}
              isToday={isToday(day)}
              isSelected={isSelected(day)}
              isCurrentMonth={isCurrentMonth(day)}
              onClick={() => handleDayClick(day)}
            >
              <DayNumber>{day.getDate()}</DayNumber>

              <EventIndicatorsContainer>
                {dayEvents.slice(0, 3).map((event, i) => (
                  <EventIndicator key={i} category={event.category} />
                ))}
              </EventIndicatorsContainer>
            </DayCell>
          );
        })}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default CalendarGrid;
