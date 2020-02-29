import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSelfEvaluationComponent } from './review-self-evaluation.component';

describe('ReviewSelfEvaluationComponent', () => {
  let component: ReviewSelfEvaluationComponent;
  let fixture: ComponentFixture<ReviewSelfEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSelfEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSelfEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
