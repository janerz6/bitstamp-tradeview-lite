import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookWidgetComponent } from './order-book-widget.component';

describe('OrderBookComponent', () => {
  let component: OrderBookWidgetComponent;
  let fixture: ComponentFixture<OrderBookWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBookWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
