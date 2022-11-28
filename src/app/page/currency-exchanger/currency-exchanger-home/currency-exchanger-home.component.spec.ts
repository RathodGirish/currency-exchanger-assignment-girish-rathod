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

  it('should render title in a h2 tag', (async() => {
    const fixture = TestBed.createComponent(CurrencyExchangerHomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Currency Exchanger');
  }));
});

