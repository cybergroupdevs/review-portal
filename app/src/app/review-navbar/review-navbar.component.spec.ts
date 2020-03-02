import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNavbarComponent } from './review-navbar.component';

describe('ReviewNavbarComponent', () => {
  let component: ReviewNavbarComponent;
  let fixture: ComponentFixture<ReviewNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
