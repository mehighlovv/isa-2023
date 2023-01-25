import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfusionCenterListComponent } from './transfusion-center-list.component';

describe('TransfusionCenterListComponent', () => {
  let component: TransfusionCenterListComponent;
  let fixture: ComponentFixture<TransfusionCenterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfusionCenterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfusionCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
