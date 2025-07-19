/**
 * Base model interface that all domain models should extend
 * Provides common properties for all entities
 */
export interface BaseModel {
  /** Unique identifier for the entity */
  id: number;
  /** Timestamp when the entity was created */
  createdAt: Date;
  /** Timestamp when the entity was last updated */
  updatedAt: Date;
}

/**
 * Generic result wrapper for operations that can succeed or fail
 * @template T The type of data returned on success
 */
export interface Result<T> {
  /** Whether the operation was successful */
  success: boolean;
  /** The data returned on success */
  data?: T;
  /** Error message if the operation failed */
  error?: string;
  /** Additional error details for debugging */
  details?: any;
}

/**
 * Factory function to create a successful result
 * @template T The type of data
 * @param data The data to wrap
 * @returns A successful result containing the data
 */
export function createSuccessResult<T>(data: T): Result<T> {
  return {
    success: true,
    data
  };
}

/**
 * Factory function to create a failed result
 * @template T The type of data
 * @param error The error message
 * @param details Optional error details
 * @returns A failed result with error information
 */
export function createErrorResult<T>(error: string, details?: any): Result<T> {
  return {
    success: false,
    error,
    details
  };
}