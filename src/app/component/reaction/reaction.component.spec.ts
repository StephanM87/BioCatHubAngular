import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactionComponent } from './reaction.component';

describe('ReactionComponent', () => {
  let component: ReactionComponent;
  let fixture: ComponentFixture<ReactionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
