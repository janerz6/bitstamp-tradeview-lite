import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BitstampTradeviewLiteComponent} from './bitstamp-tradeview-lite.component';
import {BitstampTradeviewLiteApiService} from "bitstamp-tradeview-lite-lib";
import {BitstampTradeviewLiteMockService} from "../service/api/tradeview-lite-api-mock.service";

describe('BitstampTradeviewLiteComponent', () => {
  let component: BitstampTradeviewLiteComponent;
  let fixture: ComponentFixture<BitstampTradeviewLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BitstampTradeviewLiteComponent],
      providers: [{
        provide: BitstampTradeviewLiteApiService,
        useClass: BitstampTradeviewLiteMockService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitstampTradeviewLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
