import { BaseModel } from './base.model';
import { Business } from './business.model';

/**
 * User authentication status enumeration
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

/**
 * User role enumeration for authorization
 */
export enum UserRole {
  ADMIN = 'admin',
  OWNER = 'owner',
  EMPLOYEE = 'employee',
  GUEST = 'guest'
}

/**
 * User domain model representing a system user
 * Extends BaseModel to inherit common entity properties
 */
export interface User extends BaseModel {
  /** Unique username for authentication */
  username: string;
  /** User's email address */
  email: string;
  /** Encrypted password (never store plain text) */
  passwordHash: string;
  /** User's phone number (optional) */
  phone?: string;
  /** Current login status */
  isLoggedIn: boolean;
  /** User's current status */
  status: UserStatus;
  /** User's role in the system */
  role: UserRole;
  /** Associated business entity */
  business: Business;
  /** User's preferred system color theme */
  preferredTheme: string;
  /** Last login timestamp */
  lastLoginAt?: Date;
}

/**
 * Data Transfer Object for user creation
 * Contains only the necessary fields for creating a new user
 */
export interface CreateUserDto {
  /** Username for the new user */
  username: string;
  /** Email address */
  email: string;
  /** Plain text password (will be hashed) */
  password: string;
  /** Optional phone number */
  phone?: string;
  /** Business information */
  business: {
    name: string;
    address: string;
  };
}

/**
 * Data Transfer Object for user authentication
 */
export interface LoginDto {
  /** Username or email */
  identifier: string;
  /** Plain text password */
  password: string;
}

/**
 * Data Transfer Object for user updates
 * All fields are optional to allow partial updates
 */
export interface UpdateUserDto {
  /** New username */
  username?: string;
  /** New email */
  email?: string;
  /** New phone number */
  phone?: string;
  /** New preferred theme */
  preferredTheme?: string;
  /** New status */
  status?: UserStatus;
}