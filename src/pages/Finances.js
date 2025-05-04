import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import FinancialSummary from '../components/Finances/FinancialSummary';
import TransactionList from '../components/Finances/TransactionList';
import TransactionForm from '../components/Finances/TransactionForm';
import TransactionFilters from '../components/Finances/TransactionFilters';
import { getTransactions as getTransactionsFromAPI, createTransaction as createTransactionAPI, updateTransaction as updateTransactionAPI, deleteTransaction as deleteTransactionAPI } from '../services/transactionService';
import { subscribeToTransactions, unsubscribe } from '../services/realtimeService';
import AnimatedButton from '../components/common/AnimatedButton';
import AnimatedTransition from '../components/common/AnimatedTransition';
import { showSuccess, showError, showInfo } from '../components/common/Notification';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ExportMenu from '../components/common/ExportMenu';
import ConfirmDialog from '../components/common/ConfirmDialog';
// Importar el servicio de almacenamiento simple
import { getTransactions, saveTransactions, addTransaction, updateTransaction, deleteTransaction } from '../services/simpleStorage';

const FinancesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FinancesHeader = styled.div`
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

const TransactionsSection = styled.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`;

const TransactionsHeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-left: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }
`;

// Usamos el componente AnimatedButton en lugar de un botón personalizado

// Las transacciones se cargarán desde Supabase

const Finances = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    startDate: '',
    endDate: '',
    sort: 'date_desc'
  });
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    confirmText: 'Confirmar',
    confirmVariant: 'primary'
  });

  // Cargar transacciones desde el almacenamiento local y luego intentar desde Supabase
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);

        // Primero, intentar cargar desde el almacenamiento local
        const localData = getTransactions();

        if (localData && localData.length > 0) {
          console.log('Transacciones cargadas desde el almacenamiento local:', localData);
          setTransactions(localData);
          setError(null);
          setLoading(false);

          // Luego, intentar cargar desde la API en segundo plano
          try {
            const apiData = await getTransactionsFromAPI();
            if (apiData && apiData.length > 0) {
              console.log('Transacciones cargadas desde la API:', apiData);
              setTransactions(apiData);
              // Guardar en el almacenamiento local
              saveTransactions(apiData);
            }
          } catch (apiError) {
            console.error('Error al cargar transacciones desde la API:', apiError);
            // No mostrar error al usuario si ya tenemos datos locales
          }
        } else {
          // Si no hay datos locales, intentar cargar desde la API
          try {
            const apiData = await getTransactionsFromAPI();
            console.log('Transacciones cargadas desde la API:', apiData);
            setTransactions(apiData);
            // Guardar en el almacenamiento local
            saveTransactions(apiData);
            setError(null);
          } catch (apiError) {
            console.error('Error al cargar transacciones desde la API:', apiError);
            setError('Error al cargar las transacciones. Por favor, intenta de nuevo más tarde.');
            // Usar un array vacío si no hay datos
            setTransactions([]);
          }
        }
      } catch (err) {
        console.error('Error al cargar las transacciones:', err);
        setError('Error al cargar las transacciones. Por favor, intenta de nuevo más tarde.');
        // Usar un array vacío si hay error
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();

    // Suscribirse a cambios en tiempo real
    let subscription;
    const setupRealtimeSubscription = async () => {
      try {
        subscription = await subscribeToTransactions((payload) => {
          console.log('Cambio en tiempo real:', payload);

          const { eventType, new: newRecord, old: oldRecord } = payload;

          // Manejar diferentes tipos de eventos
          switch (eventType) {
            case 'INSERT':
              setTransactions(prev => {
                const updated = [...prev, newRecord];
                // Guardar en el almacenamiento local
                saveTransactions(updated);
                return updated;
              });
              showInfo(`Nueva transacción: ${newRecord.title}`);
              break;
            case 'UPDATE':
              setTransactions(prev => {
                const updated = prev.map(transaction =>
                  transaction.id === newRecord.id ? newRecord : transaction
                );
                // Guardar en el almacenamiento local
                saveTransactions(updated);
                return updated;
              });
              showInfo(`Transacción actualizada: ${newRecord.title}`);
              break;
            case 'DELETE':
              setTransactions(prev => {
                const updated = prev.filter(transaction => transaction.id !== oldRecord.id);
                // Guardar en el almacenamiento local
                saveTransactions(updated);
                return updated;
              });
              showInfo('Transacción eliminada');
              break;
            default:
              break;
          }
        });
      } catch (error) {
        console.error('Error al suscribirse a cambios en tiempo real:', error);
      }
    };

    setupRealtimeSubscription();

    // Limpiar suscripción al desmontar
    return () => {
      unsubscribe(subscription);
    };
  }, []);

  // Aplicar filtros y ordenamiento cuando cambian los filtros o las transacciones
  useEffect(() => {
    let result = [...transactions];

    // Filtrar por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(transaction =>
        transaction.title.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por tipo
    if (filters.type !== 'all') {
      result = result.filter(transaction => transaction.type === filters.type);
    }

    // Filtrar por categoría
    if (filters.category !== 'all') {
      result = result.filter(transaction => transaction.category === filters.category);
    }

    // Filtrar por fecha de inicio
    if (filters.startDate) {
      result = result.filter(transaction => transaction.date >= filters.startDate);
    }

    // Filtrar por fecha de fin
    if (filters.endDate) {
      result = result.filter(transaction => transaction.date <= filters.endDate);
    }

    // Ordenar
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'date_asc':
          return new Date(a.date) - new Date(b.date);
        case 'date_desc':
          return new Date(b.date) - new Date(a.date);
        case 'amount_desc':
          return b.amount - a.amount;
        case 'amount_asc':
          return a.amount - b.amount;
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredTransactions(result);
  }, [transactions, filters]);

  const handleAddTransaction = async (newTransaction) => {
    try {
      console.log('Transaction to save:', newTransaction);

      // Si estamos editando, actualizar la transacción existente
      if (editingTransaction) {
        console.log('Updating transaction with ID:', newTransaction.id);

        // Actualizar en el almacenamiento local primero
        const updatedTransaction = updateTransaction(newTransaction.id, newTransaction);

        if (updatedTransaction) {
          console.log('Transaction updated successfully in local storage:', updatedTransaction);

          // Actualizar el estado
          setTransactions(prev => {
            const updated = prev.map(transaction =>
              transaction.id === updatedTransaction.id ? updatedTransaction : transaction
            );
            // Guardar en el almacenamiento local
            saveTransactions(updated);
            return updated;
          });

          setEditingTransaction(null);
          showSuccess('Transacción actualizada correctamente');

          // Intentar actualizar en la API en segundo plano
          try {
            const apiUpdated = await updateTransactionAPI(newTransaction.id, newTransaction);
            console.log('Transaction updated in API:', apiUpdated);
          } catch (apiError) {
            console.error('Error updating transaction in API:', apiError);
            // No mostrar error al usuario ya que la actualización local fue exitosa
          }
        }
      } else {
        // Si es una nueva transacción, agregarla a la lista
        console.log('Creating new transaction');

        // Agregar en el almacenamiento local primero
        const createdTransaction = addTransaction(newTransaction);

        if (createdTransaction) {
          console.log('Transaction created successfully in local storage:', createdTransaction);

          // Actualizar el estado
          setTransactions(prev => {
            const updated = [...prev, createdTransaction];
            // Guardar en el almacenamiento local
            saveTransactions(updated);
            return updated;
          });

          showSuccess('Transacción creada correctamente');

          // Intentar crear en la API en segundo plano
          try {
            const apiCreated = await createTransactionAPI(newTransaction);
            console.log('Transaction created in API:', apiCreated);
          } catch (apiError) {
            console.error('Error creating transaction in API:', apiError);
            // No mostrar error al usuario ya que la creación local fue exitosa
          }
        }
      }

      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Error al guardar la transacción:', err);
      setError(`Error al guardar la transacción: ${err.message}`);
      showError(`Error al guardar la transacción: ${err.message}`);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDeleteTransaction = (transactionId) => {
    // Mostrar diálogo de confirmación
    setConfirmDialog({
      isOpen: true,
      title: 'Eliminar transacción',
      message: '¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer.',
      onConfirm: async () => {
        try {
          // Eliminar del almacenamiento local primero
          const success = deleteTransaction(transactionId);

          if (success) {
            console.log('Transaction deleted successfully from local storage');

            // Actualizar el estado
            setTransactions(prev => {
              const updated = prev.filter(transaction => transaction.id !== transactionId);
              // Guardar en el almacenamiento local
              saveTransactions(updated);
              return updated;
            });

            showSuccess('Transacción eliminada correctamente');

            // Intentar eliminar en la API en segundo plano
            try {
              await deleteTransactionAPI(transactionId);
              console.log('Transaction deleted from API');
            } catch (apiError) {
              console.error('Error deleting transaction from API:', apiError);
              // No mostrar error al usuario ya que la eliminación local fue exitosa
            }
          } else {
            showError('No se pudo eliminar la transacción');
          }
        } catch (err) {
          console.error('Error al eliminar la transacción:', err);
          showError('Error al eliminar la transacción. Por favor, intenta de nuevo más tarde.');
        }
      },
      confirmText: 'Eliminar',
      confirmVariant: 'danger'
    });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  return (
    <FinancesContainer>
      <FinancesHeader>
        <h1>Finanzas</h1>
        <p>Controla tus ingresos y gastos</p>
      </FinancesHeader>

      {/* Mensaje de error con animación */}
      {error && (
        <AnimatedTransition
          items={[error]}
          keyExtractor={() => 'error'}
          renderItem={(errorMessage) => (
            <div style={{
              padding: '16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--danger-color)',
              borderRadius: 'var(--border-radius)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 6px rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <div style={{
                backgroundColor: 'var(--danger-color)',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                !
              </div>
              {errorMessage}
              <AnimatedButton
                variant="outline"
                style={{
                  marginLeft: 'auto',
                  padding: '4px 8px',
                  minWidth: 'auto',
                  color: 'var(--danger-color)',
                  borderColor: 'var(--danger-color)'
                }}
                onClick={() => setError(null)}
              >
                Cerrar
              </AnimatedButton>
            </div>
          )}
        />
      )}

      {/* Indicador de carga con animación */}
      {loading ? (
        <AnimatedTransition
          items={[loading]}
          keyExtractor={() => 'loading'}
          renderItem={() => (
            <LoadingSpinner text="Cargando transacciones..." />
          )}
        />
      ) : (
        <>
          {/* Resumen financiero */}
          <FinancialSummary
            transactions={transactions}
            exchangeRate={1.1} // Tasa de cambio ARS a USD
          />

          {/* Sección de transacciones */}
          <TransactionsSection>
            <TransactionsHeaderActions>
              <SectionTitle>Transacciones</SectionTitle>
              <ButtonGroup>
                <ExportMenu
                  data={filteredTransactions}
                  filename="transacciones"
                />
                <AnimatedButton
                  variant={showForm ? "outline" : "primary"}
                  onClick={() => {
                    setEditingTransaction(null);
                    setShowForm(!showForm);
                  }}
                >
                  <FiPlus />
                  {showForm ? 'Cancelar' : 'Nueva Transacción'}
                </AnimatedButton>
              </ButtonGroup>
            </TransactionsHeaderActions>

            {/* Formulario para agregar/editar transacciones */}
            {showForm && (
              <TransactionForm
                transaction={editingTransaction}
                onSubmit={handleAddTransaction}
                onCancel={handleCancelForm}
              />
            )}

            {/* Filtros */}
            <TransactionFilters filters={filters} onFilterChange={setFilters} />

            {/* Lista de transacciones con carga progresiva */}
            <TransactionList
              transactions={filteredTransactions}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              filters={{
                type: filters.type !== 'all' ? filters.type : undefined,
                category: filters.category !== 'all' ? filters.category : undefined,
                startDate: filters.startDate || undefined,
                endDate: filters.endDate || undefined,
                search: filters.search || undefined
              }}
              sortConfig={{
                column: filters.sort ? filters.sort.split('_')[0] : 'date',
                direction: filters.sort ? filters.sort.split('_')[1] : 'desc'
              }}
              useProgressiveLoading={true}
            />
          </TransactionsSection>
        </>
      )}

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        confirmText={confirmDialog.confirmText}
        confirmVariant={confirmDialog.confirmVariant}
      >
        {confirmDialog.message}
      </ConfirmDialog>
    </FinancesContainer>
  );
};

export default Finances;
