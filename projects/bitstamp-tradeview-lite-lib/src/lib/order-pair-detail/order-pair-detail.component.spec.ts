import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderPairDetailComponent} from './order-pair-detail.component';
import {BitstampTradeviewLiteApiService} from "bitstamp-tradeview-lite-lib";
import {BitstampTradeviewLiteMockService} from "../service/api/tradeview-lite-api-mock.service";

describe('OrderPairDetailComponent', () => {
  let component: OrderPairDetailComponent;
  let fixture: ComponentFixture<OrderPairDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPairDetailComponent],
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
    fixture = TestBed.createComponent(OrderPairDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
