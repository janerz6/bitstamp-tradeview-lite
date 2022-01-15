import {InjectionToken} from "@angular/core";

export interface TradingPairInfo {
  trading: any;
  base_decimals: number;
  url_symbol: string;
  name: string;
  instant_and_market_orders: any;
  minimum_order: string;
  counter_decimals: number;
  description: string;
}

export interface TickerData {
  last: string;
  high: string;
  low: string;
  vwap: string;
  volume: string;
  bid: string;
  ask: string;
  timestamp: string;
  open: string;
}

export interface OrderBook {
  timestamp: string,
  microtimestamp: string,
  bids: string[][],
  asks: string[][]
}

export class Bid {
  bid: string;
  amount: string;
  value: string;
  sum?: number;

  constructor(bid: string, amount: string) {
    this.bid = bid;
    this.amount = amount;
    this.value = (Number(bid) * Number(amount)).toFixed(2);
  }
}

export class Ask {
  ask: string;
  amount: string;
  value: string;
  sum?: number;

  constructor(ask: string, amount: string) {
    this.ask = ask;
    this.amount = amount;
    this.value = (Number(ask) * Number(amount)).toFixed(2);
  }
}

export class OrderBookTableRow {
  bid?: Bid;
  ask?: Ask;

  constructor(bid?: Bid, ask?: Ask) {
    this.bid = bid;
    this.ask = ask;
  }
}


//////////////////
// Lib settings
//////////////////

export interface BitstampTradeviewLiteSettings {
  useMocks: boolean;
  apiUrl: string;
}

export const BITSTAMP_TRADEVIEW_LITE_SETTINGS_INJECTION_TOKEN =
  new InjectionToken<BitstampTradeviewLiteSettings>('BITSTAMP-TRADEVIEW-LITE-SETTINGS');
