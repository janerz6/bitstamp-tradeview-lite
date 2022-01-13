import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {BitstampTradeviewLiteComponent} from './bitstamp-tradeview-lite/bitstamp-tradeview-lite.component';
import {OrderPairsListComponent} from './order-pairs-list/order-pairs-list.component';
import {OrderPairDetailComponent} from './order-pair-detail/order-pair-detail.component';
import {OrderBookWidgetComponent} from './order-book-widget/order-book-widget.component';
import {BitstampTradeviewLiteApiService} from "./service/api/tradeview-lite-api.service";
import {tradeviewServiceFactory} from "./service/api/tradeview-api-service.factory";
import {TradeWidgetComponent} from './trade-widget/trade-widget.component';
import {SettingsService} from "./service/settings/settings.service";
import {CustomErrorHandler} from "./error-handler";
import {SettingsMenuComponent} from './settings-menu/settings-menu.component';

@NgModule({
  declarations: [
    BitstampTradeviewLiteComponent,
    OrderPairsListComponent,
    OrderPairDetailComponent,
    OrderBookWidgetComponent,
    TradeWidgetComponent,
    SettingsMenuComponent
  ],
  imports: [CommonModule, HttpClientModule, ScrollingModule, FormsModule],
  providers: [
    {
      provide: BitstampTradeviewLiteApiService,
      useFactory: tradeviewServiceFactory,
      deps: [HttpClient, SettingsService]
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    }
  ],
  exports: [BitstampTradeviewLiteComponent]
})
export class BitstampTradeviewLiteLibModule {
}
