/**
 * FEEDBACK SYSTEM - User Notifications and Actions
 * Handles user feedback, notifications, and action logging
 */

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export class FeedbackService {
  private static notificationContainer: HTMLElement | null = null;

  /**
   * Initialize notification container
   */
  private static initContainer(): void {
    if (typeof window === 'undefined') return;
    
    if (!this.notificationContainer) {
      this.notificationContainer = document.createElement('div');
      this.notificationContainer.id = 'notification-container';
      this.notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(this.notificationContainer);
    }
  }

  /**
   * Show notification to user
   */
  static showNotification(
    message: string, 
    type: NotificationType = 'info',
    options: NotificationOptions = {}
  ): void {
    if (typeof window === 'undefined') return;

    this.initContainer();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      background: ${this.getBackgroundColor(type)};
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      max-width: 300px;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
      position: relative;
      overflow: hidden;
    `;

    // Add icon
    const icon = document.createElement('span');
    icon.textContent = this.getIcon(type);
    icon.style.cssText = `
      margin-right: 8px;
      font-size: 16px;
    `;

    // Add message
    const messageEl = document.createElement('span');
    messageEl.textContent = message;
    messageEl.style.cssText = `
      font-size: 14px;
      font-weight: 500;
    `;

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 4px;
      right: 8px;
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      opacity: 0.7;
    `;
    closeBtn.onclick = () => this.removeNotification(notification);

    notification.appendChild(icon);
    notification.appendChild(messageEl);
    notification.appendChild(closeBtn);

    // Add action button if provided
    if (options.action) {
      const actionBtn = document.createElement('button');
      actionBtn.textContent = options.action.label;
      actionBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        margin-left: 8px;
      `;
      actionBtn.onclick = options.action.onClick;
      notification.appendChild(actionBtn);
    }

    this.notificationContainer!.appendChild(notification);

    // Auto remove after duration
    const duration = options.duration || 3000;
    setTimeout(() => {
      this.removeNotification(notification);
    }, duration);
  }

  /**
   * Remove notification
   */
  private static removeNotification(notification: HTMLElement): void {
    if (!notification.parentNode) return;

    notification.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  /**
   * Get background color for notification type
   */
  private static getBackgroundColor(type: NotificationType): string {
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#fd7e14',
      info: '#17a2b8',
    };
    return colors[type];
  }

  /**
   * Get icon for notification type
   */
  private static getIcon(type: NotificationType): string {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[type];
  }

  /**
   * Show success notification
   */
  static success(message: string, options?: NotificationOptions): void {
    this.showNotification(message, 'success', options);
  }

  /**
   * Show error notification
   */
  static error(message: string, options?: NotificationOptions): void {
    this.showNotification(message, 'error', options);
  }

  /**
   * Show info notification
   */
  static info(message: string, options?: NotificationOptions): void {
    this.showNotification(message, 'info', options);
  }

  /**
   * Show warning notification
   */
  static warning(message: string, options?: NotificationOptions): void {
    this.showNotification(message, 'warning', options);
  }

  /**
   * Log user action for analytics
   */
  static logUserAction(action: string, data?: any): void {
    console.log(`User Action: ${action}`, data);
    
    // In production, this would send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: 'user_interaction',
        event_label: data?.label || action,
        value: data?.value || 1,
      });
    }
  }

  /**
   * Show loading state
   */
  static showLoading(message: string = 'Loading...'): void {
    this.showNotification(message, 'info', { duration: 0 });
  }

  /**
   * Hide loading state
   */
  static hideLoading(): void {
    // Remove all info notifications (loading states)
    if (typeof window === 'undefined' || !this.notificationContainer) return;
    
    const notifications = this.notificationContainer.querySelectorAll('.notification-info');
    notifications.forEach(notification => {
      this.removeNotification(notification as HTMLElement);
    });
  }
}

// Add CSS animations
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
