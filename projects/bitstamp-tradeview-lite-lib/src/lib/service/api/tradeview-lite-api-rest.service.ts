import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Ask, Bid, OrderBook, TickerData, TradingPairInfo} from "../../bitstamp-tradeview-lite.model";
import {BitstampTradeviewLiteApiService} from "./tradeview-lite-api.service";
import {SettingsService} from "../settings/settings.service";

export class BitstampTradeviewLiteApiRestService extends BitstampTradeviewLiteApiService {
  private readonly apiBaseUrl: string;

  constructor(private http: HttpClient, private settingsService: SettingsService) {
    super();
    this.apiBaseUrl = settingsService.settings.apiUrl;
  }

  getTradingPairsInfo(): Observable<TradingPairInfo[]> {
    return this.http.get<TradingPairInfo[]>(`${this.apiBaseUrl}v2/trading-pairs-info/`);
  }

  getTicker(currencyPairId: string): Observable<TickerData> {
    return this.http.get<TickerData>(`${this.apiBaseUrl}v2/ticker/${currencyPairId}/`);
  }

  getOrderBook(currencyPairId: string): Observable<OrderBook> {
    return this.http.get<OrderBook>(`${this.apiBaseUrl}v2/order_book/${currencyPairId}/`);
  }

  submitAsk(ask: Ask): Observable<Ask> {
    return of(ask);
  }

  submitBid(bid: Bid): Observable<Bid> {
    return of(bid);
  }
}
