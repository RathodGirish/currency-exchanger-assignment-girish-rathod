import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangerDetailComponent } from './currency-exchanger-detail.component';

describe('CurrencyExchangerDetailComponent', () => {
  let component: CurrencyExchangerDetailComponent;
  let fixture: ComponentFixture<CurrencyExchangerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyExchangerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
