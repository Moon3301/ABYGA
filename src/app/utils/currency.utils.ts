/**
 * Currency utility functions for consistent currency handling
 * Provides formatting and calculation functions for monetary values
 */
export class CurrencyUtils {
  
  /** Default currency symbol */
  private static readonly DEFAULT_CURRENCY = 'USD';
  
  /** Default locale for formatting */
  private static readonly DEFAULT_LOCALE = 'en-US';

  /**
   * Format amount as currency string
   * @param amount Amount to format
   * @param currency Currency code (default: USD)
   * @param locale Locale for formatting (default: en-US)
   * @returns Formatted currency string
   */
  static formatCurrency(
    amount: number, 
    currency: string = this.DEFAULT_CURRENCY, 
    locale: string = this.DEFAULT_LOCALE
  ): string {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `${currency} ${amount.toFixed(2)}`;
    }
  }

  /**
   * Format amount as currency string with Chilean peso
   * @param amount Amount to format
   * @returns Formatted currency string in CLP
   */
  static formatCLP(amount: number): string {
    return this.formatCurrency(amount, 'CLP', 'es-CL');
  }

  /**
   * Parse currency string to number
   * @param currencyString Currency string to parse
   * @returns Parsed number or 0 if invalid
   */
  static parseCurrency(currencyString: string): number {
    try {
      // Remove currency symbols and non-numeric characters except decimal point
      const cleanString = currencyString.replace(/[^\d.-]/g, '');
      const parsed = parseFloat(cleanString);
      return isNaN(parsed) ? 0 : parsed;
    } catch (error) {
      console.error('Error parsing currency:', error);
      return 0;
    }
  }

  /**
   * Calculate percentage of an amount
   * @param amount Base amount
   * @param percentage Percentage to calculate
   * @returns Calculated percentage amount
   */
  static calculatePercentage(amount: number, percentage: number): number {
    return (amount * percentage) / 100;
  }

  /**
   * Calculate tax amount (IVA)
   * @param amount Base amount
   * @param taxRate Tax rate (default: 19% for Chile)
   * @returns Tax amount
   */
  static calculateTax(amount: number, taxRate: number = 19): number {
    return this.calculatePercentage(amount, taxRate);
  }

  /**
   * Calculate net amount (amount without tax)
   * @param grossAmount Gross amount including tax
   * @param taxRate Tax rate (default: 19% for Chile)
   * @returns Net amount
   */
  static calculateNetAmount(grossAmount: number, taxRate: number = 19): number {
    return grossAmount / (1 + (taxRate / 100));
  }

  /**
   * Calculate gross amount (amount with tax)
   * @param netAmount Net amount without tax
   * @param taxRate Tax rate (default: 19% for Chile)
   * @returns Gross amount
   */
  static calculateGrossAmount(netAmount: number, taxRate: number = 19): number {
    return netAmount * (1 + (taxRate / 100));
  }

  /**
   * Calculate profit margin percentage
   * @param sellingPrice Selling price
   * @param costPrice Cost price
   * @returns Profit margin percentage
   */
  static calculateProfitMargin(sellingPrice: number, costPrice: number): number {
    if (costPrice === 0) return 0;
    return ((sellingPrice - costPrice) / costPrice) * 100;
  }

  /**
   * Calculate profit amount
   * @param sellingPrice Selling price
   * @param costPrice Cost price
   * @returns Profit amount
   */
  static calculateProfit(sellingPrice: number, costPrice: number): number {
    return sellingPrice - costPrice;
  }

  /**
   * Calculate markup percentage
   * @param sellingPrice Selling price
   * @param costPrice Cost price
   * @returns Markup percentage
   */
  static calculateMarkup(sellingPrice: number, costPrice: number): number {
    if (sellingPrice === 0) return 0;
    return ((sellingPrice - costPrice) / sellingPrice) * 100;
  }

  /**
   * Round amount to specified decimal places
   * @param amount Amount to round
   * @param decimals Number of decimal places (default: 2)
   * @returns Rounded amount
   */
  static roundAmount(amount: number, decimals: number = 2): number {
    return Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  /**
   * Check if amount is valid (positive number)
   * @param amount Amount to validate
   * @returns True if amount is valid
   */
  static isValidAmount(amount: number): boolean {
    return !isNaN(amount) && isFinite(amount) && amount >= 0;
  }

  /**
   * Convert amount to cents (for precise calculations)
   * @param amount Amount in currency units
   * @returns Amount in cents
   */
  static toCents(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Convert cents to currency amount
   * @param cents Amount in cents
   * @returns Amount in currency units
   */
  static fromCents(cents: number): number {
    return cents / 100;
  }

  /**
   * Add two currency amounts with precision
   * @param amount1 First amount
   * @param amount2 Second amount
   * @returns Sum with proper precision
   */
  static addAmounts(amount1: number, amount2: number): number {
    const cents1 = this.toCents(amount1);
    const cents2 = this.toCents(amount2);
    return this.fromCents(cents1 + cents2);
  }

  /**
   * Subtract two currency amounts with precision
   * @param amount1 First amount
   * @param amount2 Second amount
   * @returns Difference with proper precision
   */
  static subtractAmounts(amount1: number, amount2: number): number {
    const cents1 = this.toCents(amount1);
    const cents2 = this.toCents(amount2);
    return this.fromCents(cents1 - cents2);
  }

  /**
   * Multiply currency amount with precision
   * @param amount Amount to multiply
   * @param multiplier Multiplier
   * @returns Product with proper precision
   */
  static multiplyAmount(amount: number, multiplier: number): number {
    const cents = this.toCents(amount);
    return this.fromCents(Math.round(cents * multiplier));
  }

  /**
   * Divide currency amount with precision
   * @param amount Amount to divide
   * @param divisor Divisor
   * @returns Quotient with proper precision
   */
  static divideAmount(amount: number, divisor: number): number {
    if (divisor === 0) return 0;
    const cents = this.toCents(amount);
    return this.fromCents(Math.round(cents / divisor));
  }

  /**
   * Format number with thousands separator
   * @param amount Amount to format
   * @param locale Locale for formatting
   * @returns Formatted number string
   */
  static formatNumber(amount: number, locale: string = this.DEFAULT_LOCALE): string {
    try {
      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      console.error('Error formatting number:', error);
      return amount.toFixed(2);
    }
  }
}