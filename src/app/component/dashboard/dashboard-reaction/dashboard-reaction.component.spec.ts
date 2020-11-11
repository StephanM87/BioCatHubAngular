import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReactionComponent } from './dashboard-reaction.component';

describe('DashboardReactionComponent', () => {
  let component: DashboardReactionComponent;
  let fixture: ComponentFixture<DashboardReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardReactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
