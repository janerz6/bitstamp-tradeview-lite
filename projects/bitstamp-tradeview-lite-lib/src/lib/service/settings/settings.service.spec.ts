import {TestBed} from '@angular/core/testing';

import {SettingsService} from './settings.service';
import {BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN} from "bitstamp-tradeview-lite-lib";

describe('SettingsService', () => {
  let service: SettingsService;

  const prepareTestingModule = (providers: any[] = []) => {
    TestBed.configureTestingModule({providers: providers});
    service = TestBed.inject(SettingsService);
  };

  afterEach(() => {
    localStorage.clear();
  })

  it('should be created', () => {
    prepareTestingModule();

    expect(service).toBeTruthy();
  });

  it('should use DI settings', () => {
    prepareTestingModule([
      {
        provide: BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN,
        useValue: {
          useMocks: false,
          apiUrl: 'http://api.url'
        }
      }
    ]);

    expect(service).toBeTruthy();
    expect(service.settings.useMocks).toBeFalse();
    expect(service.settings.apiUrl).toBe('http://api.url');
  });

  it('should use default settings', () => {
    prepareTestingModule();

    expect(service).toBeTruthy();
    expect(service.settings.useMocks).toBeTrue();
    expect(service.settings.apiUrl).toBe('https://www.bitstamp.net/api/');
  });

  it('should use local storage settings', () => {
    localStorage.setItem('bitstampTradeviewLiteSettings', JSON.stringify({
      useMocks: false,
      apiUrl: 'http://api.local-storage.url'
    }));
    prepareTestingModule();

    expect(service).toBeTruthy();
    expect(service.settings.useMocks).toBeFalse();
    expect(service.settings.apiUrl).toBe('http://api.local-storage.url');
  });
});
