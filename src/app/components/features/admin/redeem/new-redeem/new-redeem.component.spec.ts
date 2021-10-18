import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRedeemComponent } from './new-redeem.component';

describe('NewRedeemComponent', () => {
  let component: NewRedeemComponent;
  let fixture: ComponentFixture<NewRedeemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRedeemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
