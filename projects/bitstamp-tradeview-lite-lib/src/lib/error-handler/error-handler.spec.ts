import {ErrorHandler} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {CustomErrorHandler} from "./error-handler";
import {NotificationsService} from "../service/notifications/notifications.service";


describe('ErrorHandler', () => {
  let errorHandler: any;
  let notificationService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ErrorHandler,
          useClass: CustomErrorHandler
        },
        NotificationsService
      ]
    })
      .compileComponents();
    errorHandler = TestBed.inject(ErrorHandler);
    notificationService = TestBed.inject(NotificationsService);
    spyOn(notificationService, 'notify');
    spyOn(console, 'error');
  });

  it('should show alert on http error', fakeAsync(() => {
    errorHandler.handleError(new HttpErrorResponse({status: 403, url: 'http://test.url'}));

    expect(console.error).not.toHaveBeenCalled()
    expect(notificationService.notify).toHaveBeenCalledWith('API Error',
      'Http failure response for http://test.url: 403 undefined');
  }));

  it('should log JS error to console', fakeAsync(() => {
    const error = new Error('Some common JS error');
    errorHandler.handleError(error);

    expect(console.error).toHaveBeenCalledWith('Unexpected error:', error);
    expect(notificationService.notify).not.toHaveBeenCalled();
  }));
});
