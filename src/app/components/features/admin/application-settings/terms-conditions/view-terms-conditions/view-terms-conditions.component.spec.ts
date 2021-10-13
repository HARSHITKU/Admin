import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTermsConditionsComponent } from './view-terms-conditions.component';

describe('ViewTermsConditionsComponent', () => {
  let component: ViewTermsConditionsComponent;
  let fixture: ComponentFixture<ViewTermsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTermsConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
