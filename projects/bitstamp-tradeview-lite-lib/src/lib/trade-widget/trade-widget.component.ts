import {Component, EventEmitter, Output} from '@angular/core';
import {BitstampTradeviewLiteApiService} from "../service/api/tradeview-lite-api.service";
import {Ask, Bid} from "../bitstamp-tradeview-lite.model";
import {NotificationsService} from "../service/notifications/notifications.service";

declare type TradeType = 'buy' | 'sell';

@Component({
  selector: 'bitstamp-trade-widget',
  templateUrl: './trade-widget.component.html',
  styleUrls: ['./trade-widget.component.scss']
})
export class TradeWidgetComponent {

  tradeType?: TradeType;
  isBuy?: boolean;
  amount?: number;
  bidAsk?: number;

  @Output() tradePlaced = new EventEmitter<Ask | Bid>();

  constructor(private apiService: BitstampTradeviewLiteApiService, private notificationService: NotificationsService) {
  }

  selectTradeType(tradeType: TradeType) {
    this.tradeType = tradeType;
    this.isBuy = this.tradeType != null && this.tradeType === 'buy';
  }

  get value() {
    if (this.bidAsk && this.amount) {
      return Number((this.bidAsk * this.amount).toFixed(2))
    }
    return null
  }

  validate() {
    return this.tradeType != null && this.bidAsk && this.amount;
  }

  submitTrade() {
    if (!this.validate()) {
      this.notificationService.notify('Missing required data', 'Insert required data to proceed.');
    } else if (this.tradeType === 'buy') {
      this.apiService.submitBid(new Bid(String(this.bidAsk), String(this.amount)))
        .subscribe(r => {
          this.notificationService.notify('Bid submitted', 'Bid was successfully submitted.');
          this.tradePlaced.emit(r);
        });
    } else {
      this.apiService.submitAsk(new Ask(String(this.bidAsk), String(this.amount)))
        .subscribe(r => {
          this.notificationService.notify('Ask submitted', 'Ask was successfully submitted.');
          this.tradePlaced.emit(r);
        });
    }
  }
}
