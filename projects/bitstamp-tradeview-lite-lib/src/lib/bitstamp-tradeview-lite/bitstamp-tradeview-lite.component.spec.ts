import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitstampTradeviewLiteComponent } from './bitstamp-tradeview-lite.component';

describe('BitstampTradeviewLiteComponent', () => {
  let component: BitstampTradeviewLiteComponent;
  let fixture: ComponentFixture<BitstampTradeviewLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitstampTradeviewLiteComponent ]
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
