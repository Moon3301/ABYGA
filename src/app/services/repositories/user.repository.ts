import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IRepository, IStorageService } from '../interfaces/repository.interface';
import { User, CreateUserDto, UpdateUserDto, UserStatus } from '../../models/user.model';
import { Result, createSuccessResult, createErrorResult } from '../../models/base.model';
import { IonicStorageService } from '../storage/ionic-storage.service';

/**
 * User repository implementation using local storage
 * Implements the Repository pattern for User entities
 */
@Injectable({
  providedIn: 'root'
})
export class UserRepository implements IRepository<User, CreateUserDto, UpdateUserDto> {
  /** Storage key for users data */
  private readonly STORAGE_KEY = 'users';

  constructor(private storageService: IStorageService) {}

  /**
   * Find a user by ID
   * @param id The user ID
   * @returns Observable with the result containing the user or error
   */
  findById(id: number): Observable<Result<User>> {
    return from(this.getAllUsers()).pipe(
      map(users => {
        const user = users.find(u => u.id === id);
        if (user) {
          return createSuccessResult(user);
        }
        return createErrorResult<User>(`User with ID ${id} not found`);
      }),
      catchError(error => of(createErrorResult<User>('Failed to find user', error)))
    );
  }

  /**
   * Find all users with optional filtering
   * @param filters Optional filters to apply
   * @returns Observable with the result containing array of users
   */
  findAll(filters?: Record<string, any>): Observable<Result<User[]>> {
    return from(this.getAllUsers()).pipe(
      map(users => {
        let filteredUsers = users;
        
        // Apply filters if provided
        if (filters) {
          filteredUsers = users.filter(user => {
            return Object.entries(filters).every(([key, value]) => {
              return user[key as keyof User] === value;
            });
          });
        }
        
        return createSuccessResult(filteredUsers);
      }),
      catchError(error => of(createErrorResult<User[]>('Failed to find users', error)))
    );
  }

  /**
   * Create a new user
   * @param createDto The data for creating the user
   * @returns Observable with the result containing the created user
   */
  create(createDto: CreateUserDto): Observable<Result<User>> {
    return from(this.createUserInternal(createDto)).pipe(
      catchError(error => of(createErrorResult<User>('Failed to create user', error)))
    );
  }

  /**
   * Update an existing user
   * @param id The user ID to update
   * @param updateDto The data for updating the user
   * @returns Observable with the result containing the updated user
   */
  update(id: number, updateDto: UpdateUserDto): Observable<Result<User>> {
    return from(this.updateUserInternal(id, updateDto)).pipe(
      catchError(error => of(createErrorResult<User>('Failed to update user', error)))
    );
  }

  /**
   * Delete a user by ID
   * @param id The user ID to delete
   * @returns Observable with the result of the deletion
   */
  delete(id: number): Observable<Result<boolean>> {
    return from(this.deleteUserInternal(id)).pipe(
      catchError(error => of(createErrorResult<boolean>('Failed to delete user', error)))
    );
  }

  /**
   * Check if a user exists by ID
   * @param id The user ID to check
   * @returns Observable with the result containing existence status
   */
  exists(id: number): Observable<Result<boolean>> {
    return from(this.getAllUsers()).pipe(
      map(users => {
        const exists = users.some(u => u.id === id);
        return createSuccessResult(exists);
      }),
      catchError(error => of(createErrorResult<boolean>('Failed to check user existence', error)))
    );
  }

  /**
   * Count users with optional filtering
   * @param filters Optional filters to apply
   * @returns Observable with the result containing the count
   */
  count(filters?: Record<string, any>): Observable<Result<number>> {
    return this.findAll(filters).pipe(
      map(result => {
        if (result.success && result.data) {
          return createSuccessResult(result.data.length);
        }
        return createErrorResult<number>('Failed to count users');
      })
    );
  }

  /**
   * Find user by username
   * @param username The username to search for
   * @returns Observable with the result containing the user or error
   */
  findByUsername(username: string): Observable<Result<User>> {
    return from(this.getAllUsers()).pipe(
      map(users => {
        const user = users.find(u => u.username === username);
        if (user) {
          return createSuccessResult(user);
        }
        return createErrorResult<User>(`User with username ${username} not found`);
      }),
      catchError(error => of(createErrorResult<User>('Failed to find user by username', error)))
    );
  }

