import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Ask, Bid, OrderBook, TickerData, TradingPairInfo} from "../../bitstamp-tradeview-lite.model";

@Injectable()
export abstract class BitstampTradeviewLiteApiService {
  abstract getTicker(currencyPairId: string): Observable<TickerData>;

  abstract getTradingPairsInfo(): Observable<TradingPairInfo[]>;

  abstract getOrderBook(currencyPairId: string): Observable<OrderBook>;

  abstract submitBid(bid: Bid): Observable<Bid>;

  abstract submitAsk(ask: Ask): Observable<Ask>;
}
