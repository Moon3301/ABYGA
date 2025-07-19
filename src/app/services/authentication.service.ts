import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Result, createSuccessResult, createErrorResult } from '../models/base.model';
import { User, LoginDto, CreateUserDto } from '../models/user.model';
import { UserRepository } from './repositories/user.repository';
import { 
  IAuthenticationStrategy, 
  UsernamePasswordStrategy, 
  EmailPasswordStrategy, 
  GuestStrategy 
} from './strategies/authentication.strategy';

/**
 * Authentication service implementing Strategy pattern
 * Manages user authentication and session state
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /** Current user subject for reactive state management */
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  /** Observable for current user */
  public currentUser$ = this.currentUserSubject.asObservable();

  /** Available authentication strategies */
  private strategies: IAuthenticationStrategy[] = [];

  /** Flag to track if service is initialized */
  private isInitialized = false;

  constructor(
    private userRepository: UserRepository,
    private router: Router
  ) {
    this.initializeStrategies();
    this.loadCurrentUser();
  }

  /**
   * Initialize authentication strategies
   * @private
   */
  private initializeStrategies(): void {
    this.strategies = [
      new UsernamePasswordStrategy(this.userRepository),
      new EmailPasswordStrategy(this.userRepository),
      new GuestStrategy(this.userRepository)
    ];
  }

  /**
   * Load current user from storage on service initialization
   * @private
   */
  private loadCurrentUser(): void {
    this.userRepository.findActiveUser().subscribe(result => {
      if (result.success && result.data) {
        this.currentUserSubject.next(result.data);
      }
      this.isInitialized = true;
    });
  }

  /**
   * Authenticate user with credentials
   * @param credentials Login credentials
   * @returns Observable with authentication result
   */
  login(credentials: LoginDto): Observable<Result<User>> {
    // Find appropriate strategy for the credentials
    const strategy = this.strategies.find(s => s.canHandle(credentials));
    
    if (!strategy) {
      return of(createErrorResult<User>('No suitable authentication strategy found'));
    }

    return strategy.authenticate(credentials).pipe(
      switchMap(authResult => {
        if (!authResult.success || !authResult.data) {
          return of(authResult);
        }

        // Update login status in repository
        return this.userRepository.updateLoginStatus(authResult.data.id, true).pipe(
          map(updateResult => {
            if (updateResult.success) {
              // Update current user
              const user = { ...authResult.data!, isLoggedIn: true };
              this.currentUserSubject.next(user);
              return createSuccessResult(user);
            }
            return createErrorResult<User>('Failed to update login status');
          })
        );
      })
    );
  }

  /**
   * Log out current user
   * @returns Observable with logout result
   */
  logout(): Observable<Result<boolean>> {
    const currentUser = this.currentUserSubject.value;
    
    if (!currentUser) {
      return of(createSuccessResult(true));
    }

    return this.userRepository.updateLoginStatus(currentUser.id, false).pipe(
      tap(result => {
        if (result.success) {
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
        }
      })
    );
  }

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Observable with registration result
   */
  register(userData: CreateUserDto): Observable<Result<User>> {
    return this.userRepository.create(userData);
  }

  /**
   * Check if user is currently authenticated
   * @returns True if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Get current user
   * @returns Current user or null
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if current user has specific role
   * @param role Role to check
   * @returns True if user has the role
   */
  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }

  /**
   * Check if service is initialized
   * @returns True if initialized
   */
  isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Refresh current user data
   * @returns Observable with refresh result
   */
  refreshCurrentUser(): Observable<Result<User>> {
    const currentUser = this.currentUserSubject.value;
    
    if (!currentUser) {
      return of(createErrorResult<User>('No current user to refresh'));
    }

    return this.userRepository.findById(currentUser.id).pipe(
      tap(result => {
        if (result.success && result.data) {
          this.currentUserSubject.next(result.data);
        }
      })
    );
  }

  /**
   * Update current user's preferred theme
   * @param theme New theme color
   * @returns Observable with update result
   */
  updateUserTheme(theme: string): Observable<Result<User>> {
    const currentUser = this.currentUserSubject.value;
    
    if (!currentUser) {
      return of(createErrorResult<User>('No current user'));
    }

    return this.userRepository.update(currentUser.id, { preferredTheme: theme }).pipe(
      tap(result => {
        if (result.success && result.data) {
          this.currentUserSubject.next(result.data);
        }
      })
    );
  }
}