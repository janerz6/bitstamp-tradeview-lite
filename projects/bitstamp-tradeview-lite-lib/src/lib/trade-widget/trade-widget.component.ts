import {Component, EventEmitter, Output} from '@angular/core';
import {BitstampTradeviewLiteApiService} from "../service/api/tradeview-lite-api.service";
import {Ask, Bid} from "../bitstamp-tradeview-lite.model";

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

  constructor(private apiService: BitstampTradeviewLiteApiService) {
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
      alert('Insert required data to proceed.');
    } else if (this.tradeType === 'buy') {
      this.apiService.submitBid(new Bid(String(this.bidAsk), String(this.amount)))
        .subscribe(r => {
          alert('Bid was successfully submitted.');
          this.tradePlaced.emit(r);
        });
    } else {
      this.apiService.submitAsk(new Ask(String(this.bidAsk), String(this.amount)))
        .subscribe(r => {
          alert('Ask was successfully submitted.');
          this.tradePlaced.emit(r);
        });
    }
  }
}
