import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReactantsComponent } from './dashboard-reactants.component';

describe('DashboardReactantsComponent', () => {
  let component: DashboardReactantsComponent;
  let fixture: ComponentFixture<DashboardReactantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardReactantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardReactantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
