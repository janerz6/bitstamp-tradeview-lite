import {ErrorHandler} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";

export class CustomErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      alert('Unexpected HttpError: ' + error.message)
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
