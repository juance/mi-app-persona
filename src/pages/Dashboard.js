import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiCheckSquare, FiDollarSign, FiTrendingUp, FiTarget, FiCalendar, FiDatabase } from 'react-icons/fi';
import SyncForceButton from '../components/common/SyncForceButton';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
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

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const ModuleCard = styled(Link)`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  text-decoration: none;
  color: var(--text-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
    color: var(--text-dark);
  }
`;

const ModuleIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: var(--primary-color);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  transition: all var(--transition-speed);

  ${ModuleCard}:hover & {
    transform: scale(1.1);
    background-color: rgba(99, 102, 241, 0.15);
  }
`;

const ModuleTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const ModuleDescription = styled.p`
  margin: 0;
  color: var(--text-medium);
  font-size: 0.95rem;
`;

const WelcomeSection = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-dark);
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  color: var(--text-medium);
  max-width: 800px;
  margin: 0 auto 24px;
  line-height: 1.6;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Dashboard</h1>
        <p>Bienvenido a tu panel de control personal</p>
      </DashboardHeader>

      <WelcomeSection>
        <WelcomeTitle>¡Bienvenido a tu App Personal!</WelcomeTitle>
        <WelcomeText>
          Esta aplicación te ayudará a gestionar tus tareas, finanzas, inversiones, metas financieras y calendario en un solo lugar.
          Explora los diferentes módulos para comenzar a organizar tu vida personal.
        </WelcomeText>
        <SyncForceButton />
      </WelcomeSection>

      <ModulesGrid>
        <ModuleCard to="/tasks">
          <ModuleIcon>
            <FiCheckSquare />
          </ModuleIcon>
          <ModuleTitle>Tareas</ModuleTitle>
          <ModuleDescription>Gestiona tus tareas y pendientes</ModuleDescription>
        </ModuleCard>

        <ModuleCard to="/finances">
          <ModuleIcon>
            <FiDollarSign />
          </ModuleIcon>
          <ModuleTitle>Finanzas</ModuleTitle>
          <ModuleDescription>Controla tus ingresos y gastos</ModuleDescription>
        </ModuleCard>

        <ModuleCard to="/investments">
          <ModuleIcon>
            <FiTrendingUp />
          </ModuleIcon>
          <ModuleTitle>Inversiones</ModuleTitle>
          <ModuleDescription>Gestiona tu cartera de inversiones</ModuleDescription>
        </ModuleCard>

        <ModuleCard to="/financial-goals">
          <ModuleIcon>
            <FiTarget />
          </ModuleIcon>
          <ModuleTitle>Metas Financieras</ModuleTitle>
          <ModuleDescription>Establece y sigue tus objetivos financieros</ModuleDescription>
        </ModuleCard>

        <ModuleCard to="/calendar">
          <ModuleIcon>
            <FiCalendar />
          </ModuleIcon>
          <ModuleTitle>Calendario</ModuleTitle>
          <ModuleDescription>Organiza tus eventos y citas</ModuleDescription>
        </ModuleCard>

        <ModuleCard as="div" onClick={() => document.querySelector('.sync-force-button').click()}>
          <ModuleIcon>
            <FiDatabase />
          </ModuleIcon>
          <ModuleTitle>Sincronización</ModuleTitle>
          <ModuleDescription>Sincroniza tus datos entre dispositivos</ModuleDescription>
        </ModuleCard>
      </ModulesGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
