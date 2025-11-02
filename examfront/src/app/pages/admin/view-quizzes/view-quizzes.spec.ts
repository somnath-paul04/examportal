import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizzes } from './view-quizzes';

describe('ViewQuizzes', () => {
  let component: ViewQuizzes;
  let fixture: ComponentFixture<ViewQuizzes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuizzes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizzes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
