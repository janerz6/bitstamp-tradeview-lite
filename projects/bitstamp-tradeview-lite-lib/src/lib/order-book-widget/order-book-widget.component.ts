import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BitstampTradeviewLiteApiService} from "../service/api/tradeview-lite-api.service";
import {Ask, Bid, OrderBook, OrderBookTableRow} from "../bitstamp-tradeview-lite.model";

@Component({
  selector: 'bitstamp-order-book',
  templateUrl: './order-book-widget.component.html',
  styleUrls: ['./order-book-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBookWidgetComponent {
  private _currencyPairId?: string;

  @Input()
  set currencyPairId(currencyPairId: string | undefined) {
    this._currencyPairId = currencyPairId;
    this.orderBook = undefined;
    this.tableData = undefined;
    if (currencyPairId) {
      this.apiService.getOrderBook(currencyPairId).subscribe(orderBookData => {
        if (orderBookData) {
          this.orderBook = orderBookData;
          this.tableData = this.prepareTableData(orderBookData);
          this.cdr.detectChanges();
        }
      });
    }
  }

  orderBook?: OrderBook;
  bids?: Bid[];
  asks?: Ask[];
  tableData?: OrderBookTableRow[];

  constructor(private apiService: BitstampTradeviewLiteApiService, private cdr: ChangeDetectorRef) {
  }

  private prepareTableData(orderBookData: OrderBook) {
    const bids = this.mapBids(orderBookData);
    const asks = this.mapAsks(orderBookData);
    return new Array(Math.max(bids.length, asks.length))
      .fill(undefined)
      .map((val, i) =>
        new OrderBookTableRow(bids!.length > i ? bids![i] : undefined, asks!.length > i ? asks![i] : undefined)
      );
  }

  private mapBids(orderBookData: OrderBook): Bid[] {
    const bids = orderBookData.bids.map(bid => new Bid(bid[0], bid[1]));
    return bids.reduce(function (mem, val, i) {
      val.sum = Number(val.amount) + (i > 0 ? (mem[i - 1].sum || 0) : 0);
      return mem;
    }, bids);
  }

  private mapAsks(orderBookData: OrderBook): Ask[] {
    const asks = orderBookData.asks.map(ask => new Ask(ask[0], ask[1]));
    return asks.reduce(function (mem, val, i) {
      val.sum = Number(val.amount) + (i > 0 ? (mem[i - 1].sum || 0) : 0);
      return mem;
    }, asks);
  }
}
