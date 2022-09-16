import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from '../notify.service';
import {AppNotification} from '../notify.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit, OnDestroy {

  public notification: AppNotification;
  private onDestroyStarted: Subject<void> = new Subject<void>();
  public hidden: boolean;
  private removalSubscription: Subscription;

  constructor(
    private notifyService: NotifyService
  ) {}

  ngOnInit() {

    this.notifyService.notifications.takeUntil(this.onDestroyStarted).subscribe(notification => {
      this.notification = notification;

      this.hidden = false;

      if (this.removalSubscription) {
        this.removalSubscription.unsubscribe();
      }
      this.removalSubscription = Observable.of(null)
        .delay(notification.timer)
        .subscribe(() => {
          this.removeNotification();
        });

    });
  }

  removeNotification() {
    this.hidden = true;
  }

  ngOnDestroy() {
    this.onDestroyStarted.next();
  }

}
