import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePrivacyPolicyComponent } from './delete-privacy-policy.component';

describe('DeletePrivacyPolicyComponent', () => {
  let component: DeletePrivacyPolicyComponent;
  let fixture: ComponentFixture<DeletePrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePrivacyPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
