import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderPairsListComponent} from './order-pairs-list.component';

describe('OrderPairsListComponent', () => {
  let component: OrderPairsListComponent;
  let fixture: ComponentFixture<OrderPairsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPairsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPairsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
