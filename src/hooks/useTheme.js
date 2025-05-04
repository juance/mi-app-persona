import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  
  return context;
};

export default useTheme;
