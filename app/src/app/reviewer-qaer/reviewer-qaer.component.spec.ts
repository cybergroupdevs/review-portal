import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerQaerComponent } from './reviewer-qaer.component';

describe('ReviewerQaerComponent', () => {
  let component: ReviewerQaerComponent;
  let fixture: ComponentFixture<ReviewerQaerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerQaerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerQaerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
