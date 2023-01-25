import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTermHistoryComponent } from './user-term-history.component';

describe('UserTermHistoryComponent', () => {
  let component: UserTermHistoryComponent;
  let fixture: ComponentFixture<UserTermHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTermHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTermHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
