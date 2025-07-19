import { Injectable } from '@angular/core';

/**
 * Notification type enumeration
 */
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

/**
 * Notification interface
 */
export interface INotification {
  /** Notification type */
  type: NotificationType;
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Duration in milliseconds */
  duration?: number;
  /** Whether notification can be dismissed */
  dismissible?: boolean;
  /** Additional data */
  data?: any;
}

/**
 * Base notification class
 */
abstract class BaseNotification implements INotification {
  abstract type: NotificationType;
  abstract title: string;
  abstract message: string;
  duration = 3000; // Default 3 seconds
  dismissible = true;
  data?: any;

  constructor(title: string, message: string, data?: any) {
    this.title = title;
    this.message = message;
    this.data = data;
  }
}

/**
 * Success notification implementation
 */
class SuccessNotification extends BaseNotification {
  type = NotificationType.SUCCESS;
  
  constructor(title: string, message: string, data?: any) {
    super(title, message, data);
  }
}

/**
 * Error notification implementation
 */
class ErrorNotification extends BaseNotification {
  type = NotificationType.ERROR;
  duration = 5000; // Longer duration for errors
  
  constructor(title: string, message: string, data?: any) {
    super(title, message, data);
  }
}

/**
 * Warning notification implementation
 */
class WarningNotification extends BaseNotification {
  type = NotificationType.WARNING;
  duration = 4000;
  
  constructor(title: string, message: string, data?: any) {
    super(title, message, data);
  }
}

/**
 * Info notification implementation
 */
class InfoNotification extends BaseNotification {
  type = NotificationType.INFO;
  
  constructor(title: string, message: string, data?: any) {
    super(title, message, data);
  }
}

/**
 * Notification factory implementing Factory pattern
 * Creates different types of notifications based on type
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationFactory {
  
  /**
   * Create a notification based on type
   * @param type Notification type
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   * @returns Created notification instance
   */
  createNotification(
    type: NotificationType, 
    title: string, 
    message: string, 
    data?: any
  ): INotification {
    switch (type) {
      case NotificationType.SUCCESS:
        return new SuccessNotification(title, message, data);
      
      case NotificationType.ERROR:
        return new ErrorNotification(title, message, data);
      
      case NotificationType.WARNING:
        return new WarningNotification(title, message, data);
      
      case NotificationType.INFO:
        return new InfoNotification(title, message, data);
      
      default:
        throw new Error(`Unsupported notification type: ${type}`);
    }
  }

  /**
   * Create a success notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   * @returns Success notification
   */
  createSuccess(title: string, message: string, data?: any): INotification {
    return this.createNotification(NotificationType.SUCCESS, title, message, data);
  }

  /**
   * Create an error notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   * @returns Error notification
   */
  createError(title: string, message: string, data?: any): INotification {
    return this.createNotification(NotificationType.ERROR, title, message, data);
  }

  /**
   * Create a warning notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   * @returns Warning notification
   */
  createWarning(title: string, message: string, data?: any): INotification {
    return this.createNotification(NotificationType.WARNING, title, message, data);
  }

  /**
   * Create an info notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   * @returns Info notification
   */
  createInfo(title: string, message: string, data?: any): INotification {
    return this.createNotification(NotificationType.INFO, title, message, data);
  }
}