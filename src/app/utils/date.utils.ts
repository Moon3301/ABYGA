/**
 * Date utility functions for consistent date handling across the application
 * Provides centralized date formatting and manipulation functions
 */
export class DateUtils {
  
  /**
   * Format date to Spanish locale string
   * @param date Date to format
   * @returns Formatted date string
   */
  static formatToSpanishLocale(date: Date): string {
    return date.toLocaleDateString('es', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  /**
   * Format date to ISO date string (YYYY-MM-DD)
   * @param date Date to format
   * @returns ISO date string
   */
  static formatToISODate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  /**
   * Format date to display format (DD/MM/YYYY)
   * @param date Date to format
   * @returns Display formatted date string
   */
  static formatToDisplay(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Get the start of day for a given date
   * @param date Input date
   * @returns Date at start of day (00:00:00)
   */
  static getStartOfDay(date: Date): Date {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

  /**
   * Get the end of day for a given date
   * @param date Input date
   * @returns Date at end of day (23:59:59.999)
   */
  static getEndOfDay(date: Date): Date {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }

  /**
   * Get the start of week for a given date (Monday)
   * @param date Input date
   * @returns Date at start of week
   */
  static getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    startOfWeek.setDate(diff);
    return this.getStartOfDay(startOfWeek);
  }

  /**
   * Get the end of week for a given date (Sunday)
   * @param date Input date
   * @returns Date at end of week
   */
  static getEndOfWeek(date: Date): Date {
    const endOfWeek = this.getStartOfWeek(date);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return this.getEndOfDay(endOfWeek);
  }

  /**
   * Get the start of month for a given date
   * @param date Input date
   * @returns Date at start of month
   */
  static getStartOfMonth(date: Date): Date {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return this.getStartOfDay(startOfMonth);
  }

  /**
   * Get the end of month for a given date
   * @param date Input date
   * @returns Date at end of month
   */
  static getEndOfMonth(date: Date): Date {
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return this.getEndOfDay(endOfMonth);
  }

  /**
   * Get the start of year for a given date
   * @param date Input date
   * @returns Date at start of year
   */
  static getStartOfYear(date: Date): Date {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    return this.getStartOfDay(startOfYear);
  }

  /**
   * Get the end of year for a given date
   * @param date Input date
   * @returns Date at end of year
   */
  static getEndOfYear(date: Date): Date {
    const endOfYear = new Date(date.getFullYear(), 11, 31);
    return this.getEndOfDay(endOfYear);
  }

  /**
   * Get week number for a given date
   * @param date Input date
   * @returns Week number
   */
  static getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  /**
   * Check if two dates are on the same day
   * @param date1 First date
   * @param date2 Second date
   * @returns True if dates are on the same day
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  /**
   * Check if two dates are in the same week
   * @param date1 First date
   * @param date2 Second date
   * @returns True if dates are in the same week
   */
  static isSameWeek(date1: Date, date2: Date): boolean {
    const startOfWeek1 = this.getStartOfWeek(date1);
    const startOfWeek2 = this.getStartOfWeek(date2);
    return this.isSameDay(startOfWeek1, startOfWeek2);
  }

  /**
   * Check if two dates are in the same month
   * @param date1 First date
   * @param date2 Second date
   * @returns True if dates are in the same month
   */
  static isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth();
  }

  /**
   * Check if two dates are in the same year
   * @param date1 First date
   * @param date2 Second date
   * @returns True if dates are in the same year
   */
  static isSameYear(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }

  /**
   * Add days to a date
   * @param date Input date
   * @param days Number of days to add
   * @returns New date with days added
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Add months to a date
   * @param date Input date
   * @param months Number of months to add
   * @returns New date with months added
   */
  static addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Add years to a date
   * @param date Input date
   * @param years Number of years to add
   * @returns New date with years added
   */
  static addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  /**
   * Get difference in days between two dates
   * @param date1 First date
   * @param date2 Second date
   * @returns Number of days difference
   */
  static getDaysDifference(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  /**
   * Check if a date is today
   * @param date Date to check
   * @returns True if date is today
   */
  static isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  /**
   * Check if a date is in the past
   * @param date Date to check
   * @returns True if date is in the past
   */
  static isPast(date: Date): boolean {
    return date < new Date();
  }

  /**
   * Check if a date is in the future
   * @param date Date to check
   * @returns True if date is in the future
   */
  static isFuture(date: Date): boolean {
    return date > new Date();
  }

  /**
   * Parse date from Spanish format string
   * @param dateString Date string in Spanish format
   * @returns Parsed date or null if invalid
   */
  static parseSpanishDate(dateString: string): Date | null {
    try {
      // This is a simplified parser - in production, use a proper date parsing library
      const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];

      const parts = dateString.split(', ');
      if (parts.length !== 2) return null;

      const dateParts = parts[1].split(' de ');
      if (dateParts.length !== 3) return null;

      const day = parseInt(dateParts[0], 10);
      const monthIndex = months.indexOf(dateParts[1]);
      const year = parseInt(dateParts[2], 10);

      if (isNaN(day) || monthIndex === -1 || isNaN(year)) return null;

      return new Date(year, monthIndex, day);
    } catch (error) {
      console.error('Error parsing Spanish date:', error);
      return null;
    }
  }
}