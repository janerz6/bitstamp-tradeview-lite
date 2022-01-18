import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationReceived = new Subject<[string, string?]>();

  notify(title: string, msg: string) {
    this.notificationReceived.next([title, msg]);
  }
}
