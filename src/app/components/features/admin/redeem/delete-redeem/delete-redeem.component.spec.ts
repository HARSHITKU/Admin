import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRedeemComponent } from './delete-redeem.component';

describe('DeleteRedeemComponent', () => {
  let component: DeleteRedeemComponent;
  let fixture: ComponentFixture<DeleteRedeemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRedeemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
