import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {BitstampTradeviewLiteApiService} from "../service/api/tradeview-lite-api.service";
import {TickerData, TradingPairInfo} from "../bitstamp-tradeview-lite.model";

@Component({
  selector: 'bitstamp-order-pair-detail',
  templateUrl: './order-pair-detail.component.html',
  styleUrls: ['./order-pair-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPairDetailComponent {
  private _orderPair?: TradingPairInfo;
  tickerData?: TickerData;
  currency?: string;

  @Input()
  set orderPair(value: TradingPairInfo | undefined) {
    this._orderPair = value;
    this.tickerData = undefined;
    this.currency = undefined;
    this.cdr.detectChanges();
    if (value) {
      this.currency = value.name.split("/")[1];
      this.apiService.getTicker(value.url_symbol).subscribe(data => {
        this.tickerData = data;
        this.cdr.detectChanges();
      });
    }
  }

  get orderPair(): TradingPairInfo | undefined {
    return this._orderPair;
  }

  constructor(private apiService: BitstampTradeviewLiteApiService, private cdr: ChangeDetectorRef) {
  }
}
