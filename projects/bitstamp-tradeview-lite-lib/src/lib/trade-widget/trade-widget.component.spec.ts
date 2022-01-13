import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeWidgetComponent } from './trade-widget.component';

describe('TradeWidgetComponent', () => {
  let component: TradeWidgetComponent;
  let fixture: ComponentFixture<TradeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeWidgetComponent ]
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
