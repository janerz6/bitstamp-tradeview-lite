import {ChangeDetectorRef, Component, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {NotificationsService} from "../service/notifications/notifications.service";

/**
 * This component should be added to root app component template or manually inserted to app root element DOM
 */

@Component({
  selector: 'bitstamp-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  @HostBinding('class.shadow') notificationActive: boolean = false;
  @Input() title?: string;
  @Input() message?: string;

  constructor(private notificationService: NotificationsService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.notificationService.notificationReceived.subscribe(([title, msg]) => {
      if (this.notificationActive) {
        // could also stack notifications here
        return;
      }
      this.notificationActive = true;
      this.title = title;
      this.message = msg;
      this.cdr.detectChanges();
    });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.notificationActive = false;
  }

  closeNotificationDialog() {
    this.notificationActive = false;
    this.cdr.detectChanges();
  }
}
