import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationFactory, INotification, NotificationType } from './factories/notification.factory';

/**
 * Notification service for managing application notifications
 * Uses Factory pattern for creating notifications and Observer pattern for state management
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /** Subject for managing notification state */
  private notificationsSubject = new BehaviorSubject<INotification[]>([]);
  
  /** Observable for notifications */
  public notifications$ = this.notificationsSubject.asObservable();

  /** Maximum number of notifications to show at once */
  private readonly MAX_NOTIFICATIONS = 5;

  constructor(private notificationFactory: NotificationFactory) {}

  /**
   * Show a success notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   */
  showSuccess(title: string, message: string, data?: any): void {
    const notification = this.notificationFactory.createSuccess(title, message, data);
    this.addNotification(notification);
  }

  /**
   * Show an error notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   */
  showError(title: string, message: string, data?: any): void {
    const notification = this.notificationFactory.createError(title, message, data);
    this.addNotification(notification);
  }

  /**
   * Show a warning notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   */
  showWarning(title: string, message: string, data?: any): void {
    const notification = this.notificationFactory.createWarning(title, message, data);
    this.addNotification(notification);
  }

  /**
   * Show an info notification
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   */
  showInfo(title: string, message: string, data?: any): void {
    const notification = this.notificationFactory.createInfo(title, message, data);
    this.addNotification(notification);
  }

  /**
   * Show a custom notification
   * @param type Notification type
   * @param title Notification title
   * @param message Notification message
   * @param data Optional additional data
   */
  show(type: NotificationType, title: string, message: string, data?: any): void {
    const notification = this.notificationFactory.createNotification(type, title, message, data);
    this.addNotification(notification);
  }

  /**
   * Remove a specific notification
   * @param notification Notification to remove
   */
  remove(notification: INotification): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n !== notification);
    this.notificationsSubject.next(updatedNotifications);
  }

  /**
   * Clear all notifications
   */
  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  /**
   * Get current notifications
   * @returns Array of current notifications
   */
  getCurrentNotifications(): INotification[] {
    return this.notificationsSubject.value;
  }

  /**
   * Add a notification to the list
   * @private
   * @param notification Notification to add
   */
  private addNotification(notification: INotification): void {
    const currentNotifications = this.notificationsSubject.value;
    
    // Add new notification at the beginning
    const updatedNotifications = [notification, ...currentNotifications];
    
    // Limit the number of notifications
    if (updatedNotifications.length > this.MAX_NOTIFICATIONS) {
      updatedNotifications.splice(this.MAX_NOTIFICATIONS);
    }
    
    this.notificationsSubject.next(updatedNotifications);
    
    // Auto-remove notification after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.remove(notification);
      }, notification.duration);
    }
  }
}