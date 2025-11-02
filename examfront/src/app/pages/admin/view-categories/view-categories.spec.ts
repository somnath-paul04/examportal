import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategories } from './view-categories';

describe('ViewCategories', () => {
  let component: ViewCategories;
  let fixture: ComponentFixture<ViewCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
