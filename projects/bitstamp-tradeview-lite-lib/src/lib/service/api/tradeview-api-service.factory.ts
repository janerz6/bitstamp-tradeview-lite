import {HttpClient} from "@angular/common/http";
import {BitstampTradeviewLiteMockService} from "./tradeview-lite-api-mock.service";
import {BitstampTradeviewLiteApiRestService} from "./tradeview-lite-api-rest.service";
import {SettingsService} from "../settings/settings.service";

export let tradeviewServiceFactory = (http: HttpClient, settingsService: SettingsService) => {
  if (settingsService.settings.useMocks) {
    return new BitstampTradeviewLiteMockService();
  } else {
    return new BitstampTradeviewLiteApiRestService(http, settingsService);
  }
};
