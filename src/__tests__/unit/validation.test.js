import {
  isValidEmail,
  validatePassword,
  validateTransaction,
  validateTask,
  validateInvestment,
  validateFinancialGoal,
  validateEvent,
  validateCategory,
  validatePlatform
} from '../../utils/validation';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('test')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate a strong password', () => {
      const result = validatePassword('Password123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject a password that is too short', () => {
      const result = validatePassword('Pass1');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('La contraseña debe tener al menos 6 caracteres');
    });

    it('should reject a password without uppercase letters', () => {
      const result = validatePassword('password123');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('La contraseña debe contener al menos una letra mayúscula');
    });

    it('should reject a password without numbers', () => {
      const result = validatePassword('Password');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('La contraseña debe contener al menos un número');
    });
  });

  describe('validateTransaction', () => {
    it('should validate a valid transaction', () => {
      const transaction = {
        title: 'Groceries',
        amount: 100,
        type: 'expense',
        date: '2023-01-01'
      };
      const result = validateTransaction(transaction);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject a transaction without title', () => {
      const transaction = {
        amount: 100,
        type: 'expense',
        date: '2023-01-01'
      };
      const result = validateTransaction(transaction);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El título es obligatorio');
    });

    it('should reject a transaction with invalid amount', () => {
      const transaction = {
        title: 'Groceries',
        amount: -100,
        type: 'expense',
        date: '2023-01-01'
      };
      const result = validateTransaction(transaction);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El monto debe ser un número mayor que cero');
    });

    it('should reject a transaction with invalid type', () => {
      const transaction = {
        title: 'Groceries',
        amount: 100,
        type: 'invalid',
        date: '2023-01-01'
      };
      const result = validateTransaction(transaction);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El tipo debe ser ingreso o gasto');
    });

    it('should reject a transaction without date', () => {
      const transaction = {
        title: 'Groceries',
        amount: 100,
        type: 'expense'
      };
      const result = validateTransaction(transaction);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('La fecha es obligatoria');
    });
  });

  // Puedes agregar más pruebas para las otras funciones de validación
});
