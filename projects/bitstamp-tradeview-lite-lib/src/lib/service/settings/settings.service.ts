import {Injectable, Injector} from '@angular/core';
import {
  BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN,
  BitstampTradeviewLiteSettings
} from "../../bitstamp-tradeview-lite.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly LOCAL_STORAGE_KEY = 'bitstampTradeviewLiteSettings';
  private readonly withLocalStorage: boolean;
  settings: BitstampTradeviewLiteSettings = {
    useMocks: true,
    apiUrl: 'https://www.bitstamp.net/api/'
  };

  constructor(private injector: Injector) {
    // Use DI in Angular application
    if (injector.get(BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN, null) != null) {
      this.settings = injector.get(BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN);
      this.withLocalStorage = false;
    } else { // Use local storage in elements
      this.preloadFromLocalStorage();
      this.withLocalStorage = true;
    }
  }

  private preloadFromLocalStorage() {
    const localSettingsStr = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (localSettingsStr) {
      const localSettings = JSON.parse(localSettingsStr);
      if (localSettings) {
        this.settings.useMocks = localSettings.useMocks;
      }
    }
  }

  setUseMocks(useMocks: boolean) {
    this.settings.useMocks = useMocks;
    if (this.withLocalStorage) {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify({useMocks: useMocks}));
      window.location.reload();
    }
  }
}
