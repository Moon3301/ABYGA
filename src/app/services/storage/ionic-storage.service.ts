import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IStorageService } from '../interfaces/repository.interface';

/**
 * Ionic Storage implementation of IStorageService
 * Provides persistent storage using Ionic Storage
 */
@Injectable({
  providedIn: 'root'
})
export class IonicStorageService implements IStorageService {
  /** Flag to track if storage is initialized */
  private isInitialized = false;

  constructor(private storage: Storage) {
    this.initializeStorage();
  }

  /**
   * Initialize the storage engine
   * @private
   */
  private async initializeStorage(): Promise<void> {
    try {
      await this.storage.create();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      throw new Error('Storage initialization failed');
    }
  }

  /**
   * Ensure storage is initialized before operations
   * @private
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.initializeStorage();
    }
  }

  /**
   * Store data with a key
   * @param key The storage key
   * @param data The data to store
   */
  async set<T>(key: string, data: T): Promise<void> {
    await this.ensureInitialized();
    
    try {
      await this.storage.set(key, data);
    } catch (error) {
      console.error(`Failed to store data with key ${key}:`, error);
      throw new Error(`Storage set operation failed for key: ${key}`);
    }
  }

  /**
   * Retrieve data by key
   * @param key The storage key
   * @returns The stored data or null if not found
   */
  async get<T>(key: string): Promise<T | null> {
    await this.ensureInitialized();
    
    try {
      const data = await this.storage.get(key);
      return data ?? null;
    } catch (error) {
      console.error(`Failed to retrieve data with key ${key}:`, error);
      throw new Error(`Storage get operation failed for key: ${key}`);
    }
  }

  /**
   * Remove data by key
   * @param key The storage key
   */
  async remove(key: string): Promise<void> {
    await this.ensureInitialized();
    
    try {
      await this.storage.remove(key);
    } catch (error) {
      console.error(`Failed to remove data with key ${key}:`, error);
      throw new Error(`Storage remove operation failed for key: ${key}`);
    }
  }

  /**
   * Clear all stored data
   */
  async clear(): Promise<void> {
    await this.ensureInitialized();
    
    try {
      await this.storage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
      throw new Error('Storage clear operation failed');
    }
  }

  /**
   * Get all storage keys
   * @returns Array of all storage keys
   */
  async keys(): Promise<string[]> {
    await this.ensureInitialized();
    
    try {
      return await this.storage.keys();
    } catch (error) {
      console.error('Failed to get storage keys:', error);
      throw new Error('Storage keys operation failed');
    }
  }
}