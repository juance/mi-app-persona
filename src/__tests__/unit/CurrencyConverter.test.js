import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyConverter from '../../components/common/CurrencyConverter';
import * as currencyService from '../../services/currencyService';

// Mock the currency service
jest.mock('../../services/currencyService', () => ({
  convertCurrency: jest.fn(),
  formatCurrency: jest.fn(amount => `$${amount.toFixed(2)}`),
  getExchangeRate: jest.fn()
}));

describe('CurrencyConverter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    currencyService.convertCurrency.mockResolvedValue(100);
    currencyService.getExchangeRate.mockResolvedValue(100);
  });

  it('should not render when fromCurrency and toCurrency are the same', () => {
    const { container } = render(
      <CurrencyConverter 
        amount={1} 
        fromCurrency="USD" 
        toCurrency="USD" 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should render loading state initially', () => {
    render(
      <CurrencyConverter 
        amount={1} 
        fromCurrency="USD" 
        toCurrency="ARS" 
      />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show converted amount after loading', async () => {
    render(
      <CurrencyConverter 
        amount={1} 
        fromCurrency="USD" 
        toCurrency="ARS" 
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText(/\$100.00/)).toBeInTheDocument();
    });
  });

  it('should show tooltip on hover', async () => {
    render(
      <CurrencyConverter 
        amount={1} 
        fromCurrency="USD" 
        toCurrency="ARS" 
      />
    );
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText(/\$100.00/)).toBeInTheDocument();
    });
    
    // Hover over the converted amount
    fireEvent.mouseEnter(screen.getByRole('button'));
    
    // Check if tooltip is shown
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText(/1 USD = 100.00 ARS/)).toBeInTheDocument();
    });
  });

  it('should call refresh when refresh icon is clicked', async () => {
    // Mock localStorage.removeItem
    const localStorageMock = {
      removeItem: jest.fn()
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    render(
      <CurrencyConverter 
        amount={1} 
        fromCurrency="USD" 
        toCurrency="ARS" 
      />
    );
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText(/\$100.00/)).toBeInTheDocument();
    });
    
    // Find the refresh button (it has an aria-label)
    const refreshButton = screen.getByLabelText('Actualizar tasa de cambio');
    
    // Click the refresh button
    fireEvent.click(refreshButton);
    
    // Check if localStorage.removeItem was called
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('exchange_rates');
    
    // Check if getExchangeRate was called again
    expect(currencyService.getExchangeRate).toHaveBeenCalledTimes(2);
  });

  it('should be accessible via keyboard', async () => {
    render(
      <CurrencyConverter 
        amount={1} 
        fromCurrency="USD" 
        toCurrency="ARS" 
      />
    );
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText(/\$100.00/)).toBeInTheDocument();
    });
    
    // Find the button
    const button = screen.getByRole('button');
    
    // Focus the button
    button.focus();
    
    // Press Enter key
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    
    // Check if tooltip is shown
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
