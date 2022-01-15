import {ErrorHandler} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {CustomErrorHandler} from "./error-handler";


describe('ErrorHandler', () => {
  let errorHandler: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ErrorHandler,
          useClass: CustomErrorHandler
        }
      ]
    })
      .compileComponents();
    errorHandler = TestBed.inject(ErrorHandler);
    spyOn(window, 'alert');
    spyOn(console, 'error');
  });

  it('should show alert on http error', fakeAsync(() => {
    errorHandler.handleError(new HttpErrorResponse({status: 403, url: 'http://test.url'}));

    expect(console.error).not.toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledWith('Unexpected HttpError:\n' +
      'Http failure response for http://test.url: 403 undefined');
  }));

  it('should log JS error to console', fakeAsync(() => {
    const error = new Error('Some common JS error');
    errorHandler.handleError(error);

    expect(console.error).toHaveBeenCalledWith('Unexpected error:', error);
    expect(window.alert).not.toHaveBeenCalled();
  }));
});
