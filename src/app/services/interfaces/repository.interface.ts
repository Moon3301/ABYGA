import { Observable } from 'rxjs';
import { Result } from '../../models/base.model';

/**
 * Generic repository interface following Repository pattern
 * Provides standard CRUD operations for any entity type
 * @template T The entity type
 * @template CreateDto The DTO type for creating entities
 * @template UpdateDto The DTO type for updating entities
 */
export interface IRepository<T, CreateDto, UpdateDto> {
  /**
   * Find an entity by its ID
   * @param id The entity ID
   * @returns Observable with the result containing the entity or error
   */
  findById(id: number): Observable<Result<T>>;

  /**
   * Find all entities with optional filtering
   * @param filters Optional filters to apply
   * @returns Observable with the result containing array of entities
   */
  findAll(filters?: Record<string, any>): Observable<Result<T[]>>;

  /**
   * Create a new entity
   * @param createDto The data for creating the entity
   * @returns Observable with the result containing the created entity
   */
  create(createDto: CreateDto): Observable<Result<T>>;

  /**
   * Update an existing entity
   * @param id The entity ID to update
   * @param updateDto The data for updating the entity
   * @returns Observable with the result containing the updated entity
   */
  update(id: number, updateDto: UpdateDto): Observable<Result<T>>;

  /**
   * Delete an entity by ID
   * @param id The entity ID to delete
   * @returns Observable with the result of the deletion
   */
  delete(id: number): Observable<Result<boolean>>;

  /**
   * Check if an entity exists by ID
   * @param id The entity ID to check
   * @returns Observable with the result containing existence status
   */
  exists(id: number): Observable<Result<boolean>>;

  /**
   * Count entities with optional filtering
   * @param filters Optional filters to apply
   * @returns Observable with the result containing the count
   */
  count(filters?: Record<string, any>): Observable<Result<number>>;
}

/**
 * Storage interface for data persistence
 * Abstracts the underlying storage mechanism
 */
export interface IStorageService {
  /**
   * Store data with a key
   * @param key The storage key
   * @param data The data to store
   * @returns Promise that resolves when data is stored
   */
  set<T>(key: string, data: T): Promise<void>;

  /**
   * Retrieve data by key
   * @param key The storage key
   * @returns Promise that resolves with the stored data or null
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Remove data by key
   * @param key The storage key
   * @returns Promise that resolves when data is removed
   */
  remove(key: string): Promise<void>;

  /**
   * Clear all stored data
   * @returns Promise that resolves when all data is cleared
   */
  clear(): Promise<void>;

  /**
   * Get all storage keys
   * @returns Promise that resolves with array of all keys
   */
  keys(): Promise<string[]>;
}