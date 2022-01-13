import {Observable, of} from "rxjs";
import {Ask, Bid, OrderBook, TickerData, TradingPairInfo} from "../../bitstamp-tradeview-lite.model";
import {ORDER_BOOK_MOCKS, TICKER_MOCKS, TRADING_PAIRS_MOCKS} from "../../data-mocks";
import {BitstampTradeviewLiteApiService} from "./tradeview-lite-api.service";

export class BitstampTradeviewLiteMockService extends BitstampTradeviewLiteApiService {
  getTicker(currencyPairId: string): Observable<TickerData> {
    if (TICKER_MOCKS.hasOwnProperty(currencyPairId)) {
      return of(TICKER_MOCKS[currencyPairId])
    }
    return of(TICKER_MOCKS['btceur']);
  }

  getTradingPairsInfo(): Observable<TradingPairInfo[]> {
    return of(TRADING_PAIRS_MOCKS);
  }

  getOrderBook(currencyPairId: string): Observable<OrderBook> {
    if (ORDER_BOOK_MOCKS.hasOwnProperty(currencyPairId)) {
      return of(ORDER_BOOK_MOCKS[currencyPairId])
    }
    return of(ORDER_BOOK_MOCKS['btceur']);
  }

  submitAsk(ask: Ask): Observable<Ask> {
    return of(ask);
  }

  submitBid(bid: Bid): Observable<Bid> {
    return of(bid);
  }
}
