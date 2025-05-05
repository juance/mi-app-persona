import { 
  getExchangeRates, 
  getFallbackRates, 
  convertCurrency, 
  formatCurrency, 
  getCurrencySymbol,
  getExchangeRate,
  getRatesHistory
} from '../../services/currencyService';

// Mock para axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      rates: {
        USD: 1,
        ARS: 900,
        EUR: 0.92,
        BRL: 5.5,
        CLP: 950,
        MXN: 17.5
      }
    }
  }))
}));

// Mock para localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Currency Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('getFallbackRates', () => {
    it('should return fallback rates', () => {
      const rates = getFallbackRates();
      expect(rates).toEqual({
        USD: 1,
        ARS: 900,
        EUR: 0.92,
        BRL: 5.5,
        CLP: 950,
        MXN: 17.5
      });
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      const formatted = formatCurrency(1000, 'USD');
      expect(formatted).toMatch(/\$\s?1,000.00/);
    });

    it('should use ARS as default currency', () => {
      const formatted = formatCurrency(1000);
      expect(formatted).toMatch(/\$\s?1,000.00/);
    });
  });

  describe('getCurrencySymbol', () => {
    it('should return the currency symbol for USD', () => {
      const symbol = getCurrencySymbol('USD');
      expect(symbol).toBe('$');
    });

    it('should return the currency symbol for ARS as default', () => {
      const symbol = getCurrencySymbol();
      expect(symbol).toBe('$');
    });
  });

  describe('getExchangeRates', () => {
    it('should fetch rates from API when no cached rates exist', async () => {
      const rates = await getExchangeRates();
      expect(rates).toEqual({
        USD: 1,
        ARS: 900,
        EUR: 0.92,
        BRL: 5.5,
        CLP: 950,
        MXN: 17.5
      });
    });

    it('should use cached rates when they exist and are not expired', async () => {
      // Set cached rates
      localStorage.setItem('exchange_rates', JSON.stringify({
        rates: {
          USD: 1,
          ARS: 800, // Different from API response
          EUR: 0.9
        },
        timestamp: Date.now() // Current time, so not expired
      }));

      const rates = await getExchangeRates();
      expect(rates).toEqual({
        USD: 1,
        ARS: 800,
        EUR: 0.9
      });
    });

    it('should fetch new rates when cached rates are expired', async () => {
      // Set expired cached rates (more than 1 hour old)
      const oneHourAndOneMinuteAgo = Date.now() - (61 * 60 * 1000);
      localStorage.setItem('exchange_rates', JSON.stringify({
        rates: {
          USD: 1,
          ARS: 800, // Different from API response
          EUR: 0.9
        },
        timestamp: oneHourAndOneMinuteAgo
      }));

      const rates = await getExchangeRates();
      expect(rates).toEqual({
        USD: 1,
        ARS: 900, // From API response
        EUR: 0.92,
        BRL: 5.5,
        CLP: 950,
        MXN: 17.5
      });
    });
  });

  describe('convertCurrency', () => {
    it('should return the same amount when currencies are the same', async () => {
      const result = await convertCurrency(100, 'USD', 'USD');
      expect(result).toBe(100);
    });

    it('should convert from USD to ARS correctly', async () => {
      const result = await convertCurrency(1, 'USD', 'ARS');
      expect(result).toBe(900);
    });

    it('should convert from ARS to USD correctly', async () => {
      const result = await convertCurrency(900, 'ARS', 'USD');
      expect(result).toBe(1);
    });

    it('should convert between non-USD currencies correctly', async () => {
      const result = await convertCurrency(100, 'EUR', 'ARS');
      // 100 EUR = 100/0.92 USD = 108.7 USD
      // 108.7 USD = 108.7 * 900 ARS = 97826.09 ARS
      expect(result).toBeCloseTo(97826.09, 1);
    });

    it('should use provided rates if supplied', async () => {
      const customRates = {
        USD: 1,
        ARS: 1000, // Different from default
        EUR: 0.9
      };
      
      const result = await convertCurrency(1, 'USD', 'ARS', customRates);
      expect(result).toBe(1000);
    });
  });

  describe('getExchangeRate', () => {
    it('should return 1 when currencies are the same', async () => {
      const rate = await getExchangeRate('USD', 'USD');
      expect(rate).toBe(1);
    });

    it('should return correct rate from USD to ARS', async () => {
      const rate = await getExchangeRate('USD', 'ARS');
      expect(rate).toBe(900);
    });

    it('should return correct rate from ARS to USD', async () => {
      const rate = await getExchangeRate('ARS', 'USD');
      expect(rate).toBeCloseTo(0.00111, 5); // 1/900
    });

    it('should return correct rate between non-USD currencies', async () => {
      const rate = await getExchangeRate('EUR', 'ARS');
      // 1 EUR = 1/0.92 USD = 1.087 USD
      // 1.087 USD = 1.087 * 900 ARS = 978.26 ARS
      expect(rate).toBeCloseTo(978.26, 1);
    });
  });

  describe('getRatesHistory', () => {
    it('should return an empty array when no history exists', () => {
      const history = getRatesHistory();
      expect(history).toEqual([]);
    });

    it('should return the history from localStorage', () => {
      const mockHistory = [
        {
          rates: {
            USD: 1,
            ARS: 900
          },
          timestamp: Date.now()
        },
        {
          rates: {
            USD: 1,
            ARS: 890
          },
          timestamp: Date.now() - 3600000
        }
      ];
      
      localStorage.setItem('exchange_rates_history', JSON.stringify(mockHistory));
      
      const history = getRatesHistory();
      expect(history).toEqual(mockHistory);
    });
  });
});
