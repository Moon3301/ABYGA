import { BaseModel } from './base.model';

/**
 * Product category enumeration
 */
export enum ProductCategory {
  FOOD_AND_BEVERAGES = 'food_and_beverages',
  CLEANING_PRODUCTS = 'cleaning_products',
  BAKERY = 'bakery',
  PERSONAL_HYGIENE = 'personal_hygiene',
  PET_FOOD = 'pet_food',
  TECHNOLOGY = 'technology',
  SCHOOL_SUPPLIES = 'school_supplies',
  CLOTHING = 'clothing',
  TOYS = 'toys',
  FRUITS_VEGETABLES = 'fruits_vegetables',
  CONSTRUCTION = 'construction',
  SPORTS = 'sports',
  ACCESSORIES = 'accessories'
}

/**
 * Unit of measurement enumeration
 */
export enum UnitOfMeasurement {
  UNIT = 'unit',
  KILOGRAM = 'kilogram',
  LITER = 'liter',
  GRAM = 'gram',
  MILLILITER = 'milliliter'
}

/**
 * Product status enumeration
 */
export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued'
}

/**
 * Product domain model representing an item in inventory
 */
export interface Product extends BaseModel {
  /** Product name */
  name: string;
  /** Product description */
  description?: string;
  /** Selling price */
  price: number;
  /** Cost price */
  cost: number;
  /** Current stock quantity */
  stock: number;
  /** Unit of measurement */
  unitOfMeasurement: UnitOfMeasurement;
  /** Product category */
  category: ProductCategory;
  /** Product image URL or base64 */
  image?: string;
  /** Product barcode/SKU */
  barcode?: string;
  /** Current product status */
  status: ProductStatus;
  /** Business ID this product belongs to */
  businessId: number;
  /** Minimum stock level for alerts */
  minStockLevel?: number;
  /** Maximum stock level */
  maxStockLevel?: number;
}

/**
 * Data Transfer Object for product creation
 */
export interface CreateProductDto {
  /** Product name */
  name: string;
  /** Product description */
  description?: string;
  /** Selling price */
  price: number;
  /** Cost price */
  cost: number;
  /** Initial stock quantity */
  stock: number;
  /** Unit of measurement */
  unitOfMeasurement: UnitOfMeasurement;
  /** Product category */
  category: ProductCategory;
  /** Product image */
  image?: string;
  /** Product barcode */
  barcode?: string;
  /** Minimum stock level */
  minStockLevel?: number;
}

/**
 * Data Transfer Object for product updates
 */
export interface UpdateProductDto {
  /** New product name */
  name?: string;
  /** New description */
  description?: string;
  /** New price */
  price?: number;
  /** New cost */
  cost?: number;
  /** New stock quantity */
  stock?: number;
  /** New unit of measurement */
  unitOfMeasurement?: UnitOfMeasurement;
  /** New category */
  category?: ProductCategory;
  /** New image */
  image?: string;
  /** New status */
  status?: ProductStatus;
  /** New minimum stock level */
  minStockLevel?: number;
}

/**
 * Product with calculated fields for display
 */
export interface ProductWithCalculations extends Product {
  /** Calculated profit margin */
  profitMargin: number;
  /** Calculated profit amount */
  profitAmount: number;
  /** Whether stock is below minimum level */
  isLowStock: boolean;
  /** Stock status message */
  stockStatus: string;
}