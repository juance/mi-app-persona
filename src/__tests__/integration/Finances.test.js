import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Finances from '../../components/Finances/Finances';
import * as transactionService from '../../services/transactionService';

// Mock de los servicios
jest.mock('../../services/transactionService', () => ({
  getTransactions: jest.fn(),
  createTransaction: jest.fn(),
  updateTransaction: jest.fn(),
  deleteTransaction: jest.fn()
}));

// Mock del contexto de autenticación
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id', email: 'test@example.com' },
    loading: false
  })
}));

describe('Finances Component Integration', () => {
  const mockTransactions = [
    {
      id: 1,
      title: 'Compra de comestibles',
      amount: 100,
      type: 'expense',
      category: 'food',
      platform: 'cash:Efectivo',
      date: '2023-01-01',
      user_id: 'test-user-id'
    },
    {
      id: 2,
      title: 'Salario',
      amount: 1000,
      type: 'income',
      category: 'salary',
      platform: 'virtual:Banco',
      date: '2023-01-15',
      user_id: 'test-user-id'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    transactionService.getTransactions.mockResolvedValue(mockTransactions);
    transactionService.createTransaction.mockResolvedValue(mockTransactions[0]);
    transactionService.updateTransaction.mockResolvedValue(mockTransactions[0]);
    transactionService.deleteTransaction.mockResolvedValue(true);
  });

  it('renders the finances page with transactions', async () => {
    render(
      <BrowserRouter>
        <Finances />
      </BrowserRouter>
    );

    // Verificar que se muestre el título de la página
    expect(screen.getByText('Finanzas')).toBeInTheDocument();

    // Verificar que se carguen las transacciones
    await waitFor(() => {
      expect(transactionService.getTransactions).toHaveBeenCalled();
    });

    // Verificar que se muestren las transacciones
    await waitFor(() => {
      expect(screen.getByText('Compra de comestibles')).toBeInTheDocument();
      expect(screen.getByText('Salario')).toBeInTheDocument();
    });
  });

  it('opens the transaction form when add button is clicked', async () => {
    render(
      <BrowserRouter>
        <Finances />
      </BrowserRouter>
    );

    // Encontrar y hacer clic en el botón de agregar
    const addButton = screen.getByText('Nueva Transacción');
    fireEvent.click(addButton);

    // Verificar que se muestre el formulario
    await waitFor(() => {
      expect(screen.getByText('Registrar Nueva Transacción')).toBeInTheDocument();
    });
  });

  it('creates a new transaction when form is submitted', async () => {
    render(
      <BrowserRouter>
        <Finances />
      </BrowserRouter>
    );

    // Abrir el formulario
    const addButton = screen.getByText('Nueva Transacción');
    fireEvent.click(addButton);

    // Llenar el formulario
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Descripción'), {
        target: { value: 'Nueva transacción' }
      });
      fireEvent.change(screen.getByLabelText('Monto (ARS)'), {
        target: { value: '200' }
      });
      fireEvent.change(screen.getByLabelText('Fecha'), {
        target: { value: '2023-02-01' }
      });
    });

    // Enviar el formulario
    const submitButton = screen.getByText('Guardar');
    fireEvent.click(submitButton);

    // Verificar que se llame al servicio para crear la transacción
    await waitFor(() => {
      expect(transactionService.createTransaction).toHaveBeenCalled();
    });

    // Verificar que se actualice la lista de transacciones
    await waitFor(() => {
      expect(transactionService.getTransactions).toHaveBeenCalledTimes(2);
    });
  });

  it('deletes a transaction when delete button is clicked', async () => {
    render(
      <BrowserRouter>
        <Finances />
      </BrowserRouter>
    );

    // Esperar a que se carguen las transacciones
    await waitFor(() => {
      expect(screen.getByText('Compra de comestibles')).toBeInTheDocument();
    });

    // Encontrar y hacer clic en el botón de eliminar
    const deleteButton = screen.getAllByLabelText('Eliminar')[0];
    fireEvent.click(deleteButton);

    // Verificar que se muestre el diálogo de confirmación
    await waitFor(() => {
      expect(screen.getByText('¿Estás seguro de que deseas eliminar esta transacción?')).toBeInTheDocument();
    });

    // Confirmar la eliminación
    const confirmButton = screen.getByText('Eliminar');
    fireEvent.click(confirmButton);

    // Verificar que se llame al servicio para eliminar la transacción
    await waitFor(() => {
      expect(transactionService.deleteTransaction).toHaveBeenCalledWith(1);
    });

    // Verificar que se actualice la lista de transacciones
    await waitFor(() => {
      expect(transactionService.getTransactions).toHaveBeenCalledTimes(2);
    });
  });

  it('edits a transaction when edit button is clicked', async () => {
    render(
      <BrowserRouter>
        <Finances />
      </BrowserRouter>
    );

    // Esperar a que se carguen las transacciones
    await waitFor(() => {
      expect(screen.getByText('Compra de comestibles')).toBeInTheDocument();
    });

    // Encontrar y hacer clic en el botón de editar
    const editButton = screen.getAllByLabelText('Editar')[0];
    fireEvent.click(editButton);

    // Verificar que se muestre el formulario de edición
    await waitFor(() => {
      expect(screen.getByText('Editar Transacción')).toBeInTheDocument();
    });

    // Modificar el título
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: 'Transacción modificada' }
    });

    // Enviar el formulario
    const submitButton = screen.getByText('Guardar');
    fireEvent.click(submitButton);

    // Verificar que se llame al servicio para actualizar la transacción
    await waitFor(() => {
      expect(transactionService.updateTransaction).toHaveBeenCalled();
    });

    // Verificar que se actualice la lista de transacciones
    await waitFor(() => {
      expect(transactionService.getTransactions).toHaveBeenCalledTimes(2);
    });
  });
});
