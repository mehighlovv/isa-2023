import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTermsQRCodesComponent } from './user-terms-qrcodes.component';

describe('UserTermsQRCodesComponent', () => {
  let component: UserTermsQRCodesComponent;
  let fixture: ComponentFixture<UserTermsQRCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTermsQRCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTermsQRCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
