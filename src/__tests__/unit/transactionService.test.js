import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../../services/transactionService';
import { supabase } from '../../services/supabase';

// Mock de Supabase
jest.mock('../../services/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            user_metadata: {
              name: 'Test User',
              first_name: 'Test',
              last_name: 'User'
            }
          }
        }
      })
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      upsert: jest.fn().mockReturnThis()
    })
  }
}));

describe('Transaction Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTransactions', () => {
    it('should fetch transactions successfully', async () => {
      // Configurar el mock para devolver datos
      const mockData = [
        {
          id: 1,
          title: 'Test Transaction',
          amount: 100,
          type: 'expense',
          category: 'food',
          platform: 'cash:Efectivo',
          date: '2023-01-01',
          user_id: 'test-user-id'
        }
      ];

      supabase.from().select().order().eq().then = jest.fn().mockResolvedValue({
        data: mockData,
        error: null
      });

      // Llamar a la función
      const result = await getTransactions();

      // Verificar que se haya llamado a Supabase correctamente
      expect(supabase.from).toHaveBeenCalledWith('transactions');
      expect(supabase.from().select).toHaveBeenCalledWith('*');
      expect(supabase.from().select().eq).toHaveBeenCalledWith('user_id', 'test-user-id');
      expect(supabase.from().select().eq().order).toHaveBeenCalledWith('date', { ascending: false });

      // Verificar que se devuelvan los datos correctos
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching transactions', async () => {
      // Configurar el mock para devolver un error
      supabase.from().select().order().eq().then = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Error fetching transactions' }
      });

      // Llamar a la función
      const result = await getTransactions();

      // Verificar que se devuelva un array vacío en caso de error
      expect(result).toEqual([]);
    });
  });

  describe('getTransactionById', () => {
    it('should fetch a transaction by ID successfully', async () => {
      // Configurar el mock para devolver datos
      const mockData = {
        id: 1,
        title: 'Test Transaction',
        amount: 100,
        type: 'expense',
        category: 'food',
        platform: 'cash:Efectivo',
        date: '2023-01-01',
        user_id: 'test-user-id'
      };

      supabase.from().select().eq().eq().single = jest.fn().mockResolvedValue({
        data: mockData,
        error: null
      });

      // Llamar a la función
      const result = await getTransactionById(1);

      // Verificar que se haya llamado a Supabase correctamente
      expect(supabase.from).toHaveBeenCalledWith('transactions');
      expect(supabase.from().select).toHaveBeenCalledWith('*');
      expect(supabase.from().select().eq).toHaveBeenCalledWith('id', 1);
      expect(supabase.from().select().eq().eq).toHaveBeenCalledWith('user_id', 'test-user-id');

      // Verificar que se devuelvan los datos correctos
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching a transaction by ID', async () => {
      // Configurar el mock para devolver un error
      supabase.from().select().eq().eq().single = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Error fetching transaction' }
      });

      // Llamar a la función
      const result = await getTransactionById(1);

      // Verificar que se devuelva null en caso de error
      expect(result).toBeNull();
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction successfully', async () => {
      // Configurar el mock para devolver datos
      const mockData = {
        id: 1,
        title: 'Test Transaction',
        amount: 100,
        type: 'expense',
        category: 'food',
        platform: 'cash:Efectivo',
        date: '2023-01-01',
        user_id: 'test-user-id'
      };

      supabase.from().insert().select = jest.fn().mockResolvedValue({
        data: [mockData],
        error: null
      });

      // Llamar a la función
      const result = await createTransaction({
        title: 'Test Transaction',
        amount: 100,
        type: 'expense',
        category: 'food',
        platformType: 'cash',
        platform: 'Efectivo',
        date: '2023-01-01'
      });

      // Verificar que se haya llamado a Supabase correctamente
      expect(supabase.from).toHaveBeenCalledWith('transactions');
      expect(supabase.from().insert).toHaveBeenCalled();
      expect(supabase.from().insert().select).toHaveBeenCalled();

      // Verificar que se devuelvan los datos correctos
      expect(result).toEqual(mockData);
    });

    it('should handle errors when creating a transaction', async () => {
      // Configurar el mock para devolver un error
      supabase.from().insert().select = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Error creating transaction' }
      });

      // Llamar a la función y verificar que lance un error
      await expect(createTransaction({
        title: 'Test Transaction',
        amount: 100,
        type: 'expense',
        category: 'food',
        platformType: 'cash',
        platform: 'Efectivo',
        date: '2023-01-01'
      })).rejects.toThrow('Error creating transaction: Error creating transaction');
    });
  });

  // Puedes agregar más pruebas para updateTransaction y deleteTransaction
});
