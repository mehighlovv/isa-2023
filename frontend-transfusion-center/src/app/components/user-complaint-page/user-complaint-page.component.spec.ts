import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComplaintPageComponent } from './user-complaint-page.component';

describe('UserComplaintPageComponent', () => {
  let component: UserComplaintPageComponent;
  let fixture: ComponentFixture<UserComplaintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComplaintPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComplaintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
