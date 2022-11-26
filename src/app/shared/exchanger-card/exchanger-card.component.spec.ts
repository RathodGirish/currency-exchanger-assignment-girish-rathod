import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerCardComponent } from './exchanger-card.component';

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
