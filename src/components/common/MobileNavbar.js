import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiCheckSquare, FiDollarSign, FiTrendingUp, FiTarget, FiCalendar, FiLogOut, FiUser, FiPieChart } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const MobileNavContainer = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--card-bg);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    height: 60px;
    padding: 0;
    justify-content: space-around;
    align-items: center;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-medium)'};
  text-decoration: none;
  font-size: 0.7rem;
  padding: 8px 0;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-color);
  }
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  color: var(--text-medium);
  background: none;
  border: none;
  font-size: 0.7rem;
  padding: 8px 0;
  transition: all var(--transition-speed);
  cursor: pointer;

  &:hover {
    color: var(--danger-color);
  }
`;

const NavIcon = styled.div`
  font-size: 1.3rem;
  margin-bottom: 4px;
`;

const NavLabel = styled.span`
  font-weight: ${props => props.$active ? '600' : '400'};
`;

const MobileNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <MobileNavContainer className="mobile-nav">
      <NavItem to="/" $active={location.pathname === '/'}>
        <NavIcon>
          <FiHome />
        </NavIcon>
        <NavLabel $active={location.pathname === '/'}>Inicio</NavLabel>
      </NavItem>

      <NavItem to="/tasks" $active={location.pathname === '/tasks'}>
        <NavIcon>
          <FiCheckSquare />
        </NavIcon>
        <NavLabel $active={location.pathname === '/tasks'}>Tareas</NavLabel>
      </NavItem>

      <NavItem to="/finances" $active={location.pathname === '/finances'}>
        <NavIcon>
          <FiDollarSign />
        </NavIcon>
        <NavLabel $active={location.pathname === '/finances'}>Finanzas</NavLabel>
      </NavItem>

      <NavItem to="/investments" $active={location.pathname === '/investments'}>
        <NavIcon>
          <FiTrendingUp />
        </NavIcon>
        <NavLabel $active={location.pathname === '/investments'}>Inversiones</NavLabel>
      </NavItem>

      <NavItem to="/financial-goals" $active={location.pathname === '/financial-goals'}>
        <NavIcon>
          <FiTarget />
        </NavIcon>
        <NavLabel $active={location.pathname === '/financial-goals'}>Metas</NavLabel>
      </NavItem>

      <NavItem to="/analytics" $active={location.pathname === '/analytics'}>
        <NavIcon>
          <FiPieChart />
        </NavIcon>
        <NavLabel $active={location.pathname === '/analytics'}>Análisis</NavLabel>
      </NavItem>

      <NavItem to="/profile" $active={location.pathname === '/profile'}>
        <NavIcon>
          <FiUser />
        </NavIcon>
        <NavLabel $active={location.pathname === '/profile'}>Perfil</NavLabel>
      </NavItem>

      <NavButton onClick={handleLogout}>
        <NavIcon>
          <FiLogOut />
        </NavIcon>
        <NavLabel>Salir</NavLabel>
      </NavButton>
    </MobileNavContainer>
  );
};

export default MobileNavbar;
