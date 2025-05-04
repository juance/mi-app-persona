import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSun, FiMoon, FiHome, FiCheckSquare, FiDollarSign, FiTrendingUp, FiTarget, FiCalendar, FiLogOut, FiUser, FiPieChart } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../contexts/AuthContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 70px;
  background-color: var(--card-bg);
  box-shadow: var(--card-shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color var(--transition-speed), box-shadow var(--transition-speed);

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 16px;
  }
`;

const NavbarBrand = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
    letter-spacing: -0.5px;
    transition: color var(--transition-speed);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--text-medium);
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: var(--primary-color);
    background-color: rgba(99, 102, 241, 0.08);
  }

  &.active {
    color: var(--primary-color);
    background-color: rgba(99, 102, 241, 0.12);
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 3px;
      background-color: var(--primary-color);
      border-radius: 3px;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-color);
    background-color: rgba(99, 102, 241, 0.08);
  }
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-color);
    background-color: rgba(99, 102, 241, 0.08);
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.08);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <NavbarContainer>
      <NavbarBrand>
        <h1>Mi App Personal</h1>
      </NavbarBrand>

      {user && (
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            <FiHome /> Dashboard
          </NavLink>
          <NavLink to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>
            <FiCheckSquare /> Tareas
          </NavLink>
          <NavLink to="/finances" className={location.pathname === '/finances' ? 'active' : ''}>
            <FiDollarSign /> Finanzas
          </NavLink>
          <NavLink to="/investments" className={location.pathname === '/investments' ? 'active' : ''}>
            <FiTrendingUp /> Inversiones
          </NavLink>
          <NavLink to="/financial-goals" className={location.pathname === '/financial-goals' ? 'active' : ''}>
            <FiTarget /> Metas Financieras
          </NavLink>
          <NavLink to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>
            <FiCalendar /> Calendario
          </NavLink>
          <NavLink to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>
            <FiPieChart /> Análisis
          </NavLink>
        </NavLinks>
      )}

      <NavActions>
        <ThemeToggle onClick={toggleTheme} title="Cambiar tema">
          {darkMode ? <FiSun /> : <FiMoon />}
        </ThemeToggle>

        {user && (
          <>
            <NavLink to="/profile" className={location.pathname === '/profile' ? 'active' : ''} title={user.email}>
              <FiUser />
            </NavLink>
            <LogoutButton onClick={handleLogout} title="Cerrar sesión">
              <FiLogOut />
            </LogoutButton>
          </>
        )}
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;
