import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfusionCenterProfileComponent } from './transfusion-center-profile.component';

describe('TransfusionCenterProfileComponent', () => {
  let component: TransfusionCenterProfileComponent;
  let fixture: ComponentFixture<TransfusionCenterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfusionCenterProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfusionCenterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
