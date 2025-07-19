import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validators for form validation
 * Provides reusable validation functions following functional programming principles
 */
export class CustomValidators {
  
  /**
   * Validator for username format
   * Username must be 3-20 characters, alphanumeric with underscores
   * @returns Validator function
   */
  static username(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Don't validate empty values, use required validator for that
      }

      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      const isValid = usernameRegex.test(control.value);

      return isValid ? null : {
        username: {
          message: 'Username must be 3-20 characters long and contain only letters, numbers, and underscores'
        }
      };
    };
  }

  /**
   * Validator for strong password
   * Password must be at least 8 characters with uppercase, lowercase, number, and special character
   * @returns Validator function
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const password = control.value;
      const errors: any = {};

      // Check minimum length
      if (password.length < 8) {
        errors.minLength = 'Password must be at least 8 characters long';
      }

      // Check for uppercase letter
      if (!/[A-Z]/.test(password)) {
        errors.uppercase = 'Password must contain at least one uppercase letter';
      }

      // Check for lowercase letter
      if (!/[a-z]/.test(password)) {
        errors.lowercase = 'Password must contain at least one lowercase letter';
      }

      // Check for number
      if (!/\d/.test(password)) {
        errors.number = 'Password must contain at least one number';
      }

      // Check for special character
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.specialChar = 'Password must contain at least one special character';
      }

      return Object.keys(errors).length > 0 ? { strongPassword: errors } : null;
    };
  }

  /**
   * Validator for confirming password match
   * @param passwordControlName Name of the password control
   * @returns Validator function
   */
  static confirmPassword(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !control.parent) {
        return null;
      }

      const passwordControl = control.parent.get(passwordControlName);
      if (!passwordControl) {
        return null;
      }

      const password = passwordControl.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : {
        confirmPassword: {
          message: 'Passwords do not match'
        }
      };
    };
  }

  /**
   * Validator for positive numbers
   * @returns Validator function
   */
  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = parseFloat(control.value);
      const isValid = !isNaN(value) && value > 0;

      return isValid ? null : {
        positiveNumber: {
          message: 'Value must be a positive number'
        }
      };
    };
  }

  /**
   * Validator for non-negative numbers (including zero)
   * @returns Validator function
   */
  static nonNegativeNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = parseFloat(control.value);
      const isValid = !isNaN(value) && value >= 0;

      return isValid ? null : {
        nonNegativeNumber: {
          message: 'Value must be zero or positive'
        }
      };
    };
  }

  /**
   * Validator for phone numbers
   * Accepts various phone number formats
   * @returns Validator function
   */
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      // Basic phone number regex (can be enhanced for specific formats)
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const isValid = phoneRegex.test(control.value.replace(/[\s\-\(\)]/g, ''));

      return isValid ? null : {
        phoneNumber: {
          message: 'Please enter a valid phone number'
        }
      };
    };
  }

  /**
   * Validator for business names
   * Business name must be 2-100 characters
   * @returns Validator function
   */
  static businessName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const name = control.value.trim();
      const isValid = name.length >= 2 && name.length <= 100;

      return isValid ? null : {
        businessName: {
          message: 'Business name must be between 2 and 100 characters'
        }
      };
    };
  }

  /**
   * Validator for product names
   * Product name must be 1-50 characters
   * @returns Validator function
   */
  static productName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const name = control.value.trim();
      const isValid = name.length >= 1 && name.length <= 50;

      return isValid ? null : {
        productName: {
          message: 'Product name must be between 1 and 50 characters'
        }
      };
    };
  }

  /**
   * Validator for currency amounts
   * Must be a valid currency amount with up to 2 decimal places
   * @returns Validator function
   */
  static currency(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const currencyRegex = /^\d+(\.\d{1,2})?$/;
      const isValid = currencyRegex.test(control.value.toString());

      return isValid ? null : {
        currency: {
          message: 'Please enter a valid currency amount (up to 2 decimal places)'
        }
      };
    };
  }

  /**
   * Validator for stock quantities
   * Must be a non-negative integer
   * @returns Validator function
   */
  static stockQuantity(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = parseInt(control.value, 10);
      const isValid = !isNaN(value) && value >= 0 && Number.isInteger(parseFloat(control.value));

      return isValid ? null : {
        stockQuantity: {
          message: 'Stock quantity must be a non-negative whole number'
        }
      };
    };
  }
}

/**
 * Utility functions for validation
 */
export class ValidationUtils {
  
  /**
   * Get all error messages from a form control
   * @param control The form control
   * @returns Array of error messages
   */
  static getErrorMessages(control: AbstractControl): string[] {
    if (!control.errors) {
      return [];
    }

    const messages: string[] = [];
    
    Object.keys(control.errors).forEach(key => {
      const error = control.errors![key];
      
      if (typeof error === 'string') {
        messages.push(error);
      } else if (error && error.message) {
        messages.push(error.message);
      } else {
        // Default messages for built-in validators
        switch (key) {
          case 'required':
            messages.push('This field is required');
            break;
          case 'email':
            messages.push('Please enter a valid email address');
            break;
          case 'minlength':
            messages.push(`Minimum length is ${error.requiredLength} characters`);
            break;
          case 'maxlength':
            messages.push(`Maximum length is ${error.requiredLength} characters`);
            break;
          default:
            messages.push(`Invalid ${key}`);
        }
      }
    });

    return messages;
  }

  /**
   * Check if a form control has a specific error
   * @param control The form control
   * @param errorKey The error key to check
   * @returns True if the control has the specified error
   */
  static hasError(control: AbstractControl, errorKey: string): boolean {
    return control.errors ? control.errors[errorKey] !== undefined : false;
  }

  /**
   * Get the first error message from a form control
   * @param control The form control
   * @returns First error message or empty string
   */
  static getFirstErrorMessage(control: AbstractControl): string {
    const messages = this.getErrorMessages(control);
    return messages.length > 0 ? messages[0] : '';
  }
}