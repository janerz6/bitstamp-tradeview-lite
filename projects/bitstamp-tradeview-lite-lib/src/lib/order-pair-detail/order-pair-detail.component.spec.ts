import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPairDetailComponent } from './order-pair-detail.component';

describe('OrderPairDetailComponent', () => {
  let component: OrderPairDetailComponent;
  let fixture: ComponentFixture<OrderPairDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPairDetailComponent ]
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
