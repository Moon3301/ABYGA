import { BaseModel } from './base.model';

/**
 * Business type enumeration
 */
export enum BusinessType {
  RETAIL = 'retail',
  RESTAURANT = 'restaurant',
  SERVICE = 'service',
  MANUFACTURING = 'manufacturing',
  OTHER = 'other'
}

/**
 * Business domain model representing a company or organization
 */
export interface Business extends BaseModel {
  /** Business name */
  name: string;
  /** Physical address */
  address: string;
  /** Business type classification */
  type: BusinessType;
  /** Tax identification number */
  taxId?: string;
  /** Business phone number */
  phone?: string;
  /** Business email */
  email?: string;
  /** Business website URL */
  website?: string;
  /** Business logo URL or base64 */
  logo?: string;
  /** Whether the business is currently active */
  isActive: boolean;
}

/**
 * Data Transfer Object for business creation
 */
export interface CreateBusinessDto {
  /** Business name */
  name: string;
  /** Physical address */
  address: string;
  /** Business type */
  type: BusinessType;
  /** Optional tax ID */
  taxId?: string;
  /** Optional phone */
  phone?: string;
  /** Optional email */
  email?: string;
}