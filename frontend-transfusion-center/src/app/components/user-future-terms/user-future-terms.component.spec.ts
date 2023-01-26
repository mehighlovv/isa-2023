import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFutureTermsComponent } from './user-future-terms.component';

describe('UserFutureTermsComponent', () => {
  let component: UserFutureTermsComponent;
  let fixture: ComponentFixture<UserFutureTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFutureTermsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFutureTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
