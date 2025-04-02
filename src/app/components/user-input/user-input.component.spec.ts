import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInputComponent } from './user-input.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInputComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit calculate event with correct input values', () => {
    // Arrange: Set input values
    component.enteredInitialInvestment = '1000';
    component.enteredAnnualInvestment = '500';
    component.enteredExpectedReturn = '8';
    component.enteredDuration = '5';

    // Spy on the EventEmitter
    spyOn(component.calculate, 'emit');

    // Act: Trigger form submission
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    // Assert: Check if emitted with correct values
    expect(component.calculate.emit).toHaveBeenCalledWith({
      initialInvestment: 1000,
      annualInvestment: 500,
      expectedReturn: 8,
      duration: 5,
    });
  });
});

