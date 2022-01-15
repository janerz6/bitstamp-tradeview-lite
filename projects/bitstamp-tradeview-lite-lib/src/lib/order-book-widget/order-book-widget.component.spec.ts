import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderBookWidgetComponent} from './order-book-widget.component';
import {BitstampTradeviewLiteApiService} from "bitstamp-tradeview-lite-lib";
import {of} from "rxjs";
import {ScrollingModule} from "@angular/cdk/scrolling";

describe('OrderBookComponent', () => {
  let component: OrderBookWidgetComponent;
  let fixture: ComponentFixture<OrderBookWidgetComponent>;
  let mockToolBarService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderBookWidgetComponent],
      imports: [ScrollingModule],
      providers: [
        {
          provide: BitstampTradeviewLiteApiService,
          useValue: jasmine.createSpyObj('BitstampTradeviewLiteApiService', ['getOrderBook'])
        }
      ]
    })
      .compileComponents();
    mockToolBarService = TestBed.inject(BitstampTradeviewLiteApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookWidgetComponent);
    component = fixture.componentInstance;
    spyOn((component as any).cdr, 'detectChanges'); // dummy spy
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and prepare order book table data', () => {
    const orderBookMock = {
      timestamp: "1642010276",
      microtimestamp: "1642010276722396",
      bids: [["38361.83", "0.36175161"], ["38356.16", "0.11400104"], ["38353.29", "0.07000000"]],
      asks: [["38381.65", "0.29000000"], ["38383.56", "0.14821586"]]
    }
    mockToolBarService.getOrderBook.and.returnValue(of(orderBookMock));

    expect(component).toBeTruthy();
    component.loadData('btceur')

    expect(component.orderBook).toBe(orderBookMock)
    expect(component.tableData).toBeDefined()
    expect(component.tableData?.length).toBe(3)
    expect(component.errorMsg).not.toBeDefined()
    expect(component.showLoader).toBeFalse()

    const tableData = component.tableData!;
    // check bids
    expect(tableData[0].bid?.bid).toBe('38361.83')
    expect(tableData[0].bid?.amount).toBe('0.36175161')
    expect(tableData[0].bid?.value).toBe((38361.83 * 0.36175161).toFixed(2)) // bid * amount rounded to 2
    expect(tableData[0].bid?.sum).toBe(0.36175161) // same as amount

    expect(tableData[1].bid?.bid).toBe('38356.16')
    expect(tableData[1].bid?.amount).toBe('0.11400104')
    expect(tableData[1].bid?.value).toBe('4372.64')
    expect(tableData[1].bid?.sum).toBe(0.47575265) // same as amount + bid.sum of previous bid (0)

    expect(tableData[2].bid?.bid).toBe('38353.29')
    expect(tableData[2].bid?.amount).toBe('0.07000000')
    expect(tableData[2].bid?.value).toBe('2684.73')
    expect(tableData[2].bid?.sum).toBe(0.5457526500000001) // same as amount + bid.sum of previous bid (1)

    // check asks
    expect(tableData[0].ask?.ask).toBe('38381.65')
    expect(tableData[0].ask?.amount).toBe('0.29000000')
    expect(tableData[0].ask?.value).toBe('11130.68')
    expect(tableData[0].ask?.sum).toBe(0.29000000) // same as amount

    expect(tableData[1].ask?.ask).toBe('38383.56')
    expect(tableData[1].ask?.amount).toBe('0.14821586')
    expect(tableData[1].ask?.value).toBe('5689.05')
    expect(tableData[1].ask?.sum).toBe(0.43821586) // same as amount + bid.sum of previous bid (0)

    expect(tableData[2].ask).not.toBeDefined()
  });
});
