import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerCardComponent } from './exchanger-card.component';
import { CurrencyExchangerService } from "../../services/currency-exchanger.service";
import { HttpInterceptor } from '../../provider/http-interceptor';


describe('ExchangerCardComponent', () => {
  let component: ExchangerCardComponent;
  let fixture: ComponentFixture<ExchangerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe("CurrencyExchangerService", () => {
  let service: CurrencyExchangerService;
  let httpInterceptor: HttpInterceptor;
  beforeEach(() => {
    service = new CurrencyExchangerService(httpInterceptor);
  });

  it("should get multiple symbols array", () => {
    service.getLatestSymbols({base: 'USD', symbols: "EUR"});
    expect(service.getLatestSymbols.length).toBeGreaterThanOrEqual(1);
  });

  it("should convert currency using from and to value", () => {
    service.convertCurrency({amount: 5, from: 'EUR', to: 'USD'});
    expect(service.convertCurrency.length).toBeLessThan(1);
  });
});
