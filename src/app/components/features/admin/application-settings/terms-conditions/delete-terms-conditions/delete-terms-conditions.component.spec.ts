import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTermsConditionsComponent } from './delete-terms-conditions.component';

describe('DeleteTermsConditionsComponent', () => {
  let component: DeleteTermsConditionsComponent;
  let fixture: ComponentFixture<DeleteTermsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTermsConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
