import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartComponent } from './line-chart.component';
import { CurrencyExchangerService } from "../../services/currency-exchanger.service";
import { HttpInterceptor } from '../../provider/http-interceptor';


describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
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


  it("should get past year currency data by from and to date", () => {
    service.getChartData({base: 'USD', symbols: 'INR', start_date: '2021-12-01', end_date: '2022-11-28'});
    expect(service.getChartData.length).toBeLessThan(1);
  });
});