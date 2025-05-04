import React, { lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import GlobalStyles from './assets/styles/GlobalStyles';
import MobileStyles from './assets/styles/MobileStyles';
import AccessibilityStyles from './assets/styles/AccessibilityStyles';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import Layout from './components/common/Layout';
import LazyLoad from './components/common/LazyLoad';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Notification, { showInfo, showError } from './components/common/Notification';
import { registerServiceWorker, checkScheduledNotifications } from './services/notificationService';
import { initDatabase } from './services/offlineStorage';
import { initSyncService, syncAllUserData } from './services/syncService';
import { supabase } from './services/supabase';

// Cargar páginas de forma perezosa
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Finances = lazy(() => import('./pages/Finances'));
const Investments = lazy(() => import('./pages/Investments'));
const FinancialGoals = lazy(() => import('./pages/FinancialGoals'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Profile = lazy(() => import('./pages/Profile'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Auth = lazy(() => import('./pages/Auth'));

// Importar el componente AppInitializer
const AppInitializer = lazy(() => import('./components/common/AppInitializer'));

function App() {
  // Ya no necesitamos inicializar aquí, lo hacemos en el componente AppInitializer

  return (
    <ThemeProvider>
      <GlobalStyles />
      <MobileStyles />
      <AccessibilityStyles />
      <AccessibilityProvider>
        <AuthProvider>
          <Router>
            <Notification />
            <LazyLoad component={AppInitializer} />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/auth" element={<LazyLoad component={Auth} />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                <Layout>
                  <LazyLoad component={Dashboard} />
                </Layout>
              } />
              <Route path="/tasks" element={
                <Layout>
                  <LazyLoad component={Tasks} />
                </Layout>
              } />
              <Route path="/finances" element={
                <Layout>
                  <LazyLoad component={Finances} />
                </Layout>
              } />
              <Route path="/investments" element={
                <Layout>
                  <LazyLoad component={Investments} />
                </Layout>
              } />
              <Route path="/financial-goals" element={
                <Layout>
                  <LazyLoad component={FinancialGoals} />
                </Layout>
              } />
              <Route path="/calendar" element={
                <Layout>
                  <LazyLoad component={Calendar} />
                </Layout>
              } />
              <Route path="/profile" element={
                <Layout>
                  <LazyLoad component={Profile} />
                </Layout>
              } />
              <Route path="/analytics" element={
                <Layout>
                  <LazyLoad component={Analytics} />
                </Layout>
              } />
            </Route>

            {/* Ruta por defecto */}
            <Route path="*" element={<LazyLoad component={Auth} />} />
          </Routes>
          </Router>
        </AuthProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;
