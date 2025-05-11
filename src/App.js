import React, { lazy, useEffect, Suspense } from 'react';
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
import SyncNotification from './components/common/SyncNotification';

// Implementar retryLazy para componentes con posibles problemas de carga
const retryLazy = (componentImport) => {
  return new Promise((resolve, reject) => {
    const retryImport = (retries = 0) => {
      componentImport()
        .then(resolve)
        .catch((error) => {
          if (retries < 3) {
            setTimeout(() => retryImport(retries + 1), 1000 * (retries + 1));
          } else {
            reject(error);
          }
        });
    };
    retryImport();
  });
};

// Cargar páginas de forma perezosa con retry
const Dashboard = lazy(() => retryLazy(() => import('./pages/Dashboard')));
const Tasks = lazy(() => retryLazy(() => import('./pages/Tasks')));
const Finances = lazy(() => retryLazy(() => import('./pages/Finances')));
const Investments = lazy(() => retryLazy(() => import('./pages/Investments')));
const FinancialGoals = lazy(() => retryLazy(() => import('./pages/FinancialGoals')));
const Calendar = lazy(() => retryLazy(() => import('./pages/Calendar')));
const Profile = lazy(() => retryLazy(() => import('./pages/Profile')));
const Analytics = lazy(() => retryLazy(() => import('./pages/Analytics')));
const Auth = lazy(() => retryLazy(() => import('./pages/Auth')));

// Importar el componente AppInitializer
const AppInitializer = lazy(() => import('./components/common/AppInitializer'));

function App() {
  useEffect(() => {
    // Inicializar el servicio de sincronización
    const syncService = initSyncService({
      showNotifications: true,
      interval: 30000 // Sincronizar cada 30 segundos
    });

    return () => {
      syncService.stopSync();
    };
  }, []);

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
            <SyncNotification />
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
