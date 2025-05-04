import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionItem from '../../components/Finances/TransactionItem';

// Mock de las funciones de utilidad
jest.mock('../../components/Finances/TransactionItem', () => {
  const originalModule = jest.requireActual('../../components/Finances/TransactionItem');
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(originalModule.default)
  };
});

describe('TransactionItem Component', () => {
  const mockTransaction = {
    id: 1,
    title: 'Compra de comestibles',
    amount: 100,
    type: 'expense',
    category: 'food',
    platform: 'cash:Efectivo',
    date: '2023-01-01'
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders transaction details correctly', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Verificar que los detalles de la transacción se muestren correctamente
    expect(screen.getByText('Compra de comestibles')).toBeInTheDocument();
    expect(screen.getByText(/- \$100/)).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Encontrar y hacer clic en el botón de editar
    const editButton = screen.getByLabelText('Editar');
    fireEvent.click(editButton);

    // Verificar que la función onEdit se haya llamado con la transacción
    expect(mockOnEdit).toHaveBeenCalledWith(mockTransaction);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Encontrar y hacer clic en el botón de eliminar
    const deleteButton = screen.getByLabelText('Eliminar');
    fireEvent.click(deleteButton);

    // Verificar que la función onDelete se haya llamado con el ID de la transacción
    expect(mockOnDelete).toHaveBeenCalledWith(mockTransaction.id);
  });

  it('displays the correct icon based on transaction type', () => {
    // Renderizar una transacción de gasto
    render(
      <TransactionItem
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Verificar que se muestre el icono de gasto
    expect(screen.getByLabelText('Icono de gasto')).toBeInTheDocument();

    // Renderizar una transacción de ingreso
    render(
      <TransactionItem
        transaction={{ ...mockTransaction, type: 'income' }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Verificar que se muestre el icono de ingreso
    expect(screen.getByLabelText('Icono de ingreso')).toBeInTheDocument();
  });

  it('displays the correct platform icon based on platform type', () => {
    // Renderizar una transacción con plataforma de efectivo
    render(
      <TransactionItem
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Verificar que se muestre el icono de efectivo
    expect(screen.getByLabelText('Icono de efectivo')).toBeInTheDocument();

    // Renderizar una transacción con plataforma virtual
    render(
      <TransactionItem
        transaction={{ ...mockTransaction, platform: 'virtual:Mercado Pago' }}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Verificar que se muestre el icono de tarjeta
    expect(screen.getByLabelText('Icono de tarjeta')).toBeInTheDocument();
  });
});
