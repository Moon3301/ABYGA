import { Observable } from 'rxjs';
import { Result } from '../../models/base.model';
import { User, LoginDto } from '../../models/user.model';

/**
 * Authentication strategy interface following Strategy pattern
 * Allows different authentication methods to be implemented
 */
export interface IAuthenticationStrategy {
  /**
   * Authenticate a user with the given credentials
   * @param credentials The login credentials
   * @returns Observable with the authentication result
   */
  authenticate(credentials: LoginDto): Observable<Result<User>>;

  /**
   * Validate if the strategy can handle the given credentials
   * @param credentials The login credentials
   * @returns True if the strategy can handle these credentials
   */
  canHandle(credentials: LoginDto): boolean;

  /**
   * Get the strategy name for identification
   * @returns The strategy name
   */
  getStrategyName(): string;
}

/**
 * Username/Password authentication strategy
 * Handles traditional username and password authentication
 */
export class UsernamePasswordStrategy implements IAuthenticationStrategy {
  constructor(private userRepository: any) {} // Inject user repository

  /**
   * Authenticate using username and password
   * @param credentials The login credentials
   * @returns Observable with the authentication result
   */
  authenticate(credentials: LoginDto): Observable<Result<User>> {
    // Implementation would validate username/password
    // This is a simplified version
    return this.userRepository.findByUsername(credentials.identifier).pipe(
      map((result: Result<User>) => {
        if (!result.success || !result.data) {
          return createErrorResult<User>('Invalid username or password');
        }

        const user = result.data;
        
        // Verify password (in production, use proper password verification)
        if (!this.verifyPassword(credentials.password, user.passwordHash)) {
          return createErrorResult<User>('Invalid username or password');
        }

        return createSuccessResult(user);
      })
    );
  }

  /**
   * Check if this strategy can handle the credentials
   * @param credentials The login credentials
   * @returns True if can handle
   */
  canHandle(credentials: LoginDto): boolean {
    return credentials.identifier && credentials.password ? true : false;
  }

  /**
   * Get strategy name
   * @returns Strategy name
   */
  getStrategyName(): string {
    return 'username-password';
  }

  /**
   * Verify password against hash
   * @private
   */
  private verifyPassword(password: string, hash: string): boolean {
    // Simple verification for demo (use bcrypt in production)
    return btoa(password) === hash;
  }
}

/**
 * Email/Password authentication strategy
 * Handles email-based authentication
 */
export class EmailPasswordStrategy implements IAuthenticationStrategy {
  constructor(private userRepository: any) {}

  authenticate(credentials: LoginDto): Observable<Result<User>> {
    // Similar to username strategy but searches by email
    // Implementation would be similar to UsernamePasswordStrategy
    throw new Error('Not implemented yet');
  }

  canHandle(credentials: LoginDto): boolean {
    // Check if identifier looks like an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(credentials.identifier) && !!credentials.password;
  }

  getStrategyName(): string {
    return 'email-password';
  }
}

/**
 * Guest authentication strategy
 * Handles guest/anonymous access
 */
export class GuestStrategy implements IAuthenticationStrategy {
  constructor(private userRepository: any) {}

  authenticate(credentials: LoginDto): Observable<Result<User>> {
    // Return a guest user
    const guestUser: User = {
      id: 0,
      username: 'guest',
      email: 'guest@example.com',
      passwordHash: '',
      isLoggedIn: true,
      status: 'active' as any,
      role: 'guest' as any,
      business: {
        id: 0,
        name: 'Guest Business',
        address: '',
        type: 'other' as any,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      preferredTheme: '#1C2833',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(createSuccessResult(guestUser));
  }

  canHandle(credentials: LoginDto): boolean {
    return credentials.identifier === 'guest' || credentials.identifier === '';
  }

  getStrategyName(): string {
    return 'guest';
  }
}