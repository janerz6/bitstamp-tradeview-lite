import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {BitstampTradeviewLiteApiService} from "../service/api/tradeview-lite-api.service";
import {Ask, Bid, OrderBook, OrderBookTableRow} from "../bitstamp-tradeview-lite.model";
import {Subject} from "rxjs";

@Component({
  selector: 'bitstamp-order-book',
  templateUrl: './order-book-widget.component.html',
  styleUrls: ['./order-book-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBookWidgetComponent implements OnDestroy {
  private destroyed = new Subject();
  private _currencyPairId?: string;
  private _updater?: Subject<Bid | Ask>;

  errorMsg?: string;
  showLoader: boolean = false;
  orderBook?: OrderBook;
  bids?: Bid[];
  asks?: Ask[];
  tableData?: OrderBookTableRow[];

  @Input()
  set updater(updater: Subject<Bid | Ask>) {
    this._updater?.unsubscribe();
    this._updater = updater;
    this._updater?.subscribe(change => {
      console.log('Data updated. Added: ', change)
      this.loadData();
    })
  }

  @Input()
  set currencyPairId(currencyPairId: string | undefined) {
    this._currencyPairId = currencyPairId;
    if (currencyPairId) {
      this.loadData(currencyPairId);
    }
  }

  constructor(private apiService: BitstampTradeviewLiteApiService, private cdr: ChangeDetectorRef) {
  }

  loadData(currencyPairId = this._currencyPairId) {
    this.orderBook = undefined;
    this.tableData = undefined;
    this.errorMsg = undefined;
    const timeout = setTimeout(() => {
      this.showLoader = true;
      this.cdr.detectChanges();
    }, 500); // delay loader

    this.apiService.getOrderBook(currencyPairId!).subscribe({
      next: (orderBookData) => {
        if (orderBookData) {
          this.orderBook = orderBookData;
          this.tableData = this.prepareTableData(orderBookData);
        }
      },
      error: (err) => {
        this.errorMsg = "Error loading data.";
        throw err;
      }
    }).add(() => { // do after next/error
      clearInterval(timeout);
      this.showLoader = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
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
