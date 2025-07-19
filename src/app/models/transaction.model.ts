import { BaseModel } from './base.model';

/**
 * Transaction type enumeration
 */
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

/**
 * Transaction movement type enumeration
 */
export enum TransactionMovementType {
  FIXED_INCOME = 'fixed_income',
  VARIABLE_INCOME = 'variable_income',
  FIXED_EXPENSE = 'fixed_expense',
  VARIABLE_EXPENSE = 'variable_expense'
}

/**
 * Payment method enumeration
 */
export enum PaymentMethod {
  CASH = 'cash',
  DEBIT_CARD = 'debit_card',
  CREDIT_CARD = 'credit_card',
  CHECK = 'check',
  BANK_TRANSFER = 'bank_transfer',
  OTHER = 'other'
}

/**
 * Transaction category enumeration for expenses
 */
export enum ExpenseCategory {
  TRANSPORT = 'transport',
  HOME = 'home',
  ENTERTAINMENT = 'entertainment',
  FOOD = 'food',
  UTILITIES = 'utilities',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  OTHER = 'other'
}

/**
 * Transaction category enumeration for income
 */
export enum IncomeCategory {
  SALARY = 'salary',
  SALES = 'sales',
  INVESTMENT = 'investment',
  BONUS = 'bonus',
  OTHER = 'other'
}

/**
 * Transaction domain model representing a financial transaction
 */
export interface Transaction extends BaseModel {
  /** Transaction name/description */
  name: string;
  /** Transaction amount */
  amount: number;
  /** Transaction type (income/expense) */
  type: TransactionType;
  /** Movement type (fixed/variable) */
  movementType: TransactionMovementType;
  /** Payment method used */
  paymentMethod: PaymentMethod;
  /** Transaction date */
  transactionDate: Date;
  /** Additional notes */
  notes?: string;
  /** Whether this transaction has reminders enabled */
  hasReminder: boolean;
  /** Category for expenses */
  expenseCategory?: ExpenseCategory;
  /** Category for income */
  incomeCategory?: IncomeCategory;
  /** User ID who created the transaction */
  userId: number;
  /** Business ID this transaction belongs to */
  businessId: number;
  /** Associated products (for sales transactions) */
  products?: TransactionProduct[];
  /** Whether this is a recurring transaction */
  isRecurring: boolean;
  /** Recurrence frequency if applicable */
  recurrenceFrequency?: RecurrenceFrequency;
}

/**
 * Recurrence frequency enumeration
 */
export enum RecurrenceFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

/**
 * Product information within a transaction
 */
export interface TransactionProduct {
  /** Product ID */
  productId: number;
  /** Product name at time of transaction */
  productName: string;
  /** Quantity sold/purchased */
  quantity: number;
  /** Unit price at time of transaction */
  unitPrice: number;
  /** Total amount for this product */
  totalAmount: number;
  /** Profit/loss for this product */
  profit?: number;
  /** Product image */
  image?: string;
}

/**
 * Data Transfer Object for transaction creation
 */
export interface CreateTransactionDto {
  /** Transaction name */
  name: string;
  /** Transaction amount */
  amount: number;
  /** Transaction type */
  type: TransactionType;
  /** Movement type */
  movementType: TransactionMovementType;
  /** Payment method */
  paymentMethod: PaymentMethod;
  /** Transaction date */
  transactionDate: Date;
  /** Additional notes */
  notes?: string;
  /** Enable reminders */
  hasReminder?: boolean;
  /** Expense category */
  expenseCategory?: ExpenseCategory;
  /** Income category */
  incomeCategory?: IncomeCategory;
  /** Associated products */
  products?: CreateTransactionProductDto[];
  /** Recurrence settings */
  isRecurring?: boolean;
  /** Recurrence frequency */
  recurrenceFrequency?: RecurrenceFrequency;
}

/**
 * Data Transfer Object for creating transaction products
 */
export interface CreateTransactionProductDto {
  /** Product ID */
  productId: number;
  /** Quantity */
  quantity: number;
  /** Unit price */
  unitPrice: number;
}

/**
 * Transaction summary for reporting
 */
export interface TransactionSummary {
  /** Total income */
  totalIncome: number;
  /** Total expenses */
  totalExpenses: number;
  /** Net amount (income - expenses) */
  netAmount: number;
  /** Number of transactions */
  transactionCount: number;
  /** Period start date */
  periodStart: Date;
  /** Period end date */
  periodEnd: Date;
}