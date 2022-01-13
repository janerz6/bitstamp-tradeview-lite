import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BitstampTradeviewLiteApiService} from "../service/api/tradeview-lite-api.service";
import {TradingPairInfo} from "../bitstamp-tradeview-lite.model";

@Component({
  selector: 'bitstamp-tradeview-lite',
  templateUrl: './bitstamp-tradeview-lite.component.html',
  styleUrls: ['./bitstamp-tradeview-lite.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BitstampTradeviewLiteComponent implements OnInit {
  dropdownOpen = false;
  selectedOrderPair?: TradingPairInfo;

  constructor(private apiService: BitstampTradeviewLiteApiService) {
  }

  ngOnInit(): void {
    this.apiService.getTradingPairsInfo().subscribe(data => this.selectedOrderPair = data.find(el => el.name === 'BTC/EUR'));
  }

  onSelectionChanged(selection?: TradingPairInfo) {
    this.selectedOrderPair = selection;
    this.closeDropdownWithDelay();
  }

  closeDropdownWithDelay(delay = 500) {
    setTimeout(() => this.dropdownOpen = false, delay); // delay dropdown close
  }
}