  /**
   * Find the currently logged-in user
   * @returns Observable with the result containing the active user or error
   */
  findActiveUser(): Observable<Result<User>> {
    return from(this.getAllUsers()).pipe(
      map(users => {
        const activeUser = users.find(u => u.isLoggedIn);
        if (activeUser) {
          return createSuccessResult(activeUser);
        }
        return createErrorResult<User>('No active user found');
      }),
      catchError(error => of(createErrorResult<User>('Failed to find active user', error)))
    );
  }

  /**
   * Update user login status
   * @param userId The user ID
   * @param isLoggedIn The new login status
   * @returns Observable with the result of the operation
   */
  updateLoginStatus(userId: number, isLoggedIn: boolean): Observable<Result<boolean>> {
    return from(this.updateLoginStatusInternal(userId, isLoggedIn)).pipe(
      catchError(error => of(createErrorResult<boolean>('Failed to update login status', error)))
    );
  }

  /**
   * Internal method to get all users from storage
   * @private
   */
  private async getAllUsers(): Promise<User[]> {
    const users = await this.storageService.get<User[]>(this.STORAGE_KEY);
    return users || [];
  }

  /**
   * Internal method to save users to storage
   * @private
   */
  private async saveUsers(users: User[]): Promise<void> {
    await this.storageService.set(this.STORAGE_KEY, users);
  }

  /**
   * Internal method to create a user
   * @private
   */
  private async createUserInternal(createDto: CreateUserDto): Promise<Result<User>> {
    const users = await this.getAllUsers();
    
    // Check if username already exists
    const existingUser = users.find(u => u.username === createDto.username);
    if (existingUser) {
      return createErrorResult<User>('Username already exists');
    }

    // Generate new ID
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const now = new Date();

    // Create new user
    const newUser: User = {
      id: newId,
      username: createDto.username,
      email: createDto.email,
      passwordHash: this.hashPassword(createDto.password), // In real app, use proper hashing
      phone: createDto.phone,
      isLoggedIn: false,
      status: UserStatus.ACTIVE,
      role: 'owner' as any, // Default role
      business: {
        id: newId, // Simple business ID generation
        name: createDto.business.name,
        address: createDto.business.address,
        type: 'retail' as any,
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      preferredTheme: '#1C2833',
      createdAt: now,
      updatedAt: now
    };

    users.push(newUser);
    await this.saveUsers(users);

    return createSuccessResult(newUser);
  }

  /**
   * Internal method to update a user
   * @private
   */
  private async updateUserInternal(id: number, updateDto: UpdateUserDto): Promise<Result<User>> {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return createErrorResult<User>(`User with ID ${id} not found`);
    }

    // Update user properties
    const user = users[userIndex];
    if (updateDto.username) user.username = updateDto.username;
    if (updateDto.email) user.email = updateDto.email;
    if (updateDto.phone !== undefined) user.phone = updateDto.phone;
    if (updateDto.preferredTheme) user.preferredTheme = updateDto.preferredTheme;
    if (updateDto.status) user.status = updateDto.status;
    
    user.updatedAt = new Date();

    await this.saveUsers(users);
    return createSuccessResult(user);
  }

  /**
   * Internal method to delete a user
   * @private
   */
  private async deleteUserInternal(id: number): Promise<Result<boolean>> {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return createErrorResult<boolean>(`User with ID ${id} not found`);
    }

    users.splice(userIndex, 1);
    await this.saveUsers(users);

    return createSuccessResult(true);
  }

  /**
   * Internal method to update login status
   * @private
   */
  private async updateLoginStatusInternal(userId: number, isLoggedIn: boolean): Promise<Result<boolean>> {
    const users = await this.getAllUsers();
    
    // If logging in, log out all other users first
    if (isLoggedIn) {
      users.forEach(user => {
        user.isLoggedIn = false;
        user.updatedAt = new Date();
      });
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
      return createErrorResult<boolean>(`User with ID ${userId} not found`);
    }

    user.isLoggedIn = isLoggedIn;
    user.lastLoginAt = isLoggedIn ? new Date() : user.lastLoginAt;
    user.updatedAt = new Date();

    await this.saveUsers(users);
    return createSuccessResult(true);
  }

  /**
   * Simple password hashing (in production, use bcrypt or similar)
   * @private
   */
  private hashPassword(password: string): string {
    // This is a simple hash for demo purposes
    // In production, use proper password hashing like bcrypt
    return btoa(password);
  }
}