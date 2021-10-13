import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTermsConditionsComponent } from './new-terms-conditions.component';

describe('NewTermsConditionsComponent', () => {
  let component: NewTermsConditionsComponent;
  let fixture: ComponentFixture<NewTermsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTermsConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
