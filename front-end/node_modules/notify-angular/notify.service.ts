import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AppNotification, NotifyOptions} from './notify.model';

const DEFAULT_POSITION = {
  bottom: 0,
  right: 0
};

@Injectable()
export class NotifyService {

  private _notifications: Subject<AppNotification> = new Subject();

  constructor() {}

  defaultNotificationFactory (message: string, options?: NotifyOptions): AppNotification {
    const notification: AppNotification = {
      message: message,
      withShadow: options && options.withShadow !== undefined ? options.withShadow : true,
      position: options && options.position || DEFAULT_POSITION,
      type: 'success',
      color: options && options.color || '#3C763D',
      background: options && options.background || '#DFF0D8',
      timer: options && options.timer || 1500
    };
    return notification
  }

  success(message: string, options?: NotifyOptions) {
    const notification = this.defaultNotificationFactory(message, options);
    this._notifications.next(notification);
  }

  error(message: string, options?: NotifyOptions) {
    const notification = this.defaultNotificationFactory(message, options);
    notification.type = 'error';
    notification.color = options && options.color || '#A94442';
    notification.background = options && options.background || '#F2DEDE';
    notification.timer = options && options.timer || 3000;
    this._notifications.next(notification);
  }

  public get notifications() { // TODO: make this const somehow. static?
    return this._notifications;
  }

}


