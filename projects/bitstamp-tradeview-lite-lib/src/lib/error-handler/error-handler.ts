import {ErrorHandler, Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationsService} from "../service/notifications/notifications.service";
import {HttpPrettyError} from "./http-pretty-error";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private notificationService: NotificationsService) {
  }

  handleError(error: Error) {
    if (error instanceof HttpErrorResponse || error instanceof HttpPrettyError) {
      this.notificationService.notify('API Error', error.message);
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
