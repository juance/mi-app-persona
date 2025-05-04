import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { FiRefreshCw } from 'react-icons/fi';
import TransactionItem from './TransactionItem';
import ProgressiveList from '../common/ProgressiveList';
import { getTransactionsPaginated } from '../../services/transactionService';
import useMemoizedList from '../../hooks/useMemoizedList';
import AnimatedButton from '../common/AnimatedButton';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`;

const FilterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: var(--text-medium);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const FilterCount = styled.span`
  font-weight: 500;
`;

// Componente de elemento de transacción memorizado
const MemoizedTransactionItem = memo(TransactionItem);

/**
 * Componente de lista de transacciones con carga progresiva
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.transactions - Lista de transacciones (opcional, para compatibilidad)
 * @param {Function} props.onEditTransaction - Función para editar transacción
 * @param {Function} props.onDeleteTransaction - Función para eliminar transacción
 * @param {Object} props.filters - Filtros a aplicar
 * @param {Object} props.sortConfig - Configuración de ordenamiento
 * @param {boolean} props.useProgressiveLoading - Usar carga progresiva (por defecto: true)
 * @returns {JSX.Element} - Componente de lista de transacciones
 */
const TransactionList = ({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
  filters = {},
  sortConfig = { column: 'date', direction: 'desc' },
  useProgressiveLoading = true
}) => {
  // Función para obtener transacciones paginadas
  const fetchTransactions = useCallback(async ({ start, end }) => {
    try {
      // Si se proporcionan transacciones directamente, usarlas (para compatibilidad)
      if (transactions) {
        return {
          data: transactions.slice(start, end),
          count: transactions.length,
          hasMore: transactions.length > end
        };
      }

      // Si no, obtener de la API con paginación
      return await getTransactionsPaginated({
        start,
        end,
        filters,
        sort: {
          column: sortConfig.column || 'date',
          direction: sortConfig.direction || 'desc'
        }
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { data: [], count: 0, hasMore: false };
    }
  }, [transactions, filters, sortConfig]);

  // Función para renderizar cada transacción
  const renderTransaction = useCallback((transaction) => (
    <MemoizedTransactionItem
      key={transaction.id}
      transaction={transaction}
      onEdit={onEditTransaction}
      onDelete={onDeleteTransaction}
    />
  ), [onEditTransaction, onDeleteTransaction]);

  // Función para extraer la clave de cada transacción
  const getTransactionKey = useCallback((transaction) => transaction.id, []);

  // Usar hook de memoización de listas para optimizar rendimiento
  const memoizedItems = useMemoizedList(
    transactions || [],
    getTransactionKey,
    renderTransaction,
    [onEditTransaction, onDeleteTransaction]
  );

  // Si no se usa carga progresiva, renderizar la lista tradicional
  if (!useProgressiveLoading && transactions) {
    if (!transactions || transactions.length === 0) {
      return (
        <ListContainer>
          <EmptyMessage>
            No hay transacciones. ¡Registra una nueva!
          </EmptyMessage>
        </ListContainer>
      );
    }

    return (
      <ListContainer>
        {memoizedItems}
      </ListContainer>
    );
  }

  // Renderizar con carga progresiva
  return (
    <ListContainer>
      <ProgressiveList
        fetchFunction={fetchTransactions}
        renderItem={renderTransaction}
        keyExtractor={getTransactionKey}
        initialPageSize={10}
        incrementSize={10}
        useInfiniteScroll={true}
        emptyMessage="No hay transacciones. ¡Registra una nueva!"
        loadingMessage="Cargando transacciones..."
        errorMessage="Error al cargar las transacciones"
        loadMoreText="Cargar más transacciones"
        dependencies={[filters, sortConfig]}
      />
    </ListContainer>
  );
};

// Exportar componente memorizado para evitar re-renderizados innecesarios
export default memo(TransactionList);
