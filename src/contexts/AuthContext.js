import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser, 
  onAuthStateChange 
} from '../services/authService';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const { user: currentUser } = await getCurrentUser();
        setUser(currentUser);
        setError(null);
      } catch (err) {
        console.error('Error loading user:', err);
        setError('Error al cargar el usuario');
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Configurar listener para cambios en la autenticación
    const unsubscribe = onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user || null);
    });

    // Limpiar listener al desmontar
    return () => {
      unsubscribe();
    };
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { user: authUser, error: authError } = await signIn(email, password);
      
      if (authError) {
        setError(authError.message);
        return { user: null, error: authError };
      }
      
      setUser(authUser);
      return { user: authUser, error: null };
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Error al iniciar sesión');
      return { user: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Función para registrarse
  const register = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { user: authUser, error: authError } = await signUp(email, password);
      
      if (authError) {
        setError(authError.message);
        return { user: null, error: authError };
      }
      
      setUser(authUser);
      return { user: authUser, error: null };
    } catch (err) {
      console.error('Error registering:', err);
      setError('Error al registrarse');
      return { user: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Primero limpiar el estado local
      setUser(null);
      
      // Luego cerrar sesión en Supabase
      const { error: authError } = await signOut();
      
      if (authError) {
        setError(authError.message);
        return { error: authError };
      }

      // Limpiar cualquier dato en localStorage
      localStorage.removeItem('supabase.auth.token');
      
      return { error: null };
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      setError('Error al cerrar sesión');
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
