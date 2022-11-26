import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangerHomeComponent } from './currency-exchanger-home.component';

describe('CurrencyExchangerHomeComponent', () => {
  let component: CurrencyExchangerHomeComponent;
  let fixture: ComponentFixture<CurrencyExchangerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyExchangerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
