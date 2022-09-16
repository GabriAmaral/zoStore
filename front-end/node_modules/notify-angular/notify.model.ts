export interface AppNotification {
  type: NotificationType;
  message: string;
  timer: number; // in milliseconds
  withShadow: boolean;
  color: string; // css color property
  background: string; // css background property
  position: NotificationPosition;
}

export interface NotifyOptions {
  timer?: number; // in milliseconds
  withShadow?: boolean;
  color?: string; // css color property
  background?: string; // css background property
  position?: NotificationPosition;
}

export type NotificationType = 'success' | 'error';

export interface NotificationPosition {
  bottom?: number;
  right?: number;
  top?: number;
  left?: number;
}
