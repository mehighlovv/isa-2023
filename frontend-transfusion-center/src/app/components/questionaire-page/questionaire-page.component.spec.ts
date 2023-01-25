import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionairePageComponent } from './questionaire-page.component';

describe('QuestionairePageComponent', () => {
  let component: QuestionairePageComponent;
  let fixture: ComponentFixture<QuestionairePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionairePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
