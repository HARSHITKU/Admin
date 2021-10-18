import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRedeemComponent } from './view-redeem.component';

describe('ViewRedeemComponent', () => {
  let component: ViewRedeemComponent;
  let fixture: ComponentFixture<ViewRedeemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRedeemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
