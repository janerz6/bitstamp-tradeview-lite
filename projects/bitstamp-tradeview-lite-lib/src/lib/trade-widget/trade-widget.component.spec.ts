import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TradeWidgetComponent} from './trade-widget.component';
import {BitstampTradeviewLiteApiService} from "bitstamp-tradeview-lite-lib";
import {BitstampTradeviewLiteMockService} from "../service/api/tradeview-lite-api-mock.service";

describe('TradeWidgetComponent', () => {
  let component: TradeWidgetComponent;
  let fixture: ComponentFixture<TradeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeWidgetComponent],
      providers: [
        {
          provide: BitstampTradeviewLiteApiService,
          useClass: BitstampTradeviewLiteMockService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
