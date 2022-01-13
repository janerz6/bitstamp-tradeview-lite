import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TradingPairInfo} from "../bitstamp-tradeview-lite.model";

@Component({
  selector: 'bitstamp-order-pairs-list',
  templateUrl: './order-pairs-list.component.html',
  styleUrls: ['./order-pairs-list.component.scss']
})
export class OrderPairsListComponent implements OnInit, OnDestroy {
  private readonly clickOutsideListener: OmitThisParameter<(event: any) => void>;
  private isOpeningClick = true;

  @Input() selectedPair?: TradingPairInfo;
  @Input() tradingPairs?: TradingPairInfo[] = [];
  @Output() selectionChanged = new EventEmitter<TradingPairInfo>();
  @Output() close = new EventEmitter();

  constructor(private host: ElementRef) {
    this.clickOutsideListener = this.clickOutsideHandler.bind(this);
  }

  ngOnInit(): void {
    document.addEventListener('click', this.clickOutsideHandler.bind(this));
  }

  onClick(evt: MouseEvent) {
    evt.stopImmediatePropagation(); // Prevent dropdown to close
  }

  clickOutsideHandler(event: any) {
    if (this.isOpeningClick) {
      this.isOpeningClick = false;
    } else if (!this.host.nativeElement.contains(event.target)) { // check click origin
      this.close.emit();
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.clickOutsideListener);
  }
}
