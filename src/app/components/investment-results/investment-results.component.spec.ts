import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentResultsComponent } from './investment-results.component';
import { CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('InvestmentResultsComponent', () => {
  let component: InvestmentResultsComponent;
  let fixture: ComponentFixture<InvestmentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentResultsComponent, CurrencyPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display fallback message when results are undefined', () => {
    component.results = undefined;
    fixture.detectChanges();

    const fallback = fixture.debugElement.query(By.css('p.center'));
    expect(fallback.nativeElement.textContent).toContain('Pleas enter some values');
  });

  it('should render a table with results when results are provided', () => {
    component.results = [
      {
        year: 1,
        interest: 200,
        annualInvestment: 1000,
        valueEndOfYear: 1200,
        totalInterest: 200,
        totalAmountInvested: 1000
      }
    ];
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);

    const firstRowText = rows[0].nativeElement.textContent;
    expect(firstRowText).toContain('1');
    expect(firstRowText).toContain('$1,200.00'); 
    expect(firstRowText).toContain('$200.00');
    expect(firstRowText).toContain('$1,000.00');
  });
});
