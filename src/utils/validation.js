/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} - true si el email es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validatePassword = (password) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!password || password.length < 6) {
    result.isValid = false;
    result.errors.push('La contraseña debe tener al menos 6 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    result.isValid = false;
    result.errors.push('La contraseña debe contener al menos una letra mayúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    result.isValid = false;
    result.errors.push('La contraseña debe contener al menos un número');
  }
  
  return result;
};

/**
 * Valida una transacción
 * @param {Object} transaction - Transacción a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateTransaction = (transaction) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!transaction.title || transaction.title.trim() === '') {
    result.isValid = false;
    result.errors.push('El título es obligatorio');
  }
  
  if (!transaction.amount || isNaN(transaction.amount) || transaction.amount <= 0) {
    result.isValid = false;
    result.errors.push('El monto debe ser un número mayor que cero');
  }
  
  if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
    result.isValid = false;
    result.errors.push('El tipo debe ser ingreso o gasto');
  }
  
  if (!transaction.date) {
    result.isValid = false;
    result.errors.push('La fecha es obligatoria');
  }
  
  return result;
};

/**
 * Valida una tarea
 * @param {Object} task - Tarea a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateTask = (task) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!task.title || task.title.trim() === '') {
    result.isValid = false;
    result.errors.push('El título es obligatorio');
  }
  
  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    result.isValid = false;
    result.errors.push('La prioridad debe ser baja, media o alta');
  }
  
  return result;
};

/**
 * Valida una inversión
 * @param {Object} investment - Inversión a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateInvestment = (investment) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!investment.name || investment.name.trim() === '') {
    result.isValid = false;
    result.errors.push('El nombre es obligatorio');
  }
  
  if (!investment.symbol || investment.symbol.trim() === '') {
    result.isValid = false;
    result.errors.push('El símbolo es obligatorio');
  }
  
  if (!investment.type || investment.type.trim() === '') {
    result.isValid = false;
    result.errors.push('El tipo es obligatorio');
  }
  
  if (!investment.quantity || isNaN(investment.quantity) || investment.quantity <= 0) {
    result.isValid = false;
    result.errors.push('La cantidad debe ser un número mayor que cero');
  }
  
  if (!investment.purchase_price || isNaN(investment.purchase_price) || investment.purchase_price <= 0) {
    result.isValid = false;
    result.errors.push('El precio de compra debe ser un número mayor que cero');
  }
  
  if (!investment.current_price || isNaN(investment.current_price) || investment.current_price <= 0) {
    result.isValid = false;
    result.errors.push('El precio actual debe ser un número mayor que cero');
  }
  
  if (!investment.purchase_date) {
    result.isValid = false;
    result.errors.push('La fecha de compra es obligatoria');
  }
  
  return result;
};

/**
 * Valida una meta financiera
 * @param {Object} goal - Meta financiera a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateFinancialGoal = (goal) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!goal.name || goal.name.trim() === '') {
    result.isValid = false;
    result.errors.push('El nombre es obligatorio');
  }
  
  if (!goal.target_amount || isNaN(goal.target_amount) || goal.target_amount <= 0) {
    result.isValid = false;
    result.errors.push('El monto objetivo debe ser un número mayor que cero');
  }
  
  if (goal.current_amount && (isNaN(goal.current_amount) || goal.current_amount < 0)) {
    result.isValid = false;
    result.errors.push('El monto actual debe ser un número mayor o igual a cero');
  }
  
  return result;
};

/**
 * Valida un evento
 * @param {Object} event - Evento a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateEvent = (event) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!event.title || event.title.trim() === '') {
    result.isValid = false;
    result.errors.push('El título es obligatorio');
  }
  
  if (!event.date) {
    result.isValid = false;
    result.errors.push('La fecha es obligatoria');
  }
  
  return result;
};

/**
 * Valida una categoría
 * @param {Object} category - Categoría a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validateCategory = (category) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!category.name || category.name.trim() === '') {
    result.isValid = false;
    result.errors.push('El nombre es obligatorio');
  }
  
  if (!category.type || !['income', 'expense', 'task', 'investment', 'event'].includes(category.type)) {
    result.isValid = false;
    result.errors.push('El tipo debe ser válido');
  }
  
  return result;
};

/**
 * Valida una plataforma
 * @param {Object} platform - Plataforma a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export const validatePlatform = (platform) => {
  const result = {
    isValid: true,
    errors: []
  };
  
  if (!platform.name || platform.name.trim() === '') {
    result.isValid = false;
    result.errors.push('El nombre es obligatorio');
  }
  
  if (!platform.type || !['cash', 'virtual'].includes(platform.type)) {
    result.isValid = false;
    result.errors.push('El tipo debe ser efectivo o virtual');
  }
  
  return result;
};
