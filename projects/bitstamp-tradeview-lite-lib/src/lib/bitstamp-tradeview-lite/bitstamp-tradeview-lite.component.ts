import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BitstampTradeviewLiteApiService} from "../service/api/tradeview-lite-api.service";
import {Ask, Bid, TradingPairInfo} from "../bitstamp-tradeview-lite.model";
import {Subject} from "rxjs";

@Component({
  selector: 'bitstamp-tradeview-lite',
  templateUrl: './bitstamp-tradeview-lite.component.html',
  styleUrls: ['./bitstamp-tradeview-lite.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BitstampTradeviewLiteComponent implements OnInit {
  private readonly DEFAULT_TRADE_PAIR = 'BTC/EUR';
  dropdownOpen = false;
  selectedOrderPair?: TradingPairInfo;
  tradingPairs?: TradingPairInfo[];
  orderBookUpdater = new Subject<Ask | Bid>();

  constructor(private apiService: BitstampTradeviewLiteApiService) {
  }

  ngOnInit(): void {
    this.apiService.getTradingPairsInfo().subscribe(data => {
      this.tradingPairs = data;
      this.selectedOrderPair = this.tradingPairs.find(el => el.name === this.DEFAULT_TRADE_PAIR);
    });
  }

  onSelectionChanged(selection?: TradingPairInfo) {
    this.selectedOrderPair = selection;
    this.closeDropdownWithDelay();
  }

  closeDropdownWithDelay(delay = 500) {
    setTimeout(() => this.dropdownOpen = false, delay); // delay dropdown close
  }
}
